// ============================================================
// TRAININGSPLAN-DEFINITION
// ============================================================

const WEEK_PLAN = {
  mon: {
    type: 'gym',
    name: 'Schultern & Zug',
    subtitle: '5/3/1-Welle Schulterdrücken · Druck & Zug Assistenzübungen · Knie-Stabilisierung',
    exercises: [
      { id: 'shoulder_press', name: 'Schulterdrücken Kurzhanteln', target: '5/3/1-Welle · Hauptlift', sets: 3, detail: 'Hauptlift der Einheit. 5/3/1-Wendler-Schema bedeutet: Woche 1: 5 Wiederholungen bei 65%, 75%, 85% deines Trainingsmaximums. Woche 2: 3 Wiederholungen bei 70%, 80%, 90%. Woche 3: 5, dann 3, dann 1 Wiederholung bei 75%, 85%, 95%. Woche 4: Entlastungswoche mit 40%, 50%, 60%. Trainingsmaximum-Start: je 15 kg pro Hand (30 kg insgesamt). Kurzhanteln auf Schulterhöhe, neutral oder mit Handflächen nach vorne greifen, sitzend oder stehend. Der letzte Satz mit "+" bedeutet: So viele Wiederholungen wie möglich mit sauberer Form.' },
      { id: 'hip_thrust', name: 'Hip Thrust Langhantel', target: '3 × 8–10 · 90s Pause', sets: 3, detail: 'Schultern auf Bank, Langhantel über Hüfte. Gesäßmuskulatur aktiv nach oben drücken, oben 1 Sekunde halten. Diese Übung aktiviert besonders die Gesäßmuskeln, was die Knie stabilisiert und schützt.' },
      { id: 'pullups', name: 'Klimmzüge / Latzug breit', target: '5 Sätze, 25–40 Wiederh. total · 2min', sets: 5, detail: 'Falls Klimmzüge zu schwer sind: Verwende den breiten Latzug statt Klimmzügen. Nutze die volle Bewegungsamplitude (ganz runter, ganz hoch). Verteile die Wiederholungen über die 5 Sätze so, dass insgesamt zwischen 25 und 40 Wiederholungen zusammenkommen.' },
      { id: 'dips', name: 'Dips an Maschine', target: '3 × 10–12 · 90s Pause', sets: 3, detail: 'Druck-Assistenzübung, die Brust und Trizeps trainiert. Kontrolliert nach unten fahren, explosiv nach oben drücken. Bei Maschinen-Dips das Gewicht schwerer einstellen, bei Eigengewicht-Dips ggf. einen Gurt mit Zusatzgewicht nutzen.' },
      { id: 'face_pulls', name: 'Face Pulls Kabel', target: '3 × 15 · 60s Pause', sets: 3, detail: 'Seil auf Augenhöhe anbringen, zur Stirn ziehen, Ellbogen dabei hoch halten. Diese Übung ist wichtig für gesunde Schultern und korrigiert die Fehlhaltung von langem Sitzen am Bildschirm.' },
      { id: 'concentration_curl', name: 'Konzentrations-Curls', target: '3 × 10 pro Seite · 60s Pause', sets: 3, detail: 'Auf Hantelbank sitzen, Ellbogen am Innenschenkel abstützen, mit Kurzhantel curlen. Dies ist eine stark isolierte Bizeps-Übung – sie ist der zweite große Trainingsreiz für den Bizeps nach dem breiten Latzug.' },
      { id: 'wall_sit', name: 'Wandsitz', target: '3 × 45 sec · 90s Pause', sets: 3, detail: 'Rücken an einer Wand, Knie sind etwa 60 Grad gebeugt. Aktiv mit den Fersen nach unten in den Boden drücken, Knie leicht nach außen. Dies ist eine statische Halteübung zur Stabilisierung der Kniestrecker.' }
    ]
  },
  tue: {
    type: 'run',
    name: 'Easy Run',
    subtitle: '5–6 km · Tempo nach Puls · max. 135 Herzschläge/min',
    runType: 'easy',
    targetDistance: 5.5,
    targetPace: '7:45-8:15',
    targetHR: '130-135'
  },
  wed: {
    type: 'gym',
    name: 'Rücken & Trap Bar Deadlift',
    subtitle: '5/3/1-Welle Trap Bar Deadlift · Rückseite Muskelkette · Bizeps-Fokus',
    exercises: [
      { id: 'trap_bar_deadlift', name: 'Trap Bar Deadlift', target: '5/3/1-Welle · Hauptlift', sets: 3, detail: 'Hauptlift. 5/3/1-Wendler-Schema. Das Trainingsmaximum muss noch ermittelt werden: Teste wie viel Gewicht du genau 5 Mal heben kannst (5er-Wiederholungsmaximum), dieses Gewicht ist dein Trainingsmaximum. Trap Bar (Hex Bar) erlaubt einen aufrechteren Oberkörper als konventionelles Kreuzheben – weniger Belastung auf den unteren Rücken und kniefreundlicher. In die Mitte der Bar stellen, neutraler Griff an den seitlichen Griffen, Hüfte nach hinten, Brust raus, Rücken neutral halten und mit den Beinen hochdrücken.' },
      { id: 'db_rows', name: 'Kurzhantel-Ruderungen einarmig', target: '4 × 10–12 pro Seite · 90s', sets: 4, detail: 'Eine Hand auf einer Bank abstützen, anderes Bein nach vorne. Kurzhantel zum Hüftbereich hochziehen, dabei das Schulterblatt zusammenziehen. Dies ist die Hauptzugsübung des Trainings.' },
      { id: 'back_extension', name: 'Rückenstrecker-Maschine 45°', target: '3 × 12–15 · 60s Pause', sets: 3, detail: 'Mit der Hüfte auf dem Polster, kontrolliert nach vorne hängen, dann durch Rückenstrecker-Kontraction wieder hochkommen. Die Wirbelsäule bleibt dabei neutral. Optional eine Hantelscheibe vor der Brust halten für mehr Gewicht.' },
      { id: 'hip_abduction', name: 'Kabel-Hüftabduktion stehend', target: '3 × 12 pro Seite · 60s', sets: 3, detail: 'Manschette am Knöchel, Bein kontrolliert seitlich weg gegen den Kabelwiderstand. Das Stützbein bleibt leicht gebeugt. Diese Übung aktiviert den äußeren Gesäßmuskel, der für Hüftstabilität wichtig ist.' },
      { id: 'bicep_curl', name: 'Bizeps-Curls Langhantel', target: '3 × 10 · 60s Pause', sets: 3, detail: 'Ellbogen fixiert am Körper, kein Schwung aus dem Rücken. Volle Streckung unten, volle Beugung oben.' },
      { id: 'side_plank', name: 'Seitstütz mit Hüfthub', target: '2 × 8 pro Seite · 60s', sets: 2, detail: 'Seitlich gestützt (Unterarm oder Hand auf dem Boden), Hüfte ab und hoch. Diese Übung aktiviert den äußeren Gesäßmuskel isoliert. Beim Hochdrücken der Hüfte Spannung in den Hüftmuskeln halten.' }
    ]
  },
  thu: {
    type: 'gym',
    name: 'Brust & Druck',
    subtitle: '5/3/1-Welle Bankdrücken · Druck Assistenzübungen · Beine knieschonend',
    exercises: [
      { id: 'bench_press', name: 'Bankdrücken Langhantel', target: '5/3/1-Welle · Hauptlift', sets: 3, detail: 'Hauptlift mit 5/3/1-Wendler-Schema. Trainingsmaximum-Start: 50 kg (vorsichtiger Wiedereinstieg nach Zerrung). Schulterbreit greifen, Stange zur Brust bringen, dabei Schulterblätter zusammenziehen und nach unten drücken. Die Bewegung: kontrolliert runter, explosiv hoch.' },
      { id: 'goblet_squat', name: 'Goblet Squat', target: '3 × 10 · 90s Pause', sets: 3, detail: 'Kurzhantel vor der Brust halten, so tief wie möglich und dabei knieschonend. Aufrechte Haltung bewahren – kniefreundlicher als Langhantel-Kniebeugen. Fokus liegt auf dem vorderen Oberschenkelmuskel.' },
      { id: 'incline_press', name: 'Schrägbankdrücken Kurzhanteln', target: '3 × 10 · 90s Pause', sets: 3, detail: 'Bank unter etwa 30 Grad geneigt, trainiert die obere Brust. Kontrollierte Ausführung – diese Übung ergänzt das flache Bankdrücken und gibt der Brust mehr Definition.' },
      { id: 'tricep_pushdown', name: 'Trizeps-Drücken am Kabel', target: '3 × 12 · 60s Pause', sets: 3, detail: 'Ellbogen am Körper fixiert, nur der Unterarm bewegt sich. Direkter Trainingsreiz für den Trizeps – diese Übung schafft Ausgleich zwischen Bizeps und Trizeps für ein symmetrisches Armtraining.' },
      { id: 'pallof_press', name: 'Pallof Press am Kabel', target: '3 × 12 pro Seite · 60s', sets: 3, detail: 'Seitlich zum Kabel stehen, Griff vor der Brust nach vorne ausstrecken gegen den Kabelwiderstand. Dies trainiert die Rumpfstabilität und verhindert Rotationsbewegungen – wichtig für gesunden Rücken.' },
      { id: 'calf_raise', name: 'Wadenheben stehend', target: '3 × 15 · 60s Pause', sets: 3, detail: 'An einer Maschine oder mit Kurzhanteln auf einer Stufe. Vollständig auf die Zehenspitzen hochkommen oben, kurze Pause halten, kontrolliert wieder absenken. Diese Übung ist wichtig für Lauf-Effizienz und schützt die Achillessehne.' }
    ]
  },
  fri: {
    type: 'run',
    name: 'Easy Run',
    subtitle: '5–7 km · optional Kadenz-Blöcke 3 × 1 min @ 160 Schritte/min',
    runType: 'easy',
    targetDistance: 6,
    targetPace: '7:45-8:15',
    targetHR: '130-135'
  },
  sat: {
    type: 'long',
    name: 'Long Run',
    subtitle: '10 km · Wiederholung · 2× still = Steigerung möglich',
    runType: 'long',
    targetDistance: 10,
    targetPace: '7:45-8:30',
    targetHR: '130-140'
  },
  sun: {
    type: 'rest',
    name: 'Ruhe',
    subtitle: 'Spaziergang · Mobility · Stretching · sonst nichts',
  }
};

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_LABELS = { mon: 'Mo', tue: 'Di', wed: 'Mi', thu: 'Do', fri: 'Fr', sat: 'Sa', sun: 'So' };
const DAY_TYPE_LABELS = { gym: 'Gym', run: 'Lauf', long: 'Langlauf', rest: 'Ruhe' };

// ============================================================
// ÜBUNGS-BILDER (yuhonas/free-exercise-db, Public Domain)
// ============================================================

const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

const EXERCISE_IMG = {
  shoulder_press:     'Dumbbell_Shoulder_Press/0.jpg',
  hip_thrust:         'Barbell_Hip_Thrust/0.jpg',
  pullups:            'Pullups/0.jpg',
  dips:               'Dips_-_Triceps_Version/0.jpg',
  face_pulls:         'Face_Pull/0.jpg',
  wall_sit:           'Box_Squat_with_Bands/0.jpg',
  trap_bar_deadlift:  'Trap_Bar_Deadlift/0.jpg',
  db_rows:            'One-Arm_Dumbbell_Row/0.jpg',
  back_extension:     'Hyperextensions_With_No_Hyperextension_Bench/0.jpg',
  hip_abduction:      'Cable_Hip_Adduction/0.jpg',
  bicep_curl:         'Barbell_Curl/0.jpg',
  hammer_curl:        'Hammer_Curls/0.jpg',
  side_plank:         'Side_Bridge/0.jpg',
  bench_press:        'Barbell_Bench_Press_-_Medium_Grip/0.jpg',
  goblet_squat:       'Goblet_Squat/0.jpg',
  incline_press:      'Dumbbell_Bench_Press/0.jpg',
  tricep_pushdown:    'Triceps_Pushdown/0.jpg',
  pallof_press:       'Standing_Cable_Wood_Chop/0.jpg',
  concentration_curl: 'Concentration_Curls/0.jpg',
  calf_raise:         'Standing_Calf_Raises/0.jpg'
};

function exerciseImageHTML(exId, exName) {
  const path = EXERCISE_IMG[exId];
  const initials = exName.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();
  if (!path) {
    return `<div class="exercise-icon-fallback">${initials}</div>`;
  }
  return `<img src="${IMG_BASE}${path}" alt="${exName}" loading="lazy" 
    onerror="this.outerHTML='<div class=\\'exercise-icon-fallback\\'>${initials}</div>'" />`;
}

// ============================================================
// SUPABASE: client is declared in supabase-client.js (global scope)
// ============================================================
// STATE & PERSISTENCE
// ============================================================

let state = {
  selectedDay: null,
  weekOffset: 0,
  todayData: null,
  saveTimer: null,
  syncStatus: 'idle',
  get readOnly() { return window.gymLogReadOnly || false; },
  set readOnly(val) { window.gymLogReadOnly = val; },
  dirty: false,
  title: 'Daniel Mau',
  avatar_url: null
};

let isSavingTitle = false;

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

function loadPreviousWeekWorkout(dayKey) {
  const prevWeekDates = getWeekDates(state.weekOffset - 1);
  const dayIdx = DAYS.indexOf(dayKey);
  const lastWeekDateKey = getDateKey(prevWeekDates[dayIdx]);
  return loadWorkout(lastWeekDateKey);
}

