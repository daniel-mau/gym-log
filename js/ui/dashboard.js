// ============================================================
// DASHBOARD — charts, carousel, workout delete
// ============================================================

function toggleDashboard() {}
function toggleStats() {}

function deleteCurrentWorkout() {
  if (state.readOnly) return;
  if (!state.todayData || !confirm('Diesen Eintrag wirklich löschen?')) return;
  deleteWorkoutDate(state.todayData.date);
}

function deleteWorkoutDate(dateKey) {
  if (state.readOnly) return;
  if (!confirm('Eintrag vom ' + dateKey + ' löschen? Das kann nicht rückgängig gemacht werden.')) return;
  try {
    localStorage.removeItem(`workout:${dateKey}`);
    syncDeleteToSupabase(dateKey);
    calendarSelectedDate = null;
    renderWeekNav();
    renderStats();
    renderHistory();
  } catch (e) {
    alert('Fehler beim Löschen');
  }
}

async function syncDeleteToSupabase(dateKey) {
  if (state.readOnly) return;
  try {
    const { error } = await supabaseClient
      .from('workouts')
      .delete()
      .eq('date', dateKey);
    if (error) {
      console.error('Supabase delete error:', error.message, error);
    }
  } catch (e) {
    console.error('Supabase delete exception:', e);
  }
}

