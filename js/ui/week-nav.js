// ============================================================
// WEEK NAVIGATION — header, week editor, drag-drop, day select
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
  renderHistory();
  closeWeekPicker();
}

function goToWeekOffset(offset) {
  collectAndSave();
  state.weekOffset = offset;
  validateSelectedDay();
  renderHeader();
  renderWeekNav();
  renderSession();
  renderHistory();
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
    const sessions = getSessionsForDay(dayKey);
    const primarySession = getPrimarySessionForDay(dayKey);
    const slotDay = DAYS[idx] || DAYS[DAYS.length - 1];

    const row = document.createElement('div');
    row.className = 'we-ios-row';
    row.dataset.day = dayKey;

    // Multi-Session Badge
    let badgeHtml = '';
    if (sessions.length > 1) {
      const labels = sessions.map(s => {
        const t = s.session.type;
        return DAY_TYPE_LABELS[t] || t;
      });
      badgeHtml = `<span class="session-badge badge-multi">${labels.join(' + ')}</span>`;
    } else {
      const t = primarySession.type;
      badgeHtml = `<span class="session-badge badge-${t}">${DAY_TYPE_LABELS[t] || t}</span>`;
    }

    // Title zeigt alle Sessions
    let titleHtml = sessions.map(s => s.session.name).join(' + ');

    row.innerHTML = `
      <span class="we-ios-day">${DAY_LABELS[slotDay]}</span>
      ${badgeHtml}
      <span class="we-ios-title">${titleHtml}</span>
      <button class="we-ios-edit-btn" onclick="event.stopPropagation(); openSessionPicker('${dayKey}')">✏️</button>
    `;
    group.appendChild(row);
  });

  list.appendChild(group);
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
    const sessions = getSessionsForDay(dayKey);
    const primarySession = getPrimarySessionForDay(dayKey);
    const isSelected = dayKey === state.selectedDay;
    const wo = loadWorkout(dateKey);
    const isFuture = dateKey > todayKey;
    const isPast = dateKey < todayKey;
    const isDone = (wo && wo.completed) || (primarySession.type === 'rest' && !isFuture);
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

    // Type label zeigt Mehrfach-Sessions
    let typeLabel = '';
    if (sessions.length > 1) {
      const labels = sessions.map(s => {
        const t = s.session.type;
        return t === 'gym' ? 'Gym' : t === 'run' || t === 'long' ? 'Lauf' : t === 'rest' ? 'Ruhe' : t;
      });
      typeLabel = labels.join(' + ');
    } else {
      const t = primarySession.type;
      typeLabel = t === 'gym' ? 'Gym' : t === 'run' || t === 'long' ? 'Lauf' : t === 'rest' ? 'Ruhe' : t;
    }

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
  renderHistory();
}

// ============================================================
// SESSION PICKER — iOS-style Bottom Sheet
// ============================================================

let sessionPickerTargetDay = null;

function openSessionPicker(dayKey) {
  sessionPickerTargetDay = dayKey;
  const wrapper = document.querySelector('.week-editor-content-wrapper');
  const list = document.getElementById('sessionPickerList');

  // Render alle verfügbaren Sessions
  const sessionKeys = ['shoulder_pull', 'back_deadlift', 'chest_press', 'easy_run', 'long_run', 'interval_run', 'tempo_run', 'rest_day'];

  list.innerHTML = '';
  sessionKeys.forEach(key => {
    const session = SESSIONS[key];
    if (!session) return;

    const item = document.createElement('div');
    item.className = 'session-picker-item';
    item.onclick = () => {
      addSessionToDay(dayKey, key);
      closeSessionPicker();
    };

    // Icon je nach Session-Type
    let icon = '💪';
    if (session.type === 'run' || session.type === 'long') icon = '🏃';
    if (session.type === 'rest') icon = '😴';

    item.innerHTML = `
      <div class="session-picker-item-icon">${icon}</div>
      <div class="session-picker-item-info">
        <div class="session-picker-item-name">${session.name}</div>
        <div class="session-picker-item-subtitle">${session.subtitle || ''}</div>
      </div>
    `;
    list.appendChild(item);
  });

  // Slide nach rechts (Session Picker wird sichtbar)
  wrapper.classList.add('show-picker');

  // Haptic Feedback (falls Browser unterstützt)
  if (navigator.vibrate) navigator.vibrate(10);
}

function closeSessionPicker() {
  const wrapper = document.querySelector('.week-editor-content-wrapper');
  wrapper.classList.remove('show-picker');
  sessionPickerTargetDay = null;
}

function addSessionToDay(dayKey, sessionKey) {
  // Phase 1: Ersetze die Session (noch kein Multi-Session Support)
  // In Phase 2 würden wir hier die Session zum Tag hinzufügen statt zu ersetzen

  const currentPlan = WEEK_PLAN[dayKey];

  // Update WEEK_PLAN (temporär, nur für diese Woche)
  WEEK_PLAN[dayKey] = { evening: sessionKey };

  // Triggere Re-Render
  renderWeekEditorList();
  renderWeekNav();

  // Speichere Änderung
  const days = getEffectiveDays();
  saveWeekOverride(days);

  // Haptic Feedback
  if (navigator.vibrate) navigator.vibrate(10);
}


