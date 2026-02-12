// SoulSurf – Program Generator (v2.7)
import { SURF_SPOTS, GOALS, CONTENT_POOL } from './data.js';

export function generateProgram(numDays, goalId, spotId, equipment) {
  const goal = GOALS.find(g => g.id === goalId);
  const spot = SURF_SPOTS.find(s => s.id === spotId);
  const days = parseInt(numDays);
  const experience = equipment?.experience || "zero";

  const EXP_RATIOS = { zero: { t: 0.6, p: 0.4 }, few: { t: 0.5, p: 0.5 }, some: { t: 0.4, p: 0.6 }, regular: { t: 0.2, p: 0.8 } };
  const ratio = EXP_RATIOS[experience] || EXP_RATIOS.zero;

  const HARD_SKIPS_REGULAR = [
    "Dein erstes Surfboard", "Wetsuit & Zubehör", "Turtle Roll & Duck Dive",
    "Dein Board kennen", "Whitewash-Wellen reiten", "Stance & Gewichtsverlagerung"
  ];
  const HARD_SKIPS_SOME = [
    "Dein erstes Surfboard",
    ...(goalId !== "erste-welle" ? ["Whitewash-Wellen reiten"] : [])
  ];
  const skipTitles = new Set(
    experience === "regular" ? HARD_SKIPS_REGULAR :
    experience === "some" ? HARD_SKIPS_SOME : []
  );
  if (spot?.wetsuit === "none") skipTitles.add("Wetsuit & Zubehör");
  const skipFilter = (item) => !skipTitles.has(item.title);

  let levels = ["beginner"];
  if (["intermediate","advanced","expert"].includes(goal?.level) || experience === "some" || experience === "regular") levels.push("intermediate");
  if (["advanced","expert"].includes(goal?.level) || experience === "regular") levels.push("advanced");

  const warmups = CONTENT_POOL.warmup.filter(w => levels.includes(w.level));
  const theories = CONTENT_POOL.theory.filter(t => levels.includes(t.level)).filter(skipFilter);
  const practices = CONTENT_POOL.practice.filter(p => levels.includes(p.level)).filter(skipFilter);
  const equipmentLessons = CONTENT_POOL.equipment.filter(skipFilter);

  const earlyTheory = theories.filter(t => t.phase === "early");
  const midTheory = theories.filter(t => t.phase === "mid");
  const lateTheory = theories.filter(t => t.phase === "late");
  const earlyPractice = practices.filter(p => p.phase === "early");
  const midPractice = practices.filter(p => p.phase === "mid");
  const latePractice = practices.filter(p => p.phase === "late");
  const anyPractice = practices.filter(p => p.phase === "any");

  const usedTheory = new Set();
  const usedPractice = new Set();

  let seed = 0;
  for (const ch of `${goalId}-${spotId}-${days}-${experience}`) seed = ((seed << 5) - seed + ch.charCodeAt(0)) | 0;
  seed = Math.abs(seed);
  function seededRandom() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }
  function seededShuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(seededRandom() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function pickTheory(dayNum) {
    const progress = dayNum / days;
    let pool;
    if (progress <= 0.3) pool = [...earlyTheory, ...midTheory];
    else if (progress <= 0.7) pool = [...midTheory, ...lateTheory, ...earlyTheory];
    else pool = [...lateTheory, ...midTheory];
    let unused = seededShuffle(pool.filter(t => !usedTheory.has(t.title)));
    if (progress <= 0.3 && spot) {
      const bt = spot.breakType || "";
      const hz = spot.hazards || [];
      const priorityTitles = [];
      if (bt === "beach" || hz.includes("rip") || hz.includes("current")) priorityTitles.push("Strömungen & Channels", "Sicherheit im Wasser");
      if (bt === "point" || hz.includes("locals")) priorityTitles.push("Surf-Etikette & Vorfahrt", "Wave Positioning");
      if (bt === "reef" || hz.includes("reef")) priorityTitles.push("Sicherheit im Wasser", "Wellentypen verstehen");
      if (bt === "mixed") priorityTitles.push("Sicherheit im Wasser", "Wellentypen verstehen", "Surf-Etikette & Vorfahrt");
      if (priorityTitles.length > 0) {
        const priority = unused.filter(t => priorityTitles.includes(t.title));
        const rest = unused.filter(t => !priorityTitles.includes(t.title));
        unused = [...priority, ...rest];
      }
    }
    if (unused.length > 0) { const pick = unused[0]; usedTheory.add(pick.title); return pick; }
    return null;
  }

  function pickPractice(dayNum) {
    const progress = dayNum / days;
    let pool;
    if (progress <= 0.3) pool = [...earlyPractice, ...anyPractice];
    else if (progress <= 0.7) pool = [...midPractice, ...earlyPractice, ...anyPractice];
    else pool = [...latePractice, ...midPractice, ...anyPractice];
    const unused = seededShuffle(pool.filter(p => !usedPractice.has(p.title)));
    if (unused.length > 0) { const pick = unused[0]; if (!pick.repeatable) usedPractice.add(pick.title); return pick; }
    const repeatable = pool.filter(p => p.repeatable);
    if (repeatable.length > 0) return repeatable[Math.floor(seededRandom() * repeatable.length)];
    return null;
  }

  const program = [];
  let wIdx = 0;

  for (let d = 1; d <= days; d++) {
    const dayLessons = [];
    const dayId = `d${d}`;

    if (d === 1) {
      const eqToAdd = [];
      if (!equipment || equipment.experience === "zero" || equipment.experience === "few") {
        const eqFirst = equipmentLessons.find(e => e.title === "Dein erstes Surfboard");
        const eqWetsuit = equipmentLessons.find(e => e.title === "Wetsuit & Zubehör");
        const eqSpotCheck = equipmentLessons.find(e => e.title === "Spot-Check: Worauf achten?");
        if (eqFirst) eqToAdd.push(eqFirst);
        if (eqWetsuit) eqToAdd.push(eqWetsuit);
        if (eqSpotCheck) eqToAdd.push(eqSpotCheck);
      } else {
        const eqPflege = equipmentLessons.find(e => e.title === "Board-Pflege & Transport");
        const eqSpotCheck = equipmentLessons.find(e => e.title === "Spot-Check: Worauf achten?");
        if (eqPflege) eqToAdd.push(eqPflege);
        if (eqSpotCheck) eqToAdd.push(eqSpotCheck);
      }
      if (spot?.wetsuit === "4/3mm") {
        const eqWetsuit = equipmentLessons.find(e => e.title === "Wetsuit & Zubehör");
        if (eqWetsuit && !eqToAdd.some(e => e.title === "Wetsuit & Zubehör")) {
          eqToAdd.unshift(eqWetsuit);
        } else if (eqWetsuit) {
          const idx = eqToAdd.findIndex(e => e.title === "Wetsuit & Zubehör");
          if (idx > 0) { eqToAdd.splice(idx, 1); eqToAdd.unshift(eqWetsuit); }
        }
      }
      eqToAdd.forEach((eq, i) => {
        dayLessons.push({ ...eq, id: `${dayId}-eq${i}`, type: "equipment" });
      });
    }

    // Hard constraints – force critical lessons into first 2 days
    if (d <= 2 && spot) {
      const bt = spot.breakType || "";
      const hz = spot.hazards || [];
      const constraintMap = [];
      if ((bt === "reef" || bt === "mixed" || spot.difficulty === "advanced") && !usedTheory.has("Sicherheit im Wasser")) constraintMap.push("Sicherheit im Wasser");
      if ((bt === "beach" || hz.includes("rip") || hz.includes("current")) && !usedTheory.has("Strömungen & Channels")) constraintMap.push("Strömungen & Channels");
      if ((bt === "point" || hz.includes("locals")) && !usedTheory.has("Surf-Etikette & Vorfahrt")) constraintMap.push("Surf-Etikette & Vorfahrt");
      const forced = constraintMap.find(title => {
        const lesson = theories.find(t => t.title === title);
        return lesson && !usedTheory.has(title);
      });
      if (forced) {
        const lesson = theories.find(t => t.title === forced);
        if (lesson) { dayLessons.push({ ...lesson, id: `${dayId}-tc`, type: "theory" }); usedTheory.add(forced); }
      }
    }

    if (warmups.length > 0) {
      dayLessons.push({ ...warmups[wIdx % warmups.length], id: `${dayId}-w`, type: "warmup" });
      wIdx++;
    }

    const theory = pickTheory(d);
    const practice1 = pickPractice(d);

    const theoryRoll = seededRandom();
    if (theoryRoll < ratio.t && theory) {
      dayLessons.push({ ...theory, id: `${dayId}-t`, type: "theory" });
      if (practice1) dayLessons.push({ ...practice1, id: `${dayId}-p1`, type: "practice" });
    } else {
      if (practice1) dayLessons.push({ ...practice1, id: `${dayId}-p1`, type: "practice" });
      const extraPractice = pickPractice(d);
      if (extraPractice && extraPractice.title !== practice1?.title) {
        dayLessons.push({ ...extraPractice, id: `${dayId}-p-extra`, type: "practice" });
      } else if (theory) {
        dayLessons.push({ ...theory, id: `${dayId}-t`, type: "theory" });
      }
    }

    if (days >= 7 && d % 2 === 0) {
      const practice2 = pickPractice(d);
      if (practice2 && practice2.title !== practice1?.title) {
        dayLessons.push({ ...practice2, id: `${dayId}-p2`, type: "practice" });
      }
    }

    if (d === days) {
      const meditation = CONTENT_POOL.practice.find(p => p.title.includes("Meditation"));
      if (meditation && !dayLessons.some(l => l.title.includes("Meditation"))) {
        dayLessons.push({ ...meditation, id: `${dayId}-med`, type: "practice" });
      }
    }

    program.push({ day: d, lessons: dayLessons, focus: getDailyFocus(d, days, experience, spot) });
  }

  const spotWarning = spot?.difficulty === "advanced"
    ? `⚠️ ${spot.name} ist ein anspruchsvoller Spot. Respektiere den Ozean und kenne dein Limit.`
    : null;

  const spotHints = [];
  const bt = spot?.breakType || "";
  const hz = spot?.hazards || [];
  if (bt === "reef" || hz.includes("reef")) spotHints.push("🪸 Riff-Spot: Trage Booties zum Schutz vor scharfem Riff. Checke die Tiefe bei Ebbe!");
  if (bt === "beach" || hz.includes("rip") || hz.includes("current")) spotHints.push("🌊 Beachbreak: Achte besonders auf Strömungen (Rip Currents) – sie ändern sich mit den Sandbänken.");
  if (bt === "point" || hz.includes("locals")) spotHints.push("🧭 Pointbreak: Respektiere die Lineup-Hierarchie. Paddle nicht vor Locals in die Welle.");
  if (bt === "mixed") spotHints.push("🔀 Mixed Break: Verschiedene Wellentypen – informiere dich vor Ort über die einzelnen Spots.");

  return { program, goal, spot, spotWarning, spotHints };
}

