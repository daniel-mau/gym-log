// ============================================================
// EXERCISE HISTORY & SPARKLINES
// ============================================================

function getExerciseHistory(exerciseId) {
  const workouts = loadAllWorkouts();
  const eightyWeeksAgo = new Date();
  eightyWeeksAgo.setDate(eightyWeeksAgo.getDate() - 56);
  const cutoffKey = getDateKey(eightyWeeksAgo);

  const weeklyData = {};
  workouts.forEach(w => {
    if (w.date < cutoffKey || !w.data || w.data.type !== 'gym' || !w.data.exercises) return;

    const exData = w.data.exercises[exerciseId];
    if (!exData) return;

    const date = new Date(w.date);
    const ws = new Date(date);
    ws.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    const weekKey = getDateKey(ws);

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = { maxWeight: 0, sets: 0 };
    }

    (exData.sets || []).forEach(set => {
      if (set && set.weight) {
        const w = parseFloat(set.weight);
        if (w > 0) {
          weeklyData[weekKey].maxWeight = Math.max(weeklyData[weekKey].maxWeight, w);
          weeklyData[weekKey].sets++;
        }
      }
    });
  });

  return Object.keys(weeklyData)
    .sort()
    .slice(-8)
    .map(weekKey => ({
      week: weekKey,
      maxWeight: weeklyData[weekKey].maxWeight,
      sets: weeklyData[weekKey].sets
    }))
    .filter(h => h.maxWeight > 0);
}

function renderExerciseSparkline(exerciseId) {
  const history = getExerciseHistory(exerciseId);
  if (history.length === 0) return '';

  const weights = history.map(h => h.maxWeight).filter(w => isFinite(w) && w > 0);
  if (weights.length === 0) return '';

  const maxWeight = Math.max(...weights);
  const minWeight = Math.min(...weights);
  const range = Math.max(maxWeight - minWeight, 5);
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
    const y = svgHeight - chartBottom - ((h.maxWeight - minWeight + padding) / (range + padding * 2)) * chartHeight;
    return { x: isFinite(x) ? x : 0, y: isFinite(y) ? y : 0, weight: h.maxWeight, sets: h.sets };
  }).filter(p => isFinite(p.x) && isFinite(p.y));

  // Smooth bezier curve
  let pathData;
  if (points.length < 2) {
    pathData = points.map((p,i) => `${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  } else {
    pathData = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i-1], p1 = points[i];
      const mx = ((p0.x+p1.x)/2).toFixed(1);
      pathData += ` C${mx},${p0.y.toFixed(1)} ${mx},${p1.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }
  }

  // Find min and max for tooltips
  const minWeightValue = Math.min(...points.map(p => p.weight));
  const maxWeightValue = Math.max(...points.map(p => p.weight));

  const tooltips = points
    .filter(p => p.weight === minWeightValue || p.weight === maxWeightValue)
    .map(p => {
      const label = `${p.weight.toFixed(1)} kg`;
      const labelW = label.length * 5.8 + 12;
      const labelH = 18;
      const arrowLen = 4;
      const gap = 3;
      const liftOff = 2; // gap between arrow tip and point
      // Arrow tip always on p.y — no Math.max clamping
      const labelY = p.y - labelH - arrowLen - gap - liftOff;
      const arrowW = 6;
      const gymRx = 9;
      const gymMargin = gymRx + arrowW / 2;
      // Allow pill to go slightly outside SVG so arrow stays vertical
      const overflow = 8;
      let labelX = p.x - labelW / 2;
      labelX = Math.min(labelX, p.x - gymMargin);      // arrow not in left corner
      labelX = Math.max(labelX, p.x - labelW + gymMargin); // arrow not in right corner
      labelX = Math.max(-overflow, Math.min(svgWidth - labelW + overflow, labelX));
      // Arrow starts liftOff above the point
      const arrowTip = p.y - liftOff;
      const arrowPath = `M${(p.x-arrowW/2).toFixed(1)},${(labelY+labelH).toFixed(1)} L${(p.x-1.5).toFixed(1)},${(arrowTip-1.5).toFixed(1)} Q${p.x.toFixed(1)},${arrowTip.toFixed(1)} ${(p.x+1.5).toFixed(1)},${(arrowTip-1.5).toFixed(1)} L${(p.x+arrowW/2).toFixed(1)},${(labelY+labelH).toFixed(1)} Z`;
      return `<g>
        <path d="${arrowPath}" fill="rgba(30,30,30,0.75)"/>
        <rect x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" width="${labelW.toFixed(1)}" height="${labelH}" rx="9" fill="rgba(30,30,30,0.75)"/>
        <text x="${(labelX + labelW/2).toFixed(1)}" y="${(labelY + 12.5).toFixed(1)}" font-size="10" fill="white" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="600" letter-spacing="-0.2">${label}</text>
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="rgba(52,199,89,1)"/>
      </g>`;
    }).join('');

  return `
    <div data-ex-sparkline="${exerciseId}" style="margin-top:10px;font-size:12px;color:var(--text-mute);margin-left:48px;margin-bottom:2px;">
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width:100%;height:64px;display:block;">
        <defs>
          <linearGradient id="exGrad_${exerciseId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(52,199,89,0.12)"/>
            <stop offset="100%" stop-color="rgba(52,199,89,0)"/>
          </linearGradient>
        </defs>
        <path d="${pathData} L${svgWidth-chartRight},${svgHeight-chartBottom} L${chartLeft},${svgHeight-chartBottom} Z"
          fill="url(#exGrad_${exerciseId})" stroke="none"/>
        <path d="${pathData}"
          fill="none" stroke="rgba(52,199,89,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${tooltips}
      </svg>
    </div>
  `;
}

