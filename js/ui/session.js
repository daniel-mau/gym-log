// ============================================================
// SESSION — render, inputs, save, markComplete, toast
// ============================================================

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

  // Save bar — show warning banner if not viewing today, otherwise show normal controls
  const today = new Date();
  const todayIdx = DAYS.indexOf(getDayOfWeek(today));
  const effectiveDaysSave = getEffectiveDays();
  const todaySlotKey = effectiveDaysSave[todayIdx];
  const isViewingToday = state.weekOffset === 0 && state.selectedDay === todaySlotKey;

  if (!isViewingToday) {
    const days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
    const todayName = days[today.getDay()];
    html += `
      <div class="save-bar back-to-today-bar">
        <div class="back-to-today-left"><svg class="back-to-today-icon" viewBox="0 0 24 24" fill="#FF453A" stroke="#fff" stroke-width="1.5"><path d="M12 2L1 21h22L12 2z"/><line x1="12" y1="9" x2="12" y2="14" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.5" r="1" fill="#fff" stroke="none"/></svg><span class="back-to-today-label">Du siehst nicht den aktuellen Tag</span></div>
        <button class="back-to-today-btn" onclick="jumpToToday()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>Sync</button>
      </div>
    `;
  } else if (plan.type === 'gym') {
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

function jumpToToday() {
  collectAndSave();
  state.weekOffset = 0;
  const today = new Date();
  const todayIdx = DAYS.indexOf(getDayOfWeek(today));
  const effectiveDays = getEffectiveDays();
  state.selectedDay = effectiveDays[todayIdx] || effectiveDays[0] || DAYS[0];
  renderHeader();
  renderWeekNav();
  renderSession();
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
    refreshExerciseSparklines();
  }
}

async function markComplete() {
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
    const t = state.todayData.type;
    const label = t === 'gym' ? 'Gym-Einheit abgeschlossen'
                : (t === 'run' || t === 'long') ? 'Lauf abgeschlossen'
                : 'Einheit abgeschlossen';
    showToast(label);
    // Collapse all exercises
    const exerciseCards = document.querySelectorAll('.exercise-card');
    exerciseCards.forEach(card => card.classList.remove('expanded'));
    // Wait for cloud sync — only surface an error if it fails
    try {
      await state.lastSyncPromise;
    } catch (e) { /* syncToSupabase handles its own state.syncStatus */ }
    if (state.syncStatus === 'error') {
      showToast('Cloud-Sync fehlgeschlagen', 'error');
    }
  }
}

let toastTimer = null;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMessage');
  const icon = toast ? toast.querySelector('.toast-icon') : null;
  if (!toast || !msg) return;
  msg.textContent = message;
  toast.classList.toggle('toast-error', type === 'error');
  if (icon) {
    icon.innerHTML = type === 'error'
      ? '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
      : '<polyline points="20 6 9 17 4 12"></polyline>';
  }
  toast.classList.add('show');
  if ('vibrate' in navigator) navigator.vibrate(type === 'error' ? [100, 50, 100] : 30);
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
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

