// ============================================================
// PASSWORD PROTECTION
// Loaded first to ensure checkPassword is available for onclick
// ============================================================

const CORRECT_PASSWORD = 'fusion2026';
const VIEWER_PASSWORD = 'viewer2025';

function checkPassword() {
  const input = document.getElementById('passwordInput');
  const password = input.value.trim();
  const errorEl = document.getElementById('passwordError');

  if (password === CORRECT_PASSWORD) {
    errorEl.classList.remove('show');
    localStorage.setItem('gymLogAuth', 'full');
    window.gymLogReadOnly = false;
    unlockApp();
  } else if (password === VIEWER_PASSWORD) {
    errorEl.classList.remove('show');
    localStorage.setItem('gymLogAuth', 'viewer');
    window.gymLogReadOnly = true;
    unlockApp();
  } else {
    errorEl.classList.add('show');
    input.value = '';
    input.focus();
  }
}

function unlockApp() {
  document.getElementById('passwordScreen').classList.add('hidden');
  document.getElementById('mainContent').style.display = 'block';
  if (window.gymLogReadOnly) applyReadOnly();
  window.dispatchEvent(new Event('gymLogUnlocked'));
}

function applyReadOnly() {
  document.body.classList.add('read-only');
}

function initializeAuthScreen() {
  const authLevel = localStorage.getItem('gymLogAuth');

  if (authLevel === 'full' || authLevel === 'true') {
    window.gymLogReadOnly = false;
    unlockApp();
  } else if (authLevel === 'viewer') {
    window.gymLogReadOnly = true;
    unlockApp();
  } else {
    const pwInput = document.getElementById('passwordInput');
    if (pwInput) pwInput.focus();
  }

  // Allow Enter key to submit password
  const pwInput = document.getElementById('passwordInput');
  if (pwInput) {
    pwInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') checkPassword();
    });
  }
}

// Make functions globally available
window.checkPassword = checkPassword;
window.unlockApp = unlockApp;
window.initializeAuthScreen = initializeAuthScreen;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAuthScreen);
} else {
  initializeAuthScreen();
}