function refreshExerciseSparklines() {
  document.querySelectorAll('[data-ex-sparkline]').forEach(el => {
    const id = el.dataset.exSparkline;
    const html = renderExerciseSparkline(id);
    if (html) {
      const tpl = document.createElement('template');
      tpl.innerHTML = html.trim();
      el.replaceWith(tpl.content.firstChild);
    }
  });
}

function renderBodyMetricSparkline(metric) {
  const allMetrics = loadAllBodyMetrics();
  const unit = metric === 'weight' ? 'kg' : '%';
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const chartColor = metric === 'weight'
    ? (isDark ? '#30D158' : '#34C759')
    : (isDark ? '#BF5AF2' : '#AF52DE');

  function hexToRgba(hex, a) {
    const rr = parseInt(hex.slice(1,3),16), gg = parseInt(hex.slice(3,5),16), bb = parseInt(hex.slice(5,7),16);
    return `rgba(${rr},${gg},${bb},${a})`;
  }

  if (allMetrics.length === 0) return `<div class="sparkline-card" style="display:flex;align-items:center;justify-content:center;height:64px;"><span style="font-size:11px;color:var(--text-mute);">Noch keine Daten</span></div>`;

  const values = allMetrics
    .map(m => {
      const val = metric === 'weight' ? parseFloat(m.data.weight) : parseFloat(m.data.fat);
      return { date: m.date, value: val };
    })
    .filter(m => isFinite(m.value) && m.value > 0);

  if (values.length === 0) return `<div class="sparkline-card" style="display:flex;align-items:center;justify-content:center;height:64px;"><span style="font-size:11px;color:var(--text-mute);">Noch keine Daten</span></div>`;

  const maxVal = Math.max(...values.map(v => v.value));
  const minVal = Math.min(...values.map(v => v.value));
  const range = Math.max(maxVal - minVal, 0.5);
  const pad = range * 0.15;

  const W = 200, H = 80;
  const l = 34, r = 10, t = 10, b = 10;
  const chartHeight = H - t - b;
  const fadeZone = chartHeight * 0.15;
  const dataTop = t + fadeZone; // data plots start below the fade zone

  const points = values.map((v, i) => {
    const x = l + (i / Math.max(values.length - 1, 1)) * (W - l - r);
    const y = H - b - ((v.value - (minVal - pad)) / (range + pad * 2)) * (chartHeight - fadeZone);
    return { x: isFinite(x) ? x : 0, y: isFinite(y) ? y : 0, value: v.value, date: v.date };
  }).filter(p => isFinite(p.x) && isFinite(p.y));

  // Smooth bezier curve
  function smoothPath(pts) {
    if (pts.length < 2) return pts.map((p,i) => `${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i-1], p1 = pts[i];
      const mx = ((p0.x+p1.x)/2).toFixed(1);
      d += ` C${mx},${p0.y.toFixed(1)} ${mx},${p1.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }
    return d;
  }

  const pathD = smoothPath(points);

  const gradId = `grad_${metric}_${Date.now()}`;
  const fillGradient = `<defs><linearGradient id="${gradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${chartColor}" stop-opacity="0.25"/><stop offset="100%" stop-color="${chartColor}" stop-opacity="0"/></linearGradient></defs>`;
  const fillPath = pathD + ` L${W-r},${H-b} L${l},${H-b} Z`;

  // Gridlines: normal from dataTop to bottom, fade zone from t to dataTop
  const bodyGridGradId = `bodyGridGrad_${metric}_${Math.random().toString(36).slice(2,6)}`;
  const resolvedBodyGridColor = getComputedStyle(document.documentElement).getPropertyValue('--text-mute').trim() || '#999';
  const bodyGridGradient = `<linearGradient id="${bodyGridGradId}" x1="0" y1="${t}" x2="0" y2="${dataTop}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${resolvedBodyGridColor}" stop-opacity="0"/>
    <stop offset="100%" stop-color="${resolvedBodyGridColor}" stop-opacity="0.1"/>
  </linearGradient>`;

  const gridLines = points.map(p =>
    `<line x1="${p.x.toFixed(1)}" y1="${t}" x2="${p.x.toFixed(1)}" y2="${dataTop}" stroke="url(#${bodyGridGradId})" stroke-width="0.5"/>
     <line x1="${p.x.toFixed(1)}" y1="${dataTop}" x2="${p.x.toFixed(1)}" y2="${H-b}" stroke="var(--text-mute)" opacity="0.1" stroke-width="0.5"/>`
  ).join('');

  const avg = (values.reduce((a,v) => a+v.value, 0) / values.length).toFixed(1);

  const maxLabel = Number.isInteger(maxVal) ? String(maxVal) : maxVal.toFixed(1);
  const minLabel = Number.isInteger(minVal) ? String(minVal) : minVal.toFixed(1);
  const minMaxLabels = `
    <text x="${l-3}" y="${dataTop+7}" font-size="9" fill="var(--text-mute)" text-anchor="end" font-family="system-ui,-apple-system,sans-serif" font-weight="600">${maxLabel}</text>
    <text x="${l-3}" y="${H-b-1}" font-size="9" fill="var(--text-mute)" text-anchor="end" font-family="system-ui,-apple-system,sans-serif" font-weight="600">${minLabel}</text>
  `;

  const badgeText = `Ø ${avg} ${unit}`;
  const badgeW = badgeText.length * 7.2 + 16;
  const badgeH = 20;
  const badgePadding = 6;
  const badgeX = (W - badgeW - badgePadding).toFixed(1);
  const badgeY = (badgePadding).toFixed(1);
  const badgeFillColor = metric === 'weight'
    ? (isDark ? 'rgba(48, 209, 88, 0.25)' : 'rgba(52, 199, 89, 0.15)')
    : (isDark ? 'rgba(191, 90, 242, 0.25)' : 'rgba(175, 82, 222, 0.15)');
  const avgBadge = `
    <rect x="${badgeX}" y="${badgeY}" width="${badgeW}" height="${badgeH}" rx="10" fill="${badgeFillColor}"/>
    <text x="${(parseFloat(badgeX) + badgeW/2).toFixed(1)}" y="${(parseFloat(badgeY)+14).toFixed(1)}" text-anchor="middle" font-size="13" fill="${chartColor}" font-weight="600" font-family="system-ui,-apple-system,sans-serif">${badgeText}</text>
  `;

  // Find min and max for tooltips
  const minMetricValue = Math.min(...points.map(p => p.value));
  const maxMetricValue = Math.max(...points.map(p => p.value));

  const tooltips = points
    .filter(p => p.value === minMetricValue || p.value === maxMetricValue)
    .map(p =>
      `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="transparent" style="cursor:pointer;"><title>${new Date(p.date).toLocaleDateString('de-DE')}: ${p.value.toFixed(1)} ${unit}</title></circle>`
    ).join('');

  return `
    <div class="sparkline-card">
      <svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;">
        ${fillGradient}
        <defs>${bodyGridGradient}</defs>
        ${gridLines}
        ${minMaxLabels}
        <path d="${fillPath}" fill="url(#${gradId})" stroke="none"/>
        <path d="${pathD}" fill="none" stroke="${chartColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        ${tooltips}
        ${avgBadge}
      </svg>
    </div>
  `;
}

function toggleSparklineTable(btn) {
  const card = btn.closest('.sparkline-card');
  const wrap = card.querySelector('.sparkline-table-wrap');
  const isOpen = card.classList.toggle('expanded');
  wrap.style.maxHeight = isOpen ? wrap.scrollHeight + 'px' : '0';
}

function buildSparklineSVG(numericValues, unit, avgFormatter, title, opts) {
  opts = opts || {};
  const isBar = opts.type === 'bar';
  const labels = opts.labels || [];
  const hasLabels = labels.length > 0;
  const isKWFormat = hasLabels && labels[0] && /^KW\d+$/.test(labels[0]);
  const isWeeklyPills = isKWFormat && !isBar;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const configs = {
    'Laufvolumen': {
      color: isDark ? '#0A84FF' : '#007AFF',
      iconSvg: `<svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M918.4 201.6c-6.4-6.4-12.8-9.6-22.4-9.6H768V96c0-9.6-3.2-16-9.6-22.4C752 67.2 745.6 64 736 64H288c-9.6 0-16 3.2-22.4 9.6C259.2 80 256 86.4 256 96v96H128c-9.6 0-16 3.2-22.4 9.6-6.4 6.4-9.6 16-9.6 22.4 3.2 108.8 25.6 185.6 64 224 34.4 34.4 77.56 55.65 127.65 61.99 10.91 20.44 24.78 39.25 41.95 56.41 40.86 40.86 91 65.47 150.4 71.9V768h-96c-9.6 0-16 3.2-22.4 9.6-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6h256c9.6 0 16-3.2 22.4-9.6 6.4-6.4 9.6-12.8 9.6-22.4s-3.2-16-9.6-22.4c-6.4-6.4-12.8-9.6-22.4-9.6h-96V637.26c59.4-7.71 109.54-30.01 150.4-70.86 17.2-17.2 31.51-36.06 42.81-56.55 48.93-6.51 90.02-27.7 126.79-61.85 38.4-38.4 60.8-112 64-224 0-6.4-3.2-16-9.6-22.4zM256 438.4c-19.2-6.4-35.2-19.2-51.2-35.2-22.4-22.4-35.2-70.4-41.6-147.2H256v182.4zm390.4 80C608 553.6 566.4 576 512 576s-99.2-19.2-134.4-57.6C342.4 480 320 438.4 320 384V128h384v256c0 54.4-19.2 99.2-57.6 134.4zm172.8-115.2c-16 16-32 25.6-51.2 35.2V256h92.8c-6.4 76.8-19.2 124.8-41.6 147.2zM768 896H256c-9.6 0-16 3.2-22.4 9.6-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6h512c9.6 0 16-3.2 22.4-9.6 6.4-6.4 9.6-12.8 9.6-22.4s-3.2-16-9.6-22.4c-6.4-6.4-12.8-9.6-22.4-9.6z"/></svg>`
    },
    'Pace': {
      color: isDark ? '#5E5CE6' : '#5856D6',
      iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10" cy="10" r="7"/><polyline points="10,6 10,10 13,13"/></svg>`
    },
    'Kadenz': {
      color: isDark ? '#FF9F0A' : '#FF9500',
      iconSvg: `<svg viewBox="-48 0 512 512" fill="currentColor"><path d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"/></svg>`
    },
    'Schmerz': {
      color: isDark ? '#FF375F' : '#FF2D55',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.9998H8L9.5 8.99976L11.5 13.9998L13 11.9998H15M12 6.42958C12.4844 5.46436 13.4683 4.72543 14.2187 4.35927C16.1094 3.43671 17.9832 3.91202 19.5355 5.46436C21.4881 7.41698 21.4881 10.5828 19.5355 12.5354L12.7071 19.3639C12.3166 19.7544 11.6834 19.7544 11.2929 19.3639L4.46447 12.5354C2.51184 10.5828 2.51184 7.41698 4.46447 5.46436C6.0168 3.91202 7.89056 3.43671 9.78125 4.35927C10.5317 4.72543 11.5156 5.46436 12 6.42958Z"/></svg>`
    },
    'Gewicht': {
      color: isDark ? '#30D158' : '#34C759',
      iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h10a1.5 1.5 0 0 0 1.5-1.5L15 8H5L3.5 15.5A1.5 1.5 0 0 0 5 17z"/><circle cx="10" cy="5" r="2.5"/></svg>`
    },
    'KFA': {
      color: isDark ? '#BF5AF2' : '#AF52DE',
      iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="13.5" cy="13.5" r="2.5"/><line x1="16" y1="4" x2="4" y2="16"/></svg>`
    }
  };
  const cfg = configs[title] || { color: isDark ? '#0A84FF' : '#007AFF', iconSvg: '' };
  const chartColor = cfg.color;

  function hexToRgba(hex, a) {
    const rr = parseInt(hex.slice(1,3),16), gg = parseInt(hex.slice(3,5),16), bb = parseInt(hex.slice(5,7),16);
    return `rgba(${rr},${gg},${bb},${a})`;
  }

  const empty = `<div class="sparkline-card"><div class="sparkline-header"><div class="sparkline-icon" style="background:${hexToRgba(chartColor,0.12)};color:${chartColor};">${cfg.iconSvg}</div><span class="sparkline-title">${title||''}</span></div><div style="padding:32px 16px;text-align:center;color:var(--text-mute);font-size:13px;">Noch keine Daten</div></div>`;

  const valid = (numericValues || []).filter(v => v !== null && !isNaN(v));
  if (valid.length === 0) return empty;

  const maxVal = Math.max(...valid);
  const minVal = Math.min(...valid);

  // For Laufvolumen: Y-axis with exponential scale (powers) from 0 to maxVal * 1.05
  let yMin, yRange, pad, useExpScale = false;
  const isRunVolumeCheck = title === 'Laufvolumen';
  if (isRunVolumeCheck) {
    useExpScale = true;
    yMin = 0;
    const yMax = maxVal * 1.05;
    // For exponential scale: use power function to amplify higher values
    yRange = Math.pow(yMax, 1.5);
    pad = 0;
  } else {
    yMin = isBar ? 0 : minVal;
    yRange = Math.max(maxVal - yMin, 0.5);
    pad = yRange * 0.15;
  }

  const W = 400, H = 210;
  const l = isWeeklyPills ? 10 : 24;
  const r = isWeeklyPills ? 10 : 24;
  const t = 36;
  const b = hasLabels ? 44 : 24;
  const chartBottom = H - b;
  const gridExtension = (chartBottom - t) * 0.2;
  const extendedTop = t - gridExtension;

  const n = numericValues.length;
  const totalSlots = isBar ? n + 2 : n;

  const parseLabel = (lbl) => {
    // Week number format: "23", "24" or "KW23", "KW24" etc. Map to approximate date (Monday of that week)
    const kwMatch = lbl.match(/^(?:KW)?(\d+)$/);
    if (kwMatch) {
      const week = parseInt(kwMatch[1]);
      const year = 2026;
      const d = new Date(year, 0, 4);
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      const monday = new Date(d.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
      return monday;
    }
    // Day.Month format: "15.06."
    const p = lbl.split('.');
    return new Date(2026, parseInt(p[1]) - 1, parseInt(p[0]));
  };
  let lineDates = null, lineFirstDate = null, lineTotalDays = 0;
  if (!isBar && hasLabels && labels.length === n && !isWeeklyPills) {
    lineDates = labels.map(lbl => parseLabel(lbl));
    lineFirstDate = lineDates[0];
    const today = new Date(); today.setHours(0,0,0,0);
    lineTotalDays = Math.round((today - lineFirstDate) / (24*60*60*1000));
    if (lineTotalDays < 1) lineTotalDays = 1;
  }

  const allPts = numericValues.map((v, i) => {
    if (v === null || !isFinite(v)) return null;
    let x;
    if (isBar || isWeeklyPills) {
      const slots = isWeeklyPills ? n : totalSlots;
      x = l + (i + 0.5) / slots * (W - l - r);
    } else if (lineDates) {
      const daysFromStart = Math.round((lineDates[i] - lineFirstDate)/(24*60*60*1000));
      x = l + (daysFromStart/lineTotalDays)*(W-l-r);
    } else {
      x = l + (n===1 ? (W-l-r)/2 : (i/(n-1))*(W-l-r));
    }
    let y;
    if (useExpScale) {
      // Exponential scale: amplify higher values using power
      const expVal = Math.pow(v, 1.5);
      y = chartBottom - (expVal / yRange) * (chartBottom - t);
    } else {
      y = chartBottom - ((v - yMin) / yRange) * (chartBottom - t);
    }
    if (!isFinite(x) || !isFinite(y)) return null;
    return { x, y, value: v, idx: i };
  });
  const nonNull = allPts.filter(Boolean);

  // Smooth bezier curve path with horizontal extension to pill edges
  function smoothPath(pts) {
    if (pts.length < 2) return '';

    let startPt = pts[0];
    let endPt = pts[pts.length - 1];

    if (isWeeklyPills) {
      const pillW = Math.min(((W-l-r)/Math.max(n,1))*0.7, 50);
      const pillLeft = startPt.x - pillW / 2;

      // Extend to left pill edge horizontally
      if (pillLeft < startPt.x) {
        startPt = { x: pillLeft, y: startPt.y };
      }

      // Do NOT extend to right pill edge - stop at the data point
    }

    let d = `M${startPt.x.toFixed(1)},${startPt.y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i-1], p1 = pts[i];
      const mx = ((p0.x + p1.x)/2).toFixed(1);
      d += ` C${mx},${p0.y.toFixed(1)} ${mx},${p1.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }
    d += ` L${endPt.x.toFixed(1)},${endPt.y.toFixed(1)}`;
    return d;
  }

  // Fill gradient in chart color
  const gradId = `grad_${(title||'x').replace(/\s/g,'')}_${Date.now()}`;
  const fillGradient = `<defs><linearGradient id="${gradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${chartColor}" stop-opacity="0.25"/><stop offset="100%" stop-color="${chartColor}" stop-opacity="0"/></linearGradient></defs>`;

  // Grid lines + labels with extended height and gradient fade at top
  let gridLines = '';
  let gridLabelEls = '';
  const gridColor = 'var(--text-mute)';
  const isRunVolume = title === 'Laufvolumen';
  const gridGradId = `gridGrad_${title.replace(/\s/g,'')}_${Math.random().toString(36).slice(2,6)}`;
  const resolvedGridColor = getComputedStyle(document.documentElement).getPropertyValue('--text-mute').trim() || '#999';
  const fadeStopPct = ((t - extendedTop) / (chartBottom - extendedTop) * 100).toFixed(1);
  const gridGradient = `<linearGradient id="${gridGradId}" x1="0" y1="${extendedTop}" x2="0" y2="${chartBottom}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${resolvedGridColor}" stop-opacity="0"/>
    <stop offset="${fadeStopPct}%" stop-color="${resolvedGridColor}" stop-opacity="1"/>
    <stop offset="100%" stop-color="${resolvedGridColor}" stop-opacity="1"/>
  </linearGradient>`;

  if (isBar && !isRunVolume) {
    gridLines = nonNull.map(p =>
      `<line x1="${p.x.toFixed(1)}" y1="${extendedTop}" x2="${p.x.toFixed(1)}" y2="${chartBottom}" stroke="url(#${gridGradId})" opacity="0.25" stroke-width="0.8"/>`
    ).join('');
    for (let i = n; i < n+2; i++) {
      const x = l + (i+0.5)/totalSlots*(W-l-r);
      gridLines += `<line x1="${x.toFixed(1)}" y1="${extendedTop}" x2="${x.toFixed(1)}" y2="${chartBottom}" stroke="url(#${gridGradId})" opacity="0.15" stroke-width="0.6"/>`;
    }
  } else if (lineDates && lineTotalDays > 0) {
    // For KW labels, show the labels directly at all pill positions; for date labels, show every 2 days
    const isKWLabels = labels && labels[0] && labels[0].match(/^(?:KW)?(\d+)$/);
    if (isKWLabels && isRunVolume) {
      for (let i = 0; i < n; i++) {
        const x = l + (i + 0.5) / n * (W - l - r);
        const label = labels[i] || '';
        if (label) {
          gridLabelEls += `<text x="${x.toFixed(1)}" y="${chartBottom+14}" font-size="10" fill="var(--text-mute)" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="500">${label}</text>`;
        }
      }
    } else {
      // Dynamic label step based on time span
      let labelStep = 2; // default: every 2nd line
      if (lineTotalDays > 28) {
        labelStep = 4; // >4 weeks: every 4th
      } else if (lineTotalDays > 14) {
        labelStep = 3; // >2 weeks: every 3rd
      }

      for (let d = 0; d <= lineTotalDays; d++) {
        const x = l + (d/lineTotalDays)*(W-l-r);
        gridLines += `<line x1="${x.toFixed(1)}" y1="${extendedTop}" x2="${x.toFixed(1)}" y2="${chartBottom}" stroke="url(#${gridGradId})" opacity="0.18" stroke-width="0.5"/>`;
        const distFromEnd = lineTotalDays - d;
        if (distFromEnd % labelStep === 0) {
          const date = new Date(lineFirstDate.getTime() + d*24*60*60*1000);
          const dateStr = `${date.getDate()}.${date.getMonth()+1}.`;
          gridLabelEls += `<text x="${x.toFixed(1)}" y="${chartBottom+14}" font-size="10" fill="var(--text-mute)" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif">${dateStr}</text>`;
        }
      }
    }
  }

  // Tooltip bubble — arrow always fixed length, points to targetY (top edge of bar/point)
  function tipBubble(cx, cy, text, targetY) {
    const th = 24, tw = text.length * 7.2 + 14;
    const arrowLength = 4;
    const arrowWidth = 8;
    const gap = 3;
    const liftOff = 2; // gap between arrow tip and point
    const tip = (targetY !== undefined ? targetY : cy);
    const ty = tip - th - arrowLength - gap - liftOff;
    const textBaseline = ty + 16;
    const rx = 11;
    const margin = rx + arrowWidth / 2; // min distance from pill edge to arrow center
    // Shift pill so arrow (at cx) always lands in the flat area — no diagonal
    let tx = cx - tw / 2;
    tx = Math.min(tx, cx - margin);          // arrow not left of left flat area
    tx = Math.max(tx, cx - tw + margin);     // arrow not right of right flat area
    // Increase edge margin so pills have more breathing room from chart edges
    const edgeMargin = 12;  // more room at edges to avoid hugging the border
    tx = Math.max(edgeMargin, Math.min(W - tw - edgeMargin, tx));
    // Arrow starts liftOff above the point
    const arrowTip = tip - liftOff;
    const arrowPath = `M${(cx-arrowWidth/2).toFixed(1)},${(ty+th).toFixed(1)} L${(cx-2).toFixed(1)},${(arrowTip-2).toFixed(1)} Q${cx.toFixed(1)},${arrowTip.toFixed(1)} ${(cx+2).toFixed(1)},${(arrowTip-2).toFixed(1)} L${(cx+arrowWidth/2).toFixed(1)},${(ty+th).toFixed(1)} Z`;
    return `<g>
        <path d="${arrowPath}" fill="rgba(30,30,30,0.75)"/>
        <rect x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" width="${tw.toFixed(1)}" height="${th.toFixed(1)}" rx="11" fill="rgba(30,30,30,0.75)"/>
      </g>
      <text x="${(tx+tw/2).toFixed(1)}" y="${textBaseline.toFixed(1)}" font-size="12" fill="white" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="600" letter-spacing="-0.2">${text}</text>`;
  }

  // Bars
  let barsEl = '';
  if (isBar) {
    const gap = (W-l-r)/Math.max(totalSlots,1);
    const barW = Math.min(gap*0.7, 50);

    if (isRunVolume) {
      // Pill design with gradient - stronger at top
      const pillRadius = barW / 2;
      const baseOpacity = 0.12;
      const topOpacity = 0.5;
      const pillGradId = `pillGrad_${Date.now()}`;
      const pillGradient = `<defs><linearGradient id="${pillGradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${chartColor}" stop-opacity="${topOpacity}"/><stop offset="100%" stop-color="${chartColor}" stop-opacity="${baseOpacity}"/></linearGradient></defs>`;

      // Add gray placeholder pills for ALL positions (background)
      const _isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const emptyBarColor = _isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)';
      let placeholderPills = '';
      const maxHeight = chartBottom - t;
      for (let i = 0; i < totalSlots; i++) {
        const x = l + (i + 0.5) / totalSlots * (W - l - r);
        placeholderPills += `<rect x="${(x - barW/2).toFixed(1)}" y="${t}" width="${barW.toFixed(1)}" height="${maxHeight.toFixed(1)}" rx="${pillRadius}" fill="${emptyBarColor}"/>`;
      }

      // Find min and max values for tooltips
      const minValue = Math.min(...nonNull.map(p => p.value));
      const maxValue = Math.max(...nonNull.map(p => p.value));

      barsEl = pillGradient + placeholderPills + nonNull.map(p => {
        const bh = chartBottom - p.y;
        const formatted = avgFormatter ? avgFormatter(p.value) : p.value.toFixed(1);

        // Gradient colored pill (actual value)
        let pillSvg = `<rect x="${(p.x-barW/2).toFixed(1)}" y="${p.y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="${pillRadius}" fill="url(#${pillGradId})"/>`;

        // Only show tooltips for min and max values
        if (p.value === minValue || p.value === maxValue) {
          pillSvg += tipBubble(p.x, p.y, formatted, p.y);
        }
        return pillSvg;
      }).join('');
    } else {
      // Find min and max values for tooltips
      const minValue = Math.min(...nonNull.map(p => p.value));
      const maxValue = Math.max(...nonNull.map(p => p.value));

      barsEl = nonNull.map(p => {
        const bh = chartBottom - p.y;
        const formatted = avgFormatter ? avgFormatter(p.value) : p.value.toFixed(1);

        // Bar rectangle
        let barSvg = `<rect x="${(p.x-barW/2).toFixed(1)}" y="${p.y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="5" fill="${chartColor}" opacity="0.7"/>`;

        // Only show tooltips for min and max values
        if (p.value === minValue || p.value === maxValue) {
          barSvg += tipBubble(p.x, p.y - 8, formatted, p.y);
        }

        return barSvg;
      }).join('');
    }
  }

  // Gray background pills for line charts (Laufvolumen)
  let bgPillsEl = '';
  if (!isBar && isWeeklyPills && n >= 1) {
    const pillCount = n;
    const gap = (W - l - r) / pillCount;
    const pillW = Math.min(gap * 0.7, 50);
    const pillRadius = pillW / 2;
    const maxHeight = chartBottom - t;
    const _isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const emptyBarColor = _isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)';

    for (let i = 0; i < pillCount; i++) {
      const x = l + (i + 0.5) / pillCount * (W - l - r);
      bgPillsEl += `<rect x="${(x - pillW/2).toFixed(1)}" y="${t}" width="${pillW.toFixed(1)}" height="${maxHeight.toFixed(1)}" rx="${pillRadius}" fill="${emptyBarColor}"/>`;
    }
  }

  // Line path + fill (smooth curves)
  let lineEl = '', fillEl = '';
  if (!isBar && nonNull.length > 0) {
    const pathD = smoothPath(nonNull);
    if (nonNull.length > 1) {
      const isRunVolumeForFill = title === 'Laufvolumen';
      let startPt = nonNull[0];
      let endPt = nonNull[nonNull.length - 1];

      if (isRunVolumeForFill) {
        const pillW = Math.min(((W-l-r)/Math.max(n,1))*0.7, 50);
        startPt = { x: startPt.x - pillW / 2, y: startPt.y };
        // Do NOT extend endPt to right - keep it at the data point
      }

      fillEl = `<path d="${pathD} L${endPt.x.toFixed(1)},${chartBottom} L${startPt.x.toFixed(1)},${chartBottom} Z" fill="url(#${gradId})" stroke="none"/>`;
    }
    lineEl = `<path d="${pathD}" fill="none" stroke="${chartColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  // Dots - max 20 visible, dynamic step based on data count
  let dotsEl = '';
  let specialLabelsEl = '';
  if (!isBar && nonNull.length > 0) {
    const step = Math.ceil(nonNull.length / 20);
    dotsEl = nonNull.filter((p, i) => {
      const distFromEnd = nonNull.length - 1 - i;
      return distFromEnd % step === 0;
    }).map(p =>
      `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="${chartColor}" stroke="white" stroke-width="1.5"/>`
    ).join('');

    const maxPt = nonNull.reduce((a, b) => a.value > b.value ? a : b);
    const minPt = nonNull.reduce((a, b) => a.value < b.value ? a : b);
    const seen = new Set();
    // Only show tooltips for min and max
    specialLabelsEl = [maxPt, minPt].filter(p => {
      if (seen.has(p.idx)) return false;
      seen.add(p.idx);
      return true;
    }).map(p => {
      const formatted = avgFormatter ? avgFormatter(p.value) : p.value.toFixed(1);
      return tipBubble(p.x, p.y, formatted);
    }).join('');
  }

  // X-axis labels (bar charts use data-point labels, line charts use grid labels)
  let labelEls = '';
  if (isBar && hasLabels) {
    labelEls = allPts.map((p, i) => {
      if (!p || !labels[i]) return '';
      return `<text x="${p.x.toFixed(1)}" y="${chartBottom+14}" font-size="10" fill="var(--text-mute)" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif">${labels[i]}</text>`;
    }).join('');
    if (labels.length > 0) {
      const lastLabel = labels[labels.length-1];
      const kwMatch = lastLabel.match(/KW(\d+)/);
      const lastWeek = kwMatch ? parseInt(kwMatch[1]) : 0;
      for (let i = 0; i < 2; i++) {
        const x = l + (n+i+0.5)/totalSlots*(W-l-r);
        labelEls += `<text x="${x.toFixed(1)}" y="${chartBottom+14}" font-size="10" fill="var(--text-mute)" opacity="0.5" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif">KW${lastWeek+i+1}</text>`;
      }
    }
  } else if (!isBar) {
    if (gridLabelEls) {
      labelEls = gridLabelEls;
    } else if (hasLabels) {
      labelEls = '';
      for (let i = 0; i < n; i++) {
        if (!labels[i]) continue;
        const x = isWeeklyPills ? l + (i + 0.5) / n * (W - l - r) : l + (n === 1 ? (W-l-r)/2 : (i/(n-1))*(W-l-r));
        labelEls += `<text x="${x.toFixed(1)}" y="${chartBottom+14}" font-size="10" fill="var(--text-mute)" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="500">${labels[i]}</text>`;
      }
    }
  }

  // Avg badge (in HTML header)
  const avg = valid.reduce((a,v) => a+v, 0) / valid.length;
  const avgStr = avgFormatter ? avgFormatter(avg) : `${avg.toFixed(1)} ${unit}`;
  const badgeText = `Ø ${avgStr}`;

  const badgeBgOpacity = isDark ? 0.25 : 0.1;
  const iconBgOpacity = isDark ? 0.2 : 0.12;

  // Build table rows — daily data grouped by week with per-week avg
  const dailyValues = opts.dailyValues || null;
  const dailyLabels = opts.dailyLabels || null;
  const dailyFirstDate = opts.dailyFirstDate || null;

  const tableRows = [];

  const getKW = (dateStr) => {
    const p = dateStr.split('.');
    const d = new Date(2026, parseInt(p[1]) - 1, parseInt(p[0]));
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const w1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - w1) / 86400000 - 3 + (w1.getDay() + 6) % 7) / 7);
  };

  if (dailyValues && dailyLabels && dailyFirstDate) {
    // Group daily entries by ISO week, newest first
    const byWeek = new Map();
    for (let i = 0; i < dailyValues.length; i++) {
      const v = dailyValues[i];
      if (v === null || isNaN(v)) continue;
      const lbl = dailyLabels[i];
      if (!lbl) continue;
      const kw = getKW(lbl);
      if (!byWeek.has(kw)) byWeek.set(kw, []);
      byWeek.get(kw).push({ lbl, v });
    }
    // Collect all entries chronologically for cross-week delta tracking
    const allEntries = [];
    const sortedWeeksAsc = [...byWeek.keys()].sort((a, b) => a - b);
    for (const kw of sortedWeeksAsc) {
      byWeek.get(kw).forEach(e => allEntries.push({ ...e, kw }));
    }
    const deltaMap = new Map();
    for (let i = 0; i < allEntries.length; i++) {
      const e = allEntries[i];
      const key = `${e.kw}_${e.lbl}`;
      if (i === 0) {
        deltaMap.set(key, { diff: 0, first: true });
      } else {
        deltaMap.set(key, { diff: e.v - allEntries[i - 1].v, first: false });
      }
    }

    const sortedWeeks = [...byWeek.keys()].sort((a, b) => b - a);
    for (const kw of sortedWeeks) {
      const entries = byWeek.get(kw);
      const weekAvg = entries.reduce((s, e) => s + e.v, 0) / entries.length;
      const avgFormatted = avgFormatter ? avgFormatter(weekAvg) : `${weekAvg.toFixed(1)} ${unit}`;
      let rows = '';
      for (let j = entries.length - 1; j >= 0; j--) {
        const { lbl, v } = entries[j];
        const formatted = avgFormatter ? avgFormatter(v) : `${v.toFixed(1)} ${unit}`;
        const d = deltaMap.get(`${kw}_${lbl}`) || { diff: 0, first: true };
        const diff = d.diff;
        const cls = d.first ? 'neutral' : diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral';
        const delta = `<span class="sl-delta ${cls}"><span class="sl-arrow-icon"></span>${Math.abs(diff).toFixed(1)}</span>`;
        rows += `<div class="sl-row"><span class="sl-date">${lbl}</span><span class="sl-val">${formatted}</span>${delta}</div>`;
      }
      tableRows.push(`<div class="sl-section"><div class="sl-header"><span>KW${kw}</span><span>Ø ${avgFormatted}</span></div><div class="sl-group">${rows}</div></div>`);
    }
  } else {
    // Fallback: weekly values (e.g. Laufvolumen)
    let rows = '';
    for (let i = numericValues.length - 1; i >= 0; i--) {
      const v = numericValues[i];
      if (v === null || isNaN(v)) continue;
      const lbl = labels[i] || '';
      const formatted = avgFormatter ? avgFormatter(v) : `${v.toFixed(1)} ${unit}`;
      rows += `<div class="sl-row"><span class="sl-date">${lbl}</span><span class="sl-val">${formatted}</span></div>`;
    }
    if (rows) tableRows.push(`<div class="sl-group">${rows}</div>`);
  }

  const tableId = `table_${(title||'x').replace(/\s/g,'')}`;

  return `
    <div class="sparkline-card">
      <div class="sparkline-header">
        <div class="sparkline-icon" style="background:${hexToRgba(chartColor,iconBgOpacity)};color:${chartColor};">${cfg.iconSvg}</div>
        <span class="sparkline-title">${title}</span>
        <span class="sparkline-badge" style="background:${hexToRgba(chartColor,badgeBgOpacity)};color:${chartColor};">${badgeText}</span>
        <button class="sparkline-expand" onclick="toggleSparklineTable(this)" aria-label="Details anzeigen" style="color:${chartColor};"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button>
      </div>
      <svg viewBox="0 0 ${W} ${H}" class="sparkline-chart">
        <defs>${gridGradient}</defs>
        ${fillGradient}
        ${gridLines}
        ${bgPillsEl}
        ${fillEl}
        ${barsEl}
        ${lineEl}
        ${dotsEl}
        ${specialLabelsEl}
        ${labelEls}
      </svg>
      <div class="sparkline-table-wrap" id="${tableId}">
        <div class="sl-list">${tableRows.join('')}</div>
      </div>
    </div>
  `;
}

