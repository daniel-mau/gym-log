// ============================================================
// RUN PACE HISTORY & SPARKLINES (Tempo + Interval)
// ============================================================

function getTempoPaceHistory() {
  const workouts = loadAllWorkouts();
  const eightyWeeksAgo = new Date();
  eightyWeeksAgo.setDate(eightyWeeksAgo.getDate() - 56);
  const cutoffKey = getDateKey(eightyWeeksAgo);

  const weeklyData = {};
  workouts.forEach(w => {
    if (w.date < cutoffKey || !w.data || w.data.type !== 'run' || !w.data.run) return;
    const plan = WEEK_PLAN[w.data.day];
    if (!plan || plan.runType !== 'tempo') return;

    const r = w.data.run;
    const dist = parseFloat(r.tempo_distance);
    const time = parseTime(r.tempo_time);
    if (!dist || !time || dist <= 0 || time <= 0) return;

    const date = new Date(w.date);
    const ws = new Date(date);
    ws.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    const weekKey = getDateKey(ws);

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = { paces: [], count: 0 };
    }

    const paceSecPerKm = time / dist;
    weeklyData[weekKey].paces.push(paceSecPerKm);
    weeklyData[weekKey].count++;
  });

  return Object.keys(weeklyData)
    .sort()
    .slice(-8)
    .map(weekKey => ({
      week: weekKey,
      avgPace: weeklyData[weekKey].paces.reduce((a, b) => a + b, 0) / weeklyData[weekKey].paces.length,
      count: weeklyData[weekKey].count
    }))
    .filter(h => h.avgPace > 0 && isFinite(h.avgPace));
}

function getIntervalPaceHistory() {
  const workouts = loadAllWorkouts();
  const eightyWeeksAgo = new Date();
  eightyWeeksAgo.setDate(eightyWeeksAgo.getDate() - 56);
  const cutoffKey = getDateKey(eightyWeeksAgo);

  const weeklyData = {};
  workouts.forEach(w => {
    if (w.date < cutoffKey || !w.data || w.data.type !== 'run' || !w.data.run) return;
    const plan = WEEK_PLAN[w.data.day];
    if (!plan || plan.runType !== 'interval') return;

    const r = w.data.run;
    const distM = parseFloat(r.interval_distance);
    const time = parseTime(r.interval_avg_time);
    if (!distM || !time || distM <= 0 || time <= 0) return;

    const date = new Date(w.date);
    const ws = new Date(date);
    ws.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    const weekKey = getDateKey(ws);

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = { paces: [], count: 0 };
    }

    const distKm = distM / 1000;
    const paceSecPerKm = time / distKm;
    weeklyData[weekKey].paces.push(paceSecPerKm);
    weeklyData[weekKey].count++;
  });

  return Object.keys(weeklyData)
    .sort()
    .slice(-8)
    .map(weekKey => ({
      week: weekKey,
      avgPace: weeklyData[weekKey].paces.reduce((a, b) => a + b, 0) / weeklyData[weekKey].paces.length,
      count: weeklyData[weekKey].count
    }))
    .filter(h => h.avgPace > 0 && isFinite(h.avgPace));
}

