// ============================================================
// WENDLER 5/3/1 — State, calculations, sheet UI
// ============================================================

const WENDLER_WEEKS = [
  { label: '5er', sets: [
    { pct: 0.65, reps: 5, amrap: false },
    { pct: 0.75, reps: 5, amrap: false },
    { pct: 0.85, reps: 5, amrap: true },
  ]},
  { label: '3er', sets: [
    { pct: 0.70, reps: 3, amrap: false },
    { pct: 0.80, reps: 3, amrap: false },
    { pct: 0.90, reps: 3, amrap: true },
  ]},
  { label: '531', sets: [
    { pct: 0.75, reps: 5, amrap: false },
    { pct: 0.85, reps: 3, amrap: false },
    { pct: 0.95, reps: 1, amrap: true },
  ]},
  { label: 'Deload', sets: [
    { pct: 0.40, reps: 5, amrap: false },
    { pct: 0.50, reps: 5, amrap: false },
    { pct: 0.60, reps: 5, amrap: false },
  ]},
];

const WENDLER_DEFAULT_LIFTS = [
  { key: 'ohp',      name: 'Schulterdrücken', shortName: 'OHP',   tm: 60,  increment: 2.5 },
  { key: 'bench',    name: 'Bankdrücken',     shortName: 'Bench', tm: 100, increment: 2.5 },
  { key: 'deadlift', name: 'Deadlift (Trapbar)', shortName: 'DL', tm: 140, increment: 5   },
];

let wendlerState = null;
let wendlerActiveDay = 0;

function loadWendlerState() {
  try {
    const raw = localStorage.getItem('wendler:config');
    if (raw) { wendlerState = JSON.parse(raw); return; }
  } catch(e) {}
  wendlerState = {
    lifts: WENDLER_DEFAULT_LIFTS.map(l => ({ ...l })),
    cycle: 1,
    week: 1,
  };
}

function saveWendlerState() {
  try { localStorage.setItem('wendler:config', JSON.stringify(wendlerState)); } catch(e) {}
}

function roundWeight(kg) {
  return Math.round(kg / 2.5) * 2.5;
}

function getWendlerSets(tm, weekIndex) {
  return WENDLER_WEEKS[weekIndex].sets.map(s => ({
    weight: roundWeight(tm * s.pct),
    reps: s.reps,
    amrap: s.amrap,
    pct: Math.round(s.pct * 100),
  }));
}

function openWendlerSheet() {
  if (!wendlerState) loadWendlerState();
  const overlay = document.getElementById('wendlerOverlay');
  if (!overlay) return;
  renderWendlerContent();
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
}

function closeWendlerSheet() {
  const overlay = document.getElementById('wendlerOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  setTimeout(() => { overlay.style.display = 'none'; }, 320);
}

function renderWendlerContent() {
  const inner = document.getElementById('wendlerSheetInner');
  if (!inner || !wendlerState) return;

  const weekIdx = wendlerState.week - 1;
  const lift    = wendlerState.lifts[wendlerActiveDay];
  const sets    = getWendlerSets(lift.tm, weekIdx);

  const segsHTML = WENDLER_WEEKS.map((w, i) => `
    <button class="wendler-seg${i === weekIdx ? ' active' : ''}" onclick="wendlerSetWeek(${i + 1})">
      <span class="ws-week">W${i + 1}</span>
      <span class="ws-label">${w.label}</span>
    </button>`).join('');

  const tabsHTML = wendlerState.lifts.map((l, i) => `
    <button class="wendler-day-tab${i === wendlerActiveDay ? ' active' : ''}" onclick="wendlerSetDay(${i})">
      <span class="wdt-num">Tag ${i + 1}</span>
      <span class="wdt-lift">${l.shortName}</span>
    </button>`).join('');

  const setsHTML = sets.map((s, i) => `
    <div class="wendler-set-row${s.amrap ? ' amrap' : ''}">
      <div class="wendler-set-badge">${i + 1}</div>
      <div class="wendler-set-info">
        <div class="wendler-set-primary">
          ${s.weight} kg × ${s.reps}${s.amrap ? '+' : ''}
          ${s.amrap ? '<span class="wendler-amrap-tag">AMRAP</span>' : ''}
        </div>
        <div class="wendler-set-secondary">${s.amrap ? 'Maximale Wiederholungen' : `Set ${i + 1}`}</div>
      </div>
      <div class="wendler-set-pct">${s.pct}%</div>
    </div>`).join('');

  const weekFills = [25, 50, 75, 100];
  const progressHTML = wendlerState.lifts.map((l, i) => `
    <div class="wendler-progress-item${i === wendlerActiveDay ? ' active' : ''}">
      <div class="wpi-name">${l.shortName}</div>
      <div class="wpi-tm">${l.tm} <span class="wpi-unit">kg</span></div>
      <div class="wpi-bar"><div class="wpi-bar-fill" style="width:${weekFills[weekIdx]}%"></div></div>
      <div class="wpi-badge">+${l.increment} kg</div>
    </div>`).join('');

  inner.innerHTML = `
    <div class="wendler-header">
      <div class="wendler-header-title">Wendler 5/3/1</div>
      <div class="wendler-header-sub">Zyklus ${wendlerState.cycle} · Woche ${wendlerState.week}</div>
    </div>
    <div class="wendler-segments">${segsHTML}</div>
    <div class="wendler-day-tabs">${tabsHTML}</div>
    <div class="wendler-lift-card">
      <div class="wendler-lift-header">
        <div class="wendler-lift-title-row">
          <span class="wendler-lift-name">${lift.name}</span>
          <button class="wendler-edit-tm-btn" onclick="toggleWendlerTMEditor()" title="Training Max bearbeiten">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z"/>
            </svg>
          </button>
        </div>
        <div class="wendler-tm-row">Training Max: <strong>${lift.tm} kg</strong></div>
        <div class="wendler-tm-editor" id="wendlerTMEditor">
          <input type="number" class="wendler-tm-input" id="wendlerTMInput" value="${lift.tm}" step="2.5" min="20" inputmode="decimal">
          <button class="wendler-tm-save" onclick="saveWendlerTM()">Speichern</button>
          <button class="wendler-tm-cancel" onclick="toggleWendlerTMEditor()">✕</button>
        </div>
      </div>
      <div class="wendler-set-list">${setsHTML}</div>
    </div>
    <div class="wendler-progress-label">Zyklus-Fortschritt</div>
    <div class="wendler-progress-row">${progressHTML}</div>
  `;
}

function wendlerSetWeek(week) {
  if (!wendlerState) return;
  wendlerState.week = week;
  saveWendlerState();
  renderWendlerContent();
}

function wendlerSetDay(dayIndex) {
  wendlerActiveDay = dayIndex;
  renderWendlerContent();
}

function toggleWendlerTMEditor() {
  const editor = document.getElementById('wendlerTMEditor');
  if (!editor) return;
  editor.classList.toggle('open');
  if (editor.classList.contains('open')) {
    const input = document.getElementById('wendlerTMInput');
    if (input) { input.focus(); input.select(); }
  }
}

function saveWendlerTM() {
  const input = document.getElementById('wendlerTMInput');
  if (!input || !wendlerState) return;
  const val = parseFloat(input.value);
  if (isNaN(val) || val < 20) return;
  wendlerState.lifts[wendlerActiveDay].tm = roundWeight(val);
  saveWendlerState();
  renderWendlerContent();
}
