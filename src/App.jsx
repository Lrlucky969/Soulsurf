import React, { useState, useEffect } from "react";
import { SURF_SPOTS, GOALS, BOARD_TYPES, EXPERIENCE_LEVELS, CONTENT_POOL, recommendBoard, SKILL_TREE, analyzeDiary, LOCAL_POIS, PACKING_LIST } from './data.js';
import { generateProgram } from './generator.js';
import { WaveBackground, LessonCard, LessonModal } from './components.jsx';
import { useWeather, windDirLabel, weatherLabel, useSwell, swellRating } from './weather.js';
import SpotMap from './SpotMap.jsx';

const STORAGE_KEY = "soulsurf_data";
function loadSaved() { try { if (typeof localStorage === "undefined") return null; const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : null; } catch { return null; } }
function saveData(data) { try { if (typeof localStorage === "undefined") return; localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, savedAt: new Date().toISOString() })); } catch {} }
function clearData() { try { if (typeof localStorage === "undefined") return; localStorage.removeItem(STORAGE_KEY); } catch {} }

export default function SurfApp() {
  const [screen, setScreen] = useState("home");
  const [days, setDays] = useState(7);
  const [goal, setGoal] = useState("");
  const [spot, setSpot] = useState("");
  const [board, setBoard] = useState("");
  const [experience, setExperience] = useState("");
  const [program, setProgram] = useState(null);
  const [openLesson, setOpenLesson] = useState(null);
  const [filter, setFilter] = useState("all");
  const [activeDay, setActiveDay] = useState(null);
  const [completed, setCompleted] = useState({});
  const [diary, setDiary] = useState({});
  const [spotSearch, setSpotSearch] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [builderStep, setBuilderStep] = useState(1);
  const [hydrated, setHydrated] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [diaryOpen, setDiaryOpen] = useState(null);
  const [importMsg, setImportMsg] = useState(null);
  const [surfDays, setSurfDays] = useState([]);
  const [voiceField, setVoiceField] = useState(null); // { day, key } currently recording
  const [diaryPhotos, setDiaryPhotos] = useState({}); // { [dayNum]: [{ id, thumb }] }

  // SSR-safe: load saved data after mount
  useEffect(() => {
    const saved = loadSaved();
    if (saved && saved.days && saved.goal && saved.spot) {
      setDays(saved.days);
      setGoal(saved.goal);
      setSpot(saved.spot);
      setBoard(saved.board || "");
      setExperience(saved.experience || "");
      setProgram(generateProgram(saved.days, saved.goal, saved.spot, saved.equipment));
      setCompleted(saved.completed || {});
      setDiary(saved.diary || {});
      setActiveDay(saved.activeDay || 1);
      setSavedAt(saved.savedAt || null);
      setSurfDays(saved.surfDays || []);
    }
    setHydrated(true);
  }, []);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    try {
      const s = localStorage.getItem("soulsurf_dark");
      if (s !== null) { setDarkMode(s === "true"); return; }
    } catch {}
    try { if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) setDarkMode(true); } catch {}
  }, []);
  const toggleDark = () => { const next = !darkMode; setDarkMode(next); try { localStorage.setItem("soulsurf_dark", String(next)); } catch {} };
  const dm = darkMode;
  const spotObj = SURF_SPOTS.find(s => s.id === spot);
  const { weather, loading: weatherLoading } = useWeather(screen === "program" ? spotObj : null);
  const { swell, loading: swellLoading } = useSwell(screen === "program" ? spotObj : null);
  const [showEquipment, setShowEquipment] = useState(false);
  const [eqWeight, setEqWeight] = useState(75);
  const [showSkillTree, setShowSkillTree] = useState(false);
  const [tripDates, setTripDates] = useState({ start: "", end: "" });
  const [tripChecked, setTripChecked] = useState({});
  const t = {
    bg: dm ? "#0f1419" : "#FFFDF7", bg2: dm ? "#1a2332" : "#FFF8E1", bg3: dm ? "#1e2d3d" : "#E0F2F1",
    card: dm ? "rgba(30,45,61,0.8)" : "rgba(255,255,255,0.8)", cardBorder: dm ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
    text: dm ? "#e8eaed" : "#263238", text2: dm ? "#9aa0a6" : "#546E7A", text3: dm ? "#5f6368" : "#78909C",
    headerBg: dm ? "rgba(15,20,25,0.9)" : "rgba(255,253,247,0.85)", headerBorder: dm ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
    accent: "#009688", accent2: "#4DB6AC", warm: "#FFB74D", warm2: "#FF7043",
    inputBg: dm ? "rgba(30,45,61,0.8)" : "rgba(255,255,255,0.8)", inputBorder: dm ? "#2d3f50" : "#E0E0E0",
  };

  const saveAll = (overrides = {}) => {
    const data = { days, goal, spot, board, experience, equipment: { board, experience }, completed, diary, activeDay, surfDays, ...overrides };
    saveData(data);
  };

  // Streak calculation
  const todayStr = new Date().toISOString().slice(0, 10);
  const surfedToday = surfDays.includes(todayStr);
  const streak = (() => {
    if (surfDays.length === 0) return 0;
    const sorted = [...surfDays].sort().reverse();
    const today = new Date(); today.setHours(0,0,0,0);
    const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
    // streak starts from today or yesterday
    const latestDate = new Date(sorted[0] + "T00:00:00");
    if (latestDate < yesterday) return 0;
    let count = 0;
    let checkDate = latestDate;
    for (const ds of sorted) {
      const d = new Date(ds + "T00:00:00");
      if (d.getTime() === checkDate.getTime()) {
        count++;
        checkDate = new Date(checkDate); checkDate.setDate(checkDate.getDate() - 1);
      } else if (d < checkDate) break;
    }
    return count;
  })();

  const toggleSurfDay = () => {
    setSurfDays(prev => {
      const next = prev.includes(todayStr) ? prev.filter(d => d !== todayStr) : [...prev, todayStr];
      saveAll({ surfDays: next });
      return next;
    });
  };

  const toggle = (id) => setCompleted(p => { const next = { ...p, [id]: !p[id] }; saveAll({ completed: next }); return next; });
  const build = () => { if (!days || !goal || !spot) return; const eq = { board: board || "none", experience: experience || "zero" }; const p = generateProgram(days, goal, spot, eq); setProgram(p); setScreen("program"); setActiveDay(1); setCompleted({}); setDiary({}); setSurfDays([]); saveData({ days, goal, spot, board, experience, equipment: eq, completed: {}, diary: {}, activeDay: 1, surfDays: [] }); };
  const continueSaved = () => { if (!hasSaved) return; setScreen("program"); };
  const resetProgram = () => { clearData(); setProgram(null); setDays(7); setGoal(""); setSpot(""); setBoard(""); setExperience(""); setCompleted({}); setDiary({}); setSurfDays([]); setScreen("home"); setShowResetConfirm(false); setBuilderStep(1); setSavedAt(null); };

  const updateDiary = (dayNum, field, value) => {
    setDiary(prev => {
      const entry = prev[dayNum] || { date: new Date().toISOString() };
      const next = { ...prev, [dayNum]: { ...entry, [field]: value, date: entry.date || new Date().toISOString() } };
      saveAll({ diary: next });
      return next;
    });
  };

  // A3: IndexedDB for photos
  const dbRef = React.useRef(null);
  const getDB = () => new Promise((resolve, reject) => {
    if (dbRef.current) return resolve(dbRef.current);
    const req = indexedDB.open("soulsurf_photos", 1);
    req.onupgradeneeded = (e) => { e.target.result.createObjectStore("photos", { keyPath: "id" }); };
    req.onsuccess = (e) => { dbRef.current = e.target.result; resolve(e.target.result); };
    req.onerror = () => reject(new Error("IndexedDB failed"));
  });

  const loadPhotos = async (dayNum) => {
    try {
      const db = await getDB();
      const tx = db.transaction("photos", "readonly");
      const store = tx.objectStore("photos");
      return new Promise((resolve) => {
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result.filter(p => p.day === dayNum));
        req.onerror = () => resolve([]);
      });
    } catch { return []; }
  };

  const addPhoto = async (dayNum, file) => {
    try {
      const db = await getDB();
      const id = `photo-${dayNum}-${Date.now()}`;
      // Create thumbnail
      const thumb = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const size = 120;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;
            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
            resolve(canvas.toDataURL("image/jpeg", 0.7));
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
      const arrayBuf = await file.arrayBuffer();
      const tx = db.transaction("photos", "readwrite");
      tx.objectStore("photos").put({ id, day: dayNum, blob: arrayBuf, thumb, name: file.name, ts: Date.now() });
      await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
      refreshPhotos(dayNum);
    } catch (e) { console.error("Photo save failed:", e); }
  };

  const deletePhoto = async (photoId, dayNum) => {
    try {
      const db = await getDB();
      const tx = db.transaction("photos", "readwrite");
      tx.objectStore("photos").delete(photoId);
      await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
      refreshPhotos(dayNum);
    } catch (e) { console.error("Photo delete failed:", e); }
  };

  const refreshPhotos = async (dayNum) => {
    const photos = await loadPhotos(dayNum);
    setDiaryPhotos(prev => ({ ...prev, [dayNum]: photos.map(p => ({ id: p.id, thumb: p.thumb, name: p.name })) }));
  };

  // Load photos when diary opens
  useEffect(() => {
    if (diaryOpen) refreshPhotos(diaryOpen);
  }, [diaryOpen]);

  // A4: Voice-to-text
  const voiceRecRef = React.useRef(null);
  const startVoice = (dayNum, fieldKey) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (voiceField) { stopVoice(); return; }
    const rec = new SR();
    rec.lang = "de-DE";
    rec.continuous = true;
    rec.interimResults = true;
    let finalText = diary[dayNum]?.[fieldKey] || "";
    let interim = "";
    rec.onresult = (e) => {
      interim = "";
      let newFinal = "";
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) newFinal += e.results[i][0].transcript;
        else interim = e.results[i][0].transcript;
      }
      if (newFinal) {
        finalText = finalText + (finalText ? " " : "") + newFinal;
        updateDiary(dayNum, fieldKey, finalText);
      }
    };
    rec.onerror = () => { setVoiceField(null); };
    rec.onend = () => { setVoiceField(null); voiceRecRef.current = null; };
    rec.start();
    voiceRecRef.current = rec;
    setVoiceField({ day: dayNum, key: fieldKey });
  };
  const stopVoice = () => {
    if (voiceRecRef.current) { voiceRecRef.current.stop(); voiceRecRef.current = null; }
    setVoiceField(null);
  };
  const hasSpeechAPI = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

  const exportData = () => {
    try {
      const data = { days, goal, spot, board, experience, equipment: { board, experience }, completed, diary, activeDay, surfDays, exportedAt: new Date().toISOString(), version: "3.1" };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `soulsurf-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) { console.error("Export failed:", e); }
  };

  const importData = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.days || !data.goal || !data.spot) { setImportMsg("❌ Ungültige Datei – kein SoulSurf-Backup."); return; }
        setDays(data.days);
        setGoal(data.goal);
        setSpot(data.spot);
        setBoard(data.board || "");
        setExperience(data.experience || "");
        setCompleted(data.completed || {});
        setDiary(data.diary || {});
        setActiveDay(data.activeDay || 1);
        setSurfDays(data.surfDays || []);
        const eq = data.equipment || { board: data.board || "none", experience: data.experience || "zero" };
        setProgram(generateProgram(data.days, data.goal, data.spot, eq));
        saveData({ ...data, equipment: eq });
        setSavedAt(new Date().toISOString());
        setImportMsg("✅ Backup erfolgreich importiert!");
        setTimeout(() => setImportMsg(null), 3000);
      } catch { setImportMsg("❌ Datei konnte nicht gelesen werden."); setTimeout(() => setImportMsg(null), 3000); }
    };
    reader.readAsText(file);
  };

  const hasSaved = hydrated && program !== null && days && goal && spot;
  const total = program?.program?.reduce((s, d) => s + d.lessons.length, 0) || 0;
  const done = Object.values(completed).filter(Boolean).length;
  const diaryCount = Object.keys(diary).filter(k => {
    const e = diary[k];
    return e && (e.whatWorked || e.whatFailed || e.notes || e.mood);
  }).length;

  // Badge system
  const BADGES = [
    // Lektionen
    { id: "lessons-10", emoji: "📗", name: "Paddler", desc: "10 Lektionen abgeschlossen", cat: "lessons", threshold: 10 },
    { id: "lessons-25", emoji: "📘", name: "Wave Catcher", desc: "25 Lektionen abgeschlossen", cat: "lessons", threshold: 25 },
    { id: "lessons-50", emoji: "📕", name: "Shredder", desc: "50 Lektionen abgeschlossen", cat: "lessons", threshold: 50 },
    // Diary
    { id: "diary-3", emoji: "✏️", name: "Tagebuch-Starter", desc: "3 Tagebuch-Einträge", cat: "diary", threshold: 3 },
    { id: "diary-7", emoji: "📓", name: "Reflector", desc: "7 Tagebuch-Einträge", cat: "diary", threshold: 7 },
    { id: "diary-14", emoji: "📖", name: "Soul Surfer", desc: "14 Tagebuch-Einträge", cat: "diary", threshold: 14 },
  ];
  const earnedBadges = BADGES.filter(b => {
    if (b.cat === "lessons") return done >= b.threshold;
    if (b.cat === "diary") return diaryCount >= b.threshold;
    return false;
  });
  const nextBadge = BADGES.find(b => {
    if (b.cat === "lessons") return done < b.threshold;
    if (b.cat === "diary") return diaryCount < b.threshold;
    return true;
  });

  const spots = SURF_SPOTS.filter(s => s.name.toLowerCase().includes(spotSearch.toLowerCase()) || s.waveType.toLowerCase().includes(spotSearch.toLowerCase()));

  // Smart Coaching
  const coaching = React.useMemo(() => analyzeDiary(diary, CONTENT_POOL), [diary]);
  const savedSpot = hasSaved ? SURF_SPOTS.find(s => s.id === spot) : null;
  const savedGoal = hasSaved ? GOALS.find(g => g.id === goal) : null;

  // Load Google Fonts via link element (works in Artifacts)
  useEffect(() => {
    try {
      if (!document.querySelector('link[data-soulsurf-fonts]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap';
        link.setAttribute('data-soulsurf-fonts', 'true');
        document.head.appendChild(link);
      }
    } catch {}
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes wave { 0% { transform: rotate(0deg); } 25% { transform: rotate(20deg); } 75% { transform: rotate(-15deg); } 100% { transform: rotate(0deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { height: -webkit-fill-available; }
        body { min-height: 100vh; min-height: -webkit-fill-available; }
        input:focus { outline: 2px solid #FFB74D; outline-offset: 2px; }
        input[type="range"] { -webkit-appearance: none; width: 100%; height: 8px; background: linear-gradient(90deg, #4DB6AC, #009688); border-radius: 4px; outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: ${dm ? "#1e2d3d" : "white"}; border: 3px solid #009688; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
        input[type="range"]::-moz-range-thumb { width: 28px; height: 28px; border-radius: 50%; background: ${dm ? "#1e2d3d" : "white"}; border: 3px solid #009688; cursor: pointer; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: ${dm ? "#2d3f50" : "#CFD8DC"}; border-radius: 3px; }
        @media (max-width: 480px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-title { font-size: 32px !important; }
          .hero-wave { font-size: 60px !important; }
          .builder-title { font-size: 26px !important; }
        }
        @media (max-width: 360px) {
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: dm ? `linear-gradient(170deg, ${t.bg} 0%, ${t.bg2} 30%, ${t.bg3} 70%, ${t.bg} 100%)` : "linear-gradient(170deg, #FFFDF7 0%, #FFF8E1 30%, #E0F2F1 70%, #FFFDF7 100%)", fontFamily: "'DM Sans', sans-serif", position: "relative", color: t.text }}>
        {!dm && <WaveBackground />}
        <header style={{ position: "sticky", top: 0, zIndex: 100, paddingTop: "max(12px, env(safe-area-inset-top))", paddingBottom: 12, paddingLeft: 20, paddingRight: 20, background: t.headerBg, backdropFilter: "blur(20px)", borderBottom: `1px solid ${t.headerBorder}` }}>
          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div onClick={() => setScreen("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28, animation: "float 3s ease-in-out infinite" }}>🏄</span>
              <div><h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: t.text, lineHeight: 1 }}>Soul<span style={{ color: t.accent }}>Surf</span></h1>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: t.text3, letterSpacing: "0.15em", textTransform: "uppercase" }}>v3.3 · ride the vibe ☮</span></div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={toggleDark} style={{ background: dm ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title={dm ? "Light Mode" : "Dark Mode"}>{dm ? "☀️" : "🌙"}</button>
              {screen === "program" && <>
                <button onClick={exportData} title="Backup exportieren" style={{ background: dm ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>💾</button>
                <button onClick={() => { setScreen("builder"); setBuilderStep(1); }} style={{ background: "linear-gradient(135deg, #FF7043, #FFB74D)", color: "white", border: "none", borderRadius: 20, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}>✎ Neu planen</button>
              </>}
            </div>
          </div>
        </header>
        <main style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px 100px", position: "relative", zIndex: 1 }}>

          {screen === "home" && (
            <div style={{ paddingTop: 50, textAlign: "center" }}>
              <div style={{ fontSize: 80, marginBottom: 16, animation: "float 4s ease-in-out infinite" }}>🌊</div>
              <h2 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, color: t.text, lineHeight: 1.1, marginBottom: 12 }}>Lerne Surfen.<br /><span style={{ color: t.accent }}>Finde deinen Flow.</span></h2>
              <p style={{ fontSize: 17, color: t.text2, maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.6 }}>Dein persönliches Surf-Programm – angepasst an dein Level, Ziel und deinen Spot. 3 bis 30 Tage, mit Equipment-Guide, Videos und Artikeln.</p>
              {hasSaved && (
                <div style={{ background: "linear-gradient(135deg, #004D40, #00695C)", borderRadius: 20, padding: "24px 20px", marginBottom: 24, textAlign: "left", color: "white", position: "relative", overflow: "hidden", animation: "slideUp 0.5s ease forwards", opacity: 0 }}>
                  <div style={{ position: "absolute", top: -15, right: -15, fontSize: 80, opacity: 0.1 }}>🏄</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.7, marginBottom: 8 }}>💾 Gespeichertes Programm</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{days} Tage · {savedGoal?.emoji} {savedGoal?.name}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                    <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "4px 10px", fontSize: 12 }}>{savedSpot?.emoji} {savedSpot?.name}</span>
                    <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "4px 10px", fontSize: 12 }}>✓ {done}/{total} erledigt</span>
                    {Object.keys(diary).length > 0 && <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "4px 10px", fontSize: 12 }}>📓 {Object.keys(diary).length} Tagebuch-Einträge</span>}
                    {streak > 0 && <span style={{ background: "rgba(255,183,77,0.25)", borderRadius: 16, padding: "4px 10px", fontSize: 12 }}>🔥 {streak} Tage Streak</span>}
                  </div>
                  {savedAt && (
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, opacity: 0.6, marginBottom: 10 }}>
                      Zuletzt bearbeitet: {(() => { try { const d = new Date(savedAt); const now = new Date(); const diff = Math.floor((now - d) / 60000); if (diff < 1) return "gerade eben"; if (diff < 60) return `vor ${diff} Min`; if (diff < 1440) return `vor ${Math.floor(diff / 60)} Std`; return d.toLocaleDateString("de-DE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); } catch { return ""; } })()}
                    </div>
                  )}
                  <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, height: 6, overflow: "hidden", marginBottom: 16 }}>
                    <div style={{ background: "linear-gradient(90deg, #FFB74D, #FF7043)", height: "100%", borderRadius: 10, width: `${total > 0 ? (done / total) * 100 : 0}%` }} />
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={continueSaved} style={{ flex: 1, background: "white", color: "#004D40", border: "none", borderRadius: 14, padding: "14px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Playfair Display', serif" }}>▶ Weiter surfen</button>
                    <button onClick={exportData} title="Backup exportieren" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: "14px 18px", fontSize: 14, cursor: "pointer" }}>💾</button>
                    <button onClick={() => setShowResetConfirm(true)} style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: "14px 18px", fontSize: 14, cursor: "pointer" }}>🗑</button>
                  </div>
                </div>
              )}
              {showResetConfirm && (
                <div style={{ background: dm ? "#2d2010" : "#FFF3E0", border: "2px solid #FFB74D", borderRadius: 16, padding: "20px", marginBottom: 24, textAlign: "center", animation: "slideUp 0.3s ease forwards", opacity: 0 }}>
                  <p style={{ fontSize: 15, color: "#4E342E", marginBottom: 14 }}>Programm und Fortschritt wirklich löschen?</p>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                    <button onClick={resetProgram} style={{ background: "#E53935", color: "white", border: "none", borderRadius: 12, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Ja, löschen</button>
                    <button onClick={() => setShowResetConfirm(false)} style={{ background: "#ECEFF1", color: "#546E7A", border: "none", borderRadius: 12, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Abbrechen</button>
                  </div>
                </div>
              )}
              <button onClick={() => { setScreen("builder"); setBuilderStep(1); }} style={{ background: "linear-gradient(135deg, #009688, #4DB6AC)", color: "white", border: "none", borderRadius: 50, padding: "18px 44px", fontSize: 18, fontWeight: 700, cursor: "pointer", fontFamily: "'Playfair Display', serif", boxShadow: "0 8px 30px rgba(0,150,136,0.3)" }}>{hasSaved ? "Neues Programm erstellen" : "Programm erstellen 🤙"}</button>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 60 }}>
                {[{ e: "🎒", t: "Equipment", d: "Board, Wetsuit & Basics" }, { e: "📖", t: "Theorie", d: "Ozean, Wellen & Sicherheit" }, { e: "🏄", t: "Praxis", d: "Pop-Up, Paddeln & Wellen" }, { e: "▶", t: "Videos", d: "Tutorials & Artikel" }].map((f, i) => (
                  <div key={i} style={{ background: t.card, borderRadius: 20, padding: "24px 12px", border: `1px solid ${t.cardBorder}`, animation: "slideUp 0.5s ease forwards", animationDelay: `${i * 120}ms`, opacity: 0 }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{f.e}</div>
                    <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: t.text, marginBottom: 4 }}>{f.t}</h4>
                    <p style={{ fontSize: 12, color: t.text3, lineHeight: 1.4 }}>{f.d}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 50, padding: 24, background: t.card, borderRadius: 20, border: `1px dashed ${dm ? "#2d3f50" : "#CFD8DC"}` }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: t.text3, fontStyle: "italic" }}>☮ "The best surfer out there is the one having the most fun." — Phil Edwards</p>
              </div>
              <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {hasSaved && (
                  <button onClick={exportData} style={{ background: t.inputBg, color: t.text2, border: `1px solid ${t.inputBorder}`, borderRadius: 12, padding: "10px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}>💾 Backup exportieren</button>
                )}
                <label style={{ background: t.inputBg, color: t.text2, border: `1px solid ${t.inputBorder}`, borderRadius: 12, padding: "10px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}>
                  📂 Backup importieren
                  <input type="file" accept=".json" onChange={e => { importData(e.target.files?.[0]); e.target.value = ""; }} style={{ display: "none" }} />
                </label>
              </div>
              {importMsg && (
                <div style={{ marginTop: 12, textAlign: "center", padding: "10px 16px", borderRadius: 12, background: importMsg.startsWith("✅") ? (dm ? "rgba(77,182,172,0.15)" : "#E0F2F1") : (dm ? "rgba(255,112,67,0.15)" : "#FFF3E0"), fontSize: 13, fontWeight: 600, color: importMsg.startsWith("✅") ? "#4DB6AC" : "#E65100", animation: "slideUp 0.3s ease forwards", opacity: 0 }}>{importMsg}</div>
              )}
            </div>
          )}

          {screen === "builder" && (
            <div style={{ paddingTop: 30 }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <span style={{ fontSize: 40 }}>🛠</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: t.text, margin: "8px 0 6px" }}>Bau dein Programm</h2>
                <p style={{ fontSize: 15, color: t.text3 }}>Schritt {builderStep} von 4</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
                  {[1,2,3,4].map(s => (<div key={s} style={{ width: s === builderStep ? 28 : 10, height: 10, borderRadius: 5, background: s <= builderStep ? "linear-gradient(135deg, #009688, #4DB6AC)" : "#E0E0E0", transition: "all 0.3s ease", cursor: s < builderStep ? "pointer" : "default" }} onClick={() => { if (s < builderStep) setBuilderStep(s); }} />))}
                </div>
              </div>

              {builderStep === 1 && (
                <div style={{ animation: "slideUp 0.4s ease forwards", opacity: 0 }}>
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.text2, display: "block", marginBottom: 10 }}>🏄 Dein Surfboard</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                      {BOARD_TYPES.map(b => (
                        <button key={b.id} onClick={() => setBoard(b.id)} style={{ background: board === b.id ? "linear-gradient(135deg, #5C6BC0, #7986CB)" : t.inputBg, color: board === b.id ? "white" : t.text, border: board === b.id ? "2px solid #5C6BC0" : `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "14px 10px", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "center", transition: "all 0.2s ease" }}>
                          <span style={{ fontSize: 24, display: "block", marginBottom: 4 }}>{b.emoji}</span>
                          <span style={{ display: "block", fontWeight: 700, fontSize: 12 }}>{b.label}</span>
                          <span style={{ display: "block", fontSize: 10, color: board === b.id ? "rgba(255,255,255,0.7)" : "#90A4AE", marginTop: 2 }}>{b.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.text2, display: "block", marginBottom: 10 }}>🌿 Deine Erfahrung</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {EXPERIENCE_LEVELS.map(e => (
                        <button key={e.id} onClick={() => setExperience(e.id)} style={{ background: experience === e.id ? "linear-gradient(135deg, #66BB6A, #43A047)" : t.inputBg, color: experience === e.id ? "white" : t.text, border: experience === e.id ? "2px solid #43A047" : `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 600, cursor: "pointer", textAlign: "left", transition: "all 0.2s ease" }}>
                          <span style={{ fontSize: 22, marginRight: 8 }}>{e.emoji}</span>{e.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setBuilderStep(2)} style={{ flex: 1, background: "linear-gradient(135deg, #009688, #4DB6AC)", color: "white", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Playfair Display', serif" }}>Weiter →</button>
                    <button onClick={() => { setBoard(""); setExperience(""); setBuilderStep(2); }} style={{ background: t.inputBg, color: t.text3, border: `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "16px 20px", fontSize: 13, cursor: "pointer" }}>Überspringen</button>
                  </div>
                </div>
              )}

              {builderStep === 2 && (
                <div style={{ animation: "slideUp 0.4s ease forwards", opacity: 0 }}>
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.text2, display: "block", marginBottom: 10 }}>📅 Wie viele Tage? <span style={{ fontSize: 28, fontWeight: 900, color: "#009688", fontFamily: "'Playfair Display', serif" }}>{days}</span></label>
                    <input type="range" min="3" max="30" value={days} onChange={e => setDays(parseInt(e.target.value))} style={{ width: "100%", marginBottom: 8 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.text3 }}>
                      <span>3 Tage</span>
                      <span style={{ color: "#009688", fontWeight: 700 }}>{days <= 5 ? "Quick Start" : days <= 10 ? "Solide Basis" : days <= 20 ? "Intensiv" : "Full Program"}</span>
                      <span>30 Tage</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setBuilderStep(1)} style={{ background: t.inputBg, color: t.text2, border: `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "16px 20px", fontSize: 14, cursor: "pointer" }}>← Zurück</button>
                    <button onClick={() => setBuilderStep(3)} style={{ flex: 1, background: "linear-gradient(135deg, #009688, #4DB6AC)", color: "white", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Playfair Display', serif" }}>Weiter →</button>
                  </div>
                </div>
              )}

              {builderStep === 3 && (
                <div style={{ animation: "slideUp 0.4s ease forwards", opacity: 0 }}>
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.text2, display: "block", marginBottom: 10 }}>🎯 Was ist dein Ziel?</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {GOALS.map(g => (
                        <button key={g.id} onClick={() => setGoal(g.id)} style={{ background: goal === g.id ? "linear-gradient(135deg, #FF7043, #FFB74D)" : t.inputBg, color: goal === g.id ? "white" : t.text, border: goal === g.id ? "2px solid #FF7043" : `2px solid ${t.inputBorder}`, borderRadius: 14, padding: 16, fontSize: 14, fontWeight: 600, cursor: "pointer", textAlign: "left", transition: "all 0.2s ease" }}>
                          <span style={{ fontSize: 24, display: "block", marginBottom: 4 }}>{g.emoji}</span>{g.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setBuilderStep(2)} style={{ background: t.inputBg, color: t.text2, border: `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "16px 20px", fontSize: 14, cursor: "pointer" }}>← Zurück</button>
                    <button onClick={() => { if (goal) setBuilderStep(4); }} disabled={!goal} style={{ flex: 1, background: goal ? "linear-gradient(135deg, #009688, #4DB6AC)" : "#E0E0E0", color: goal ? "white" : "#9E9E9E", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: goal ? "pointer" : "not-allowed", fontFamily: "'Playfair Display', serif" }}>Weiter →</button>
                  </div>
                </div>
              )}

              {builderStep === 4 && (
                <div style={{ animation: "slideUp 0.4s ease forwards", opacity: 0 }}>
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.text2, display: "block", marginBottom: 10 }}>🌍 Wo surfst du? ({SURF_SPOTS.length} Spots)</label>
                    <input type="text" placeholder="🔍 Spot suchen..." value={spotSearch} onChange={e => setSpotSearch(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `2px solid ${t.inputBorder}`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", marginBottom: 12, background: t.inputBg, color: t.text }} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxHeight: 340, overflowY: "auto", paddingRight: 4 }}>
                      {spots.map(s => (
                        <button key={s.id} onClick={() => setSpot(s.id)} style={{ background: spot === s.id ? "linear-gradient(135deg, #5C6BC0, #7986CB)" : t.inputBg, color: spot === s.id ? "white" : t.text, border: spot === s.id ? "2px solid #5C6BC0" : `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "12px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left", transition: "all 0.2s ease" }}>
                          <span style={{ fontSize: 18, marginRight: 6 }}>{s.emoji}</span>{s.name}
                          <div style={{ fontSize: 11, color: spot === s.id ? "rgba(255,255,255,0.8)" : "#90A4AE", marginTop: 2, fontFamily: "'Space Mono', monospace" }}>{s.waveType}</div>
                          <div style={{ fontSize: 10, color: spot === s.id ? "rgba(255,255,255,0.6)" : "#B0BEC5", marginTop: 1, fontFamily: "'Space Mono', monospace" }}>{s.season} · {s.water}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setBuilderStep(3)} style={{ background: t.inputBg, color: t.text2, border: `2px solid ${t.inputBorder}`, borderRadius: 14, padding: "16px 20px", fontSize: 14, cursor: "pointer" }}>← Zurück</button>
                    <button onClick={build} disabled={!spot} style={{ flex: 1, background: spot ? "linear-gradient(135deg, #009688, #00796B)" : "#E0E0E0", color: spot ? "white" : "#9E9E9E", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: spot ? "pointer" : "not-allowed", fontFamily: "'Playfair Display', serif", boxShadow: spot ? "0 8px 30px rgba(0,150,136,0.3)" : "none" }}>🏄 Programm generieren</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {screen === "program" && program && (
            <div style={{ paddingTop: 24 }}>
              <div style={{ background: "linear-gradient(135deg, #004D40, #00695C, #00897B)", borderRadius: 24, padding: "28px 24px", color: "white", marginBottom: 20, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, fontSize: 100, opacity: 0.1, transform: "rotate(-15deg)" }}>🌊</div>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.7 }}>Dein Surf-Programm</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, margin: "6px 0 12px", lineHeight: 1.2 }}>{days} Tage · {program.goal?.emoji} {program.goal?.name}</h2>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[`${program.spot?.emoji} ${program.spot?.name}`, `${total} Lektionen`, `🌡 ${program.spot?.water} · ${program.spot?.season}`].map((t,i) => (
                    <span key={i} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "5px 12px", fontSize: 12 }}>{t}</span>
                  ))}
                </div>
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, opacity: 0.8, marginBottom: 5 }}><span>Fortschritt</span><span>{done}/{total}</span></div>
                  <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, height: 7, overflow: "hidden" }}>
                    <div style={{ background: "linear-gradient(90deg, #FFB74D, #FF7043)", height: "100%", borderRadius: 10, transition: "width 0.5s ease", width: `${total > 0 ? (done / total) * 100 : 0}%` }} />
                  </div>
                </div>
                <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center" }}>
                  <button onClick={toggleSurfDay} style={{ display: "flex", alignItems: "center", gap: 8, background: surfedToday ? "rgba(255,183,77,0.25)" : "rgba(255,255,255,0.1)", border: `1px solid ${surfedToday ? "#FFB74D" : "rgba(255,255,255,0.2)"}`, borderRadius: 12, padding: "8px 14px", cursor: "pointer", transition: "all 0.2s ease", color: "white", fontSize: 13, fontWeight: 600 }}>
                    <span style={{ fontSize: 18 }}>{surfedToday ? "🤙" : "🏄"}</span>
                    {surfedToday ? "Heute gesurft ✓" : "Heute gesurft?"}
                  </button>
                  {streak > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,183,77,0.2)", borderRadius: 12, padding: "8px 14px" }}>
                      <span style={{ fontSize: 16 }}>🔥</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: "#FFB74D" }}>{streak}</span>
                      <span style={{ fontSize: 11, opacity: 0.8 }}>{streak === 1 ? "Tag" : "Tage"} Streak</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Badges */}
              {(earnedBadges.length > 0 || nextBadge) && (
                <div style={{ background: dm ? "rgba(30,45,61,0.8)" : "linear-gradient(135deg, #FFF8E1, #FFF3E0)", border: `1px solid ${dm ? "rgba(255,183,77,0.15)" : "#FFE0B2"}`, borderRadius: 16, padding: "14px 18px", marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: dm ? "#FFB74D" : "#E65100", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>🏆 Badges</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: nextBadge ? 10 : 0 }}>
                    {earnedBadges.map(b => (
                      <div key={b.id} title={b.desc} style={{ display: "flex", alignItems: "center", gap: 6, background: dm ? "rgba(255,183,77,0.15)" : "rgba(255,183,77,0.2)", borderRadius: 10, padding: "6px 12px", border: `1px solid ${dm ? "rgba(255,183,77,0.3)" : "#FFB74D"}` }}>
                        <span style={{ fontSize: 18 }}>{b.emoji}</span>
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: dm ? "#e8eaed" : "#4E342E" }}>{b.name}</div>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: dm ? "#9aa0a6" : "#8D6E63" }}>{b.desc}</div>
                        </div>
                      </div>
                    ))}
                    {BADGES.filter(b => !earnedBadges.includes(b)).map(b => {
                      const progress = b.cat === "lessons" ? done / b.threshold : diaryCount / b.threshold;
                      return (
                        <div key={b.id} title={b.desc} style={{ display: "flex", alignItems: "center", gap: 6, background: dm ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", borderRadius: 10, padding: "6px 12px", border: `1px dashed ${dm ? "#2d3f50" : "#CFD8DC"}`, opacity: 0.5 }}>
                          <span style={{ fontSize: 18, filter: "grayscale(1)" }}>{b.emoji}</span>
                          <div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: dm ? "#5f6368" : "#90A4AE" }}>{b.name}</div>
                            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: dm ? "#5f6368" : "#B0BEC5" }}>{Math.round(progress * 100)}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {nextBadge && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 8, borderTop: `1px dashed ${dm ? "#2d3f50" : "#FFE0B2"}` }}>
                      <span style={{ fontSize: 12 }}>🎯</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: dm ? "#9aa0a6" : "#8D6E63" }}>
                        Nächstes: <strong style={{ color: dm ? "#FFB74D" : "#E65100" }}>{nextBadge.name}</strong> – {nextBadge.cat === "lessons" ? `noch ${nextBadge.threshold - done} Lektionen` : `noch ${nextBadge.threshold - diaryCount} Einträge`}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {/* Smart Coaching Tips */}
              {coaching.tips.length > 0 && (
                <div style={{ background: dm ? "rgba(30,45,61,0.8)" : "linear-gradient(135deg, #E8F5E9, #F1F8E9)", border: `1px solid ${dm ? "rgba(102,187,106,0.2)" : "#C8E6C9"}`, borderRadius: 16, padding: "14px 18px", marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: dm ? "#66BB6A" : "#2E7D32", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>🧠 Dein persönlicher Coach</div>
                  {coaching.patterns.length > 0 && (
                    <div style={{ fontSize: 12, color: t.text2, marginBottom: 10, lineHeight: 1.5 }}>
                      Aus deinem Tagebuch: Du erwähnst oft{" "}
                      {coaching.patterns.map((p, i) => (
                        <span key={i}>{i > 0 && (i === coaching.patterns.length - 1 ? " und " : ", ")}<strong style={{ color: dm ? "#66BB6A" : "#2E7D32" }}>{p.keyword}</strong></span>
                      ))}
                      {" "}– hier sind Tipps für dich:
                    </div>
                  )}
                  {coaching.tips.map((tip, i) => (
                    <div key={i} style={{ background: dm ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)", borderRadius: 12, padding: "10px 14px", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{tip.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 4, lineHeight: 1.4 }}>{tip.tip}</div>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {tip.lessons.map((lesson, j) => (
                              <button key={j} onClick={() => setOpenLesson({ ...lesson, type: Object.keys(CONTENT_POOL).find(cat => CONTENT_POOL[cat].includes(lesson)) || "theory" })} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 8, background: dm ? "rgba(102,187,106,0.15)" : "#E8F5E9", border: `1px solid ${dm ? "rgba(102,187,106,0.3)" : "#A5D6A7"}`, color: dm ? "#66BB6A" : "#2E7D32", cursor: "pointer", fontWeight: 600 }}>
                                {lesson.icon} {lesson.title} →
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Smart Coach */}
              {coaching.tips.length > 0 && (
                <div style={{ background: dm ? "rgba(30,45,61,0.8)" : "linear-gradient(135deg, #F3E5F5, #EDE7F6)", border: `1px solid ${dm ? "rgba(186,104,200,0.2)" : "#CE93D8"}`, borderRadius: 16, padding: "14px 18px", marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: dm ? "#CE93D8" : "#7B1FA2", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>🧠 Dein Surf-Coach</div>
                  {coaching.patterns.length > 0 && (
                    <div style={{ background: dm ? "rgba(255,183,77,0.1)" : "rgba(255,183,77,0.15)", borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontSize: 12, color: dm ? "#FFB74D" : "#E65100" }}>
                      📊 Muster erkannt: {coaching.patterns.map(p => `${p.emoji} ${p.name} (${p.count}x erwähnt)`).join(", ")}
                    </div>
                  )}
                  {coaching.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: dm ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)", borderRadius: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: 22 }}>{tip.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 2 }}>{tip.tip}</div>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {tip.lessons.slice(0, 2).map((lesson, j) => (
                            <span key={j} onClick={() => { const found = program?.program?.flatMap(d => d.lessons).find(l => l.title === lesson); if (found) setOpenLesson(found); }} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: dm ? "#CE93D8" : "#7B1FA2", background: dm ? "rgba(186,104,200,0.15)" : "#F3E5F5", padding: "2px 8px", borderRadius: 8, cursor: "pointer" }}>📖 {lesson}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {coaching.boardHint && (
                    <button onClick={() => setShowEquipment(true)} style={{ width: "100%", marginTop: 4, padding: "8px 12px", background: dm ? "rgba(255,183,77,0.1)" : "#FFF8E1", border: "1px dashed #FFB74D", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#E65100" }}>🏄 Board-Probleme? Öffne den Board-Berater →</button>
                  )}
                </div>
              )}
              {program.spotWarning && (
                <div style={{ background: dm ? "rgba(255,112,67,0.15)" : "#FFF3E0", border: `1px solid ${dm ? "rgba(255,112,67,0.3)" : "#FFB74D"}`, borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>⚠️</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: dm ? "#FFB74D" : "#E65100", lineHeight: 1.4 }}>{program.spotWarning.replace("⚠️ ", "")}</span>
                </div>
              )}
              {program.spotHints && program.spotHints.length > 0 && (
                <div style={{ background: dm ? "rgba(77,182,172,0.1)" : "#E0F2F1", border: `1px solid ${dm ? "rgba(77,182,172,0.2)" : "#B2DFDB"}`, borderRadius: 14, padding: "12px 16px", marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Spot-Hinweise</div>
                  {program.spotHints.map((hint, i) => (
                    <div key={i} style={{ fontSize: 13, color: t.text2, marginBottom: i < program.spotHints.length - 1 ? 4 : 0, lineHeight: 1.4 }}>{hint}</div>
                  ))}
                </div>
              )}
              {program.spot?.tips && (
                <div style={{ background: t.card, borderRadius: 16, padding: "14px 18px", marginBottom: 20, border: `1px solid ${t.cardBorder}` }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#5C6BC0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>📍 Spot-Tipps: {program.spot.name}</div>
                  {program.spot.tips.map((tip, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 4, fontSize: 13, color: t.text2 }}><span style={{ color: "#5C6BC0" }}>•</span><span>{tip}</span></div>))}
                </div>
              )}
              {/* Spot Map */}
              <SpotMap spot={spotObj} pois={LOCAL_POIS[spot] || []} dm={dm} />
              {/* Trip Planner */}
              {spotObj && (
                <div style={{ background: dm ? "rgba(30,45,61,0.8)" : "linear-gradient(135deg, #FFF3E0, #FFF8E1)", border: `1px solid ${dm ? "rgba(255,183,77,0.15)" : "#FFE0B2"}`, borderRadius: 16, padding: "14px 18px", marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: dm ? "#FFB74D" : "#E65100", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>✈️ Trip planen · {spotObj.name}</div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: 11, color: t.text2, display: "block", marginBottom: 3 }}>Hinflug</label>
                      <input type="date" value={tripDates.start} onChange={e => setTripDates(p => ({ ...p, start: e.target.value }))} style={{ width: "100%", padding: "6px 8px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: 12 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: 11, color: t.text2, display: "block", marginBottom: 3 }}>Rückflug</label>
                      <input type="date" value={tripDates.end} onChange={e => setTripDates(p => ({ ...p, end: e.target.value }))} style={{ width: "100%", padding: "6px 8px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: 12 }} />
                    </div>
                  </div>
                  {tripDates.start && tripDates.end && (
                    <div style={{ background: dm ? "rgba(0,150,136,0.1)" : "#E0F2F1", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 12, color: t.accent, fontWeight: 600 }}>
                      🗓️ {Math.max(0, Math.ceil((new Date(tripDates.end) - new Date(tripDates.start)) / 86400000))} Tage · Saison: {spotObj.season} · Wasser: {spotObj.water} · Wetsuit: {spotObj.wetsuit === "none" ? "Keiner nötig" : spotObj.wetsuit}
                    </div>
                  )}
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.text3, textTransform: "uppercase", marginBottom: 6 }}>Packliste</div>
                  {[
                    { label: "Essentiell", items: PACKING_LIST.essential },
                    { label: "Empfohlen", items: PACKING_LIST.recommended },
                  ].map(group => {
                    const filtered = group.items.filter(item => !item.condition || item.condition(spotObj));
                    if (filtered.length === 0) return null;
                    return (
                      <div key={group.label} style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: t.text2, marginBottom: 4 }}>{group.label}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {filtered.map(item => (
                            <button key={item.id} onClick={() => setTripChecked(p => ({ ...p, [item.id]: !p[item.id] }))} style={{
                              display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                              background: tripChecked[item.id] ? (dm ? "rgba(0,150,136,0.2)" : "#E0F2F1") : t.inputBg,
                              border: `1px solid ${tripChecked[item.id] ? t.accent : t.inputBorder}`,
                              color: tripChecked[item.id] ? t.accent : t.text2,
                              textDecoration: tripChecked[item.id] ? "line-through" : "none", opacity: tripChecked[item.id] ? 0.7 : 1,
                            }}>
                              {item.emoji} {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ fontSize: 11, color: t.text3, marginTop: 6 }}>
                    ✓ {Object.values(tripChecked).filter(Boolean).length} / {[...PACKING_LIST.essential, ...PACKING_LIST.recommended].filter(i => !i.condition || i.condition(spotObj)).length} eingepackt
                  </div>
                </div>
              )}
              {/* Weather Widget */}
              {weather && (
                <div style={{ background: dm ? "rgba(30,45,61,0.8)" : "linear-gradient(135deg, #E3F2FD, #E0F7FA)", border: `1px solid ${dm ? "rgba(77,182,172,0.2)" : "#B2EBF2"}`, borderRadius: 16, padding: "14px 18px", marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: dm ? "#4DB6AC" : "#00838F", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>🌤️ Wetter · {program.spot?.name}</div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 32 }}>{weatherLabel(weather.current?.code).emoji}</span>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: dm ? "#e8eaed" : "#263238" }}>{weather.current?.temp}°C</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: dm ? "#9aa0a6" : "#546E7A" }}>
                        💨 {weather.current?.wind} km/h {windDirLabel(weather.current?.windDir)} · {weatherLabel(weather.current?.code).label}
                      </div>
                    </div>
                  </div>
                  {weather.forecast && weather.forecast.length > 0 && (
                    <div style={{ display: "flex", gap: 8 }}>
                      {weather.forecast.map((day, i) => (
                        <div key={i} style={{ flex: 1, background: dm ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: dm ? "#9aa0a6" : "#78909C", marginBottom: 4 }}>
                            {new Date(day.date + "T00:00:00").toLocaleDateString("de-DE", { weekday: "short" })}
                          </div>
                          <div style={{ fontSize: 18 }}>{weatherLabel(day.code).emoji}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: dm ? "#e8eaed" : "#263238" }}>
                            {day.tempMax}° / {day.tempMin}°
                          </div>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: dm ? "#9aa0a6" : "#90A4AE" }}>
                            💨 {day.windMax} {windDirLabel(day.windDir)}
                          </div>
                          {day.rain > 0 && <div style={{ fontSize: 9, color: "#42A5F5" }}>🌧 {day.rain}mm</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {weatherLoading && (
                <div style={{ background: dm ? "rgba(30,45,61,0.5)" : "#E3F2FD", borderRadius: 14, padding: "10px 16px", marginBottom: 16, textAlign: "center" }}>
                  <span style={{ fontSize: 12, color: dm ? "#9aa0a6" : "#546E7A" }}>🌤️ Wetter wird geladen...</span>
                </div>
              )}
              {/* Swell Forecast */}
              {swell && swell.length > 0 && (
                <div style={{ background: dm ? "rgba(30,45,61,0.8)" : "linear-gradient(135deg, #E8EAF6, #E3F2FD)", border: `1px solid ${dm ? "rgba(121,134,203,0.2)" : "#C5CAE9"}`, borderRadius: 16, padding: "14px 18px", marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: dm ? "#7986CB" : "#3949AB", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>🌊 Swell Forecast · 5 Tage</div>
                  <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
                    {swell.map((day, i) => {
                      const rating = swellRating(day.waveHeight, day.wavePeriod);
                      return (
                        <div key={i} style={{ flex: "0 0 auto", minWidth: 72, background: dm ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)", borderRadius: 10, padding: "8px 8px", textAlign: "center" }}>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: dm ? "#9aa0a6" : "#78909C", marginBottom: 3 }}>
                            {new Date(day.date + "T00:00:00").toLocaleDateString("de-DE", { weekday: "short", day: "numeric" })}
                          </div>
                          {rating && <div style={{ fontSize: 16, marginBottom: 2 }}>{rating.emoji}</div>}
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: rating?.color || t.text }}>{day.waveHeight != null ? `${day.waveHeight.toFixed(1)}m` : "–"}</div>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: dm ? "#9aa0a6" : "#90A4AE" }}>
                            {day.wavePeriod != null ? `${Math.round(day.wavePeriod)}s` : ""} {day.waveDir != null ? windDirLabel(day.waveDir) : ""}
                          </div>
                          {rating && <div style={{ fontSize: 9, color: rating.color, fontWeight: 600, marginTop: 1 }}>{rating.label}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Quick action buttons */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <button onClick={() => setShowEquipment(true)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: dm ? "rgba(30,45,61,0.8)" : "#F5F5F5", border: `1px solid ${t.inputBorder}`, borderRadius: 12, padding: "10px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: t.text2 }}>🏄 Board-Berater</button>
                <button onClick={() => setShowSkillTree(true)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: dm ? "rgba(30,45,61,0.8)" : "#F5F5F5", border: `1px solid ${t.inputBorder}`, borderRadius: 12, padding: "10px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: t.text2 }}>🌳 Skill Tree</button>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
                {[{ k: "all", l: "Alle", e: "📚" }, { k: "equipment", l: "Equipment", e: "🎒" }, { k: "warmup", l: "Warm-Up", e: "🔥" }, { k: "theory", l: "Theorie", e: "📖" }, { k: "practice", l: "Praxis", e: "🏄" }].map(f => (
                  <button key={f.k} onClick={() => setFilter(f.k)} style={{ background: filter === f.k ? (dm ? "#4DB6AC" : "#263238") : t.inputBg, color: filter === f.k ? "white" : t.text2, border: `1px solid ${filter === f.k ? (dm ? "#4DB6AC" : "#263238") : t.inputBorder}`, borderRadius: 20, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{f.e} {f.l}</button>
                ))}
              </div>
              {program.program.map(dayData => {
                const fl = dayData.lessons.filter(l => filter === "all" || l.type === filter);
                if (fl.length === 0) return null;
                return (
                  <div key={dayData.day} style={{ marginBottom: 20 }}>
                    <button onClick={() => { const next = activeDay === dayData.day ? null : dayData.day; setActiveDay(next); setDiaryOpen(null); saveAll({ activeDay: next }); }} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: "12px 16px", cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ background: "linear-gradient(135deg, #009688, #4DB6AC)", color: "white", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13 }}>D{dayData.day}</span>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: t.text }}>Tag {dayData.day}{dayData.day === 1 && dayData.lessons.some(l => l.type === "equipment") ? " · Equipment" : ""}</div>
                          {dayData.focus && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#4DB6AC", fontWeight: 600, marginTop: 1 }}>🎯 {dayData.focus}</div>}
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#90A4AE" }}>{fl.length} Lektionen{fl.some(l => l.videoUrl) ? " · ▶ Videos" : ""}{fl.some(l => l.articleUrl) ? " · 📄" : ""}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 16, color: "#90A4AE", transition: "transform 0.2s ease", transform: activeDay === dayData.day ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                    </button>
                    {(activeDay === dayData.day) && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8, paddingLeft: 6 }}>
                        {fl.map((lesson, idx) => (
                          <div key={lesson.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <button onClick={e => { e.stopPropagation(); toggle(lesson.id); }} style={{ marginTop: 18, width: 24, height: 24, minWidth: 24, borderRadius: 7, border: completed[lesson.id] ? "2px solid #4DB6AC" : `2px solid ${dm ? "#2d3f50" : "#CFD8DC"}`, background: completed[lesson.id] ? "#4DB6AC" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "white", transition: "all 0.2s ease" }}>{completed[lesson.id] && "✓"}</button>
                            <div style={{ flex: 1, opacity: completed[lesson.id] ? 0.5 : 1, transition: "opacity 0.3s ease" }}>
                              <LessonCard lesson={lesson} index={idx} onOpen={setOpenLesson} dm={dm} />
                            </div>
                          </div>
                        ))}
                        {/* Surf Diary */}
                        <div style={{ marginTop: 8 }}>
                          <button onClick={() => setDiaryOpen(diaryOpen === dayData.day ? null : dayData.day)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: (diary[dayData.day]?.whatWorked || diary[dayData.day]?.whatFailed || diary[dayData.day]?.notes || diary[dayData.day]?.mood) ? (dm ? "rgba(77,182,172,0.12)" : "#E0F2F1") : (dm ? "rgba(255,255,255,0.04)" : "#F5F5F5"), border: `1px dashed ${(diary[dayData.day]?.whatWorked || diary[dayData.day]?.mood) ? "#4DB6AC" : (dm ? "#2d3f50" : "#CFD8DC")}`, borderRadius: 12, padding: "10px 14px", cursor: "pointer", transition: "all 0.2s ease" }}>
                            <span style={{ fontSize: 18 }}>{(diary[dayData.day]?.whatWorked || diary[dayData.day]?.mood) ? "📓" : "📝"}</span>
                            <div style={{ flex: 1, textAlign: "left" }}>
                              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: (diary[dayData.day]?.whatWorked || diary[dayData.day]?.mood) ? "#4DB6AC" : t.text3, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                {(diary[dayData.day]?.whatWorked || diary[dayData.day]?.mood) ? "Surf-Tagebuch ✓" : "Surf-Tagebuch"}
                              </span>
                              {!diaryOpen && diary[dayData.day] && (diary[dayData.day].whatWorked || diary[dayData.day].mood) && (
                                <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
                                  {diary[dayData.day].mood && <span style={{ fontSize: 14 }}>{["", "😩", "😕", "😐", "😊", "🤩"][diary[dayData.day].mood]}</span>}
                                  {diary[dayData.day].waveHeight && <span style={{ fontSize: 10, color: t.text3, fontFamily: "'Space Mono', monospace" }}>{diary[dayData.day].waveHeight}</span>}
                                  {diary[dayData.day].whatWorked && <span style={{ fontSize: 12, color: t.text2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 160 }}>{diary[dayData.day].whatWorked}</span>}
                                </div>
                              )}
                            </div>
                            <span style={{ fontSize: 14, color: t.text3, transition: "transform 0.2s ease", transform: diaryOpen === dayData.day ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                          </button>
                          {diaryOpen === dayData.day && (
                            <div style={{ background: dm ? "rgba(30,45,61,0.6)" : "rgba(255,255,255,0.9)", border: `1px solid ${dm ? "#2d3f50" : "#E0E0E0"}`, borderRadius: 14, padding: 16, marginTop: 8, animation: "slideUp 0.3s ease forwards", opacity: 0 }}>
                              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>📓 Tag {dayData.day} – Surf-Tagebuch</div>
                              {[
                                { key: "whatWorked", label: "Was hat gut geklappt?", icon: "✅", placeholder: "z.B. Pop-Up war heute schneller, Wellen besser gelesen..." },
                                { key: "whatFailed", label: "Was hat nicht geklappt?", icon: "🔄", placeholder: "z.B. Timing beim Anpaddeln noch schwierig..." },
                                { key: "focusTomorrow", label: "Fokus für morgen", icon: "🎯", placeholder: "z.B. Früher paddeln, Blick nach vorne..." },
                                { key: "notes", label: "Notizen", icon: "📝", placeholder: "Wellen, Stimmung, Wetter, Erlebnisse..." },
                              ].map(field => (
                                <div key={field.key} style={{ marginBottom: 12 }}>
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: t.text2 }}>{field.icon} {field.label}</label>
                                    {hasSpeechAPI && (
                                      <button onClick={() => startVoice(dayData.day, field.key)} style={{ background: voiceField?.day === dayData.day && voiceField?.key === field.key ? "#EF5350" : (dm ? "rgba(255,255,255,0.08)" : "#F5F5F5"), border: `1px solid ${voiceField?.day === dayData.day && voiceField?.key === field.key ? "#EF5350" : t.inputBorder}`, borderRadius: 8, padding: "3px 8px", cursor: "pointer", fontSize: 12, color: voiceField?.day === dayData.day && voiceField?.key === field.key ? "white" : t.text3, transition: "all 0.2s ease", animation: voiceField?.day === dayData.day && voiceField?.key === field.key ? "pulse 1s infinite" : "none" }}>
                                        {voiceField?.day === dayData.day && voiceField?.key === field.key ? "⏹ Stop" : "🎤"}
                                      </button>
                                    )}
                                  </div>
                                  <textarea
                                    value={diary[dayData.day]?.[field.key] || ""}
                                    onChange={e => updateDiary(dayData.day, field.key, e.target.value)}
                                    placeholder={field.placeholder}
                                    rows={field.key === "notes" ? 3 : 2}
                                    style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${voiceField?.day === dayData.day && voiceField?.key === field.key ? "#EF5350" : t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif", resize: "vertical", lineHeight: 1.5, transition: "border-color 0.2s ease" }}
                                  />
                                </div>
                              ))}
                              {/* A2: Mood + Conditions */}
                              <div style={{ borderTop: `1px dashed ${dm ? "#2d3f50" : "#E0E0E0"}`, paddingTop: 12, marginTop: 4, marginBottom: 12 }}>
                                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Stimmung & Bedingungen</div>
                                <div style={{ marginBottom: 10 }}>
                                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: t.text2, marginBottom: 6 }}>Mood</label>
                                  <div style={{ display: "flex", gap: 6 }}>
                                    {[{ v: 1, e: "😩" }, { v: 2, e: "😕" }, { v: 3, e: "😐" }, { v: 4, e: "😊" }, { v: 5, e: "🤩" }].map(m => (
                                      <button key={m.v} onClick={() => updateDiary(dayData.day, "mood", m.v)} style={{ fontSize: 24, padding: "6px 8px", borderRadius: 10, border: diary[dayData.day]?.mood === m.v ? "2px solid #4DB6AC" : `1px solid ${t.inputBorder}`, background: diary[dayData.day]?.mood === m.v ? (dm ? "rgba(77,182,172,0.2)" : "#E0F2F1") : t.inputBg, cursor: "pointer", transition: "all 0.15s ease", transform: diary[dayData.day]?.mood === m.v ? "scale(1.15)" : "scale(1)" }}>{m.e}</button>
                                    ))}
                                  </div>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                                  <div>
                                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: t.text2, marginBottom: 4 }}>🌊 Wellenhöhe</label>
                                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                                      {["Flat", "0.5m", "1m", "1.5m", "2m+"].map(wh => (
                                        <button key={wh} onClick={() => updateDiary(dayData.day, "waveHeight", wh)} style={{ padding: "5px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, border: diary[dayData.day]?.waveHeight === wh ? "2px solid #4DB6AC" : `1px solid ${t.inputBorder}`, background: diary[dayData.day]?.waveHeight === wh ? (dm ? "rgba(77,182,172,0.2)" : "#E0F2F1") : t.inputBg, color: diary[dayData.day]?.waveHeight === wh ? "#4DB6AC" : t.text2, cursor: "pointer" }}>{wh}</button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: t.text2, marginBottom: 4 }}>👥 Crowd</label>
                                    <div style={{ display: "flex", gap: 4 }}>
                                      {[{ v: "low", l: "Leer" }, { v: "med", l: "Okay" }, { v: "high", l: "Voll" }].map(c => (
                                        <button key={c.v} onClick={() => updateDiary(dayData.day, "crowd", c.v)} style={{ padding: "5px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, border: diary[dayData.day]?.crowd === c.v ? "2px solid #4DB6AC" : `1px solid ${t.inputBorder}`, background: diary[dayData.day]?.crowd === c.v ? (dm ? "rgba(77,182,172,0.2)" : "#E0F2F1") : t.inputBg, color: diary[dayData.day]?.crowd === c.v ? "#4DB6AC" : t.text2, cursor: "pointer" }}>{c.l}</button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                  <div>
                                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: t.text2, marginBottom: 4 }}>⚡ Energy</label>
                                    <div style={{ display: "flex", gap: 4 }}>
                                      {[1, 2, 3, 4, 5].map(e => (
                                        <button key={e} onClick={() => updateDiary(dayData.day, "energy", e)} style={{ width: 30, height: 30, borderRadius: 8, fontSize: 12, fontWeight: 700, border: diary[dayData.day]?.energy === e ? "2px solid #FFB74D" : `1px solid ${t.inputBorder}`, background: diary[dayData.day]?.energy === e ? (dm ? "rgba(255,183,77,0.2)" : "#FFF8E1") : t.inputBg, color: diary[dayData.day]?.energy === e ? "#FFB74D" : t.text2, cursor: "pointer" }}>{e}</button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: t.text2, marginBottom: 4 }}>🏄 Board</label>
                                    <select value={diary[dayData.day]?.boardUsed || ""} onChange={e => updateDiary(dayData.day, "boardUsed", e.target.value)} style={{ width: "100%", padding: "7px 10px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, background: t.inputBg, color: t.text, fontSize: 12 }}>
                                      <option value="">– wählen –</option>
                                      {BOARD_TYPES.map(b => <option key={b.id} value={b.id}>{b.emoji} {b.label}</option>)}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {/* Instant Coach Tip */}
                              {(() => {
                                const entry = diary[dayData.day];
                                if (!entry) return null;
                                const text = [entry.whatFailed || "", entry.notes || ""].join(" ").toLowerCase();
                                if (!text.trim()) return null;
                                const entryTips = coaching.tips.filter(tip =>
                                  tip.lessons.some(l => tip.tip && text.split(" ").some(w => w.length > 3 && tip.tip.toLowerCase().includes(w)))
                                ).slice(0, 2);
                                if (entryTips.length === 0 && coaching.tips.length > 0) return null;
                                if (entryTips.length === 0) return null;
                                return (
                                  <div style={{ borderTop: `1px dashed ${dm ? "#2d3f50" : "#E0E0E0"}`, paddingTop: 10, marginTop: 4, marginBottom: 8 }}>
                                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: dm ? "#CE93D8" : "#7B1FA2", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>💡 Coach-Tipp</div>
                                    {entryTips.map((tip, i) => (
                                      <div key={i} style={{ display: "flex", gap: 8, padding: "8px 10px", background: dm ? "rgba(186,104,200,0.08)" : "#F3E5F5", borderRadius: 10, marginBottom: 6, fontSize: 12, color: dm ? "#e8eaed" : "#4A148C" }}>
                                        <span>{tip.icon}</span>
                                        <div>
                                          <div style={{ fontWeight: 600, marginBottom: 2 }}>{tip.tip}</div>
                                          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                                            {tip.lessons.slice(0, 2).map((lesson, j) => (
                                              <span key={j} onClick={() => { const found = program?.program?.flatMap(d => d.lessons).find(l => l.title === lesson.title); if (found) setOpenLesson(found); }} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: dm ? "#CE93D8" : "#7B1FA2", background: dm ? "rgba(186,104,200,0.15)" : "#EDE7F6", padding: "1px 6px", borderRadius: 6, cursor: "pointer" }}>→ {lesson.title}</span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                );
                              })()}
                              {/* A3: Photos */}
                              <div style={{ borderTop: `1px dashed ${dm ? "#2d3f50" : "#E0E0E0"}`, paddingTop: 12, marginTop: 4, marginBottom: 12 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>📷 Fotos</span>
                                  <label style={{ display: "flex", alignItems: "center", gap: 4, background: dm ? "rgba(255,255,255,0.08)" : "#F5F5F5", border: `1px solid ${t.inputBorder}`, borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: t.text2 }}>
                                    📷 Foto hinzufügen
                                    <input type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={e => { if (e.target.files?.[0]) addPhoto(dayData.day, e.target.files[0]); e.target.value = ""; }} />
                                  </label>
                                </div>
                                {diaryPhotos[dayData.day]?.length > 0 && (
                                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {diaryPhotos[dayData.day].map(photo => (
                                      <div key={photo.id} style={{ position: "relative", borderRadius: 10, overflow: "hidden", width: 80, height: 80, border: `1px solid ${t.inputBorder}` }}>
                                        <img src={photo.thumb} alt={photo.name || "Surf-Foto"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        <button onClick={() => deletePhoto(photo.id, dayData.day)} style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,0.6)", color: "white", border: "none", borderRadius: "50%", width: 20, height: 20, fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {(!diaryPhotos[dayData.day] || diaryPhotos[dayData.day].length === 0) && (
                                  <div style={{ textAlign: "center", padding: "12px 0", color: t.text3, fontSize: 12 }}>Noch keine Fotos – halte deine Sessions fest!</div>
                                )}
                              </div>
                              {diary[dayData.day]?.date && (
                                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.text3, textAlign: "right" }}>
                                  Erstellt: {new Date(diary[dayData.day].date).toLocaleDateString("de-DE", { day: "numeric", month: "short" })}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ textAlign: "center", padding: "36px 20px", marginTop: 16, borderTop: `1px dashed ${dm ? "#2d3f50" : "#CFD8DC"}` }}>
                <span style={{ fontSize: 46, display: "block", marginBottom: 10, animation: "wave 2s ease-in-out infinite" }}>🤙</span>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 4 }}>
                  {done === total && total > 0 ? "Gnarly! Alle Lektionen abgeschlossen! 🎉" : "Keep paddling, die perfekte Welle kommt!"}
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.text3 }}>☮ surf · learn · repeat</p>
              </div>
            </div>
          )}
        </main>
        {/* Equipment Berater Modal */}
        {showEquipment && (
          <div onClick={() => setShowEquipment(false)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: "fadeIn 0.3s ease" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: dm ? "#1a2332" : "#FFFDF7", borderRadius: 24, maxWidth: 520, width: "100%", maxHeight: "85vh", overflow: "auto", padding: "28px 24px", boxShadow: "0 25px 60px rgba(0,0,0,0.3)", animation: "slideUp 0.4s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>🏄 Board-Berater</h2>
                <button onClick={() => setShowEquipment(false)} style={{ background: dm ? "rgba(255,255,255,0.1)" : "#F5F5F5", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer", color: t.text3 }}>✕</button>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: t.text2, marginBottom: 6 }}>Dein Gewicht (kg)</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input type="range" min={40} max={120} value={eqWeight} onChange={e => setEqWeight(Number(e.target.value))} style={{ flex: 1, accentColor: "#009688" }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700, color: t.accent, minWidth: 50 }}>{eqWeight} kg</span>
                </div>
              </div>
              {(() => {
                const rec = recommendBoard(eqWeight, experience || "zero");
                return (
                  <>
                    <div style={{ background: dm ? "rgba(0,150,136,0.1)" : "#E0F2F1", borderRadius: 14, padding: "12px 16px", marginBottom: 16, textAlign: "center" }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.accent, textTransform: "uppercase", marginBottom: 4 }}>Empfohlenes Volume</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: t.accent }}>{rec.volume}L</div>
                      <div style={{ fontSize: 11, color: t.text2 }}>bei {eqWeight}kg · {EXPERIENCE_LEVELS.find(e => e.id === (experience || "zero"))?.label}</div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.text3, textTransform: "uppercase", marginBottom: 8 }}>Board-Empfehlungen</div>
                      {rec.boards.map((b, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, padding: "10px 14px", background: b.best ? (dm ? "rgba(0,150,136,0.12)" : "#E0F2F1") : t.inputBg, border: `1px solid ${b.best ? t.accent : t.inputBorder}`, borderRadius: 12, marginBottom: 8 }}>
                          <span style={{ fontSize: 24 }}>{b.emoji}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: t.text }}>{b.type} {b.best && <span style={{ fontSize: 10, color: t.accent }}>★ TOP</span>}</div>
                            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.accent }}>{b.volume}</div>
                            <div style={{ fontSize: 12, color: t.text2, marginTop: 2 }}>{b.reason}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: dm ? "rgba(255,183,77,0.1)" : "#FFF8E1", borderRadius: 12, padding: "10px 14px", border: "1px dashed #FFB74D" }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#E65100", textTransform: "uppercase", marginBottom: 4 }}>Finnen-Setup</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{rec.fins.setup}</div>
                      <div style={{ fontSize: 12, color: t.text2 }}>{rec.fins.reason}</div>
                    </div>
                    {coaching.boardHint && (
                      <div style={{ background: dm ? "rgba(102,187,106,0.1)" : "#E8F5E9", borderRadius: 12, padding: "10px 14px", marginTop: 12, border: "1px solid #A5D6A7" }}>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#2E7D32", textTransform: "uppercase", marginBottom: 4 }}>🧠 Aus deinem Tagebuch</div>
                        <div style={{ fontSize: 12, color: dm ? "#e8eaed" : "#2E7D32" }}>{coaching.boardHint}</div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        )}
        {/* Skill Tree Modal */}
        {showSkillTree && (
          <div onClick={() => setShowSkillTree(false)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: "fadeIn 0.3s ease" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: dm ? "#1a2332" : "#FFFDF7", borderRadius: 24, maxWidth: 560, width: "100%", maxHeight: "85vh", overflow: "auto", padding: "28px 24px", boxShadow: "0 25px 60px rgba(0,0,0,0.3)", animation: "slideUp 0.4s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: t.text, margin: 0 }}>🌳 Skill Tree</h2>
                <button onClick={() => setShowSkillTree(false)} style={{ background: dm ? "rgba(255,255,255,0.1)" : "#F5F5F5", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer", color: t.text3 }}>✕</button>
              </div>
              {[1, 2, 3, 4].map(tier => {
                const tierSkills = SKILL_TREE.filter(s => s.tier === tier);
                if (tierSkills.length === 0) return null;
                const tierLabels = ["", "🌱 Grundlagen", "🌿 Aufbau", "🌳 Intermediate", "🏔 Advanced"];
                return (
                  <div key={tier} style={{ marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.text3, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{tierLabels[tier]}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {tierSkills.map(skill => {
                        const completedLessons = skill.lessons.filter(title => {
                          return Object.keys(completed).some(key => {
                            const lesson = program?.program?.flatMap(d => d.lessons).find(l => l.id === key);
                            return lesson && lesson.title === title && completed[key];
                          });
                        });
                        const progress = skill.lessons.length > 0 ? completedLessons.length / skill.lessons.length : 0;
                        const unlocked = progress >= 1;
                        const prereqMet = !skill.requires || skill.requires.every(reqId => {
                          const req = SKILL_TREE.find(s => s.id === reqId);
                          if (!req) return true;
                          return req.lessons.every(title => Object.keys(completed).some(key => {
                            const lesson = program?.program?.flatMap(d => d.lessons).find(l => l.id === key);
                            return lesson && lesson.title === title && completed[key];
                          }));
                        });
                        return (
                          <div key={skill.id} style={{ flex: "1 1 calc(50% - 4px)", minWidth: 140, background: unlocked ? (dm ? "rgba(0,150,136,0.15)" : "#E0F2F1") : prereqMet ? t.inputBg : (dm ? "rgba(255,255,255,0.02)" : "#FAFAFA"), border: `1px solid ${unlocked ? t.accent : prereqMet ? t.inputBorder : (dm ? "#1e2d3d" : "#EEEEEE")}`, borderRadius: 14, padding: "12px", opacity: prereqMet ? 1 : 0.4, transition: "all 0.3s ease" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                              <span style={{ fontSize: 22, filter: unlocked ? "none" : "grayscale(0.5)" }}>{skill.icon}</span>
                              <div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: unlocked ? t.accent : t.text }}>{skill.name}</div>
                                {unlocked && <span style={{ fontSize: 10, color: t.accent }}>✓ Gemeistert</span>}
                              </div>
                            </div>
                            <div style={{ fontSize: 11, color: t.text2, marginBottom: 6, lineHeight: 1.4 }}>{skill.desc}</div>
                            <div style={{ background: dm ? "rgba(255,255,255,0.1)" : "#E0E0E0", borderRadius: 6, height: 5, overflow: "hidden" }}>
                              <div style={{ background: unlocked ? t.accent : "#FFB74D", height: "100%", borderRadius: 6, transition: "width 0.5s ease", width: `${progress * 100}%` }} />
                            </div>
                            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: t.text3, marginTop: 4 }}>{completedLessons.length}/{skill.lessons.length} Lektionen</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <div style={{ textAlign: "center", padding: "12px 0", borderTop: `1px dashed ${dm ? "#2d3f50" : "#E0E0E0"}`, marginTop: 8 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.text3 }}>
                  {SKILL_TREE.filter(s => {
                    return s.lessons.every(title => Object.keys(completed).some(key => {
                      const lesson = program?.program?.flatMap(d => d.lessons).find(l => l.id === key);
                      return lesson && lesson.title === title && completed[key];
                    }));
                  }).length} / {SKILL_TREE.length} Skills gemeistert
                </span>
              </div>
            </div>
          </div>
        )}
        <LessonModal lesson={openLesson} onClose={() => setOpenLesson(null)} dm={dm} />
      </div>
    </>
  );
}
