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

const TIMER_PRESETS = [
  { seconds: 0,   label: '0:00', sub: 'Stoppuhr' },
  { seconds: 30,  label: '0:30', sub: '30 Sek'   },
  { seconds: 60,  label: '1:00', sub: '1 Min'    },
  { seconds: 90,  label: '1:30', sub: '1.5 Min'  },
  { seconds: 120, label: '2:00', sub: '2 Min'    },
  { seconds: 180, label: '3:00', sub: '3 Min'    },
];

let activeTimerPreset = 0;

function openTimerSheet() {
  const overlay = document.getElementById('timerOverlay');
  if (!overlay) return;
  renderTimerSheet();
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
}

function closeTimerSheet() {
  const overlay = document.getElementById('timerOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  setTimeout(() => { overlay.style.display = 'none'; }, 320);
}

function renderTimerSheet() {
  const grid = document.getElementById('timerPresetGrid');
  if (!grid) return;
  grid.innerHTML = TIMER_PRESETS.map(p => `
    <button class="timer-preset-tile${p.seconds === activeTimerPreset ? ' active' : ''}${p.seconds === 0 ? ' stopwatch-mode' : ''}"
            onclick="pickTimerPreset(${p.seconds})">
      <span class="tpt-time">${p.label}</span>
      <span class="tpt-sub">${p.sub}</span>
    </button>`).join('');
}

function pickTimerPreset(seconds) {
  activeTimerPreset = seconds;
  closeTimerSheet();
  if (seconds === 0) {
    resetStopwatch();
  } else {
    setCountdown(seconds);
  }
}

function updateStopwatchDisplay() {
  const display = document.getElementById('stopwatchDisplay');
  if (!display) return;
  const m = Math.floor(stopwatch.seconds / 60);
  const s = stopwatch.seconds % 60;
  display.textContent = `${m}:${String(s).padStart(2, '0')}`;
  display.classList.toggle('countdown', stopwatch.countdown);
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