function saveWorkout(dateKey, data) {
  if (state.readOnly) return false;
  try {
    localStorage.setItem(`workout:${dateKey}`, JSON.stringify(data));

    // Trigger async sync to Supabase (don't block)
    syncToSupabase(dateKey, data);

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

// ============================================================
// RENDERING
// ============================================================

function renderHeader() {
  const dates = getWeekDates();
  const monday = dates[0];
  const days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
  const months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

  if (state.weekOffset === 0) {
    const today = new Date();
    const meta = `${days[today.getDay()]} <span>${today.getDate()}. ${months[today.getMonth()]} ${today.getFullYear()}</span>`;
    document.getElementById('todayMeta').innerHTML = meta;
  } else {
    const sunday = dates[6];
    const meta = `${monday.getDate()}. ${months[monday.getMonth()]}` +
      (monday.getMonth() !== sunday.getMonth() ? ` – ${sunday.getDate()}. ${months[sunday.getMonth()]}` : ` – ${sunday.getDate()}.`) +
      ` <span>${sunday.getFullYear()}</span>`;
    document.getElementById('todayMeta').innerHTML = meta;
  }

  const sunday = dates[6];
  const monthNames = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
  const titleEl = document.getElementById('weekNavTitle');
  if (titleEl) {
    if (monday.getMonth() === sunday.getMonth()) {
      titleEl.textContent = `${monthNames[monday.getMonth()]} ${monday.getFullYear()}`;
    } else {
      titleEl.textContent = `${monthNames[monday.getMonth()]} / ${monthNames[sunday.getMonth()]} ${sunday.getFullYear()}`;
    }
  }
  const wnEl = document.getElementById('weekNumber');
  if (wnEl) wnEl.textContent = getISOWeekNumber(monday);
}

function changeWeek(delta) {
  collectAndSave();
  state.weekOffset += delta;
  validateSelectedDay();
  renderHeader();
  renderWeekNav();
  renderSession();
  closeWeekPicker();
}

function goToWeekOffset(offset) {
  collectAndSave();
  state.weekOffset = offset;
  validateSelectedDay();
  renderHeader();
  renderWeekNav();
  renderSession();
  closeWeekPicker();
}

function validateSelectedDay() {
  const days = getEffectiveDays();
  if (!days.includes(state.selectedDay)) {
    state.selectedDay = days[0] || DAYS[0];
  }
}

function toggleWeekPicker() {
  const overlay = document.getElementById('weekPickerOverlay');
  if (overlay.classList.contains('open')) {
    closeWeekPicker();
    return;
  }
  const months = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
  const list = document.getElementById('weekPickerList');
  let html = '';
  for (let i = -8; i <= 4; i++) {
    const dates = getWeekDates(i);
    const mon = dates[0];
    const sun = dates[6];
    const wn = getISOWeekNumber(mon);
    const isCurrent = i === state.weekOffset;
    const isThisWeek = i === 0;
    const classes = `week-picker-item${isCurrent ? ' selected' : ''}${isThisWeek && !isCurrent ? ' this-week' : ''}`;
    const range = `${mon.getDate()}. ${months[mon.getMonth()]} – ${sun.getDate()}. ${months[sun.getMonth()]}`;
    html += `<div class="${classes}" onclick="goToWeekOffset(${i})">
      <span class="week-kw">KW ${wn}</span>
      <span class="week-range">${range}</span>
    </div>`;
  }
  list.innerHTML = html;

  overlay.classList.add('open');

  const selected = list.querySelector('.selected');
  if (selected) {
    setTimeout(() => selected.scrollIntoView({ block: 'center', behavior: 'instant' }), 50);
  }
}

function closeWeekPicker() {
  document.getElementById('weekPickerOverlay').classList.remove('open');
}

function getWeekKey(offset) {
  const dates = getWeekDates(offset);
  return getDateKey(dates[0]);
}

function getWeekOverride() {
  const key = `weekOverride:${getWeekKey(state.weekOffset)}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
}

function saveWeekOverride(dayOrder) {
  const weekKey = getWeekKey(state.weekOffset);
  const key = `weekOverride:${weekKey}`;
  localStorage.setItem(key, JSON.stringify(dayOrder));
  syncWeekOverrideToSupabase(weekKey, dayOrder);
}

function removeWeekOverride() {
  const weekKey = getWeekKey(state.weekOffset);
  const key = `weekOverride:${weekKey}`;
  localStorage.removeItem(key);
  deleteWeekOverrideFromSupabase(weekKey);
}

async function syncWeekOverrideToSupabase(weekKey, dayOrder) {
  try {
    await supabaseClient
      .from('week_overrides')
      .upsert({ week_key: weekKey, data: dayOrder }, { onConflict: 'week_key' });
  } catch (e) {
    console.error('Week override sync error:', e);
  }
}

async function deleteWeekOverrideFromSupabase(weekKey) {
  try {
    await supabaseClient
      .from('week_overrides')
      .delete()
      .eq('week_key', weekKey);
  } catch (e) {
    console.error('Week override delete error:', e);
  }
}

function getEffectiveDays() {
  const override = getWeekOverride();
  return override || [...DAYS];
}

function openWeekEditor() {
  const overlay = document.getElementById('weekEditorOverlay');
  overlay.classList.add('open');
  renderWeekEditorList();
}

function closeWeekEditor() {
  document.getElementById('weekEditorOverlay').classList.remove('open');
  renderWeekNav();
  renderSession();
}

function resetWeekOverride() {
  removeWeekOverride();
  renderWeekEditorList();
}

function renderWeekEditorList() {
  const list = document.getElementById('weekEditorList');
  const days = getEffectiveDays();
  list.innerHTML = '';

  const group = document.createElement('div');
  group.className = 'we-ios-group';

  days.forEach((dayKey, idx) => {
    const plan = WEEK_PLAN[dayKey];
    const slotDay = DAYS[idx] || DAYS[DAYS.length - 1];

    const row = document.createElement('div');
    row.className = 'we-ios-row';
    row.dataset.day = dayKey;
    row.dataset.idx = idx;

    row.innerHTML = `
      <span class="we-ios-day">${DAY_LABELS[slotDay]}</span>
      <span class="session-badge badge-${plan.type}">${DAY_TYPE_LABELS[plan.type] || plan.type}</span>
      <span class="we-ios-title">${plan.name}</span>
      <span class="we-ios-grip drag-handle"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="16" x2="20" y2="16"/></svg></span>
    `;
    group.appendChild(row);
  });

  list.appendChild(group);
  if (!list._dragInitialized) {
    initWeekEditorDrag(list);
    list._dragInitialized = true;
  }
}

function deleteWeekDay(dayKey) {
  let days = getEffectiveDays();
  days = days.filter(d => d !== dayKey);
  saveWeekOverride(days);
  renderWeekEditorList();
  renderWeekNav();
  if (state.selectedDay === dayKey) {
    state.selectedDay = days[0] || DAYS[0];
  }
  renderSession();
}

function initWeekEditorDrag(list) {
  let origIdx = -1;
  let targetIdx = -1;
  let startY = 0;
  let rowHeight = 0;
  let rows = [];
  let dragRow = null;

  function getGroup() {
    return list.querySelector('.we-ios-group');
  }

  function startDrag(row, clientY) {
    const group = getGroup();
    if (!group) return;
    rows = Array.from(group.querySelectorAll('.we-ios-row'));
    origIdx = rows.indexOf(row);
    if (origIdx < 0) return;
    targetIdx = origIdx;
    dragRow = row;
    startY = clientY;
    rowHeight = row.getBoundingClientRect().height;

    row.classList.add('we-ios-dragging');
    rows.forEach((r, i) => {
      if (i !== origIdx) r.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
  }

  function moveDrag(clientY) {
    if (origIdx < 0) return;
    const dy = clientY - startY;
    dragRow.style.transform = `translateY(${dy}px) scale(1.03)`;

    const rawTarget = origIdx + Math.round(dy / rowHeight);
    const newTarget = Math.max(0, Math.min(rows.length - 1, rawTarget));

    if (newTarget !== targetIdx) {
      targetIdx = newTarget;
      rows.forEach((row, i) => {
        if (i === origIdx) return;
        if (i >= targetIdx && i < origIdx) {
          row.style.transform = `translateY(${rowHeight}px)`;
        } else if (i <= targetIdx && i > origIdx) {
          row.style.transform = `translateY(${-rowHeight}px)`;
        } else {
          row.style.transform = '';
        }
      });
    }
  }

  function endDrag() {
    if (origIdx < 0 || !dragRow) return;
    const group = getGroup();

    // Reset all transforms
    rows.forEach(row => {
      row.style.transform = '';
      row.style.transition = '';
      row.classList.remove('we-ios-dragging');
    });

    // Apply the reorder in DOM
    if (targetIdx !== origIdx && group) {
      const removed = rows.splice(origIdx, 1)[0];
      rows.splice(targetIdx, 0, removed);
      group.innerHTML = '';
      rows.forEach(row => group.appendChild(row));
    }

    dragRow = null;
    origIdx = -1;
    targetIdx = -1;

    const finalRows = Array.from(getGroup().querySelectorAll('.we-ios-row'));
    const newOrder = finalRows.map(r => r.dataset.day);
    saveWeekOverride(newOrder);

    finalRows.forEach((row, i) => {
      const dayLabel = row.querySelector('.we-ios-day');
      if (dayLabel) dayLabel.textContent = DAY_LABELS[DAYS[i]] || '';
    });
  }

  // Mouse
  list.addEventListener('mousedown', function(e) {
    const grip = e.target.closest('.drag-handle');
    if (!grip) return;
    const row = grip.closest('.we-ios-row');
    if (!row) return;
    e.preventDefault();
    startDrag(row, e.clientY);

    function onMove(ev) { moveDrag(ev.clientY); }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      endDrag();
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  // Touch
  list.addEventListener('touchstart', function(e) {
    const grip = e.target.closest('.drag-handle');
    if (!grip) return;
    const row = grip.closest('.we-ios-row');
    if (!row) return;
    e.preventDefault();
    startDrag(row, e.touches[0].clientY);

    function onMove(ev) {
      ev.preventDefault();
      moveDrag(ev.touches[0].clientY);
    }
    function onEnd() {
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      document.removeEventListener('touchcancel', onEnd);
      endDrag();
    }
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
    document.addEventListener('touchcancel', onEnd);
  }, { passive: false });
}

function renderWeekNav() {
  const dates = getWeekDates();
  const today = new Date();
  const todayKey = getDateKey(today);
  const effectiveDays = getEffectiveDays();

  const nav = document.getElementById('weekNav');
  nav.innerHTML = '';

  for (let i = 0; i < effectiveDays.length; i++) {
    const dayKey = effectiveDays[i];
    const date = dates[i];
    const dateKey = getDateKey(date);
    const plan = WEEK_PLAN[dayKey];
    const isSelected = dayKey === state.selectedDay;
    const wo = loadWorkout(dateKey);
    const isDone = wo && wo.completed;
    const isPast = dateKey < todayKey;
    const isFuture = dateKey > todayKey;
    const isToday = dateKey === todayKey;

    const btn = document.createElement('button');
    const classes = ['day-btn'];
    if (isSelected) classes.push('active');
    if (isDone) classes.push('done');
    if (isFuture) classes.push('future');
    if (isToday) classes.push('is-today');
    btn.className = classes.join(' ');
    btn.dataset.day = dayKey;
    btn.dataset.date = dateKey;

    let statusIcon = '';
    if (isDone) {
      statusIcon = '✓';
    } else if (isPast || isToday) {
      statusIcon = '×';
    }

    let typeLabel = plan.type === 'gym' ? 'Gym' : plan.type === 'run' || plan.type === 'long' ? 'Lauf' : plan.type;
    if (typeLabel === 'rest') typeLabel = 'Ruhe';

    const dayNumber = String(date.getDate()).padStart(2, '0');
    const positionDayKey = DAYS[i] || dayKey;

    btn.innerHTML = `
      <div class="day-label">${DAY_LABELS[positionDayKey]}</div>
      <div class="day-date">${dayNumber}</div>
      <div class="day-type">${typeLabel}</div>
      <div class="day-status">${statusIcon}</div>
    `;
    btn.addEventListener('click', () => selectDay(dayKey));
    nav.appendChild(btn);
  }
}

function selectDay(dayKey) {
  collectAndSave();
  state.dirty = false;
  state.selectedDay = dayKey;
  renderWeekNav();
  renderSession();
}

function renderSession() {
  const dates = getWeekDates();
  const effectiveDays = getEffectiveDays();
  const posIdx = effectiveDays.indexOf(state.selectedDay);
  const date = dates[posIdx >= 0 ? posIdx : 0];
  const dateKey = getDateKey(date);
  const plan = WEEK_PLAN[state.selectedDay];

  state.todayData = loadWorkout(dateKey) || { date: dateKey, type: plan.type };
  
  const container = document.getElementById('sessionContent');
  
  // Session header — standalone for non-gym types, embedded in card for gym
  const badge = `<span class="session-badge badge-${plan.type}">${DAY_TYPE_LABELS[plan.type]}</span>`;

  let sessionHeaderHtml;
  if (plan.type === 'gym') {
    sessionHeaderHtml = `
      <div class="session-header">
        <div>
          <div class="session-title-gym">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 7v10"/><path d="M18 7v10"/><path d="M3 9v6"/><path d="M21 9v6"/><path d="M6 12h12"/>
            </svg>
            ${plan.name}
          </div>
          <div class="session-subtitle">${plan.subtitle}</div>
        </div>
        ${badge}
      </div>
    `;
  } else if (plan.type === 'run' || plan.type === 'long') {
    sessionHeaderHtml = `
      <div class="session-header">
        <div>
          <div class="session-title-gym">
            <svg viewBox="0 0 1280 1002" fill="currentColor" stroke="none">
              <g transform="translate(0,1002) scale(0.1,-0.1)"><path d="M4765 10014c-22-2-80-11-130-20-496-88-933-478-1239-1109-65-133-82-190-130-435-70-351-99-722-85-1070 9-200 12-222 69-575 51-315 60-374 61-432 1-26 6-1 10 57 16 198 41 302 162 680 36 113 84 264 107 335 155 496 415 991 636 1211 260 259 505 345 764 270 207-60 373-164 665-415 55-48 116-99 135-115 19-16 99-87 177-158 198-181 302-260 418-318 125-63 189-79 341-87 234-12 329 37 427 218 60 109 81 189 81 314 0 130-17 190-98 356-192 386-534 697-1077 978-256 133-547 237-779 281-36 6-87 16-115 21-54 11-336 20-400 13z"/><path d="M8925 9614c-102-20-140-30-205-51-284-95-514-289-644-543-97-191-130-350-114-542 29-343 246-681 539-842 185-101 364-148 569-148 203 0 359 36 528 121 290 147 476 382 574 729 29 104 32 313 4 417-39 150-95 271-189 408-155 227-451 404-747 447-63 9-275 12-315 4z"/><path d="M12700 7683c-18-95-47-168-143-361-128-254-265-475-419-669-237-301-787-753-1129-928-147-75-207-95-290-95-164 0-334 100-499 295-99 116-147 217-290 605-131 356-247 549-395 658-81 59-122 80-213 103-67 17-85 18-140 8-81-15-158-65-240-155-152-167-219-372-209-634 6-146 19-217 68-374 171-546 518-1004 1009-1333 95-64 140-86 234-118 221-74 509-75 746-1 334 103 761 377 1065 681 273 273 455 545 649 967 184 401 248 597 292 897 3 24 0 151-7 282l-13 239-32 0c-31 0-32-1-44-67z"/><path d="M4205 5883c-138-16-280-77-351-149-50-52-116-179-140-269-57-217-5-491 130-678 54-77 136-160 305-311 131-117 132-118 114-139-225-264-861-924-1439-1493-741-731-1057-1051-1663-1687-156-164-419-427-585-584-276-262-579-564-572-570 1-2 38 6 82 18 149 39 670 336 1744 994 434 266 540 329 1470 875 744 437 872 515 1160 704 273 180 390 265 515 375 119 103 163 137 400 306 99 71 204 148 234 172l53 43 112-58c138-73 258-150 358-231 115-92 125-107 133-195 7-69 5-77-21-122-44-77-216-241-330-317-56-37-236-137-400-221-165-84-445-231-624-326-511-270-984-498-1295-622-167-67-390-187-375-201 3-3 55-9 115-14 117-9 328-2 528 16 67 6 174 16 237 22 330 29 556 70 845 150 226 63 261 73 550 149 556 148 852 248 1130 385 436 214 806 562 961 902 55 120 64 152 64 233 0 101-30 214-89 335-63 130-109 196-260 385-276 343-520 595-836 863-71 61-173 150-225 198-289 266-789 630-1045 761-114 58-538 233-635 262-60 19-247 46-295 44-16 0-43-3-60-5z"/></g>
            </svg>
            ${plan.name}
          </div>
          <div class="session-subtitle">${plan.subtitle}</div>
          <div style="margin-top:8px;">${badge}</div>
        </div>
      </div>
    `;
  } else {
    sessionHeaderHtml = `
      <div class="session-header">
        <div>
          <div class="session-title">${plan.name}</div>
          <div class="session-subtitle">${plan.subtitle}</div>
        </div>
        ${badge}
      </div>
    `;
  }
  let html = (plan.type === 'gym' || plan.type === 'run' || plan.type === 'long' || plan.type === 'rest') ? '' : sessionHeaderHtml;

  if (plan.type === 'rest') {
    html += `
      <div class="rest-message">
        <h2>Ruhetag</h2>
        <p>Pause ist Training. Spaziergang, Stretching, Mobility – aber kein Laufen, kein Krafttraining. Der Körper macht heute die Anpassung an die Belastung der Woche.</p>
      </div>
    `;
  } else if (plan.type === 'gym') {
    html += `
      <div class="gym-session-card">
        ${sessionHeaderHtml}
        <div class="exercises">
    `;
    const prevWeekWorkout = loadPreviousWeekWorkout(state.selectedDay);
    plan.exercises.forEach((ex, idx) => {
      const exData = (state.todayData.exercises && state.todayData.exercises[ex.id]) || { sets: [] };
      const prevExData = (prevWeekWorkout && prevWeekWorkout.exercises && prevWeekWorkout.exercises[ex.id]) || { sets: [] };
      const isTimeBased = ex.target.includes('sec');
      const notDone = !state.todayData.completed;
      const doneCount = (exData.sets || []).filter((s, i) => {
        if (!s) return false;
        const prev = (prevExData.sets && prevExData.sets[i]) || {};
        if (isTimeBased) {
          if (notDone && s.duration && prev.duration && String(s.duration) === String(prev.duration)) return false;
          return !!s.duration;
        } else {
          const wStale = notDone && s.weight && prev.weight && String(s.weight) === String(prev.weight);
          const rStale = notDone && s.reps && prev.reps && String(s.reps) === String(prev.reps);
          return (!wStale && s.weight) || (!rStale && s.reps);
        }
      }).length;
      html += `
        <div class="exercise-card" data-ex="${ex.id}">
          <div class="exercise-header" onclick="toggleExercise(this)">
            <div class="exercise-number">${String(idx + 1).padStart(2, '0')}</div>
            <div class="exercise-icon">${exerciseImageHTML(ex.id, ex.name)}</div>
            <div class="exercise-info">
              <div class="exercise-name">${ex.name}</div>
              <div class="exercise-target">${ex.target}</div>
            </div>
            <div class="exercise-status ${doneCount === ex.sets ? 'done' : ''}">${doneCount}/${ex.sets}</div>
          </div>
          <div class="exercise-body">
            <div class="exercise-detail">${ex.detail}</div>
            ${(() => {
              const isTimeBased = ex.target.includes('sec');
              let html = '';
              const notCompleted = !state.todayData.completed;
              if (isTimeBased) {
                html += '<div class="sets-grid header"><div>Satz</div><div colspan="2">Dauer (Sekunden)</div></div>';
                for (let i = 0; i < ex.sets; i++) {
                  const set = (exData.sets && exData.sets[i]) || {};
                  const prevSet = (prevExData.sets && prevExData.sets[i]) || {};
                  const isStale = notCompleted && set.duration && prevSet.duration && String(set.duration) === String(prevSet.duration);
                  const value = isStale ? '' : (set.duration || '');
                  const placeholder = prevSet.duration ? prevSet.duration : '—';
                  const className = (!value && prevSet.duration) ? 'prefilled' : '';
                  html += `<div class="sets-grid"><div class="set-num">${i + 1}</div><input type="number" placeholder="${placeholder}" inputmode="numeric" data-ex="${ex.id}" data-set="${i}" data-field="duration" value="${value}" class="${className}" style="grid-column: span 2;" /></div>`;
                }
              } else {
                html += '<div class="sets-grid header"><div>Satz</div><div>Gewicht (kg)</div><div>Wiederholungen</div></div>';
                for (let i = 0; i < ex.sets; i++) {
                  const set = (exData.sets && exData.sets[i]) || {};
                  const prevSet = (prevExData.sets && prevExData.sets[i]) || {};
                  const weightStale = notCompleted && set.weight && prevSet.weight && String(set.weight) === String(prevSet.weight);
                  const repsStale = notCompleted && set.reps && prevSet.reps && String(set.reps) === String(prevSet.reps);
                  const weightValue = weightStale ? '' : (set.weight || '');
                  const repsValue = repsStale ? '' : (set.reps || '');
                  const weightPlaceholder = prevSet.weight ? prevSet.weight : '—';
                  const repsPlaceholder = prevSet.reps ? prevSet.reps : '—';
                  const weightClassName = (!weightValue && prevSet.weight) ? 'prefilled' : '';
                  const repsClassName = (!repsValue && prevSet.reps) ? 'prefilled' : '';
                  html += `<div class="sets-grid"><div class="set-num">${i + 1}</div><input type="number" step="0.5" placeholder="${weightPlaceholder}" inputmode="decimal" data-ex="${ex.id}" data-set="${i}" data-field="weight" value="${weightValue}" class="${weightClassName}" /><input type="number" placeholder="${repsPlaceholder}" inputmode="numeric" data-ex="${ex.id}" data-set="${i}" data-field="reps" value="${repsValue}" class="${repsClassName}" /></div>`;
                }
              }
              return html;
            })()}
            ${renderExerciseSparkline(ex.id)}
          </div>
        </div>
      `;
    });

    // Notes and delete button (inside the gym-session-card)
    html += `
      <div style="padding: 16px;">
        <label style="font-size:13px;color:var(--text-mute);font-weight:500;display:block;margin-bottom:8px;">Notizen zur Einheit</label>
        <textarea id="sessionNotes" placeholder="Wie war's? Energie, Form, was aufgefallen ist...">${state.todayData.notes || ''}</textarea>
        <div style="margin-top:12px;display:flex;justify-content:center;">
          <button class="secondary" onclick="deleteCurrentWorkout()" style="color:#FF3B30;">🗑 Diesen Eintrag löschen</button>
        </div>
      </div>
    `;
    html += '</div></div>'; // close .exercises + .gym-session-card
  } else if (plan.type === 'run' || plan.type === 'long') {
    const r = state.todayData.run || {};
    const prevWeekWorkout = loadPreviousWeekWorkout(state.selectedDay);
    const prevRun = (prevWeekWorkout && prevWeekWorkout.run) || {};

    const notCompletedRun = !state.todayData.completed;
    const getRunValue = (field) => {
      const val = r[field] || '';
      if (notCompletedRun && val && prevRun[field] && String(val) === String(prevRun[field])) return '';
      return val;
    };
    const getRunPlaceholder = (field, fallback) => prevRun[field] ? prevRun[field] : fallback;
    const isRunPrefilled = (field) => !getRunValue(field) && prevRun[field];

    html += `
      <div class="gym-session-card">
        ${sessionHeaderHtml}
      <div class="run-form" style="padding: 0 16px 16px;">
        <div class="run-field">
          <label>Distanz</label>
          <input type="number" step="0.01" placeholder="${getRunPlaceholder('distance', plan.targetDistance)}" inputmode="decimal" data-run="distance" value="${getRunValue('distance')}" class="${isRunPrefilled('distance') ? 'prefilled' : ''}" />
        </div>
        <div class="run-field">
          <label>Gesamtzeit (mm:ss)</label>
          <input type="text" placeholder="${getRunPlaceholder('time', 'z.B. 42:30')}" data-run="time" value="${getRunValue('time')}" class="${isRunPrefilled('time') ? 'prefilled' : ''}" />
        </div>
        <div class="run-field">
          <label>Pace (berechnet)</label>
          <div class="computed" id="computedPace">—</div>
        </div>
        <div class="run-field">
          <label>Ø Puls (Herzschläge/min)</label>
          <input type="number" placeholder="${getRunPlaceholder('hr', 'Ziel: ' + plan.targetHR)}" inputmode="numeric" data-run="hr" value="${getRunValue('hr')}" class="${isRunPrefilled('hr') ? 'prefilled' : ''}" />
        </div>
        <div class="run-field">
          <label>Kalorien (kcal)</label>
          <input type="number" placeholder="${getRunPlaceholder('kcal', 'kcal')}" inputmode="numeric" data-run="kcal" value="${getRunValue('kcal')}" class="${isRunPrefilled('kcal') ? 'prefilled' : ''}" />
        </div>
        <div class="run-field">
          <label>Ø Kadenz (Schritte/min)</label>
          <input type="number" placeholder="${getRunPlaceholder('cadence', 'Schritte/min')}" inputmode="numeric" data-run="cadence" value="${getRunValue('cadence')}" class="${isRunPrefilled('cadence') ? 'prefilled' : ''}" />
        </div>
        <div class="run-field run-field-full">
          <label>Schmerz-Level (0 = nichts, 10 = abbrechen)</label>
          <div class="pain-scale">
            ${(() => {
              const painVal = r.pain;
              const prevPainVal = prevRun.pain;
              const painStale = notCompletedRun && typeof painVal === 'number' && typeof prevPainVal === 'number' && painVal === prevPainVal;
              const activePain = painStale ? -1 : painVal;
              return Array.from({length: 11}, (_, i) => '<button class="pain-btn pain-' + i + (activePain === i ? ' active' : '') + '" data-pain="' + i + '">' + i + '</button>').join('');
            })()}
          </div>
        </div>
        <div class="run-field run-field-full">
          <label>Wo / Was hat geschmerzt</label>
          <input type="text" placeholder="${prevRun.painLocation ? prevRun.painLocation : 'z.B. linkes Knie außen, ab km 5'}" data-run="painLocation" value="${(() => { const v = r.painLocation || ''; return (notCompletedRun && v && prevRun.painLocation && v === prevRun.painLocation) ? '' : v; })()}" class="${(() => { const v = r.painLocation || ''; return (notCompletedRun && (!v || (prevRun.painLocation && v === prevRun.painLocation)) && prevRun.painLocation) ? 'prefilled' : ''; })()}" />
        </div>
        <div class="run-field run-field-full">
          <label>Notizen zum Lauf</label>
          <textarea id="sessionNotes" placeholder="Wetter, Untergrund, Gefühl, Beobachtungen...">${state.todayData.notes || ''}</textarea>
        </div>
        <div style="margin-top:12px;display:flex;justify-content:center;">
          <button class="secondary" onclick="deleteCurrentWorkout()" style="color:#FF3B30;">🗑 Diesen Lauf löschen</button>
        </div>
      </div>
      </div>
    `;
  }

  // Save bar
  if (plan.type === 'gym') {
    const isCompleted = state.todayData.completed;
    html += `
      <div class="save-bar gym-bar" style="justify-content:center;align-items:center;gap:10px;">
        ${!isCompleted ? `
        <div class="stopwatch" style="flex:1;min-width:0;">
          <button class="stopwatch-btn" id="stopwatchToggle" onclick="toggleStopwatch()" title="Start/Pause">▶</button>
          <div class="stopwatch-display" id="stopwatchDisplay">0:00</div>
          <button class="stopwatch-btn" onclick="resetStopwatch()" title="Reset">↺</button>
          <div class="stopwatch-presets">
            <button class="preset-btn" onclick="toggleCountdownPicker(event)">1:00</button>
            <div class="countdown-picker" id="countdownPicker">
              <button onclick="pickCountdown(30)">0:30</button>
              <button onclick="pickCountdown(60)">1:00</button>
              <button onclick="pickCountdown(90)">1:30</button>
              <button onclick="pickCountdown(120)">2:00</button>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button class="secondary icon-only" onclick="markIncomplete()" title="Zurücksetzen">↺</button>
          <button class="primary icon-only" onclick="markComplete()" title="Einheit abschließen">✓</button>
        </div>
        ` : `
        <div style="display:flex;gap:8px;">
          <button class="secondary" onclick="markIncomplete()"><span style="font-size:18px;line-height:1;">↺</span> Zurücksetzen</button>
          <button class="primary" onclick="markComplete()"><span style="font-size:20px;line-height:1;">✓</span> Einheit abschließen</button>
        </div>
        `}
        <div class="save-status" id="saveStatus" style="display:none;">Auto-Save aktiv</div>
      </div>
    `;
  } else {
    html += `
      <div class="save-bar">
        <div class="save-status" id="saveStatus">Auto-Save aktiv</div>
        <div style="display:flex;gap:8px;">
          <button class="secondary" onclick="markIncomplete()"><span style="font-size:18px;line-height:1;">↺</span> Zurücksetzen</button>
          <button class="primary" onclick="markComplete()"><span style="font-size:20px;line-height:1;">✓</span> Einheit abschließen</button>
        </div>
      </div>
    `;
  }
  
  container.innerHTML = html;
  
  // Bind events
  bindInputs();
  if (plan.type === 'run' || plan.type === 'long') updatePace();
  if (plan.type === 'gym' && plan.exercises.length > 0) {
    // All exercises start collapsed
  }
}

function toggleExercise(headerEl) {
  const card = headerEl.parentElement;
  card.classList.toggle('expanded');
}

function checkAutoCollapseExercise(card) {
  if (!card.classList.contains('expanded')) return;
  const inputs = card.querySelectorAll('.exercise-body input[type="number"], .exercise-body input[type="text"]');
  if (inputs.length === 0) return;
  const allFilled = Array.from(inputs).every(inp => inp.value.trim() !== '');
  if (allFilled) {
    card.classList.remove('expanded');
  }
}

function bindInputs() {
  document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', onInputChange);
    el.addEventListener('blur', collectAndSave);
  });
  document.querySelectorAll('.pain-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pain-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onInputChange();
      collectAndSave();
    });
  });
}

function updateExerciseCounters() {
  const plan = WEEK_PLAN[state.selectedDay];
  if (!plan || plan.type !== 'gym') return;

  document.querySelectorAll('.exercise-card').forEach(card => {
    const exId = card.dataset.ex;
    const ex = plan.exercises.find(e => e.id === exId);
    if (!ex) return;
    const isTimeBased = ex.target.includes('sec');
    const inputs = card.querySelectorAll('.exercise-body input[type="number"]');
    let done = 0;

    if (isTimeBased) {
      for (let i = 0; i < ex.sets; i++) {
        const inp = card.querySelector(`[data-set="${i}"][data-field="duration"]`);
        if (inp && inp.value.trim()) done++;
      }
    } else {
      for (let i = 0; i < ex.sets; i++) {
        const w = card.querySelector(`[data-set="${i}"][data-field="weight"]`);
        const r = card.querySelector(`[data-set="${i}"][data-field="reps"]`);
        if ((w && w.value.trim()) || (r && r.value.trim())) done++;
      }
    }

    const statusEl = card.querySelector('.exercise-status');
    if (statusEl) {
      statusEl.textContent = `${done}/${ex.sets}`;
      if (done === ex.sets) {
        statusEl.classList.add('done');
      } else {
        statusEl.classList.remove('done');
      }
    }
  });
}

function onInputChange() {
  state.dirty = true;
  updatePace();
  updateExerciseCounters();
  if (state.saveTimer) clearTimeout(state.saveTimer);
  const status = document.getElementById('saveStatus');
  if (status) {
    status.textContent = 'Wird gespeichert...';
    status.classList.remove('saved');
  }
  state.saveTimer = setTimeout(collectAndSave, 800);
}

function parseTime(str) {
  if (!str) return null;
  const parts = str.split(':').map(p => parseInt(p, 10));
  if (parts.some(isNaN)) return null;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return null;
}

function formatPace(secPerKm) {
  if (!secPerKm || !isFinite(secPerKm)) return '—';
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return `${m}:${String(s).padStart(2, '0')} /km`;
}

function updatePace() {
  const distInput = document.querySelector('[data-run="distance"]');
  const timeInput = document.querySelector('[data-run="time"]');
  const pacePanel = document.getElementById('computedPace');
  if (!distInput || !timeInput || !pacePanel) return;
  
  const dist = parseFloat(distInput.value);
  const time = parseTime(timeInput.value);
  if (dist && time) {
    pacePanel.textContent = formatPace(time / dist);
  } else {
    pacePanel.textContent = '—';
  }
}

function collectAndSave() {
  if (!state.todayData || state.readOnly || !state.dirty) return;
  const plan = WEEK_PLAN[state.selectedDay];
  if (!plan) return;

  if (plan.type === 'gym') {
    const exercises = {};
    plan.exercises.forEach(ex => {
      exercises[ex.id] = { sets: [] };
      const isTimeBased = ex.target.includes('sec');
      for (let i = 0; i < ex.sets; i++) {
        if (isTimeBased) {
          const d = document.querySelector(`[data-ex="${ex.id}"][data-set="${i}"][data-field="duration"]`);
          exercises[ex.id].sets.push({
            duration: d ? d.value : ''
          });
        } else {
          const w = document.querySelector(`[data-ex="${ex.id}"][data-set="${i}"][data-field="weight"]`);
          const r = document.querySelector(`[data-ex="${ex.id}"][data-set="${i}"][data-field="reps"]`);
          exercises[ex.id].sets.push({
            weight: w ? w.value : '',
            reps: r ? r.value : ''
          });
        }
      }
    });
    state.todayData.exercises = exercises;
  } else if (plan.type === 'run' || plan.type === 'long') {
    const run = {};
    document.querySelectorAll('[data-run]').forEach(el => {
      run[el.dataset.run] = el.value;
    });
    const painActive = document.querySelector('.pain-btn.active');
    if (painActive) run.pain = parseInt(painActive.dataset.pain, 10);
    state.todayData.run = run;
  }

  const notes = document.getElementById('sessionNotes');
  if (notes) state.todayData.notes = notes.value;

  const ok = saveWorkout(state.todayData.date, state.todayData);
  if (ok) state.dirty = false;
  const status = document.getElementById('saveStatus');
  if (status) {
    if (ok) {
      const time = new Date().toLocaleTimeString('de-DE', {hour:'2-digit',minute:'2-digit'});
      status.textContent = '✓ Lokal gespeichert · ' + time;
      status.classList.add('saved');
      // Update status in 2s to show sync progress
      setTimeout(() => {
        if (state.syncStatus === 'synced') {
          status.textContent = '☁ Mit Supabase synchronisiert';
        } else if (state.syncStatus === 'syncing') {
          status.textContent = '⟳ Synchronisiere...';
          status.classList.remove('saved');
        }
      }, 2000);
    } else {
      status.textContent = '⚠ Speichern fehlgeschlagen';
    }
  }
  renderWeekNav();
  renderStats();
  renderHistory();

  if (plan.type === 'gym') {
    document.querySelectorAll('.exercise-card.expanded').forEach(checkAutoCollapseExercise);
  }
}

function markComplete() {
  if (state.readOnly) return;
  state.dirty = true;
  collectAndSave();
  if (state.todayData) {
    state.todayData.completed = true;
    state.todayData.completedAt = new Date().toISOString();
    saveWorkout(state.todayData.date, state.todayData);
    renderWeekNav();
    renderStats();
    renderHistory();
    renderDashboard();
    const status = document.getElementById('saveStatus');
    if (status) {
      status.textContent = '✓ Einheit abgeschlossen';
      status.classList.add('saved');
    }
    // Collapse all exercises
    const exerciseCards = document.querySelectorAll('.exercise-card');
    exerciseCards.forEach(card => card.classList.remove('expanded'));
  }
}

function markIncomplete() {
  if (state.readOnly) return;
  if (!confirm('Einheit zurücksetzen – Eingaben behalten, nur Häkchen entfernen?')) return;
  if (state.todayData) {
    state.todayData.completed = false;
    delete state.todayData.completedAt;
    saveWorkout(state.todayData.date, state.todayData);
    renderWeekNav();
    renderStats();
    renderHistory();
    renderDashboard();
  }
}

function renderStats() {
  const workouts = loadAllWorkouts();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 42);
  const cutoffKey = getDateKey(cutoff);
  const recent = workouts.filter(w => w.date >= cutoffKey);

  let totalRuns = 0, totalKm = 0, totalGym = 0, totalRest = 0, longRuns = 0;
  let totalPainSum = 0, painCount = 0;

  recent.forEach(w => {
    const d = w.data;
    if (!d.completed) return;
    if (d.type === 'run' || d.type === 'long') {
      totalRuns++;
      if (d.type === 'long') longRuns++;
      const dist = parseFloat(d.run?.distance);
      if (!isNaN(dist)) totalKm += dist;
      if (typeof d.run?.pain === 'number') {
        totalPainSum += d.run.pain;
        painCount++;
      }
    } else if (d.type === 'gym') {
      totalGym++;
    } else if (d.type === 'rest') {
      totalRest++;
    }
  });

  const avgPain = painCount > 0 ? (totalPainSum / painCount).toFixed(1) : '—';

  // Calculate weight loss and progress
  const allMetrics = loadAllBodyMetrics();
  let weightLoss = '—';
  let weightLossCard = '';

  if (allMetrics.length >= 2) {
    const firstWeight = parseFloat(allMetrics[0].data.weight);
    const currentWeight = parseFloat(allMetrics[allMetrics.length - 1].data.weight);
    const targets = loadBodyTargets();
    const targetWeight = targets.weight ? parseFloat(targets.weight) : null;

    if (!isNaN(firstWeight) && !isNaN(currentWeight)) {
      weightLoss = (firstWeight - currentWeight).toFixed(1);

      // Calculate progress if target exists
      if (targetWeight && !isNaN(targetWeight) && targetWeight < firstWeight) {
        const totalGoal = firstWeight - targetWeight;
        const achieved = firstWeight - currentWeight;
        const progress = Math.min(Math.max((achieved / totalGoal) * 100, 0), 100);
        const remaining = Math.max(currentWeight - targetWeight, 0).toFixed(1);

        // SVG wedge segments progress bar - mathematisch exakte Version
        const totalSegments = 10;
        const activeSegments = Math.round((progress / 100) * totalSegments);
        const gapAngle = 4;
        const innerRadius = 55;
        const outerRadius = 88;
        const cornerRounding = 4.5;
        const cx = 100;
        const cy = 100;

        const totalGapAngle = gapAngle * (totalSegments - 1);
        const segmentAngle = (180 - totalGapAngle) / totalSegments;

        // Vollständig abgerundete Enden mit perfekten Halbkreisen
        function createFullyRoundedWedgePath(cx, cy, Ro, Ri, startDeg, endDeg) {
          const t1 = startDeg * Math.PI / 180;
          const t2 = endDeg * Math.PI / 180;
          const alpha = ((endDeg - startDeg) * Math.PI / 180) / 2;

          const sinAlpha = Math.sin(alpha);
          const cosAlpha = Math.cos(alpha);

          const dOut = Ro / (1 + sinAlpha);
          const rOut = dOut * sinAlpha;
          const rOutLine = dOut * cosAlpha;

          const dIn = Ri / (1 - sinAlpha);
          const rIn = dIn * sinAlpha;
          const rInLine = dIn * cosAlpha;

          const p_bl = { x: cx + rInLine * Math.cos(t1), y: cy + rInLine * Math.sin(t1) };
          const p_tl = { x: cx + rOutLine * Math.cos(t1), y: cy + rOutLine * Math.sin(t1) };
          const p_tr = { x: cx + rOutLine * Math.cos(t2), y: cy + rOutLine * Math.sin(t2) };
          const p_br = { x: cx + rInLine * Math.cos(t2), y: cy + rInLine * Math.sin(t2) };

          return 'M ' + p_bl.x + ' ' + p_bl.y +
                 ' L ' + p_tl.x + ' ' + p_tl.y +
                 ' A ' + rOut + ' ' + rOut + ' 0 0 1 ' + p_tr.x + ' ' + p_tr.y +
                 ' L ' + p_br.x + ' ' + p_br.y +
                 ' A ' + rIn + ' ' + rIn + ' 0 0 1 ' + p_bl.x + ' ' + p_bl.y +
                 ' Z';
        }

        const gradientId = 'weightGradient_' + Date.now();
        let segmentsSvg = '<defs>' +
          '<linearGradient id="' + gradientId + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
            '<stop offset="0%" stop-color="#34C759" stop-opacity="1"/>' +
            '<stop offset="100%" stop-color="#34C759" stop-opacity="0.6"/>' +
          '</linearGradient>' +
        '</defs>';

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const emptySegmentColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)';

        for (let i = 0; i < totalSegments; i++) {
          const startAngle = 180 + (i * (segmentAngle + gapAngle));
          const endAngle = startAngle + segmentAngle;
          const color = i < activeSegments ? 'url(#' + gradientId + ')' : emptySegmentColor;
          const pathD = createFullyRoundedWedgePath(cx, cy, outerRadius, innerRadius, startAngle, endAngle);

          segmentsSvg += '<path d="' + pathD + '" fill="' + color + '"/>';
        }

        weightLossCard = '<div class="stat-card">' +
          '<div class="stat-label">Gewichtsverlust</div>' +
          '<div style="display:flex;flex-direction:column;flex:1;gap:8px;">' +
            '<div style="position:relative;flex:1;">' +
              '<svg width="100%" viewBox="10 0 180 100" preserveAspectRatio="xMidYMid meet" style="display:block;height:100%;">' +
                segmentsSvg +
              '</svg>' +
              '<div class="stat-value" style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);white-space:nowrap;line-height:1;font-size:24px;">' +
                weightLoss + '<span class="stat-unit">kg</span>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:flex-end;">' +
              '<div>' +
                '<div style="font-size:11px;color:var(--text-mute);margin-bottom:4px;">Verbleibend</div>' +
                '<span style="display:inline-flex;align-items:center;gap:2px;background:rgba(52,199,89,0.12);color:#34C759;font-size:13px;font-weight:600;padding:3px 8px;border-radius:20px;font-variant-numeric:tabular-nums;line-height:1.3;">' + remaining + ' kg</span>' +
              '</div>' +
              '<div style="text-align:right;">' +
                '<div style="font-size:11px;color:var(--text-mute);margin-bottom:4px;">Ziel</div>' +
                '<span style="display:inline-flex;align-items:center;gap:2px;background:rgba(52,199,89,0.12);color:#34C759;font-size:13px;font-weight:600;padding:3px 8px;border-radius:20px;font-variant-numeric:tabular-nums;line-height:1.3;">' + targetWeight + ' kg</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      } else {
        // No target or invalid target - show simple card
        weightLossCard = '<div class="stat-card">' +
          '<div class="stat-label">Gewichtsverlust</div>' +
          '<div class="stat-value">' + weightLoss + '<span class="stat-unit">kg</span></div>' +
        '</div>';
      }
    } else {
      weightLossCard = '<div class="stat-card">' +
        '<div class="stat-label">Gewichtsverlust</div>' +
        '<div class="stat-value">—<span class="stat-unit">kg</span></div>' +
      '</div>';
    }
  } else {
    weightLossCard = '<div class="stat-card">' +
      '<div class="stat-label">Gewichtsverlust</div>' +
      '<div class="stat-value">—<span class="stat-unit">kg</span></div>' +
    '</div>';
  }

  const weightLossCardSpan = weightLossCard.replace('<div class="stat-card">', '<div class="stat-card" style="grid-row:span 2;">');

  document.getElementById('statsGrid').innerHTML = '<div class="stat-card stat-card-icon">' +
    '<div class="stat-icon stat-icon-run">' +
      '<svg viewBox="0 0 1280 1002" fill="currentColor" stroke="none">' +
        '<g transform="translate(0,1002) scale(0.1,-0.1)">' +
          '<path d="M4765 10014c-22-2-80-11-130-20-496-88-933-478-1239-1109-65-133-82-190-130-435-70-351-99-722-85-1070 9-200 12-222 69-575 51-315 60-374 61-432 1-26 6-1 10 57 16 198 41 302 162 680 36 113 84 264 107 335 155 496 415 991 636 1211 260 259 505 345 764 270 207-60 373-164 665-415 55-48 116-99 135-115 19-16 99-87 177-158 198-181 302-260 418-318 125-63 189-79 341-87 234-12 329 37 427 218 60 109 81 189 81 314 0 130-17 190-98 356-192 386-534 697-1077 978-256 133-547 237-779 281-36 6-87 16-115 21-54 11-336 20-400 13z"/>' +
          '<path d="M8925 9614c-102-20-140-30-205-51-284-95-514-289-644-543-97-191-130-350-114-542 29-343 246-681 539-842 185-101 364-148 569-148 203 0 359 36 528 121 290 147 476 382 574 729 29 104 32 313 4 417-39 150-95 271-189 408-155 227-451 404-747 447-63 9-275 12-315 4z"/>' +
          '<path d="M12700 7683c-18-95-47-168-143-361-128-254-265-475-419-669-237-301-787-753-1129-928-147-75-207-95-290-95-164 0-334 100-499 295-99 116-147 217-290 605-131 356-247 549-395 658-81 59-122 80-213 103-67 17-85 18-140 8-81-15-158-65-240-155-152-167-219-372-209-634 6-146 19-217 68-374 171-546 518-1004 1009-1333 95-64 140-86 234-118 221-74 509-75 746-1 334 103 761 377 1065 681 273 273 455 545 649 967 184 401 248 597 292 897 3 24 0 151-7 282l-13 239-32 0c-31 0-32-1-44-67z"/>' +
          '<path d="M4205 5883c-138-16-280-77-351-149-50-52-116-179-140-269-57-217-5-491 130-678 54-77 136-160 305-311 131-117 132-118 114-139-225-264-861-924-1439-1493-741-731-1057-1051-1663-1687-156-164-419-427-585-584-276-262-579-564-572-570 1-2 38 6 82 18 149 39 670 336 1744 994 434 266 540 329 1470 875 744 437 872 515 1160 704 273 180 390 265 515 375 119 103 163 137 400 306 99 71 204 148 234 172l53 43 112-58c138-73 258-150 358-231 115-92 125-107 133-195 7-69 5-77-21-122-44-77-216-241-330-317-56-37-236-137-400-221-165-84-445-231-624-326-511-270-984-498-1295-622-167-67-390-187-375-201 3-3 55-9 115-14 117-9 328-2 528 16 67 6 174 16 237 22 330 29 556 70 845 150 226 63 261 73 550 149 556 148 852 248 1130 385 436 214 806 562 961 902 55 120 64 152 64 233 0 101-30 214-89 335-63 130-109 196-260 385-276 343-520 595-836 863-71 61-173 150-225 198-289 266-789 630-1045 761-114 58-538 233-635 262-60 19-247 46-295 44-16 0-43-3-60-5z"/>' +
        '</g>' +
      '</svg>' +
    '</div>' +
    '<div class="stat-text">' +
      '<div class="stat-label">Gesamt-km</div>' +
      '<div class="stat-value">' + totalKm.toFixed(1) + '</div>' +
    '</div>' +
  '</div>' +
  weightLossCardSpan +
  '<div class="stat-card stat-card-icon">' +
    '<div class="stat-icon stat-icon-gym">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<path d="M6 7v10"/><path d="M18 7v10"/><path d="M3 9v6"/><path d="M21 9v6"/><path d="M6 12h12"/>' +
      '</svg>' +
    '</div>' +
    '<div class="stat-text">' +
      '<div class="stat-label">Gym-Einheiten</div>' +
      '<div class="stat-value">' + totalGym + '</div>' +
    '</div>' +
  '</div>';
}

// Calendar state
let calendarMonth = new Date().getMonth();
let calendarYear = new Date().getFullYear();
let calendarSelectedDate = null;

function renderHistory() {
  renderCalendar();
}

function renderCalendar() {
  const container = document.getElementById('calendarSection');
  const workouts = loadAllWorkouts();
  const workoutMap = {};
  workouts.forEach(w => { workoutMap[w.date] = w.data; });

  const monthNames = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

  const firstDay = new Date(calendarYear, calendarMonth, 1);
  const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
  let startOffset = (firstDay.getDay() + 6) % 7;

  const today = new Date();
  const todayKey = getDateKey(today);

  let html = `
    <div class="calendar-nav">
      <button onclick="calendarPrev()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><polyline points="15 18 9 12 15 6"/></svg></button>
      <span class="calendar-month-label">${monthNames[calendarMonth]} ${calendarYear}</span>
      <button onclick="calendarNext()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><polyline points="9 18 15 12 9 6"/></svg></button>
    </div>
    <div class="calendar-grid">
      <div class="calendar-weekday">Mo</div>
      <div class="calendar-weekday">Di</div>
      <div class="calendar-weekday">Mi</div>
      <div class="calendar-weekday">Do</div>
      <div class="calendar-weekday">Fr</div>
      <div class="calendar-weekday">Sa</div>
      <div class="calendar-weekday">So</div>
  `;

  // Fill leading empty days from previous month
  const prevMonthLast = new Date(calendarYear, calendarMonth, 0);
  for (let i = startOffset - 1; i >= 0; i--) {
    const day = prevMonthLast.getDate() - i;
    html += `<div class="calendar-day other-month">${day}</div>`;
  }

  // Current month days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(calendarYear, calendarMonth, day);
    const dateKey = getDateKey(date);
    const wo = workoutMap[dateKey];
    const isToday = dateKey === todayKey;
    const isPast = dateKey < todayKey;
    const isFuture = dateKey > todayKey;
    const dayKey = getDayOfWeek(date);
    const plan = WEEK_PLAN[dayKey];

    let classes = 'calendar-day';
    if (isToday) classes += ' today';

    let dot = '';
    let onclick = '';

    // Only show dots for non-rest days
    if (plan && plan.type !== 'rest') {
      const isCompleted = wo && wo.completed;

      if (isToday) {
        // Today: orange if not done, green if done
        classes += ' has-workout';
        onclick = ` onclick="openCalendarModal('${dateKey}')"`;
        dot = isCompleted
          ? `<div class="calendar-dot completed"></div>`
          : `<div class="calendar-dot today-dot"></div>`;
      } else if (isPast) {
        // Past: red if not done, green if done
        classes += ' has-workout';
        onclick = ` onclick="openCalendarModal('${dateKey}')"`;
        dot = isCompleted
          ? `<div class="calendar-dot completed"></div>`
          : `<div class="calendar-dot missed"></div>`;
      } else if (isFuture) {
        // Future: gray (can't be completed in future)
        classes += ' planned';
        dot = `<div class="calendar-dot planned"></div>`;
        onclick = ` onclick="openCalendarModal('${dateKey}')"`;
      }
    }

    html += `<div class="${classes}"${onclick}>${day}${dot}</div>`;
  }

  // Fill trailing empty days
  const totalCells = startOffset + lastDay.getDate();
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="calendar-day other-month">${i}</div>`;
  }

  html += '</div>';
  container.innerHTML = html;
}

function openCalendarModal(dateKey) {
  const wo = loadWorkout(dateKey);
  const date = new Date(dateKey);
  const dateStr = date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const dayKey = getDayOfWeek(date);
  const plan = WEEK_PLAN[dayKey];
  const typeName = plan ? plan.name : '—';

  let stats = '';
  let statusHtml = '';
  let openBtn = '';

  if (wo) {
    if (wo.type === 'run' || wo.type === 'long') {
      const dist = wo.run?.distance ? `${parseFloat(wo.run.distance).toFixed(2)} km` : '';
      const time = wo.run?.time || '';
      const hr = wo.run?.hr ? `${wo.run.hr} Herzschläge/min` : '';
      stats = [dist, time, hr].filter(Boolean).join(' · ');
    } else if (wo.type === 'gym') {
      let totalSets = 0;
      if (wo.exercises) {
        Object.values(wo.exercises).forEach(ex => {
          (ex.sets || []).forEach(s => { if (s && (s.reps || s.weight || s.duration)) totalSets++; });
        });
      }
      stats = `${totalSets} Sätze eingetragen`;
    }

    const statusClass = wo.completed ? 'completed' : 'open';
    const statusText = wo.completed ? '✓ Abgeschlossen' : 'Offen';
    statusHtml = `<div class="calendar-modal-status ${statusClass}">${statusText}</div>`;

    openBtn = `<button class="primary" onclick="jumpToDate('${dateKey}'); closeCalendarModal();" style="font-size:12px;">Öffnen</button>`;
  } else {
    stats = 'Noch keine Einträge';
    statusHtml = '<div class="calendar-modal-status" style="background:rgba(107,114,128,0.1);color:var(--text-mute);">Geplant</div>';
    openBtn = `<button class="primary" onclick="jumpToDate('${dateKey}'); closeCalendarModal();" style="font-size:12px;">Öffnen</button>`;
  }

  const modalContent = document.getElementById('calendarModalContent');
  modalContent.innerHTML = `
    <div class="calendar-modal-date">${dateStr}</div>
    <div class="calendar-modal-title">${typeName}</div>
    <div class="calendar-modal-stats">${stats}</div>
    ${statusHtml}
    <div class="calendar-modal-actions">
      ${openBtn}
      ${wo ? `<button class="secondary" onclick="deleteWorkoutDate('${dateKey}'); closeCalendarModal();" style="background:rgba(217,82,14,0.1);color:var(--warn);font-size:12px;">Löschen</button>` : ''}
      <button class="secondary" onclick="closeCalendarModal()" style="font-size:12px;">Schließen</button>
    </div>
  `;

  const modal = document.getElementById('calendarModal');
  modal.classList.add('open');
  modal.onclick = (e) => {
    if (e.target === modal) closeCalendarModal();
  };
}

function closeCalendarModal() {
  document.getElementById('calendarModal').classList.remove('open');
}

// Title Editor
async function openTitleEditor() {
  const current = document.getElementById('userTitle').textContent;
  document.getElementById('titleInput').value = current;
  document.getElementById('titleEditorModal').classList.add('open');
  document.getElementById('titleInput').focus();
}

function closeTitleEditor() {
  document.getElementById('titleEditorModal').classList.remove('open');
}

async function saveTitleEditor() {
  // 1. Race-condition protection
  if (isSavingTitle) return;
  isSavingTitle = true;

  const newTitle = document.getElementById('titleInput').value.trim();
  if (!newTitle) {
    isSavingTitle = false;
    return;
  }

  const oldTitle = state.title;

  try {
    // 2. Optimistic UI: update state + DOM immediately
    state = { ...state, title: newTitle };
    document.getElementById('userTitle').textContent = newTitle;
    closeTitleEditor();

    // 3. Sync to Supabase with await
    const { error } = await supabaseClient
      .from('settings')
      .upsert({ key: 'user_title', value: newTitle }, { onConflict: 'key' });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    console.log('Title synced successfully:', newTitle);
  } catch (err) {
    // Rollback on error
    console.error('Title sync failed, rolling back:', err);
    state = { ...state, title: oldTitle };
    document.getElementById('userTitle').textContent = oldTitle;
    alert('Fehler beim Speichern. Bitte versuche es nochmal.');
  } finally {
    isSavingTitle = false;
  }
}

function loadUserTitle() {
  supabaseClient
    .from('settings')
    .select('value')
    .eq('key', 'user_title')
    .maybeSingle()
    .then(({ data, error }) => {
      if (!error && data && data.value) {
        state = { ...state, title: data.value };
        document.getElementById('userTitle').textContent = data.value;
      }
    })
    .catch(() => {});
}

function calendarPrev() {
  calendarMonth--;
  if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
  calendarSelectedDate = null;
  renderCalendar();
}

function calendarNext() {
  calendarMonth++;
  if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
  calendarSelectedDate = null;
  renderCalendar();
}

function jumpToDate(dateStr) {
  const date = new Date(dateStr);
  const dayKey = getDayOfWeek(date);

  const today = new Date();
  const todayDay = getDayOfWeek(today);
  const todayIdx = DAYS.indexOf(todayDay);
  const currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() - todayIdx);
  currentMonday.setHours(0,0,0,0);

  const targetMonday = new Date(date);
  const targetDayIdx = DAYS.indexOf(dayKey);
  targetMonday.setDate(date.getDate() - targetDayIdx);
  targetMonday.setHours(0,0,0,0);

  const diffDays = Math.round((targetMonday - currentMonday) / 86400000);
  state.weekOffset = Math.round(diffDays / 7);

  renderHeader();
  selectDay(dayKey);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// INIT
// ============================================================

function updateSyncIndicator() {
  const el = document.getElementById('syncStatus');
  if (!el) return;
  const wifiSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>`;
  if (state.syncStatus === 'synced') {
    el.innerHTML = wifiSvg + ' Synchronisiert';
    el.style.color = '#28a745';
  } else if (state.syncStatus === 'syncing') {
    el.innerHTML = wifiSvg + ' Synchronisiere…';
    el.style.color = 'var(--text-mute)';
  } else if (state.syncStatus === 'error') {
    el.innerHTML = wifiSvg + ' Offline';
    el.style.color = 'var(--warn)';
  } else {
    el.innerHTML = wifiSvg + ' Online';
    el.style.color = '#28a745';
  }
}

let activeCropper = null;

function changeAvatar() {
  const modal = document.getElementById('uploadPwModal');
  const input = document.getElementById('uploadPwInput');
  input.value = '';
  modal.classList.add('show');
  setTimeout(() => input.focus(), 100);
}

function closeUploadPwModal() {
  document.getElementById('uploadPwModal').classList.remove('show');
}

function cancelUploadPw() {
  closeUploadPwModal();
}

function confirmUploadPw() {
  const pw = document.getElementById('uploadPwInput').value.trim();
  if (pw !== 'fusion2026') {
    document.getElementById('uploadPwInput').value = '';
    document.getElementById('uploadPwInput').style.borderColor = 'var(--danger)';
    setTimeout(() => { document.getElementById('uploadPwInput').style.borderColor = ''; }, 1500);
    return;
  }
  closeUploadPwModal();
  openAvatarFilePicker();
}

function openAvatarFilePicker() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/png,image/jpeg,image/webp';
  input.onchange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { alert('Datei zu groß. Maximum: 2MB'); return; }
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) { alert('Nur PNG, JPEG und WebP erlaubt'); return; }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const modal = document.getElementById('cropperModal');
      const img = document.getElementById('cropperImage');
      img.src = ev.target.result;
      modal.classList.add('show');

      if (activeCropper) { activeCropper.destroy(); activeCropper = null; }

      img.onload = () => {
        activeCropper = new Cropper(img, {
          aspectRatio: 1,
          viewMode: 1,
          dragMode: 'move',
          cropBoxResizable: true,
          cropBoxMovable: true,
          background: false
        });
      };
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function closeCropperModal() {
  const modal = document.getElementById('cropperModal');
  modal.classList.remove('show');
  if (activeCropper) { activeCropper.destroy(); activeCropper = null; }
}

async function saveCroppedAvatar() {
  if (!activeCropper) return;

  const canvas = activeCropper.getCroppedCanvas({ width: 256, height: 256 });
  canvas.toBlob(async (blob) => {
    if (!blob) { alert('Fehler beim Zuschneiden'); return; }

    const fileName = `avatars/avatar.png`;

    const { error: uploadError } = await window.supabaseClient.storage
      .from('avatars')
      .upload(fileName, blob, { upsert: true, contentType: 'image/png' });

    if (uploadError) { alert('Upload fehlgeschlagen: ' + uploadError.message); return; }

    const { data } = window.supabaseClient.storage.from('avatars').getPublicUrl(fileName);
    const publicUrl = data?.publicUrl + '?t=' + Date.now();

    const { error: dbError } = await window.supabaseClient
      .from('settings')
      .upsert({ key: 'avatar_url', value: publicUrl }, { onConflict: 'key' });

    if (dbError) { alert('DB-Fehler: ' + dbError.message); return; }

    state = { ...state, avatar_url: publicUrl };
    document.getElementById('headerAvatar').src = publicUrl;
    localStorage.setItem('avatarUrl', publicUrl);
    closeCropperModal();
  }, 'image/png');
}

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

  let scrollTimeout = null;
  let isScrolling = false;
  let touchStartX = 0;

  // Collapse instantly on touch start if swiping horizontally
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX) return;
    const touchDelta = Math.abs(e.touches[0].clientX - touchStartX);

    // If horizontal swipe detected (>5px), instantly collapse all
    if (touchDelta > 5 && !isScrolling) {
      isScrolling = true;
      carousel.querySelectorAll('.sparkline-card.expanded').forEach(card => {
        const wrap = card.querySelector('.sparkline-table-wrap');
        // Disable transition for instant collapse
        wrap.style.transition = 'none';
        card.classList.remove('expanded');
        wrap.style.maxHeight = '0';
        // Re-enable transition after collapse
        requestAnimationFrame(() => {
          wrap.style.transition = '';
        });
      });
      // Re-enable snap immediately
      carousel.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleTouchEnd = () => {
    touchStartX = 0;
    isScrolling = false;
  };

  carousel.removeEventListener('scroll', carousel._dotHandler);
  carousel._dotHandler = () => {
    // Update dot indicator
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const idx = Math.round(carousel.scrollLeft / carousel.offsetWidth);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      isScrolling = false;
    }, 100);
  };

  carousel.removeEventListener('touchstart', carousel._touchStartHandler);
  carousel.removeEventListener('touchmove', carousel._touchMoveHandler);
  carousel.removeEventListener('touchend', carousel._touchEndHandler);

  carousel._touchStartHandler = handleTouchStart;
  carousel._touchMoveHandler = handleTouchMove;
  carousel._touchEndHandler = handleTouchEnd;

  carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
  carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
  carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
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

// ============================================================
// STOPWATCH
// ============================================================

let stopwatch = {
  running: false,
  seconds: 0,
  interval: null,
  countdown: false
};

function toggleStopwatch() {
  if (stopwatch.running) {
    pauseStopwatch();
  } else {
    startStopwatch();
  }
}

function startStopwatch() {
  stopwatch.running = true;
  const btn = document.getElementById('stopwatchToggle');
  const display = document.getElementById('stopwatchDisplay');
  if (btn) { btn.textContent = '⏸'; btn.classList.add('active'); }
  if (display) display.classList.add('running');

  stopwatch.interval = setInterval(() => {
    if (stopwatch.countdown) {
      stopwatch.seconds--;
      if (stopwatch.seconds <= 0) {
        stopwatch.seconds = 0;
        pauseStopwatch();
        notifyTimerDone();
      }
    } else {
      stopwatch.seconds++;
    }
    updateStopwatchDisplay();
  }, 1000);
}

function pauseStopwatch() {
  stopwatch.running = false;
  clearInterval(stopwatch.interval);
  const btn = document.getElementById('stopwatchToggle');
  const display = document.getElementById('stopwatchDisplay');
  if (btn) { btn.textContent = '▶'; btn.classList.remove('active'); }
  if (display) display.classList.remove('running');
}

function resetStopwatch() {
  pauseStopwatch();
  stopwatch.seconds = 0;
  stopwatch.countdown = false;
  updateStopwatchDisplay();
}

function setCountdown(seconds) {
  pauseStopwatch();
  stopwatch.seconds = seconds;
  stopwatch.countdown = true;
  updateStopwatchDisplay();
  startStopwatch();
}

function toggleCountdownPicker(e) {
  e.stopPropagation();
  const picker = document.getElementById('countdownPicker');
  if (!picker) return;
  picker.classList.toggle('open');
  if (picker.classList.contains('open')) {
    setTimeout(() => document.addEventListener('click', closeCountdownPicker, { once: true }), 0);
  }
}

function closeCountdownPicker() {
  const picker = document.getElementById('countdownPicker');
  if (picker) picker.classList.remove('open');
}

function pickCountdown(seconds) {
  closeCountdownPicker();
  setCountdown(seconds);
}

function updateStopwatchDisplay() {
  const display = document.getElementById('stopwatchDisplay');
  if (!display) return;
  const m = Math.floor(stopwatch.seconds / 60);
  const s = stopwatch.seconds % 60;
  display.textContent = `${m}:${String(s).padStart(2, '0')}`;
}

function notifyTimerDone() {
  const display = document.getElementById('stopwatchDisplay');
  if (display) {
    display.style.color = 'var(--warn)';
    display.textContent = '0:00 ✓';
    setTimeout(() => {
      if (display) display.style.color = '';
    }, 3000);
  }
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200]);
  }
}

// ============================================================
// EXERCISE HISTORY & SPARKLINES
// ============================================================

function getExerciseHistory(exerciseId) {
  const workouts = loadAllWorkouts();
  const eightyWeeksAgo = new Date();
  eightyWeeksAgo.setDate(eightyWeeksAgo.getDate() - 56);
  const cutoffKey = getDateKey(eightyWeeksAgo);

  const weeklyData = {};
  workouts.forEach(w => {
    if (w.date < cutoffKey || !w.data || w.data.type !== 'gym' || !w.data.exercises) return;

    const exData = w.data.exercises[exerciseId];
    if (!exData) return;

    const date = new Date(w.date);
    const ws = new Date(date);
    ws.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    const weekKey = getDateKey(ws);

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = { maxWeight: 0, sets: 0 };
    }

    (exData.sets || []).forEach(set => {
      if (set && set.weight) {
        const w = parseFloat(set.weight);
        if (w > 0) {
          weeklyData[weekKey].maxWeight = Math.max(weeklyData[weekKey].maxWeight, w);
          weeklyData[weekKey].sets++;
        }
      }
    });
  });

  return Object.keys(weeklyData)
    .sort()
    .slice(-8)
    .map(weekKey => ({
      week: weekKey,
      maxWeight: weeklyData[weekKey].maxWeight,
      sets: weeklyData[weekKey].sets
    }))
    .filter(h => h.maxWeight > 0);
}

function renderExerciseSparkline(exerciseId) {
  const history = getExerciseHistory(exerciseId);
  if (history.length === 0) return '';

  const weights = history.map(h => h.maxWeight).filter(w => isFinite(w) && w > 0);
  if (weights.length === 0) return '';

  const maxWeight = Math.max(...weights);
  const minWeight = Math.min(...weights);
  const range = Math.max(maxWeight - minWeight, 5);
  const padding = range * 0.1;

  const svgWidth = 200;
  const svgHeight = 64;
  const chartTop = 30;
  const chartBottom = 0;
  const chartLeft = 10;
  const chartRight = 10;
  const chartWidth = svgWidth - chartLeft - chartRight;
  const chartHeight = svgHeight - chartTop - chartBottom;

  const points = history.map((h, i) => {
    const x = chartLeft + (i / (history.length - 1 || 1)) * chartWidth;
    const y = svgHeight - chartBottom - ((h.maxWeight - minWeight + padding) / (range + padding * 2)) * chartHeight;
    return { x: isFinite(x) ? x : 0, y: isFinite(y) ? y : 0, weight: h.maxWeight, sets: h.sets };
  }).filter(p => isFinite(p.x) && isFinite(p.y));

  // Smooth bezier curve
  let pathData;
  if (points.length < 2) {
    pathData = points.map((p,i) => `${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  } else {
    pathData = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i-1], p1 = points[i];
      const mx = ((p0.x+p1.x)/2).toFixed(1);
      pathData += ` C${mx},${p0.y.toFixed(1)} ${mx},${p1.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }
  }

  // Find min and max for tooltips
  const minWeightValue = Math.min(...points.map(p => p.weight));
  const maxWeightValue = Math.max(...points.map(p => p.weight));

  const tooltips = points
    .filter(p => p.weight === minWeightValue || p.weight === maxWeightValue)
    .map(p => {
      const label = `${p.weight.toFixed(1)} kg`;
      const labelW = label.length * 5.8 + 12;
      const labelH = 18;
      const arrowLen = 4;
      const gap = 3;
      const liftOff = 2; // gap between arrow tip and point
      // Arrow tip always on p.y — no Math.max clamping
      const labelY = p.y - labelH - arrowLen - gap - liftOff;
      const arrowW = 6;
      const gymRx = 9;
      const gymMargin = gymRx + arrowW / 2;
      // Allow pill to go slightly outside SVG so arrow stays vertical
      const overflow = 8;
      let labelX = p.x - labelW / 2;
      labelX = Math.min(labelX, p.x - gymMargin);      // arrow not in left corner
      labelX = Math.max(labelX, p.x - labelW + gymMargin); // arrow not in right corner
      labelX = Math.max(-overflow, Math.min(svgWidth - labelW + overflow, labelX));
      // Arrow starts liftOff above the point
      const arrowTip = p.y - liftOff;
      const arrowPath = `M${(p.x-arrowW/2).toFixed(1)},${(labelY+labelH).toFixed(1)} L${(p.x-1.5).toFixed(1)},${(arrowTip-1.5).toFixed(1)} Q${p.x.toFixed(1)},${arrowTip.toFixed(1)} ${(p.x+1.5).toFixed(1)},${(arrowTip-1.5).toFixed(1)} L${(p.x+arrowW/2).toFixed(1)},${(labelY+labelH).toFixed(1)} Z`;
      return `<g>
        <path d="${arrowPath}" fill="rgba(30,30,30,0.75)"/>
        <rect x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" width="${labelW.toFixed(1)}" height="${labelH}" rx="9" fill="rgba(30,30,30,0.75)"/>
        <text x="${(labelX + labelW/2).toFixed(1)}" y="${(labelY + 12.5).toFixed(1)}" font-size="10" fill="white" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="600" letter-spacing="-0.2">${label}</text>
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="rgba(52,199,89,1)"/>
      </g>`;
    }).join('');

  return `
    <div style="margin-top:10px;font-size:12px;color:var(--text-mute);margin-left:48px;margin-bottom:2px;">
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width:100%;height:64px;display:block;">
        <defs>
          <linearGradient id="exGrad_${exerciseId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(52,199,89,0.12)"/>
            <stop offset="100%" stop-color="rgba(52,199,89,0)"/>
          </linearGradient>
        </defs>
        <path d="${pathData} L${svgWidth-chartRight},${svgHeight-chartBottom} L${chartLeft},${svgHeight-chartBottom} Z"
          fill="url(#exGrad_${exerciseId})" stroke="none"/>
        <path d="${pathData}"
          fill="none" stroke="rgba(52,199,89,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${tooltips}
      </svg>
    </div>
  `;
}

function renderBodyMetricSparkline(metric) {
  const allMetrics = loadAllBodyMetrics();
  const unit = metric === 'weight' ? 'kg' : '%';
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const chartColor = metric === 'weight'
    ? (isDark ? '#30D158' : '#34C759')
    : (isDark ? '#BF5AF2' : '#AF52DE');

  function hexToRgba(hex, a) {
    const rr = parseInt(hex.slice(1,3),16), gg = parseInt(hex.slice(3,5),16), bb = parseInt(hex.slice(5,7),16);
    return `rgba(${rr},${gg},${bb},${a})`;
  }

  if (allMetrics.length === 0) return `<div class="sparkline-card" style="display:flex;align-items:center;justify-content:center;height:64px;"><span style="font-size:11px;color:var(--text-mute);">Noch keine Daten</span></div>`;

  const values = allMetrics
    .map(m => {
      const val = metric === 'weight' ? parseFloat(m.data.weight) : parseFloat(m.data.fat);
      return { date: m.date, value: val };
    })
    .filter(m => isFinite(m.value) && m.value > 0);

  if (values.length === 0) return `<div class="sparkline-card" style="display:flex;align-items:center;justify-content:center;height:64px;"><span style="font-size:11px;color:var(--text-mute);">Noch keine Daten</span></div>`;

  const maxVal = Math.max(...values.map(v => v.value));
  const minVal = Math.min(...values.map(v => v.value));
  const range = Math.max(maxVal - minVal, 0.5);
  const pad = range * 0.15;

  const W = 200, H = 80;
  const l = 34, r = 10, t = 10, b = 10;
  const chartHeight = H - t - b;
  const fadeZone = chartHeight * 0.15;
  const dataTop = t + fadeZone; // data plots start below the fade zone

  const points = values.map((v, i) => {
    const x = l + (i / Math.max(values.length - 1, 1)) * (W - l - r);
    const y = H - b - ((v.value - (minVal - pad)) / (range + pad * 2)) * (chartHeight - fadeZone);
    return { x: isFinite(x) ? x : 0, y: isFinite(y) ? y : 0, value: v.value, date: v.date };
  }).filter(p => isFinite(p.x) && isFinite(p.y));

  // Smooth bezier curve
  function smoothPath(pts) {
    if (pts.length < 2) return pts.map((p,i) => `${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i-1], p1 = pts[i];
      const mx = ((p0.x+p1.x)/2).toFixed(1);
      d += ` C${mx},${p0.y.toFixed(1)} ${mx},${p1.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }
    return d;
  }

  const pathD = smoothPath(points);

  const gradId = `grad_${metric}_${Date.now()}`;
  const fillGradient = `<defs><linearGradient id="${gradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${chartColor}" stop-opacity="0.25"/><stop offset="100%" stop-color="${chartColor}" stop-opacity="0"/></linearGradient></defs>`;
  const fillPath = pathD + ` L${W-r},${H-b} L${l},${H-b} Z`;

  // Gridlines: normal from dataTop to bottom, fade zone from t to dataTop
  const bodyGridGradId = `bodyGridGrad_${metric}_${Math.random().toString(36).slice(2,6)}`;
  const resolvedBodyGridColor = getComputedStyle(document.documentElement).getPropertyValue('--text-mute').trim() || '#999';
  const bodyGridGradient = `<linearGradient id="${bodyGridGradId}" x1="0" y1="${t}" x2="0" y2="${dataTop}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${resolvedBodyGridColor}" stop-opacity="0"/>
    <stop offset="100%" stop-color="${resolvedBodyGridColor}" stop-opacity="0.1"/>
  </linearGradient>`;

  const gridLines = points.map(p =>
    `<line x1="${p.x.toFixed(1)}" y1="${t}" x2="${p.x.toFixed(1)}" y2="${dataTop}" stroke="url(#${bodyGridGradId})" stroke-width="0.5"/>
     <line x1="${p.x.toFixed(1)}" y1="${dataTop}" x2="${p.x.toFixed(1)}" y2="${H-b}" stroke="var(--text-mute)" opacity="0.1" stroke-width="0.5"/>`
  ).join('');

  const avg = (values.reduce((a,v) => a+v.value, 0) / values.length).toFixed(1);

  const maxLabel = Number.isInteger(maxVal) ? String(maxVal) : maxVal.toFixed(1);
  const minLabel = Number.isInteger(minVal) ? String(minVal) : minVal.toFixed(1);
  const minMaxLabels = `
    <text x="${l-3}" y="${dataTop+7}" font-size="9" fill="var(--text-mute)" text-anchor="end" font-family="system-ui,-apple-system,sans-serif" font-weight="600">${maxLabel}</text>
    <text x="${l-3}" y="${H-b-1}" font-size="9" fill="var(--text-mute)" text-anchor="end" font-family="system-ui,-apple-system,sans-serif" font-weight="600">${minLabel}</text>
  `;

  const badgeText = `Ø ${avg} ${unit}`;
  const badgeW = badgeText.length * 7.2 + 16;
  const badgeH = 20;
  const badgePadding = 6;
  const badgeX = (W - badgeW - badgePadding).toFixed(1);
  const badgeY = (badgePadding).toFixed(1);
  const badgeFillColor = metric === 'weight'
    ? (isDark ? 'rgba(48, 209, 88, 0.25)' : 'rgba(52, 199, 89, 0.15)')
    : (isDark ? 'rgba(191, 90, 242, 0.25)' : 'rgba(175, 82, 222, 0.15)');
  const avgBadge = `
    <rect x="${badgeX}" y="${badgeY}" width="${badgeW}" height="${badgeH}" rx="10" fill="${badgeFillColor}"/>
    <text x="${(parseFloat(badgeX) + badgeW/2).toFixed(1)}" y="${(parseFloat(badgeY)+14).toFixed(1)}" text-anchor="middle" font-size="13" fill="${chartColor}" font-weight="600" font-family="system-ui,-apple-system,sans-serif">${badgeText}</text>
  `;

  // Find min and max for tooltips
  const minMetricValue = Math.min(...points.map(p => p.value));
  const maxMetricValue = Math.max(...points.map(p => p.value));

  const tooltips = points
    .filter(p => p.value === minMetricValue || p.value === maxMetricValue)
    .map(p =>
      `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="transparent" style="cursor:pointer;"><title>${new Date(p.date).toLocaleDateString('de-DE')}: ${p.value.toFixed(1)} ${unit}</title></circle>`
    ).join('');

  return `
    <div class="sparkline-card">
      <svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;">
        ${fillGradient}
        <defs>${bodyGridGradient}</defs>
        ${gridLines}
        ${minMaxLabels}
        <path d="${fillPath}" fill="url(#${gradId})" stroke="none"/>
        <path d="${pathD}" fill="none" stroke="${chartColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        ${tooltips}
        ${avgBadge}
      </svg>
    </div>
  `;
}

function toggleSparklineTable(btn) {
  const card = btn.closest('.sparkline-card');
  const wrap = card.querySelector('.sparkline-table-wrap');
  const carousel = document.getElementById('chartCarousel');
  const isOpen = card.classList.toggle('expanded');

  if (isOpen) {
    // Disable snap while expanded to allow vertical scrolling
    if (carousel) carousel.style.scrollSnapType = 'none';

    // Store current scroll position
    const currentScroll = carousel ? carousel.scrollLeft : 0;
    wrap.style.maxHeight = wrap.scrollHeight + 'px';

    // Restore scroll position after height change
    if (carousel) {
      requestAnimationFrame(() => {
        carousel.scrollLeft = currentScroll;
      });
    }
  } else {
    // Re-enable snap when collapsed
    if (carousel) carousel.style.scrollSnapType = 'x mandatory';
    wrap.style.maxHeight = '0';
  }
}

function buildSparklineSVG(numericValues, unit, avgFormatter, title, opts) {
  opts = opts || {};
  const isBar = opts.type === 'bar';
  const labels = opts.labels || [];
  const hasLabels = labels.length > 0;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const configs = {
    'Laufvolumen': {
      color: isDark ? '#0A84FF' : '#007AFF',
      iconSvg: `<svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M918.4 201.6c-6.4-6.4-12.8-9.6-22.4-9.6H768V96c0-9.6-3.2-16-9.6-22.4C752 67.2 745.6 64 736 64H288c-9.6 0-16 3.2-22.4 9.6C259.2 80 256 86.4 256 96v96H128c-9.6 0-16 3.2-22.4 9.6-6.4 6.4-9.6 16-9.6 22.4 3.2 108.8 25.6 185.6 64 224 34.4 34.4 77.56 55.65 127.65 61.99 10.91 20.44 24.78 39.25 41.95 56.41 40.86 40.86 91 65.47 150.4 71.9V768h-96c-9.6 0-16 3.2-22.4 9.6-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6h256c9.6 0 16-3.2 22.4-9.6 6.4-6.4 9.6-12.8 9.6-22.4s-3.2-16-9.6-22.4c-6.4-6.4-12.8-9.6-22.4-9.6h-96V637.26c59.4-7.71 109.54-30.01 150.4-70.86 17.2-17.2 31.51-36.06 42.81-56.55 48.93-6.51 90.02-27.7 126.79-61.85 38.4-38.4 60.8-112 64-224 0-6.4-3.2-16-9.6-22.4zM256 438.4c-19.2-6.4-35.2-19.2-51.2-35.2-22.4-22.4-35.2-70.4-41.6-147.2H256v182.4zm390.4 80C608 553.6 566.4 576 512 576s-99.2-19.2-134.4-57.6C342.4 480 320 438.4 320 384V128h384v256c0 54.4-19.2 99.2-57.6 134.4zm172.8-115.2c-16 16-32 25.6-51.2 35.2V256h92.8c-6.4 76.8-19.2 124.8-41.6 147.2zM768 896H256c-9.6 0-16 3.2-22.4 9.6-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6h512c9.6 0 16-3.2 22.4-9.6 6.4-6.4 9.6-12.8 9.6-22.4s-3.2-16-9.6-22.4c-6.4-6.4-12.8-9.6-22.4-9.6z"/></svg>`
    },
    'Pace': {
      color: isDark ? '#5E5CE6' : '#5856D6',
      iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10" cy="10" r="7"/><polyline points="10,6 10,10 13,13"/></svg>`
    },
    'Kadenz': {
      color: isDark ? '#FF9F0A' : '#FF9500',
      iconSvg: `<svg viewBox="-48 0 512 512" fill="currentColor"><path d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"/></svg>`
    },
    'Schmerz': {
      color: isDark ? '#FF375F' : '#FF2D55',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.9998H8L9.5 8.99976L11.5 13.9998L13 11.9998H15M12 6.42958C12.4844 5.46436 13.4683 4.72543 14.2187 4.35927C16.1094 3.43671 17.9832 3.91202 19.5355 5.46436C21.4881 7.41698 21.4881 10.5828 19.5355 12.5354L12.7071 19.3639C12.3166 19.7544 11.6834 19.7544 11.2929 19.3639L4.46447 12.5354C2.51184 10.5828 2.51184 7.41698 4.46447 5.46436C6.0168 3.91202 7.89056 3.43671 9.78125 4.35927C10.5317 4.72543 11.5156 5.46436 12 6.42958Z"/></svg>`
    },
    'Gewicht': {
      color: isDark ? '#30D158' : '#34C759',
      iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h10a1.5 1.5 0 0 0 1.5-1.5L15 8H5L3.5 15.5A1.5 1.5 0 0 0 5 17z"/><circle cx="10" cy="5" r="2.5"/></svg>`
    },
    'KFA': {
      color: isDark ? '#BF5AF2' : '#AF52DE',
      iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="13.5" cy="13.5" r="2.5"/><line x1="16" y1="4" x2="4" y2="16"/></svg>`
    }
  };
  const cfg = configs[title] || { color: isDark ? '#0A84FF' : '#007AFF', iconSvg: '' };
  const chartColor = cfg.color;

  function hexToRgba(hex, a) {
    const rr = parseInt(hex.slice(1,3),16), gg = parseInt(hex.slice(3,5),16), bb = parseInt(hex.slice(5,7),16);
    return `rgba(${rr},${gg},${bb},${a})`;
  }

  const empty = `<div class="sparkline-card"><div class="sparkline-header"><div class="sparkline-icon" style="background:${hexToRgba(chartColor,0.12)};color:${chartColor};">${cfg.iconSvg}</div><span class="sparkline-title">${title||''}</span></div><div style="padding:32px 16px;text-align:center;color:var(--text-mute);font-size:13px;">Noch keine Daten</div></div>`;

  const valid = (numericValues || []).filter(v => v !== null && !isNaN(v));
  if (valid.length === 0) return empty;

  const maxVal = Math.max(...valid);
  const minVal = Math.min(...valid);

  // For Laufvolumen: Y-axis with exponential scale (powers) from 0 to maxVal * 1.05
  let yMin, yRange, pad, useExpScale = false;
  const isRunVolumeCheck = title === 'Laufvolumen';
  if (isRunVolumeCheck) {
    useExpScale = true;
    yMin = 0;
    const yMax = maxVal * 1.05;
    // For exponential scale: use power function to amplify higher values
    yRange = Math.pow(yMax, 1.5);
    pad = 0;
  } else {
    yMin = isBar ? 0 : minVal;
    yRange = Math.max(maxVal - yMin, 0.5);
    pad = yRange * 0.15;
  }

  const W = 400, H = 210;
  const l = isRunVolumeCheck ? 10 : 24;
  const r = isRunVolumeCheck ? 10 : 24;
  const t = 36;
  const b = hasLabels ? 44 : 24;
  const chartBottom = H - b;
  const gridExtension = (chartBottom - t) * 0.2;
  const extendedTop = t - gridExtension;

  const n = numericValues.length;
  const totalSlots = isBar ? n + 2 : n;

  const parseLabel = (lbl) => {
    // Week number format: "23", "24" or "KW23", "KW24" etc. Map to approximate date (Monday of that week)
    const kwMatch = lbl.match(/^(?:KW)?(\d+)$/);
    if (kwMatch) {
      const week = parseInt(kwMatch[1]);
      const year = 2026;
      const d = new Date(year, 0, 4);
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      const monday = new Date(d.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
      return monday;
    }
    // Day.Month format: "15.06."
    const p = lbl.split('.');
    return new Date(2026, parseInt(p[1]) - 1, parseInt(p[0]));
  };
  let lineDates = null, lineFirstDate = null, lineTotalDays = 0;
  if (!isBar && hasLabels && labels.length === n) {
    lineDates = labels.map(lbl => parseLabel(lbl));
    lineFirstDate = lineDates[0];
    const today = new Date(); today.setHours(0,0,0,0);
    lineTotalDays = Math.round((today - lineFirstDate) / (24*60*60*1000));
    if (lineTotalDays < 1) lineTotalDays = 1;
  }

  const allPts = numericValues.map((v, i) => {
    if (v === null || !isFinite(v)) return null;
    let x;
    const isRunVolumeForPositioning = title === 'Laufvolumen';
    if (isBar || isRunVolumeForPositioning) {
      const slots = isRunVolumeForPositioning ? n : totalSlots;
      x = l + (i + 0.5) / slots * (W - l - r);
    } else if (lineDates) {
      const daysFromStart = Math.round((lineDates[i] - lineFirstDate)/(24*60*60*1000));
      x = l + (daysFromStart/lineTotalDays)*(W-l-r);
    } else {
      x = l + (n===1 ? (W-l-r)/2 : (i/(n-1))*(W-l-r));
    }
    let y;
    if (useExpScale) {
      // Exponential scale: amplify higher values using power
      const expVal = Math.pow(v, 1.5);
      y = chartBottom - (expVal / yRange) * (chartBottom - t);
    } else {
      y = chartBottom - ((v - yMin) / yRange) * (chartBottom - t);
    }
    if (!isFinite(x) || !isFinite(y)) return null;
    return { x, y, value: v, idx: i };
  });
  const nonNull = allPts.filter(Boolean);

  // Smooth bezier curve path with horizontal extension to pill edges
  function smoothPath(pts) {
    if (pts.length < 2) return '';

    const isRunVolumeForPath = title === 'Laufvolumen';
    let startPt = pts[0];
    let endPt = pts[pts.length - 1];

    if (isRunVolumeForPath) {
      const pillW = Math.min(((W-l-r)/Math.max(n,1))*0.7, 50);
      const pillLeft = startPt.x - pillW / 2;

      // Extend to left pill edge horizontally
      if (pillLeft < startPt.x) {
        startPt = { x: pillLeft, y: startPt.y };
      }

      // Do NOT extend to right pill edge - stop at the data point
    }

    let d = `M${startPt.x.toFixed(1)},${startPt.y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i-1], p1 = pts[i];
      const mx = ((p0.x + p1.x)/2).toFixed(1);
      d += ` C${mx},${p0.y.toFixed(1)} ${mx},${p1.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }
    d += ` L${endPt.x.toFixed(1)},${endPt.y.toFixed(1)}`;
    return d;
  }

  // Fill gradient in chart color
  const gradId = `grad_${(title||'x').replace(/\s/g,'')}_${Date.now()}`;
  const fillGradient = `<defs><linearGradient id="${gradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${chartColor}" stop-opacity="0.25"/><stop offset="100%" stop-color="${chartColor}" stop-opacity="0"/></linearGradient></defs>`;

  // Grid lines + labels with extended height and gradient fade at top
  let gridLines = '';
  let gridLabelEls = '';
  const gridColor = 'var(--text-mute)';
  const isRunVolume = title === 'Laufvolumen';
  const gridGradId = `gridGrad_${title.replace(/\s/g,'')}_${Math.random().toString(36).slice(2,6)}`;
  const resolvedGridColor = getComputedStyle(document.documentElement).getPropertyValue('--text-mute').trim() || '#999';
  const gridGradient = `<linearGradient id="${gridGradId}" x1="0" y1="${extendedTop}" x2="0" y2="${t}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${resolvedGridColor}" stop-opacity="0"/>
    <stop offset="100%" stop-color="${resolvedGridColor}" stop-opacity="0.3"/>
  </linearGradient>`;

  if (isBar && !isRunVolume) {
    gridLines = nonNull.map(p =>
      `<line x1="${p.x.toFixed(1)}" y1="${extendedTop}" x2="${p.x.toFixed(1)}" y2="${t}" stroke="url(#${gridGradId})" stroke-width="0.8"/>
       <line x1="${p.x.toFixed(1)}" y1="${t}" x2="${p.x.toFixed(1)}" y2="${chartBottom}" stroke="${gridColor}" opacity="0.4" stroke-width="0.8"/>`
    ).join('');
    for (let i = n; i < n+2; i++) {
      const x = l + (i+0.5)/totalSlots*(W-l-r);
      gridLines += `<line x1="${x.toFixed(1)}" y1="${extendedTop}" x2="${x.toFixed(1)}" y2="${t}" stroke="url(#${gridGradId})" stroke-width="0.6"/>
                    <line x1="${x.toFixed(1)}" y1="${t}" x2="${x.toFixed(1)}" y2="${chartBottom}" stroke="${gridColor}" opacity="0.24" stroke-width="0.6"/>`;
    }
  } else if (lineDates && lineTotalDays > 0) {
    // For KW labels, show the labels directly at all pill positions; for date labels, show every 2 days
    const isKWLabels = labels && labels[0] && labels[0].match(/^(?:KW)?(\d+)$/);
    if (isKWLabels && isRunVolume) {
      for (let i = 0; i < n; i++) {
        const x = l + (i + 0.5) / n * (W - l - r);
        const label = labels[i] || '';
        if (label) {
          gridLabelEls += `<text x="${x.toFixed(1)}" y="${chartBottom+14}" font-size="10" fill="var(--text-mute)" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="500">${label}</text>`;
        }
      }
    } else {
      // Dynamic label step based on time span
      let labelStep = 2; // default: every 2nd line
      if (lineTotalDays > 28) {
        labelStep = 4; // >4 weeks: every 4th
      } else if (lineTotalDays > 14) {
        labelStep = 3; // >2 weeks: every 3rd
      }

      for (let d = 0; d <= lineTotalDays; d++) {
        const x = l + (d/lineTotalDays)*(W-l-r);
        gridLines += `<line x1="${x.toFixed(1)}" y1="${extendedTop}" x2="${x.toFixed(1)}" y2="${t}" stroke="url(#${gridGradId})" stroke-width="0.5"/>
                      <line x1="${x.toFixed(1)}" y1="${t}" x2="${x.toFixed(1)}" y2="${chartBottom}" stroke="${gridColor}" opacity="0.3" stroke-width="0.5"/>`;
        const distFromEnd = lineTotalDays - d;
        if (distFromEnd % labelStep === 0) {
          const date = new Date(lineFirstDate.getTime() + d*24*60*60*1000);
          const dateStr = `${date.getDate()}.${date.getMonth()+1}.`;
          gridLabelEls += `<text x="${x.toFixed(1)}" y="${chartBottom+14}" font-size="10" fill="var(--text-mute)" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif">${dateStr}</text>`;
        }
      }
    }
  }

  // Tooltip bubble — arrow always fixed length, points to targetY (top edge of bar/point)
  function tipBubble(cx, cy, text, targetY) {
    const th = 24, tw = text.length * 7.2 + 14;
    const arrowLength = 4;
    const arrowWidth = 8;
    const gap = 3;
    const liftOff = 2; // gap between arrow tip and point
    const tip = (targetY !== undefined ? targetY : cy);
    const ty = tip - th - arrowLength - gap - liftOff;
    const textBaseline = ty + 16;
    const rx = 11;
    const margin = rx + arrowWidth / 2; // min distance from pill edge to arrow center
    // Shift pill so arrow (at cx) always lands in the flat area — no diagonal
    let tx = cx - tw / 2;
    tx = Math.min(tx, cx - margin);          // arrow not left of left flat area
    tx = Math.max(tx, cx - tw + margin);     // arrow not right of right flat area
    // Increase edge margin so pills have more breathing room from chart edges
    const edgeMargin = 12;  // more room at edges to avoid hugging the border
    tx = Math.max(edgeMargin, Math.min(W - tw - edgeMargin, tx));
    // Arrow starts liftOff above the point
    const arrowTip = tip - liftOff;
    const arrowPath = `M${(cx-arrowWidth/2).toFixed(1)},${(ty+th).toFixed(1)} L${(cx-2).toFixed(1)},${(arrowTip-2).toFixed(1)} Q${cx.toFixed(1)},${arrowTip.toFixed(1)} ${(cx+2).toFixed(1)},${(arrowTip-2).toFixed(1)} L${(cx+arrowWidth/2).toFixed(1)},${(ty+th).toFixed(1)} Z`;
    return `<g>
        <path d="${arrowPath}" fill="rgba(30,30,30,0.75)"/>
        <rect x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" width="${tw.toFixed(1)}" height="${th.toFixed(1)}" rx="11" fill="rgba(30,30,30,0.75)"/>
      </g>
      <text x="${(tx+tw/2).toFixed(1)}" y="${textBaseline.toFixed(1)}" font-size="12" fill="white" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="600" letter-spacing="-0.2">${text}</text>`;
  }

  // Bars
  let barsEl = '';
  if (isBar) {
    const gap = (W-l-r)/Math.max(totalSlots,1);
    const barW = Math.min(gap*0.7, 50);

    if (isRunVolume) {
      // Pill design with gradient - stronger at top
      const pillRadius = barW / 2;
      const baseOpacity = 0.12;
      const topOpacity = 0.5;
      const pillGradId = `pillGrad_${Date.now()}`;
      const pillGradient = `<defs><linearGradient id="${pillGradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${chartColor}" stop-opacity="${topOpacity}"/><stop offset="100%" stop-color="${chartColor}" stop-opacity="${baseOpacity}"/></linearGradient></defs>`;

      // Add gray placeholder pills for ALL positions (background)
      const _isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const emptyBarColor = _isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)';
      let placeholderPills = '';
      const maxHeight = chartBottom - t;
      for (let i = 0; i < totalSlots; i++) {
        const x = l + (i + 0.5) / totalSlots * (W - l - r);
        placeholderPills += `<rect x="${(x - barW/2).toFixed(1)}" y="${t}" width="${barW.toFixed(1)}" height="${maxHeight.toFixed(1)}" rx="${pillRadius}" fill="${emptyBarColor}"/>`;
      }

      // Find min and max values for tooltips
      const minValue = Math.min(...nonNull.map(p => p.value));
      const maxValue = Math.max(...nonNull.map(p => p.value));

      barsEl = pillGradient + placeholderPills + nonNull.map(p => {
        const bh = chartBottom - p.y;
        const formatted = avgFormatter ? avgFormatter(p.value) : p.value.toFixed(1);

        // Gradient colored pill (actual value)
        let pillSvg = `<rect x="${(p.x-barW/2).toFixed(1)}" y="${p.y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="${pillRadius}" fill="url(#${pillGradId})"/>`;

        // Only show tooltips for min and max values
        if (p.value === minValue || p.value === maxValue) {
          pillSvg += tipBubble(p.x, p.y, formatted, p.y);
        }
        return pillSvg;
      }).join('');
    } else {
      // Find min and max values for tooltips
      const minValue = Math.min(...nonNull.map(p => p.value));
      const maxValue = Math.max(...nonNull.map(p => p.value));

      barsEl = nonNull.map(p => {
        const bh = chartBottom - p.y;
        const formatted = avgFormatter ? avgFormatter(p.value) : p.value.toFixed(1);

        // Bar rectangle
        let barSvg = `<rect x="${(p.x-barW/2).toFixed(1)}" y="${p.y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="5" fill="${chartColor}" opacity="0.7"/>`;

        // Only show tooltips for min and max values
        if (p.value === minValue || p.value === maxValue) {
          barSvg += tipBubble(p.x, p.y - 8, formatted, p.y);
        }

        return barSvg;
      }).join('');
    }
  }

  // Gray background pills for line charts (Laufvolumen)
  let bgPillsEl = '';
  const isRunVolumeForPills = title === 'Laufvolumen';
  if (!isBar && isRunVolumeForPills && n >= 1) {
    const pillCount = n;
    const gap = (W - l - r) / pillCount;
    const pillW = Math.min(gap * 0.7, 50);
    const pillRadius = pillW / 2;
    const maxHeight = chartBottom - t;
    const _isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const emptyBarColor = _isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)';

    for (let i = 0; i < pillCount; i++) {
      const x = l + (i + 0.5) / pillCount * (W - l - r);
      bgPillsEl += `<rect x="${(x - pillW/2).toFixed(1)}" y="${t}" width="${pillW.toFixed(1)}" height="${maxHeight.toFixed(1)}" rx="${pillRadius}" fill="${emptyBarColor}"/>`;
    }
  }

  // Line path + fill (smooth curves)
  let lineEl = '', fillEl = '';
  if (!isBar && nonNull.length > 0) {
    const pathD = smoothPath(nonNull);
    if (nonNull.length > 1) {
      const isRunVolumeForFill = title === 'Laufvolumen';
      let startPt = nonNull[0];
      let endPt = nonNull[nonNull.length - 1];

      if (isRunVolumeForFill) {
        const pillW = Math.min(((W-l-r)/Math.max(n,1))*0.7, 50);
        startPt = { x: startPt.x - pillW / 2, y: startPt.y };
        // Do NOT extend endPt to right - keep it at the data point
      }

      fillEl = `<path d="${pathD} L${endPt.x.toFixed(1)},${chartBottom} L${startPt.x.toFixed(1)},${chartBottom} Z" fill="url(#${gradId})" stroke="none"/>`;
    }
    lineEl = `<path d="${pathD}" fill="none" stroke="${chartColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  // Dots - max 20 visible, dynamic step based on data count
  let dotsEl = '';
  let specialLabelsEl = '';
  if (!isBar && nonNull.length > 0) {
    const step = Math.ceil(nonNull.length / 20);
    dotsEl = nonNull.filter((p, i) => {
      const distFromEnd = nonNull.length - 1 - i;
      return distFromEnd % step === 0;
    }).map(p =>
      `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="${chartColor}" stroke="white" stroke-width="1.5"/>`
    ).join('');

    const maxPt = nonNull.reduce((a, b) => a.value > b.value ? a : b);
    const minPt = nonNull.reduce((a, b) => a.value < b.value ? a : b);
    const seen = new Set();
    // Only show tooltips for min and max
    specialLabelsEl = [maxPt, minPt].filter(p => {
      if (seen.has(p.idx)) return false;
      seen.add(p.idx);
      return true;
    }).map(p => {
      const formatted = avgFormatter ? avgFormatter(p.value) : p.value.toFixed(1);
      return tipBubble(p.x, p.y, formatted);
    }).join('');
  }

  // X-axis labels (bar charts use data-point labels, line charts use grid labels)
  let labelEls = '';
  if (isBar && hasLabels) {
    labelEls = allPts.map((p, i) => {
      if (!p || !labels[i]) return '';
      return `<text x="${p.x.toFixed(1)}" y="${chartBottom+14}" font-size="10" fill="var(--text-mute)" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif">${labels[i]}</text>`;
    }).join('');
    if (labels.length > 0) {
      const lastLabel = labels[labels.length-1];
      const kwMatch = lastLabel.match(/KW(\d+)/);
      const lastWeek = kwMatch ? parseInt(kwMatch[1]) : 0;
      for (let i = 0; i < 2; i++) {
        const x = l + (n+i+0.5)/totalSlots*(W-l-r);
        labelEls += `<text x="${x.toFixed(1)}" y="${chartBottom+14}" font-size="10" fill="var(--text-mute)" opacity="0.5" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif">KW${lastWeek+i+1}</text>`;
      }
    }
  } else if (!isBar) {
    labelEls = gridLabelEls;
  }

  // Avg badge (in HTML header)
  const avg = valid.reduce((a,v) => a+v, 0) / valid.length;
  const avgStr = avgFormatter ? avgFormatter(avg) : `${avg.toFixed(1)} ${unit}`;
  const badgeText = `Ø ${avgStr}`;

  const badgeBgOpacity = isDark ? 0.25 : 0.1;
  const iconBgOpacity = isDark ? 0.2 : 0.12;

  // Build table rows from data (newest first)
  const tableRows = [];
  for (let i = numericValues.length - 1; i >= 0; i--) {
    const v = numericValues[i];
    if (v === null || isNaN(v)) continue;
    const lbl = labels[i] || '';
    const formatted = avgFormatter ? avgFormatter(v) : `${v.toFixed(1)} ${unit}`;
    const prev = (() => { for (let j = i - 1; j >= 0; j--) { if (numericValues[j] !== null && !isNaN(numericValues[j])) return numericValues[j]; } return null; })();
    let delta = '';
    if (prev !== null) {
      const diff = v - prev;
      const sign = diff > 0 ? '+' : '';
      delta = `<span class="sparkline-table-delta ${diff > 0 ? 'up' : diff < 0 ? 'down' : ''}">${sign}${diff.toFixed(1)}</span>`;
    }
    tableRows.push(`<tr><td>${lbl}</td><td>${formatted}</td><td>${delta}</td></tr>`);
  }

  const tableId = `table_${(title||'x').replace(/\s/g,'')}`;

  return `
    <div class="sparkline-card">
      <div class="sparkline-header">
        <div class="sparkline-icon" style="background:${hexToRgba(chartColor,iconBgOpacity)};color:${chartColor};">${cfg.iconSvg}</div>
        <span class="sparkline-title">${title}</span>
        <span class="sparkline-badge" style="background:${hexToRgba(chartColor,badgeBgOpacity)};color:${chartColor};">${badgeText}</span>
        <button class="sparkline-expand" onclick="toggleSparklineTable(this)" aria-label="Details anzeigen" style="color:${chartColor};"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button>
      </div>
      <svg viewBox="0 0 ${W} ${H}" class="sparkline-chart">
        <defs>${gridGradient}</defs>
        ${fillGradient}
        ${gridLines}
        ${bgPillsEl}
        ${fillEl}
        ${barsEl}
        ${lineEl}
        ${dotsEl}
        ${specialLabelsEl}
        ${labelEls}
      </svg>
      <div class="sparkline-table-wrap" id="${tableId}">
        <table class="sparkline-table">
          <thead><tr><th>Datum</th><th>Wert</th><th>Δ</th></tr></thead>
          <tbody>${tableRows.join('')}</tbody>
        </table>
      </div>
    </div>
  `;
}

