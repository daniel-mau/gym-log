// ============================================================
// DATA LAYER — localStorage + Supabase sync
// ============================================================

function getDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getDayOfWeek(date) {
  const d = date.getDay();
  return DAYS[d === 0 ? 6 : d - 1];
}

function getWeekDates(offset) {
  const o = offset !== undefined ? offset : state.weekOffset;
  const today = new Date();
  const todayDay = getDayOfWeek(today);
  const todayIdx = DAYS.indexOf(todayDay);
  const monday = new Date(today);
  monday.setDate(today.getDate() - todayIdx + o * 7);
  return DAYS.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function getISOWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function loadWorkout(dateKey) {
  try {
    const result = localStorage.getItem(`workout:${dateKey}`);
    return result ? JSON.parse(result) : null;
  } catch (e) {
    return null;
  }
}

function getEffectiveSlotForDate(date) {
  const physicalDay = getDayOfWeek(date);
  const physicalIdx = DAYS.indexOf(physicalDay);
  const monday = new Date(date);
  monday.setDate(date.getDate() - physicalIdx);
  const weekKey = getDateKey(monday);
  let override = null;
  try {
    const stored = localStorage.getItem(`weekOverride:${weekKey}`);
    if (stored) override = JSON.parse(stored);
  } catch (e) { /* ignore */ }
  const days = override || DAYS;
  return days[physicalIdx];
}

function loadPreviousWeekWorkout(dayKey) {
  const currentWeekDates = getWeekDates();
  const currentEffectiveDays = getEffectiveDays();
  const currentPosIdx = currentEffectiveDays.indexOf(dayKey);
  const currentDateKey = getDateKey(currentWeekDates[currentPosIdx >= 0 ? currentPosIdx : DAYS.indexOf(dayKey)]);
  const plan = WEEK_PLAN[dayKey];

  const allWorkouts = loadAllWorkouts(); // sorted newest first
  for (const entry of allWorkouts) {
    if (entry.date >= currentDateKey) continue;

    const d = new Date(entry.date + 'T00:00:00');
    if (getEffectiveSlotForDate(d) !== dayKey) continue;

    if (plan.type === 'gym' && entry.data && entry.data.exercises) {
      // Check that at least one exercise has actual set data
      const hasData = Object.values(entry.data.exercises).some(ex =>
        ex.sets && ex.sets.some(s => s && (s.weight || s.reps || s.duration))
      );
      if (hasData) return entry.data;
    }
    if ((plan.type === 'run' || plan.type === 'long') && entry.data && entry.data.run) {
      const r = entry.data.run;
      if (r.distance || r.duration || r.pace) return entry.data;
    }
  }

  return null;
}

function saveWorkout(dateKey, data) {
  if (state.readOnly) return false;
  try {
    localStorage.setItem(`workout:${dateKey}`, JSON.stringify(data));

    // Trigger async sync to Supabase (don't block); store promise for callers that care
    state.lastSyncPromise = syncToSupabase(dateKey, data);

    return true;
  } catch (e) {
    console.error('Save failed:', e);
    return false;
  }
}

async function syncToSupabase(dateKey, data) {
  if (state.readOnly) return;
  try {
    state.syncStatus = 'syncing';
    console.log('Syncing workout:', dateKey, data);
    const result = await supabaseClient
      .from('workouts')
      .upsert(
        { date: dateKey, data: data },
        { onConflict: 'date' }
      );
    console.log('Workout sync result:', result);
    if (result.error) {
      console.error('Supabase workout sync error:', result.error);
      state.syncStatus = 'error';
    } else {
      state.syncStatus = 'synced';
      console.log('Workout synced successfully');
    }
  } catch (e) {
    console.error('Supabase workout sync exception:', e);
    state.syncStatus = 'error';
  }
}

function loadAllWorkouts() {
  try {
    const workouts = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('workout:')) {
        try {
          const val = localStorage.getItem(key);
          if (val) {
            workouts.push({
              date: key.replace('workout:', ''),
              data: JSON.parse(val)
            });
          }
        } catch (e) { /* skip */ }
      }
    }

    return workouts.sort((a, b) => b.date.localeCompare(a.date));
  } catch (e) {
    return [];
  }
}

async function syncAllFromSupabase() {
  try {
    // Sync workouts
    const { data: workoutData, error: workoutError } = await supabaseClient
      .from('workouts')
      .select('date, data');

    if (workoutError) {
      console.error('Supabase workouts load error:', workoutError.message, workoutError);
    } else if (workoutData) {
      workoutData.forEach(wo => {
        localStorage.setItem(`workout:${wo.date}`, JSON.stringify(wo.data));
      });
    }

    // Sync body metrics
    const { data: metricsData, error: metricsError } = await supabaseClient
      .from('body_metrics')
      .select('date, data');

    if (metricsError) {
      console.error('Supabase body_metrics load error:', metricsError.message, metricsError);
    } else if (metricsData) {
      metricsData.forEach(m => {
        localStorage.setItem(`bodyMetrics:${m.date}`, JSON.stringify(m.data));
      });
    }

    // Sync body targets
    const { data: targetsData, error: targetsError } = await supabaseClient
      .from('body_targets')
      .select('id, data')
      .eq('id', 'default')
      .maybeSingle();

    if (targetsError) {
      console.error('Supabase body_targets load error:', targetsError.message, targetsError);
    } else if (targetsData) {
      localStorage.setItem('bodyTargets', JSON.stringify(targetsData.data));
    }

    // Sync week overrides
    const { data: overridesData, error: overridesError } = await supabaseClient
      .from('week_overrides')
      .select('week_key, data');

    if (overridesError) {
      console.error('Supabase week_overrides load error:', overridesError.message);
    } else if (overridesData) {
      overridesData.forEach(o => {
        localStorage.setItem(`weekOverride:${o.week_key}`, JSON.stringify(o.data));
      });
    }

    state.syncStatus = 'synced';
    console.log('Supabase full sync completed');
  } catch (e) {
    console.error('Supabase full sync exception:', e);
    state.syncStatus = 'error';
  }
}

