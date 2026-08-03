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

  const ws = document.getElementById('weightSparkline');
  const fs = document.getElementById('fatSparkline');
  if (ws) ws.innerHTML = renderBodyMetricSparkline('weight');
  if (fs) fs.innerHTML = renderBodyMetricSparkline('fat');
}

async function syncBodyMetricsToSupabase(dateKey, metrics) {
  if (state.readOnly) return;
  try {
    const result = await supabaseClient
      .from('body_metrics')
      .upsert({ date: dateKey, data: metrics }, { onConflict: 'date' });
    if (result.error) console.error('Supabase body_metrics sync error:', result.error);
  } catch (e) {
    console.error('Supabase body_metrics sync exception:', e);
  }
}

async function syncBodyTargetsToSupabase(targets) {
  if (state.readOnly) return;
  try {
    const result = await supabaseClient
      .from('body_targets')
      .upsert({ id: 'default', data: targets }, { onConflict: 'id' });
    if (result.error) console.error('Supabase body_targets sync error:', result.error);
  } catch (e) {
    console.error('Supabase body_targets sync exception:', e);
  }
}