// ============================================================
// DARK MODE
// ============================================================

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeUI(newTheme);
}

function updateThemeUI(theme) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  if (theme === 'dark') {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  }
}

function applyTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeUI(saved);
}

applyTheme();

// ============================================================
// BODY METRICS
// ============================================================

function loadBodyTargets() {
  try {
    const raw = localStorage.getItem('bodyTargets');
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveBodyTargets() {
  if (state.readOnly) return;
  const targets = {
    weight: document.getElementById('targetWeight').value,
    fat: document.getElementById('targetFat').value
  };
  localStorage.setItem('bodyTargets', JSON.stringify(targets));
  updateTargetDisplays();
  syncBodyTargetsToSupabase(targets);
}

function loadBodyMetrics(dateKey) {
  try {
    const raw = localStorage.getItem(`bodyMetrics:${dateKey}`);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveBodyMetrics() {
  if (state.readOnly) return;
  const dateKey = getDateKey(new Date());
  const bw = document.getElementById('bodyWeight');
  const bf = document.getElementById('bodyFat');
  if (bw && bw.value) bw.classList.remove('prefilled');
  if (bf && bf.value) bf.classList.remove('prefilled');
  const metrics = {
    weight: bw ? bw.value : '',
    fat: bf ? bf.value : ''
  };
  localStorage.setItem(`bodyMetrics:${dateKey}`, JSON.stringify(metrics));
  syncBodyMetricsToSupabase(dateKey, metrics);

  // Update sparklines and dashboard
  const ws = document.getElementById('weightSparkline');
  const fs = document.getElementById('fatSparkline');
  if (ws) ws.innerHTML = renderBodyMetricSparkline('weight');
  if (fs) fs.innerHTML = renderBodyMetricSparkline('fat');
  renderDashboard();
}

function loadAllBodyMetrics() {
  const metrics = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('bodyMetrics:')) {
      try {
        const val = localStorage.getItem(key);
        if (val) {
          metrics.push({
            date: key.replace('bodyMetrics:', ''),
            data: JSON.parse(val)
          });
        }
      } catch (e) { /* skip */ }
    }
  }
  return metrics.sort((a, b) => a.date.localeCompare(b.date));
}

function updateTargetDisplays() {
  const targets = loadBodyTargets();
  const wd = document.getElementById('weightTargetDisplay');
  const fd = document.getElementById('fatTargetDisplay');
  if (wd) wd.textContent = targets.weight || '—';
  if (fd) fd.textContent = targets.fat || '—';
}

function initBodyMetrics() {
  const targets = loadBodyTargets();
  const todayKey = getDateKey(new Date());
  const todayMetrics = loadBodyMetrics(todayKey);

  const allMetrics = loadAllBodyMetrics();
  const lastEntry = allMetrics.filter(m => m.date < todayKey).pop();
  const lastMetrics = (lastEntry && lastEntry.data) || {};

  const tw = document.getElementById('targetWeight');
  const tf = document.getElementById('targetFat');
  const bw = document.getElementById('bodyWeight');
  const bf = document.getElementById('bodyFat');

  if (tw && targets.weight) tw.value = targets.weight;
  if (tf && targets.fat) tf.value = targets.fat;

  if (bw) {
    if (todayMetrics.weight) {
      bw.value = todayMetrics.weight;
      bw.classList.remove('prefilled');
    } else if (lastMetrics.weight) {
      bw.value = '';
      bw.placeholder = lastMetrics.weight;
      bw.classList.add('prefilled');
    }
  }
  if (bf) {
    if (todayMetrics.fat) {
      bf.value = todayMetrics.fat;
      bf.classList.remove('prefilled');
    } else if (lastMetrics.fat) {
      bf.value = '';
      bf.placeholder = lastMetrics.fat;
      bf.classList.add('prefilled');
    }
  }

  updateTargetDisplays();

  // Render sparklines
  const ws = document.getElementById('weightSparkline');
  const fs = document.getElementById('fatSparkline');
  if (ws) ws.innerHTML = renderBodyMetricSparkline('weight');
  if (fs) fs.innerHTML = renderBodyMetricSparkline('fat');
}

async function syncBodyMetricsToSupabase(dateKey, metrics) {
  if (state.readOnly) return;
  try {
    console.log('Syncing body metrics:', dateKey, metrics);
    const result = await supabaseClient
      .from('body_metrics')
      .upsert({ date: dateKey, data: metrics }, { onConflict: 'date' });
    console.log('Body metrics sync result:', result);
    if (result.error) {
      console.error('Supabase body_metrics sync error:', result.error);
    } else {
      console.log('Body metrics synced successfully');
    }
  } catch (e) {
    console.error('Supabase body_metrics sync exception:', e);
  }
}

async function syncBodyTargetsToSupabase(targets) {
  if (state.readOnly) return;
  try {
    console.log('Syncing body targets:', targets);
    const result = await supabaseClient
      .from('body_targets')
      .upsert({ id: 'default', data: targets }, { onConflict: 'id' });
    console.log('Body targets sync result:', result);
    if (result.error) {
      console.error('Supabase body_targets sync error:', result.error);
    } else {
      console.log('Body targets synced successfully');
    }
  } catch (e) {
    console.error('Supabase body_targets sync exception:', e);
  }
}

// ============================================================
// PASSWORD PROTECTION
// ============================================================
// Auth code moved to js/auth.js for early loading

async function init() {
  const savedAvatar = localStorage.getItem('avatarUrl');
  if (savedAvatar) {
    document.getElementById('headerAvatar').src = savedAvatar;
    state.avatar_url = savedAvatar;
  }

  try {
    const { data, error } = await supabaseClient
      .from('settings')
      .select('value')
      .eq('key', 'avatar_url')
      .maybeSingle();
    if (!error && data?.value) {
      state.avatar_url = data.value;
      document.getElementById('headerAvatar').src = data.value;
      localStorage.setItem('avatarUrl', data.value);
    }
  } catch (e) {
    console.error('Avatar loading error:', e);
  }

  loadUserTitle();
  renderHeader();
  const todayDay = getDayOfWeek(new Date());
  const effectiveDaysInit = getEffectiveDays();
  state.selectedDay = effectiveDaysInit.includes(todayDay) ? todayDay : effectiveDaysInit[0] || DAYS[0];
  renderWeekNav();
  renderSession();
  renderHistory();
  initBodyMetrics();

  renderStats();
  setTimeout(renderDashboard, 100);

  syncAllFromSupabase().then(() => {
    renderWeekNav();
    renderSession();
    renderHistory();
    initBodyMetrics();
    renderStats();
    renderDashboard();
  });
  setInterval(updateSyncIndicator, 500);

  // Cross-tab sync via storage event (only fires in OTHER tabs)
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('workout:')) {
      renderWeekNav();
      renderSession();
      renderHistory();
      renderStats();
    } else if (e.key && e.key.startsWith('bodyMetrics:')) {
      initBodyMetrics();
      renderDashboard();
    } else if (e.key === 'bodyTargets') {
      updateTargetDisplays();
      renderDashboard();
    }
  });
}