function renderDashboard() {
  try {
    const workouts = loadAllWorkouts();
    const todayKey = getDateKey(new Date());
    const todayData = loadWorkout(todayKey);
    if (todayData && !workouts.find(w => w.date === todayKey)) {
      workouts.push({ date: todayKey, data: todayData });
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 42);
    const cutoffKey = getDateKey(cutoff);
    const recent = workouts.filter(w => w.date >= cutoffKey && w.data);

    // Weekly run volume with KW labels — fixed 6-bar rolling window
    const weeklyRuns = {};
    recent.forEach(w => {
      if (!w.data || (w.data.type !== 'run' && w.data.type !== 'long')) return;
      const date = new Date(w.date);
      const ws = new Date(date);
      ws.setDate(date.getDate() - ((date.getDay() + 6) % 7));
      const wk = getDateKey(ws);
      if (!weeklyRuns[wk]) weeklyRuns[wk] = 0;
      const dist = parseFloat(w.data.run && w.data.run.distance);
      if (!isNaN(dist) && dist > 0) weeklyRuns[wk] += dist;
    });

    // Determine the 6-week window: anchored at first data week until current exceeds 6 weeks, then slides
    const getWeekStart = (d) => { const s = new Date(d); s.setDate(s.getDate() - ((s.getDay() + 6) % 7)); s.setHours(0,0,0,0); return s; };
    const currentWeekStart = getWeekStart(new Date());
    const dataWeeks = Object.keys(weeklyRuns).sort();
    const firstDataWeekStart = dataWeeks.length > 0 ? new Date(dataWeeks[0]) : currentWeekStart;
    const firstPlusFive = new Date(firstDataWeekStart); firstPlusFive.setDate(firstPlusFive.getDate() + 35);

    let windowStart, windowEnd;
    if (currentWeekStart <= firstPlusFive) {
      // Still within initial 6 weeks: fixed window from first data week
      windowStart = firstDataWeekStart;
      windowEnd = firstPlusFive;
    } else {
      // Past 6 weeks: rolling window of last 6 weeks
      windowEnd = currentWeekStart;
      windowStart = new Date(currentWeekStart);
      windowStart.setDate(windowStart.getDate() - 35);
    }

    // Generate exactly 6 week slots
    const weeks = [];
    for (let i = 0; i < 6; i++) {
      const ws = new Date(windowStart); ws.setDate(ws.getDate() + i * 7);
      weeks.push(getDateKey(ws));
    }
    // Helper: get ISO week number
    const getISOWeek = (d) => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      const week1 = new Date(date.getFullYear(), 0, 4);
      return 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    };
    const currentWeekNumber = getISOWeek(new Date());

    const volumeValues = weeks.map(w => {
      const weekNumber = getISOWeek(new Date(w));
      if (weekNumber > currentWeekNumber) {
        return null; // Future weeks: no data point
      }
      return weeklyRuns[w] || 0; // Past + current weeks: show 0 if no data
    });
    const volumeLabels = weeks.map(w => {
      const d = new Date(w);
      d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
      const w1 = new Date(d.getFullYear(), 0, 4);
      const wn = 1 + Math.round(((d - w1) / 86400000 - 3 + (w1.getDay() + 6) % 7) / 7);
      return `KW${wn}`;
    });

    // Per-run pace with date labels - show every day from first to last data point
    const workoutMap = {};
    workouts.forEach(w => { if (w.data) workoutMap[w.date] = w.data; });

    // Find first and last pace data
    const paceDataDates = workouts.filter(w => {
      if (!w.data || (w.data.type !== 'run' && w.data.type !== 'long')) return false;
      const dist = parseFloat(w.data.run && w.data.run.distance);
      const time = parseTime(w.data.run && w.data.run.time);
      return dist > 0 && time > 0;
    }).map(w => w.date).sort();

    const paceValues = [], paceLabels = [];
    if (paceDataDates.length > 0) {
      const firstDate = new Date(paceDataDates[0]);
      firstDate.setHours(0, 0, 0, 0);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - firstDate) / (24 * 60 * 60 * 1000));

      for (let i = 0; i <= daysDiff; i++) {
        const d = new Date(firstDate);
        d.setDate(firstDate.getDate() + i);
        const wo = workoutMap[getDateKey(d)];
        const label = `${d.getDate()}.${d.getMonth()+1}.`;
        if (wo && (wo.type === 'run' || wo.type === 'long')) {
          const dist = parseFloat(wo.run && wo.run.distance);
          const time = parseTime(wo.run && wo.run.time);
          if (dist > 0 && time > 0) {
            paceValues.push((time / dist) / 60);
          } else {
            paceValues.push(null);
          }
        } else {
          paceValues.push(null);
        }
        paceLabels.push(label);
      }
    }

    // Cadence with date labels - show every day from first to last data point
    const cadenceDataDates = workouts.filter(w => {
      if (!w.data || (w.data.type !== 'run' && w.data.type !== 'long')) return false;
      const c = parseFloat(w.data.run && w.data.run.cadence);
      return c > 0;
    }).map(w => w.date).sort();

    const cadenceValues = [], cadenceLabels = [];
    if (cadenceDataDates.length > 0) {
      const firstDate = new Date(cadenceDataDates[0]);
      firstDate.setHours(0, 0, 0, 0);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - firstDate) / (24 * 60 * 60 * 1000));

      for (let i = 0; i <= daysDiff; i++) {
        const d = new Date(firstDate);
        d.setDate(firstDate.getDate() + i);
        const wo = workoutMap[getDateKey(d)];
        const label = `${d.getDate()}.${d.getMonth()+1}.`;
        if (wo && (wo.type === 'run' || wo.type === 'long')) {
          const c = parseFloat(wo.run && wo.run.cadence);
          cadenceValues.push(c > 0 ? c : null);
        } else {
          cadenceValues.push(null);
        }
        cadenceLabels.push(label);
      }
    }

    // Pain with date labels - show every day from first to last data point
    const painDataDates = workouts.filter(w => {
      return w.data && w.data.run && typeof w.data.run.pain === 'number';
    }).map(w => w.date).sort();

    const painValues = [], painLabels = [];
    if (painDataDates.length > 0) {
      const firstDate = new Date(painDataDates[0]);
      firstDate.setHours(0, 0, 0, 0);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - firstDate) / (24 * 60 * 60 * 1000));

      for (let i = 0; i <= daysDiff; i++) {
        const d = new Date(firstDate);
        d.setDate(firstDate.getDate() + i);
        const wo = workoutMap[getDateKey(d)];
        const label = `${d.getDate()}.${d.getMonth()+1}.`;
        if (wo && wo.run && typeof wo.run.pain === 'number') {
          painValues.push(wo.run.pain);
        } else {
          painValues.push(null);
        }
        painLabels.push(label);
      }
    }

    // Weight + KFA with date labels - show every day from first to last data point
    const allMetrics = loadAllBodyMetrics();
    const metricsMap = {};
    allMetrics.forEach(m => { metricsMap[m.date] = m.data; });

    const weightDataDates = allMetrics.filter(m => {
      const w = parseFloat(m.data.weight);
      return !isNaN(w) && w > 0;
    }).map(m => m.date).sort();

    const fatDataDates = allMetrics.filter(m => {
      const f = parseFloat(m.data.fat);
      return !isNaN(f) && f > 0;
    }).map(m => m.date).sort();

    const weightValues = [], weightLabels = [];
    const fatValues = [], fatLabels = [];

    if (weightDataDates.length > 0) {
      const firstDate = new Date(weightDataDates[0]);
      firstDate.setHours(0, 0, 0, 0);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - firstDate) / (24 * 60 * 60 * 1000));

      for (let i = 0; i <= daysDiff; i++) {
        const d = new Date(firstDate);
        d.setDate(firstDate.getDate() + i);
        const dateKey = getDateKey(d);
        const label = `${d.getDate()}.${d.getMonth()+1}.`;
        const metrics = metricsMap[dateKey];
        const w = metrics ? parseFloat(metrics.weight) : NaN;
        weightValues.push(!isNaN(w) && w > 0 ? w : null);
        weightLabels.push(label);
      }
    }

    if (fatDataDates.length > 0) {
      const firstDate = new Date(fatDataDates[0]);
      firstDate.setHours(0, 0, 0, 0);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - firstDate) / (24 * 60 * 60 * 1000));

      for (let i = 0; i <= daysDiff; i++) {
        const d = new Date(firstDate);
        d.setDate(firstDate.getDate() + i);
        const dateKey = getDateKey(d);
        const label = `${d.getDate()}.${d.getMonth()+1}.`;
        const metrics = metricsMap[dateKey];
        const f = metrics ? parseFloat(metrics.fat) : NaN;
        fatValues.push(!isNaN(f) && f > 0 ? f : null);
        fatLabels.push(label);
      }
    }

    const formatPace = v => {
      const mins = Math.floor(v);
      const secs = Math.round((v - mins) * 60);
      return `${mins}:${String(secs).padStart(2,'0')} /km`;
    };

    const rvEl = document.getElementById('runVolumeSparkline');
    const paEl = document.getElementById('paceSparkline');
    const caEl = document.getElementById('cadenceSparkline');
    const piEl = document.getElementById('painSparkline');
    const wEl  = document.getElementById('weightStatSparkline');
    const fEl  = document.getElementById('fatStatSparkline');

    if (rvEl) rvEl.innerHTML = buildSparklineSVG(volumeValues, 'km', v => `${v.toFixed(1)} km`, 'Laufvolumen', { labels: volumeLabels });
    if (paEl) paEl.innerHTML = buildSparklineSVG(paceValues, 'min/km', formatPace, 'Pace', { labels: paceLabels });
    if (caEl) caEl.innerHTML = buildSparklineSVG(cadenceValues, 'spm', v => `${Math.round(v)} spm`, 'Kadenz', { labels: cadenceLabels });
    if (piEl) piEl.innerHTML = buildSparklineSVG(painValues, '/10', v => `${v.toFixed(1)}/10`, 'Schmerz', { labels: painLabels });
    if (wEl)  wEl.innerHTML  = buildSparklineSVG(weightValues, 'kg', v => `${v.toFixed(1)} kg`, 'Gewicht', { labels: weightLabels });
    if (fEl)  fEl.innerHTML  = buildSparklineSVG(fatValues, '%', v => `${v.toFixed(1)} %`, 'KFA', { labels: fatLabels });

    initChartCarousel();

  } catch (e) {
    console.error('Dashboard render error:', e);
  }
}

