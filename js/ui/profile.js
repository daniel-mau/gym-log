// ============================================================
// PROFILE — sync indicator, avatar, cropper
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