export function getDailyFocus(dayNum, totalDays, experience, spot) {
  const progress = dayNum / totalDays;
  const bt = spot?.breakType || "";
  const hz = spot?.hazards || [];
  const isReef = bt === "reef" || hz.includes("reef");
  const isBeach = bt === "beach" || hz.includes("rip");
  const isPoint = bt === "point" || hz.includes("locals");

  if (experience === "zero") {
    if (dayNum === 1) return "Sicherheit: Ozean beobachten & Equipment kennenlernen";
    if (isBeach && progress <= 0.3) return "Sicherheit: Strömungen erkennen";
    if (isReef && progress <= 0.3) return "Reef Awareness: Tiefe & Booties Check";
    if (progress <= 0.3) return "Board-Kontrolle & Whitewash-Wellen";
    if (progress <= 0.7) return "Pop-Up festigen & erste Wellenritte";
    return "Selbstständig Wellen fangen";
  }
  if (experience === "few") {
    if (isReef) return progress <= 0.5 ? "Reef Awareness & Booties Check" : "Sicheres Paddeln über Riff";
    if (isPoint) return progress <= 0.5 ? "Lineup-Positioning am Pointbreak" : "Wellen lesen & Timing";
    if (progress <= 0.3) return "Paddle-Power & Pop-Up Konsistenz";
    if (progress <= 0.7) return "Grüne Wellen anpaddeln";
    return "Wellenauswahl & erste Rides";
  }
  if (experience === "some") {
    if (isPoint) return progress <= 0.5 ? "Positioning im Lineup" : "Linie halten & Trimmen";
    if (isReef) return progress <= 0.5 ? "Reef Navigation & Takeoff Timing" : "Bottom Turn am Reef";
    if (progress <= 0.4) return "Green Wave Commitment";
    if (progress <= 0.7) return "Bottom Turn & Linie";
    return "Speed & Flow auf der Welle";
  }
  if (isPoint) return progress <= 0.5 ? "Speed Generation am Pointbreak" : "Cutback & Reentry";
  if (isReef) return progress <= 0.5 ? "Barrel Approach & Positioning" : "Commitment in hohlen Wellen";
  if (progress <= 0.4) return "Speed & Commitment";
  if (progress <= 0.7) return "Manöver-Training: Cutback & Top Turn";
  return "Flow-State: Alles zusammen bringen";
}