function renderRunPaceSparkline(runType) {
  const history = runType === 'tempo' ? getTempoPaceHistory() : getIntervalPaceHistory();
  if (history.length === 0) return '';

  const paces = history.map(h => h.avgPace).filter(p => isFinite(p) && p > 0);
  if (paces.length === 0) return '';

  const maxPace = Math.max(...paces);
  const minPace = Math.min(...paces);
  const range = Math.max(maxPace - minPace, 10);
  const padding = range * 0.1;

  const svgWidth = 200;
  const svgHeight = 64;
  const chartTop = 30;
  const chartBottom = 0;
  const chartLeft = 10;
  const chartRight = 10;
  const chartWidth = svgWidth - chartLeft - chartRight;
  const chartHeight = svgHeight - chartTop - chartBottom;

  const points = history.map((h, i) => {
    const x = chartLeft + (i / (history.length - 1 || 1)) * chartWidth;
    const y = svgHeight - chartBottom - ((h.avgPace - minPace + padding) / (range + padding * 2)) * chartHeight;
    return { x: isFinite(x) ? x : 0, y: isFinite(y) ? y : 0, pace: h.avgPace, count: h.count };
  }).filter(p => isFinite(p.x) && isFinite(p.y));

  let pathData;
  if (points.length < 2) {
    pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  } else {
    pathData = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1], p1 = points[i];
      const mx = ((p0.x + p1.x) / 2).toFixed(1);
      pathData += ` C${mx},${p0.y.toFixed(1)} ${mx},${p1.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }
  }

  const minPaceValue = Math.min(...points.map(p => p.pace));
  const maxPaceValue = Math.max(...points.map(p => p.pace));

  const formatPaceLabel = sec => {
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const tooltips = points
    .filter(p => p.pace === minPaceValue || p.pace === maxPaceValue)
    .map(p => {
      const label = `${formatPaceLabel(p.pace)} /km`;
      const labelW = label.length * 5.8 + 12;
      const labelH = 18;
      const arrowLen = 4;
      const gap = 3;
      const liftOff = 2;
      const labelY = p.y - labelH - arrowLen - gap - liftOff;
      const arrowW = 6;
      const gymRx = 9;
      const gymMargin = gymRx + arrowW / 2;
      const overflow = 8;
      let labelX = p.x - labelW / 2;
      labelX = Math.min(labelX, p.x - gymMargin);
      labelX = Math.max(labelX, p.x - labelW + gymMargin);
      labelX = Math.max(-overflow, Math.min(svgWidth - labelW + overflow, labelX));
      const arrowTip = p.y - liftOff;
      const arrowPath = `M${(p.x - arrowW / 2).toFixed(1)},${(labelY + labelH).toFixed(1)} L${(p.x - 1.5).toFixed(1)},${(arrowTip - 1.5).toFixed(1)} Q${p.x.toFixed(1)},${arrowTip.toFixed(1)} ${(p.x + 1.5).toFixed(1)},${(arrowTip - 1.5).toFixed(1)} L${(p.x + arrowW / 2).toFixed(1)},${(labelY + labelH).toFixed(1)} Z`;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const chartColor = runType === 'tempo' ? (isDark ? '#5E5CE6' : '#5856D6') : (isDark ? '#FF9F0A' : '#FF9500');
      return `<g>
        <path d="${arrowPath}" fill="rgba(30,30,30,0.75)"/>
        <rect x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" width="${labelW.toFixed(1)}" height="${labelH}" rx="9" fill="rgba(30,30,30,0.75)"/>
        <text x="${(labelX + labelW / 2).toFixed(1)}" y="${(labelY + 12.5).toFixed(1)}" font-size="10" fill="white" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="600" letter-spacing="-0.2">${label}</text>
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="${chartColor}"/>
      </g>`;
    }).join('');

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const chartColor = runType === 'tempo' ? (isDark ? '#5E5CE6' : '#5856D6') : (isDark ? '#FF9F0A' : '#FF9500');
  const gradColor = runType === 'tempo' ? 'rgba(94,92,230,0.12)' : 'rgba(255,159,10,0.12)';
  const strokeColor = runType === 'tempo' ? 'rgba(94,92,230,0.6)' : 'rgba(255,159,10,0.6)';

  return `
    <div data-run-sparkline="${runType}" style="margin-top:10px;font-size:12px;color:var(--text-mute);margin-bottom:2px;">
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width:100%;height:64px;display:block;">
        <defs>
          <linearGradient id="runGrad_${runType}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${gradColor}"/>
            <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
          </linearGradient>
        </defs>
        <path d="${pathData} L${svgWidth - chartRight},${svgHeight - chartBottom} L${chartLeft},${svgHeight - chartBottom} Z"
          fill="url(#runGrad_${runType})" stroke="none"/>
        <path d="${pathData}"
          fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${tooltips}
      </svg>
    </div>
  `;
}

function refreshRunPaceSparklines() {
  document.querySelectorAll('[data-run-sparkline]').forEach(el => {
    const runType = el.dataset.runSparkline;
    const html = renderRunPaceSparkline(runType);
    if (html) {
      const tpl = document.createElement('template');
      tpl.innerHTML = html.trim();
      el.replaceWith(tpl.content.firstChild);
    }
  });
}
