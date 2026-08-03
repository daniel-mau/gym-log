// ============================================================
// TRAININGSPLAN-DEFINITION & ÜBUNGS-BILDER
// ============================================================

const WEEK_PLAN = {
  mon: {
    type: 'gym',
    name: 'Schultern & Zug',
    subtitle: '5/3/1-Welle Schulterdrücken · Druck & Zug Assistenzübungen · Knie-Stabilisierung',
    exercises: [
      { id: 'shoulder_press', name: 'Schulterdrücken Kurzhanteln', target: '5/3/1-Welle · Hauptlift', sets: 3, detail: 'Hauptlift der Einheit. 5/3/1-Wendler-Schema bedeutet: Woche 1: 5 Wiederholungen bei 65%, 75%, 85% deines Trainingsmaximums. Woche 2: 3 Wiederholungen bei 70%, 80%, 90%. Woche 3: 5, dann 3, dann 1 Wiederholung bei 75%, 85%, 95%. Woche 4: Entlastungswoche mit 40%, 50%, 60%. Trainingsmaximum-Start: je 15 kg pro Hand (30 kg insgesamt). Kurzhanteln auf Schulterhöhe, neutral oder mit Handflächen nach vorne greifen, sitzend oder stehend. Der letzte Satz mit "+" bedeutet: So viele Wiederholungen wie möglich mit sauberer Form.' },
      { id: 'hip_thrust', name: 'Hip Thrust Langhantel', target: '3 × 8–10 · 90s Pause', sets: 3, detail: 'Schultern auf Bank, Langhantel über Hüfte. Gesäßmuskulatur aktiv nach oben drücken, oben 1 Sekunde halten. Diese Übung aktiviert besonders die Gesäßmuskeln, was die Knie stabilisiert und schützt.' },
      { id: 'pullups', name: 'Klimmzüge / Latzug breit', target: '5 Sätze, 25–40 Wiederh. total · 2min', sets: 5, detail: 'Falls Klimmzüge zu schwer sind: Verwende den breiten Latzug statt Klimmzügen. Nutze die volle Bewegungsamplitude (ganz runter, ganz hoch). Verteile die Wiederholungen über die 5 Sätze so, dass insgesamt zwischen 25 und 40 Wiederholungen zusammenkommen.' },
      { id: 'dips', name: 'Dips an Maschine', target: '3 × 10–12 · 90s Pause', sets: 3, detail: 'Druck-Assistenzübung, die Brust und Trizeps trainiert. Kontrolliert nach unten fahren, explosiv nach oben drücken. Bei Maschinen-Dips das Gewicht schwerer einstellen, bei Eigengewicht-Dips ggf. einen Gurt mit Zusatzgewicht nutzen.' },
      { id: 'face_pulls', name: 'Face Pulls Kabel', target: '3 × 15 · 60s Pause', sets: 3, detail: 'Seil auf Augenhöhe anbringen, zur Stirn ziehen, Ellbogen dabei hoch halten. Diese Übung ist wichtig für gesunde Schultern und korrigiert die Fehlhaltung von langem Sitzen am Bildschirm.' },
      { id: 'concentration_curl', name: 'Konzentrations-Curls', target: '3 × 10 pro Seite · 60s Pause', sets: 3, detail: 'Auf Hantelbank sitzen, Ellbogen am Innenschenkel abstützen, mit Kurzhantel curlen. Dies ist eine stark isolierte Bizeps-Übung – sie ist der zweite große Trainingsreiz für den Bizeps nach dem breiten Latzug.' },
      { id: 'wall_sit', name: 'Wandsitz', target: '3 × 45 sec · 90s Pause', sets: 3, detail: 'Rücken an einer Wand, Knie sind etwa 60 Grad gebeugt. Aktiv mit den Fersen nach unten in den Boden drücken, Knie leicht nach außen. Dies ist eine statische Halteübung zur Stabilisierung der Kniestrecker.' }
    ]
  },
  tue: {
    type: 'run',
    name: 'Easy Run',
    subtitle: '5–6 km · Tempo nach Puls · max. 135 Herzschläge/min',
    runType: 'easy',
    targetDistance: 5.5,
    targetPace: '7:45-8:15',
    targetHR: '130-135'
  },
  wed: {
    type: 'gym',
    name: 'Rücken & Trap Bar Deadlift',
    subtitle: '5/3/1-Welle Trap Bar Deadlift · Rückseite Muskelkette · Bizeps-Fokus',
    exercises: [
      { id: 'trap_bar_deadlift', name: 'Trap Bar Deadlift', target: '5/3/1-Welle · Hauptlift', sets: 3, detail: 'Hauptlift. 5/3/1-Wendler-Schema. Das Trainingsmaximum muss noch ermittelt werden: Teste wie viel Gewicht du genau 5 Mal heben kannst (5er-Wiederholungsmaximum), dieses Gewicht ist dein Trainingsmaximum. Trap Bar (Hex Bar) erlaubt einen aufrechteren Oberkörper als konventionelles Kreuzheben – weniger Belastung auf den unteren Rücken und kniefreundlicher. In die Mitte der Bar stellen, neutraler Griff an den seitlichen Griffen, Hüfte nach hinten, Brust raus, Rücken neutral halten und mit den Beinen hochdrücken.' },
      { id: 'db_rows', name: 'Kurzhantel-Ruderungen einarmig', target: '4 × 10–12 pro Seite · 90s', sets: 4, detail: 'Eine Hand auf einer Bank abstützen, anderes Bein nach vorne. Kurzhantel zum Hüftbereich hochziehen, dabei das Schulterblatt zusammenziehen. Dies ist die Hauptzugsübung des Trainings.' },
      { id: 'back_extension', name: 'Rückenstrecker-Maschine 45°', target: '3 × 12–15 · 60s Pause', sets: 3, detail: 'Mit der Hüfte auf dem Polster, kontrolliert nach vorne hängen, dann durch Rückenstrecker-Kontraction wieder hochkommen. Die Wirbelsäule bleibt dabei neutral. Optional eine Hantelscheibe vor der Brust halten für mehr Gewicht.' },
      { id: 'hip_abduction', name: 'Kabel-Hüftabduktion stehend', target: '3 × 12 pro Seite · 60s', sets: 3, detail: 'Manschette am Knöchel, Bein kontrolliert seitlich weg gegen den Kabelwiderstand. Das Stützbein bleibt leicht gebeugt. Diese Übung aktiviert den äußeren Gesäßmuskel, der für Hüftstabilität wichtig ist.' },
      { id: 'bicep_curl', name: 'Bizeps-Curls Langhantel', target: '3 × 10 · 60s Pause', sets: 3, detail: 'Ellbogen fixiert am Körper, kein Schwung aus dem Rücken. Volle Streckung unten, volle Beugung oben.' },
      { id: 'side_plank', name: 'Seitstütz mit Hüfthub', target: '2 × 8 pro Seite · 60s', sets: 2, detail: 'Seitlich gestützt (Unterarm oder Hand auf dem Boden), Hüfte ab und hoch. Diese Übung aktiviert den äußeren Gesäßmuskel isoliert. Beim Hochdrücken der Hüfte Spannung in den Hüftmuskeln halten.' }
    ]
  },
  thu: {
    type: 'gym',
    name: 'Brust & Druck',
    subtitle: '5/3/1-Welle Bankdrücken · Druck Assistenzübungen · Beine knieschonend',
    exercises: [
      { id: 'bench_press', name: 'Bankdrücken Langhantel', target: '5/3/1-Welle · Hauptlift', sets: 3, detail: 'Hauptlift mit 5/3/1-Wendler-Schema. Trainingsmaximum-Start: 50 kg (vorsichtiger Wiedereinstieg nach Zerrung). Schulterbreit greifen, Stange zur Brust bringen, dabei Schulterblätter zusammenziehen und nach unten drücken. Die Bewegung: kontrolliert runter, explosiv hoch.' },
      { id: 'goblet_squat', name: 'Goblet Squat', target: '3 × 10 · 90s Pause', sets: 3, detail: 'Kurzhantel vor der Brust halten, so tief wie möglich und dabei knieschonend. Aufrechte Haltung bewahren – kniefreundlicher als Langhantel-Kniebeugen. Fokus liegt auf dem vorderen Oberschenkelmuskel.' },
      { id: 'incline_press', name: 'Schrägbankdrücken Kurzhanteln', target: '3 × 10 · 90s Pause', sets: 3, detail: 'Bank unter etwa 30 Grad geneigt, trainiert die obere Brust. Kontrollierte Ausführung – diese Übung ergänzt das flache Bankdrücken und gibt der Brust mehr Definition.' },
      { id: 'tricep_pushdown', name: 'Trizeps-Drücken am Kabel', target: '3 × 12 · 60s Pause', sets: 3, detail: 'Ellbogen am Körper fixiert, nur der Unterarm bewegt sich. Direkter Trainingsreiz für den Trizeps – diese Übung schafft Ausgleich zwischen Bizeps und Trizeps für ein symmetrisches Armtraining.' },
      { id: 'pallof_press', name: 'Pallof Press am Kabel', target: '3 × 12 pro Seite · 60s', sets: 3, detail: 'Seitlich zum Kabel stehen, Griff vor der Brust nach vorne ausstrecken gegen den Kabelwiderstand. Dies trainiert die Rumpfstabilität und verhindert Rotationsbewegungen – wichtig für gesunden Rücken.' },
      { id: 'calf_raise', name: 'Wadenheben stehend', target: '3 × 15 · 60s Pause', sets: 3, detail: 'An einer Maschine oder mit Kurzhanteln auf einer Stufe. Vollständig auf die Zehenspitzen hochkommen oben, kurze Pause halten, kontrolliert wieder absenken. Diese Übung ist wichtig für Lauf-Effizienz und schützt die Achillessehne.' }
    ]
  },
  fri: {
    type: 'run',
    name: 'Easy Run',
    subtitle: '5–7 km · optional Kadenz-Blöcke 3 × 1 min @ 160 Schritte/min',
    runType: 'easy',
    targetDistance: 6,
    targetPace: '7:45-8:15',
    targetHR: '130-135'
  },
  sat: {
    type: 'long',
    name: 'Long Run',
    subtitle: '10 km · Wiederholung · 2× still = Steigerung möglich',
    runType: 'long',
    targetDistance: 10,
    targetPace: '7:45-8:30',
    targetHR: '130-140'
  },
  sun: {
    type: 'rest',
    name: 'Ruhe',
    subtitle: 'Spaziergang · Mobility · Stretching · sonst nichts',
  },
  interval: {
    type: 'run',
    name: 'Intervalltraining',
    subtitle: '8–10× 400m @ 5K-Tempo · Pause = Intervalldauer',
    runType: 'interval',
    targetDistance: 6,
    targetPace: 'variabel',
    targetHR: '160-175'
  },
  tempo: {
    type: 'run',
    name: 'Templauf',
    subtitle: '20–25 min comfortably hard · knapp unter Schwellentempo',
    runType: 'tempo',
    targetDistance: 5,
    targetPace: '5:30-6:00',
    targetHR: '155-165'
  }
};

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_LABELS = { mon: 'Mo', tue: 'Di', wed: 'Mi', thu: 'Do', fri: 'Fr', sat: 'Sa', sun: 'So' };
const DAY_TYPE_LABELS = { gym: 'Gym', run: 'Lauf', long: 'Langlauf', rest: 'Ruhe' };