window.toggleExercise = toggleExercise;
window.markComplete = markComplete;
window.markIncomplete = markIncomplete;
window.jumpToDate = jumpToDate;
window.changeWeek = changeWeek;
window.goToWeekOffset = goToWeekOffset;
window.toggleWeekPicker = toggleWeekPicker;
window.closeWeekPicker = closeWeekPicker;
window.deleteCurrentWorkout = deleteCurrentWorkout;
window.deleteWorkoutDate = deleteWorkoutDate;
// checkPassword is already exposed earlier for immediate onclick availability
window.toggleTheme = toggleTheme;
window.changeAvatar = changeAvatar;
window.saveCroppedAvatar = saveCroppedAvatar;
window.closeCropperModal = closeCropperModal;
window.closeUploadPwModal = closeUploadPwModal;
window.cancelUploadPw = cancelUploadPw;
window.confirmUploadPw = confirmUploadPw;
window.saveBodyMetrics = saveBodyMetrics;
window.saveBodyTargets = saveBodyTargets;
window.toggleStopwatch = toggleStopwatch;
window.resetStopwatch = resetStopwatch;
window.setCountdown = setCountdown;
window.calendarPrev = calendarPrev;
window.calendarNext = calendarNext;
window.openCalendarModal = openCalendarModal;
window.closeCalendarModal = closeCalendarModal;
window.openTitleEditor = openTitleEditor;
window.closeTitleEditor = closeTitleEditor;
window.saveTitleEditor = saveTitleEditor;

function handleDOMReady() {
  // Register listener BEFORE initializeAuthScreen(), so gymLogUnlocked event is caught
  window.addEventListener('gymLogUnlocked', init);
  initializeAuthScreen();
  const uploadPwInput = document.getElementById('uploadPwInput');
  if (uploadPwInput) {
    uploadPwInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') confirmUploadPw();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDOMReady);
} else {
  handleDOMReady();
}
