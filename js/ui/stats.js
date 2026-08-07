// ============================================================
// STATS — stats panel, calendar, history, title editor
// ============================================================

function renderStats() {
  const workouts = loadAllWorkouts();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 42);
  const cutoffKey = getDateKey(cutoff);
  const recent = workouts.filter(w => w.date >= cutoffKey);

  let totalRuns = 0, totalKm = 0, totalGym = 0, totalRest = 0, longRuns = 0;
  let totalPainSum = 0, painCount = 0;

  recent.forEach(w => {
    const d = w.data;
    if (!d.completed) return;
    if (d.type === 'run' || d.type === 'long') {
      totalRuns++;
      if (d.type === 'long') longRuns++;
      const dist = parseFloat(d.run?.distance);
      if (!isNaN(dist)) totalKm += dist;
      if (typeof d.run?.pain === 'number') {
        totalPainSum += d.run.pain;
        painCount++;
      }
    } else if (d.type === 'gym') {
      totalGym++;
    } else if (d.type === 'rest') {
      totalRest++;
    }
  });

  const avgPain = painCount > 0 ? (totalPainSum / painCount).toFixed(1) : '—';

  // Calculate weight loss and progress
  const allMetrics = loadAllBodyMetrics();
  let weightLoss = '—';
  let weightLossCard = '';

  if (allMetrics.length >= 2) {
    const firstWeight = parseFloat(allMetrics[0].data.weight);
    const currentWeight = parseFloat(allMetrics[allMetrics.length - 1].data.weight);
    const targets = loadBodyTargets();
    const targetWeight = targets.weight ? parseFloat(targets.weight) : null;

    if (!isNaN(firstWeight) && !isNaN(currentWeight)) {
      weightLoss = (firstWeight - currentWeight).toFixed(1);

      // Calculate progress if target exists
      if (targetWeight && !isNaN(targetWeight) && targetWeight < firstWeight) {
        const remaining = Math.max(currentWeight - targetWeight, 0).toFixed(1);

        // Inner bar: total progress from first weight to target
        const totalGoal = firstWeight - targetWeight;
        const achieved = firstWeight - currentWeight;
        const progress = Math.min(Math.max((achieved / totalGoal) * 100, 0), 100);

        // Outer bar: 6-week progress from 6-week-start to target
        const recentMetrics = allMetrics.filter(m => m.date >= cutoffKey);
        let sixWeekLoss = 0;
        let sixWeekProgress = 0;
        if (recentMetrics.length >= 1) {
          const sixWeekStartWeight = parseFloat(recentMetrics[0].data.weight);
          if (!isNaN(sixWeekStartWeight) && sixWeekStartWeight > 0) {
            sixWeekLoss = Math.max(sixWeekStartWeight - currentWeight, 0);
            const sixWeekGoal = sixWeekStartWeight - targetWeight;
            sixWeekProgress = Math.min(Math.max((sixWeekLoss / sixWeekGoal) * 100, 0), 100);
          }
        }

        // Activity Rings style (concentric arcs)
        const cx = 100;
        const cy = 92;

        // Outer ring (6 weeks) - thick, bright
        const outerR = 76;
        const outerWidth = 18;
        // Inner ring (total) - same width
        const innerR = 52;
        const innerWidth = 18;

        const outerFillAngle = (sixWeekProgress / 100) * 180;
        const innerFillAngle = (progress / 100) * 180;

        function arcPath(cx, cy, r, startDeg, endDeg) {
          const s = startDeg * Math.PI / 180;
          const e = endDeg * Math.PI / 180;
          const x1 = cx + r * Math.cos(s);
          const y1 = cy + r * Math.sin(s);
          const x2 = cx + r * Math.cos(e);
          const y2 = cy + r * Math.sin(e);
          const large = (endDeg - startDeg) > 180 ? 1 : 0;
          return 'M ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x2 + ' ' + y2;
        }

        const uid = Date.now();
        const outerGradId = 'weightGradOuter_' + uid;
        const innerGradId = 'weightGradInner_' + uid;

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const trackColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

        let segmentsSvg = '<defs>' +
          '<linearGradient id="' + outerGradId + '" x1="0%" y1="0%" x2="100%" y2="0%">' +
            '<stop offset="0%" stop-color="#34C759" stop-opacity="0.8"/>' +
            '<stop offset="100%" stop-color="#34C759" stop-opacity="1"/>' +
          '</linearGradient>' +
          '<linearGradient id="' + innerGradId + '" x1="0%" y1="0%" x2="100%" y2="0%">' +
            '<stop offset="0%" stop-color="#34C759" stop-opacity="0.25"/>' +
            '<stop offset="100%" stop-color="#34C759" stop-opacity="0.35"/>' +
          '</linearGradient>' +
        '</defs>';

        // Outer track + fill
        segmentsSvg += '<path d="' + arcPath(cx, cy, outerR, 180, 360) + '" fill="none" stroke="' + trackColor + '" stroke-width="' + outerWidth + '" stroke-linecap="round"/>';
        if (outerFillAngle > 0.5) {
          segmentsSvg += '<path d="' + arcPath(cx, cy, outerR, 180, 180 + outerFillAngle) + '" fill="none" stroke="url(#' + outerGradId + ')" stroke-width="' + outerWidth + '" stroke-linecap="round"/>';
        }

        // Inner track + fill
        segmentsSvg += '<path d="' + arcPath(cx, cy, innerR, 180, 360) + '" fill="none" stroke="' + trackColor + '" stroke-width="' + innerWidth + '" stroke-linecap="round"/>';
        if (innerFillAngle > 0.5) {
          segmentsSvg += '<path d="' + arcPath(cx, cy, innerR, 180, 180 + innerFillAngle) + '" fill="none" stroke="url(#' + innerGradId + ')" stroke-width="' + innerWidth + '" stroke-linecap="round"/>';
        }

        weightLossCard = '<div class="stat-card">' +
          '<div class="stat-label">Gewichtsverlust</div>' +
          '<div style="display:flex;flex-direction:column;flex:1;gap:8px;">' +
            '<div style="position:relative;flex:1;">' +
              '<svg width="100%" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet" style="display:block;height:100%;">' +
                segmentsSvg +
              '</svg>' +
              '<div class="stat-value" style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);white-space:nowrap;line-height:1;font-size:24px;">' +
                sixWeekLoss.toFixed(1) + '<span class="stat-unit">kg</span>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:flex-end;">' +
              '<div>' +
                '<div style="font-size:11px;color:var(--text-mute);margin-bottom:4px;">Gesamt</div>' +
                '<span style="display:inline-flex;align-items:center;gap:2px;background:rgba(52,199,89,0.12);color:#34C759;font-size:13px;font-weight:600;padding:3px 8px;border-radius:20px;font-variant-numeric:tabular-nums;line-height:1.3;">' + weightLoss + ' kg</span>' +
              '</div>' +
              '<div style="text-align:right;">' +
                '<div style="font-size:11px;color:var(--text-mute);margin-bottom:4px;">Verbleibend</div>' +
                '<span style="display:inline-flex;align-items:center;gap:2px;background:rgba(52,199,89,0.12);color:#34C759;font-size:13px;font-weight:600;padding:3px 8px;border-radius:20px;font-variant-numeric:tabular-nums;line-height:1.3;">' + remaining + ' kg</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      } else {
        // No target or invalid target - show simple card
        weightLossCard = '<div class="stat-card">' +
          '<div class="stat-label">Gewichtsverlust</div>' +
          '<div class="stat-value">' + weightLoss + '<span class="stat-unit">kg</span></div>' +
        '</div>';
      }
    } else {
      weightLossCard = '<div class="stat-card">' +
        '<div class="stat-label">Gewichtsverlust</div>' +
        '<div class="stat-value">—<span class="stat-unit">kg</span></div>' +
      '</div>';
    }
  } else {
    weightLossCard = '<div class="stat-card">' +
      '<div class="stat-label">Gewichtsverlust</div>' +
      '<div class="stat-value">—<span class="stat-unit">kg</span></div>' +
    '</div>';
  }

  const weightLossCardSpan = weightLossCard.replace('<div class="stat-card">', '<div class="stat-card" style="grid-row:span 2;">');

  document.getElementById('statsGrid').innerHTML = '<div class="stat-card stat-card-icon">' +
    '<div class="stat-icon stat-icon-run">' +
      '<svg viewBox="0 0 1280 1002" fill="currentColor" stroke="none">' +
        '<g transform="translate(0,1002) scale(0.1,-0.1)">' +
          '<path d="M4765 10014c-22-2-80-11-130-20-496-88-933-478-1239-1109-65-133-82-190-130-435-70-351-99-722-85-1070 9-200 12-222 69-575 51-315 60-374 61-432 1-26 6-1 10 57 16 198 41 302 162 680 36 113 84 264 107 335 155 496 415 991 636 1211 260 259 505 345 764 270 207-60 373-164 665-415 55-48 116-99 135-115 19-16 99-87 177-158 198-181 302-260 418-318 125-63 189-79 341-87 234-12 329 37 427 218 60 109 81 189 81 314 0 130-17 190-98 356-192 386-534 697-1077 978-256 133-547 237-779 281-36 6-87 16-115 21-54 11-336 20-400 13z"/>' +
          '<path d="M8925 9614c-102-20-140-30-205-51-284-95-514-289-644-543-97-191-130-350-114-542 29-343 246-681 539-842 185-101 364-148 569-148 203 0 359 36 528 121 290 147 476 382 574 729 29 104 32 313 4 417-39 150-95 271-189 408-155 227-451 404-747 447-63 9-275 12-315 4z"/>' +
          '<path d="M12700 7683c-18-95-47-168-143-361-128-254-265-475-419-669-237-301-787-753-1129-928-147-75-207-95-290-95-164 0-334 100-499 295-99 116-147 217-290 605-131 356-247 549-395 658-81 59-122 80-213 103-67 17-85 18-140 8-81-15-158-65-240-155-152-167-219-372-209-634 6-146 19-217 68-374 171-546 518-1004 1009-1333 95-64 140-86 234-118 221-74 509-75 746-1 334 103 761 377 1065 681 273 273 455 545 649 967 184 401 248 597 292 897 3 24 0 151-7 282l-13 239-32 0c-31 0-32-1-44-67z"/>' +
          '<path d="M4205 5883c-138-16-280-77-351-149-50-52-116-179-140-269-57-217-5-491 130-678 54-77 136-160 305-311 131-117 132-118 114-139-225-264-861-924-1439-1493-741-731-1057-1051-1663-1687-156-164-419-427-585-584-276-262-579-564-572-570 1-2 38 6 82 18 149 39 670 336 1744 994 434 266 540 329 1470 875 744 437 872 515 1160 704 273 180 390 265 515 375 119 103 163 137 400 306 99 71 204 148 234 172l53 43 112-58c138-73 258-150 358-231 115-92 125-107 133-195 7-69 5-77-21-122-44-77-216-241-330-317-56-37-236-137-400-221-165-84-445-231-624-326-511-270-984-498-1295-622-167-67-390-187-375-201 3-3 55-9 115-14 117-9 328-2 528 16 67 6 174 16 237 22 330 29 556 70 845 150 226 63 261 73 550 149 556 148 852 248 1130 385 436 214 806 562 961 902 55 120 64 152 64 233 0 101-30 214-89 335-63 130-109 196-260 385-276 343-520 595-836 863-71 61-173 150-225 198-289 266-789 630-1045 761-114 58-538 233-635 262-60 19-247 46-295 44-16 0-43-3-60-5z"/>' +
        '</g>' +
      '</svg>' +
    '</div>' +
    '<div class="stat-text">' +
      '<div class="stat-label">Gesamt-km</div>' +
      '<div class="stat-value">' + totalKm.toFixed(1) + '</div>' +
    '</div>' +
  '</div>' +
  weightLossCardSpan +
  '<div class="stat-card stat-card-icon">' +
    '<div class="stat-icon stat-icon-gym">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<path d="M6 7v10"/><path d="M18 7v10"/><path d="M3 9v6"/><path d="M21 9v6"/><path d="M6 12h12"/>' +
      '</svg>' +
    '</div>' +
    '<div class="stat-text">' +
      '<div class="stat-label">Gym-Einheiten</div>' +
      '<div class="stat-value">' + totalGym + '</div>' +
    '</div>' +
  '</div>';
}