function initChartCarousel() {
  const carousel = document.getElementById('chartCarousel');
  const dotsEl = document.getElementById('chartDots');
  if (!carousel || !dotsEl) return;
  const dots = dotsEl.querySelectorAll('.chart-dot');

  let touchStartX = 0;
  let touchStartY = 0;
  let hasMoved = false;

  // Collapse all expanded cards instantly (no transition)
  function collapseAll() {
    carousel.querySelectorAll('.sparkline-card.expanded').forEach(card => {
      const wrap = card.querySelector('.sparkline-table-wrap');
      wrap.style.transition = 'none';
      card.classList.remove('expanded');
      wrap.style.maxHeight = '0';
      // Restore transition after paint
      requestAnimationFrame(() => { wrap.style.transition = ''; });
    });
  }

  // Track touch start position
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    hasMoved = false;
  }, { passive: true });

  // Detect horizontal vs vertical movement
  carousel.addEventListener('touchmove', (e) => {
    if (hasMoved) return;

    const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY);

    // Only collapse if horizontal swipe (deltaX > deltaY and > 10px)
    if (deltaX > 10 && deltaX > deltaY) {
      hasMoved = true;
      if (carousel.querySelector('.sparkline-card.expanded')) {
        collapseAll();
      }
    }
  }, { passive: true });

  // Update dots on scroll end
  carousel.removeEventListener('scroll', carousel._dotHandler);
  let raf = null;
  carousel._dotHandler = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const idx = Math.round(carousel.scrollLeft / carousel.offsetWidth);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    });
  };
  carousel.addEventListener('scroll', carousel._dotHandler, { passive: true });
  carousel._dotHandler();
}

function renderChart(canvasId, type, data, options) {
  try {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return;

    if (!window.chartInstances) window.chartInstances = {};
    if (window.chartInstances[canvasId]) {
      window.chartInstances[canvasId].destroy();
    }

    window.chartInstances[canvasId] = new Chart(canvas, {
      type: type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-dim').trim(), font: { size: 11 } } }
        },
        ...(options || {})
      }
    });
  } catch (e) {
    console.error('Chart render error (' + canvasId + '):', e);
  }
}

