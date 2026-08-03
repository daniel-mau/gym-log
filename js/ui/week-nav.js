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
  const allPlanKeys = Object.keys(WEEK_PLAN);
  const benchKeys = allPlanKeys.filter(k => !days.includes(k));
  list.innerHTML = '';

  const group = document.createElement('div');
  group.className = 'we-ios-group';

  const gripSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="16" x2="20" y2="16"/></svg>';

  days.forEach((dayKey, idx) => {
    const plan = WEEK_PLAN[dayKey];
    const slotDay = DAYS[idx] || DAYS[DAYS.length - 1];

    const row = document.createElement('div');
    row.className = 'we-ios-row';
    row.dataset.day = dayKey;

    row.innerHTML = `
      <span class="we-ios-day">${DAY_LABELS[slotDay]}</span>
      <span class="session-badge badge-${plan.type}">${DAY_TYPE_LABELS[plan.type] || plan.type}</span>
      <span class="we-ios-title">${plan.name}</span>
      <span class="we-ios-grip drag-handle">${gripSvg}</span>
    `;
    group.appendChild(row);
  });

  if (benchKeys.length > 0) {
    const divider = document.createElement('div');
    divider.className = 'we-ios-bench-divider';
    divider.textContent = 'Ersatzbank';
    group.appendChild(divider);

    benchKeys.forEach((dayKey) => {
      const plan = WEEK_PLAN[dayKey];

      const row = document.createElement('div');
      row.className = 'we-ios-row we-bench';
      row.dataset.day = dayKey;

      row.innerHTML = `
        <span class="we-ios-day"></span>
        <span class="session-badge badge-${plan.type}">${DAY_TYPE_LABELS[plan.type] || plan.type}</span>
        <span class="we-ios-title">${plan.name}</span>
        <span class="we-ios-grip drag-handle">${gripSvg}</span>
      `;
      group.appendChild(row);
    });
  }

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

    rows.forEach(row => {
      row.style.transform = '';
      row.style.transition = '';
      row.classList.remove('we-ios-dragging');
    });

    if (targetIdx !== origIdx) {
      const removed = rows.splice(origIdx, 1)[0];
      rows.splice(targetIdx, 0, removed);
    }

    dragRow = null;
    origIdx = -1;
    targetIdx = -1;

    const activeKeys = rows.slice(0, 7).map(r => r.dataset.day);
    saveWeekOverride(activeKeys);
    renderWeekEditorList();
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
    const isDone = (wo && wo.completed) || (plan.type === 'rest' && !isFuture);
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
  renderHistory();
}