const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

const EXERCISE_IMG = {
  shoulder_press:     'Dumbbell_Shoulder_Press/0.jpg',
  hip_thrust:         'Barbell_Hip_Thrust/0.jpg',
  pullups:            'Pullups/0.jpg',
  dips:               'Dips_-_Triceps_Version/0.jpg',
  face_pulls:         'Face_Pull/0.jpg',
  wall_sit:           'Box_Squat_with_Bands/0.jpg',
  trap_bar_deadlift:  'Trap_Bar_Deadlift/0.jpg',
  db_rows:            'One-Arm_Dumbbell_Row/0.jpg',
  back_extension:     'Hyperextensions_With_No_Hyperextension_Bench/0.jpg',
  hip_abduction:      'Cable_Hip_Adduction/0.jpg',
  bicep_curl:         'Barbell_Curl/0.jpg',
  hammer_curl:        'Hammer_Curls/0.jpg',
  side_plank:         'Side_Bridge/0.jpg',
  bench_press:        'Barbell_Bench_Press_-_Medium_Grip/0.jpg',
  goblet_squat:       'Goblet_Squat/0.jpg',
  incline_press:      'Dumbbell_Bench_Press/0.jpg',
  tricep_pushdown:    'Triceps_Pushdown/0.jpg',
  pallof_press:       'Standing_Cable_Wood_Chop/0.jpg',
  concentration_curl: 'Concentration_Curls/0.jpg',
  calf_raise:         'Standing_Calf_Raises/0.jpg'
};

function exerciseImageHTML(exId, exName) {
  const path = EXERCISE_IMG[exId];
  const initials = exName.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();
  if (!path) {
    return `<div class="exercise-icon-fallback">${initials}</div>`;
  }
  return `<img src="${IMG_BASE}${path}" alt="${exName}" loading="lazy"
    onerror="this.outerHTML='<div class=\\'exercise-icon-fallback\\'>${initials}</div>'" />`;
}
