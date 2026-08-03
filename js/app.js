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

  const buildEl = document.getElementById('buildHash');
  if (buildEl) buildEl.textContent = APP_COMMIT;
  loadUserTitle();
  renderHeader();
  const todayIdx = DAYS.indexOf(getDayOfWeek(new Date()));
  const effectiveDaysInit = getEffectiveDays();
  state.selectedDay = effectiveDaysInit[todayIdx] || effectiveDaysInit[0] || DAYS[0];
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
window.openTimerSheet = openTimerSheet;
window.closeTimerSheet = closeTimerSheet;
window.pickTimerPreset = pickTimerPreset;
window.openWendlerSheet = openWendlerSheet;
window.closeWendlerSheet = closeWendlerSheet;
window.wendlerSetWeek = wendlerSetWeek;
window.wendlerSetDay = wendlerSetDay;
window.toggleWendlerTMEditor = toggleWendlerTMEditor;
window.saveWendlerTM = saveWendlerTM;
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