// Calendar state
let calendarMonth = new Date().getMonth();
let calendarYear = new Date().getFullYear();
let calendarSelectedDate = null;

function renderHistory() {
  renderCalendar();
}

function renderCalendar() {
  const container = document.getElementById('calendarSection');
  const workouts = loadAllWorkouts();
  const workoutMap = {};
  workouts.forEach(w => { workoutMap[w.date] = w.data; });

  const monthNames = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

  const firstDay = new Date(calendarYear, calendarMonth, 1);
  const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
  let startOffset = (firstDay.getDay() + 6) % 7;

  const today = new Date();
  const todayKey = getDateKey(today);

  const effectiveDays = getEffectiveDays();
  const weekDates = getWeekDates();
  const selPosIdx = effectiveDays.indexOf(state.selectedDay);
  const selectedDateKey = state.selectedDay && selPosIdx >= 0
    ? getDateKey(weekDates[selPosIdx])
    : todayKey;

  let html = `
    <div class="calendar-nav">
      <button onclick="calendarPrev()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><polyline points="15 18 9 12 15 6"/></svg></button>
      <span class="calendar-month-label">${monthNames[calendarMonth]} ${calendarYear}</span>
      <button onclick="calendarNext()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><polyline points="9 18 15 12 9 6"/></svg></button>
    </div>
    <div class="calendar-grid">
      <div class="calendar-weekday">Mo</div>
      <div class="calendar-weekday">Di</div>
      <div class="calendar-weekday">Mi</div>
      <div class="calendar-weekday">Do</div>
      <div class="calendar-weekday">Fr</div>
      <div class="calendar-weekday">Sa</div>
      <div class="calendar-weekday">So</div>
  `;

  // Fill leading empty days from previous month
  const prevMonthLast = new Date(calendarYear, calendarMonth, 0);
  for (let i = startOffset - 1; i >= 0; i--) {
    const day = prevMonthLast.getDate() - i;
    html += `<div class="calendar-day other-month">${day}</div>`;
  }

  // Current month days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(calendarYear, calendarMonth, day);
    const dateKey = getDateKey(date);
    const wo = workoutMap[dateKey];
    const isToday = dateKey === todayKey;
    const isPast = dateKey < todayKey;
    const isFuture = dateKey > todayKey;
    const dayKey = getDayOfWeek(date);
    const plan = WEEK_PLAN[dayKey];

    const isSelected = dateKey === selectedDateKey;
    let classes = 'calendar-day';
    if (isToday) classes += ' today';
    if (isSelected) classes += ' selected';

    let dot = '';
    let onclick = '';

    // Only show dots for non-rest days
    if (plan && plan.type !== 'rest') {
      const isCompleted = wo && wo.completed;

      if (isToday) {
        // Today: orange if not done, green if done
        classes += ' has-workout';
        onclick = ` onclick="openCalendarModal('${dateKey}')"`;
        dot = isCompleted
          ? `<div class="calendar-dot completed"></div>`
          : `<div class="calendar-dot today-dot"></div>`;
      } else if (isPast) {
        // Past: red if not done, green if done
        classes += ' has-workout';
        onclick = ` onclick="openCalendarModal('${dateKey}')"`;
        dot = isCompleted
          ? `<div class="calendar-dot completed"></div>`
          : `<div class="calendar-dot missed"></div>`;
      } else if (isFuture) {
        // Future: gray (can't be completed in future)
        classes += ' planned';
        dot = `<div class="calendar-dot planned"></div>`;
        onclick = ` onclick="openCalendarModal('${dateKey}')"`;
      }
    }

    html += `<div class="${classes}"${onclick}>${day}${dot}</div>`;
  }

  // Fill trailing empty days
  const totalCells = startOffset + lastDay.getDate();
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="calendar-day other-month">${i}</div>`;
  }

  html += '</div>';
  container.innerHTML = html;
}

function openCalendarModal(dateKey) {
  const wo = loadWorkout(dateKey);
  const date = new Date(dateKey);
  const dateStr = date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const dayKey = getDayOfWeek(date);
  const plan = WEEK_PLAN[dayKey];
  const typeName = plan ? plan.name : '—';

  let stats = '';
  let statusHtml = '';
  let openBtn = '';

  if (wo) {
    if (wo.type === 'run' || wo.type === 'long') {
      const dist = wo.run?.distance ? `${parseFloat(wo.run.distance).toFixed(2)} km` : '';
      const time = wo.run?.time || '';
      const hr = wo.run?.hr ? `${wo.run.hr} Herzschläge/min` : '';
      stats = [dist, time, hr].filter(Boolean).join(' · ');
    } else if (wo.type === 'gym') {
      let totalSets = 0;
      if (wo.exercises) {
        Object.values(wo.exercises).forEach(ex => {
          (ex.sets || []).forEach(s => { if (s && (s.reps || s.weight || s.duration)) totalSets++; });
        });
      }
      stats = `${totalSets} Sätze eingetragen`;
    }

    const statusClass = wo.completed ? 'completed' : 'open';
    const statusText = wo.completed ? '✓ Abgeschlossen' : 'Offen';
    statusHtml = `<div class="calendar-modal-status ${statusClass}">${statusText}</div>`;

    openBtn = `<button class="primary" onclick="jumpToDate('${dateKey}'); closeCalendarModal();" style="font-size:12px;">Öffnen</button>`;
  } else {
    stats = 'Noch keine Einträge';
    statusHtml = '<div class="calendar-modal-status" style="background:rgba(107,114,128,0.1);color:var(--text-mute);">Geplant</div>';
    openBtn = `<button class="primary" onclick="jumpToDate('${dateKey}'); closeCalendarModal();" style="font-size:12px;">Öffnen</button>`;
  }

  const modalContent = document.getElementById('calendarModalContent');
  modalContent.innerHTML = `
    <div class="calendar-modal-date">${dateStr}</div>
    <div class="calendar-modal-title">${typeName}</div>
    <div class="calendar-modal-stats">${stats}</div>
    ${statusHtml}
    <div class="calendar-modal-actions">
      ${openBtn}
      ${wo ? `<button class="secondary" onclick="deleteWorkoutDate('${dateKey}'); closeCalendarModal();" style="background:rgba(217,82,14,0.1);color:var(--warn);font-size:12px;">Löschen</button>` : ''}
      <button class="secondary" onclick="closeCalendarModal()" style="font-size:12px;">Schließen</button>
    </div>
  `;

  const modal = document.getElementById('calendarModal');
  modal.classList.add('open');
  modal.onclick = (e) => {
    if (e.target === modal) closeCalendarModal();
  };
}

function closeCalendarModal() {
  document.getElementById('calendarModal').classList.remove('open');
}

// Title Editor
async function openTitleEditor() {
  const current = document.getElementById('userTitle').textContent;
  document.getElementById('titleInput').value = current;
  document.getElementById('titleEditorModal').classList.add('open');
  document.getElementById('titleInput').focus();
}

function closeTitleEditor() {
  document.getElementById('titleEditorModal').classList.remove('open');
}

async function saveTitleEditor() {
  // 1. Race-condition protection
  if (isSavingTitle) return;
  isSavingTitle = true;

  const newTitle = document.getElementById('titleInput').value.trim();
  if (!newTitle) {
    isSavingTitle = false;
    return;
  }

  const oldTitle = state.title;

  try {
    // 2. Optimistic UI: update state + DOM immediately
    state = { ...state, title: newTitle };
    document.getElementById('userTitle').textContent = newTitle;
    closeTitleEditor();

    // 3. Sync to Supabase with await
    const { error } = await supabaseClient
      .from('settings')
      .upsert({ key: 'user_title', value: newTitle }, { onConflict: 'key' });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    console.log('Title synced successfully:', newTitle);
  } catch (err) {
    // Rollback on error
    console.error('Title sync failed, rolling back:', err);
    state = { ...state, title: oldTitle };
    document.getElementById('userTitle').textContent = oldTitle;
    alert('Fehler beim Speichern. Bitte versuche es nochmal.');
  } finally {
    isSavingTitle = false;
  }
}

function loadUserTitle() {
  supabaseClient
    .from('settings')
    .select('value')
    .eq('key', 'user_title')
    .maybeSingle()
    .then(({ data, error }) => {
      if (!error && data && data.value) {
        state = { ...state, title: data.value };
        document.getElementById('userTitle').textContent = data.value;
      }
    })
    .catch(() => {});
}

function calendarPrev() {
  calendarMonth--;
  if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
  calendarSelectedDate = null;
  renderCalendar();
}

function calendarNext() {
  calendarMonth++;
  if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
  calendarSelectedDate = null;
  renderCalendar();
}

function jumpToDate(dateStr) {
  const date = new Date(dateStr);
  const dayKey = getDayOfWeek(date);

  const today = new Date();
  const todayDay = getDayOfWeek(today);
  const todayIdx = DAYS.indexOf(todayDay);
  const currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() - todayIdx);
  currentMonday.setHours(0,0,0,0);

  const targetMonday = new Date(date);
  const targetDayIdx = DAYS.indexOf(dayKey);
  targetMonday.setDate(date.getDate() - targetDayIdx);
  targetMonday.setHours(0,0,0,0);

  const diffDays = Math.round((targetMonday - currentMonday) / 86400000);
  state.weekOffset = Math.round(diffDays / 7);

  renderHeader();
  selectDay(dayKey);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

