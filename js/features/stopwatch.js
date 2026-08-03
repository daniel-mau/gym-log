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
