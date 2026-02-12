// SoulSurf – UI Components (v2.7)

export const VideoEmbed = ({ url }) => {
  if (!url) return null;
  return (
    <div style={{ margin: "16px 0", borderRadius: 16, overflow: "hidden", background: "#111", position: "relative", paddingBottom: "56.25%", height: 0 }}>
      <iframe src={`${url}?rel=0&modestbranding=1`} title="Tutorial Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} />
    </div>
  );
};

export const WaveBackground = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(0deg, rgba(255,183,77,0.15) 0%, transparent 100%)" }} />
    <svg style={{ position: "absolute", bottom: -5, left: 0, width: "200%", height: 80 }} viewBox="0 0 1440 80">
      <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,0 1620,40 L1620,80 L0,80 Z" fill="rgba(0,150,136,0.08)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-720,0" dur="12s" repeatCount="indefinite" />
      </path>
    </svg>
  </div>
);

export const LessonCard = ({ lesson, index, onOpen, dm }) => {
  const colors = {
    theory: { bg: dm ? "linear-gradient(135deg, #2d2510, #2d2010)" : "linear-gradient(135deg, #FFF8E1, #FFF3E0)", border: "#FFB74D", tag: dm ? "#FFB74D" : "#E65100", tagBg: dm ? "rgba(255,183,77,0.15)" : "#FFF3E0", label: "Theorie" },
    practice: { bg: dm ? "linear-gradient(135deg, #0d2520, #0d2a25)" : "linear-gradient(135deg, #E0F2F1, #E0F7FA)", border: "#4DB6AC", tag: dm ? "#4DB6AC" : "#004D40", tagBg: dm ? "rgba(77,182,172,0.15)" : "#E0F2F1", label: "Praxis" },
    warmup: { bg: dm ? "linear-gradient(135deg, #2d1520, #2d1025)" : "linear-gradient(135deg, #FCE4EC, #F3E5F5)", border: "#F06292", tag: dm ? "#F06292" : "#880E4F", tagBg: dm ? "rgba(240,98,146,0.15)" : "#FCE4EC", label: "Warm-Up" },
    equipment: { bg: dm ? "linear-gradient(135deg, #1a1d2d, #151a2d)" : "linear-gradient(135deg, #E8EAF6, #E3F2FD)", border: "#7986CB", tag: dm ? "#7986CB" : "#283593", tagBg: dm ? "rgba(121,134,203,0.15)" : "#E8EAF6", label: "Equipment" }
  };
  const c = colors[lesson.type] || colors.theory;
  return (
    <div onClick={() => onOpen(lesson)} style={{ background: c.bg, border: `2px solid ${c.border}22`, borderRadius: 16, padding: "18px 20px", cursor: "pointer", transition: "all 0.3s ease", animationDelay: `${index * 60}ms`, animation: "slideUp 0.5s ease forwards", opacity: 0 }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${c.border}33`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ fontSize: 28 }}>{lesson.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: c.tag, background: c.tagBg, padding: "2px 8px", borderRadius: 20, fontFamily: "'Space Mono', monospace" }}>{c.label}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: "#78909C", background: "#ECEFF1", padding: "2px 8px", borderRadius: 20, fontFamily: "'Space Mono', monospace" }}>{lesson.duration}</span>
            {lesson.videoUrl && <span style={{ fontSize: 10, fontWeight: 600, color: "#C62828", background: "#FFEBEE", padding: "2px 8px", borderRadius: 20, fontFamily: "'Space Mono', monospace" }}>▶ Video</span>}
            {lesson.articleUrl && <span style={{ fontSize: 10, fontWeight: 600, color: "#1565C0", background: "#E3F2FD", padding: "2px 8px", borderRadius: 20, fontFamily: "'Space Mono', monospace" }}>📄 Artikel</span>}
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: dm ? '#e8eaed' : '#263238', margin: 0, lineHeight: 1.3 }}>{lesson.title}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: dm ? '#9aa0a6' : '#546E7A', margin: "6px 0 0", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{lesson.content}</p>
        </div>
        <div style={{ fontSize: 18, color: c.border, marginTop: 2 }}>→</div>
      </div>
    </div>
  );
};

export const LessonModal = ({ lesson, onClose, dm }) => {
  if (!lesson) return null;
  const tc = { theory: "#E65100", practice: "#004D40", warmup: "#880E4F", equipment: "#283593" };
  const tl = { theory: "📖 Theorie", practice: "🏄 Praxis", warmup: "🔥 Warm-Up", equipment: "🎒 Equipment" };
  const tb = { theory: "#FFF3E0", practice: "#E0F2F1", warmup: "#FCE4EC", equipment: "#E8EAF6" };
  const sBg = { theory: "#FFF8E1", practice: "#E0F2F1", warmup: "#FCE4EC", equipment: "#E8EAF6" };
  const sC = { theory: "#4E342E", practice: "#1B5E20", warmup: "#880E4F", equipment: "#1A237E" };
  const sB = { theory: "#FFB74D", practice: "#4DB6AC", warmup: "#F06292", equipment: "#7986CB" };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: "fadeIn 0.3s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: dm ? "#1a2332" : "#FFFDF7", borderRadius: 24, maxWidth: 620, width: "100%", maxHeight: "85vh", overflow: "auto", padding: "28px 24px", boxShadow: "0 25px 60px rgba(0,0,0,0.3)", animation: "slideUp 0.4s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 44 }}>{lesson.icon}</span>
          <button onClick={onClose} style={{ background: dm ? "rgba(255,255,255,0.1)" : "#F5F5F5", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer", color: dm ? "#9aa0a6" : "#546E7A", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: tc[lesson.type], background: tb[lesson.type], padding: "4px 12px", borderRadius: 20, fontFamily: "'Space Mono', monospace" }}>{tl[lesson.type]} · {lesson.duration}</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, color: dm ? '#e8eaed' : '#1a1a1a', margin: "14px 0 10px", lineHeight: 1.2 }}>{lesson.title}</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: dm ? '#9aa0a6' : '#37474F', lineHeight: 1.7, margin: "0 0 16px", borderLeft: "3px solid #FFB74D", paddingLeft: 14, fontStyle: "italic" }}>{lesson.content}</p>
        {lesson.videoUrl && <VideoEmbed url={lesson.videoUrl} />}
        {lesson.articleUrl && (
          <a href={lesson.articleUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)", borderRadius: 14, padding: "14px 18px", marginBottom: 16, textDecoration: "none", border: "1px solid #90CAF9", transition: "all 0.2s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "none"}>
            <span style={{ fontSize: 24 }}>📄</span>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#1565C0", textTransform: "uppercase", letterSpacing: "0.08em" }}>Weiterführender Artikel</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#0D47A1" }}>{lesson.articleTitle || "Artikel lesen →"}</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 18, color: "#1565C0" }}>↗</span>
          </a>
        )}
        {lesson.tips && (<div style={{ marginBottom: 20 }}><h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: tc[lesson.type], textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>💡 Tipps</h4>
          {lesson.tips.map((tip, i) => (<div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, padding: "8px 12px", background: dm ? "rgba(255,248,225,0.08)" : "#FFF8E1", borderRadius: 10, fontSize: 13, color: dm ? "#e8eaed" : "#4E342E", fontFamily: "'DM Sans', sans-serif" }}><span style={{ color: "#FFB74D", fontWeight: 700 }}>✦</span><span>{tip}</span></div>))}</div>)}
        {lesson.steps && (<div style={{ marginBottom: 20 }}><h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: tc[lesson.type], textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>📋 Schritt für Schritt</h4>
          {lesson.steps.map((step, i) => (<div key={i} style={{ display: "flex", gap: 10, marginBottom: 6, padding: "10px 12px", background: sBg[lesson.type], borderRadius: 10, fontSize: 13, color: sC[lesson.type], fontFamily: "'DM Sans', sans-serif" }}><span style={{ background: sB[lesson.type], color: "white", borderRadius: "50%", width: 22, height: 22, minWidth: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{i + 1}</span><span style={{ lineHeight: 1.5 }}>{step}</span></div>))}</div>)}
        {lesson.proTip && (<div style={{ background: dm ? "rgba(255,183,77,0.1)" : "linear-gradient(135deg, #FFF3E0, #FFECB3)", borderRadius: 14, padding: "14px 16px", border: "2px dashed #FFB74D", marginBottom: 12 }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: "#E65100", marginBottom: 4 }}>🤙 PRO-TIPP</div><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: dm ? '#e8eaed' : '#4E342E', margin: 0, fontWeight: 500 }}>{lesson.proTip}</p></div>)}
        {lesson.keyTerms && (<div style={{ marginTop: 12 }}><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{lesson.keyTerms.map((t, i) => <span key={i} style={{ background: dm ? "rgba(255,255,255,0.08)" : "#ECEFF1", color: dm ? "#9aa0a6" : "#546E7A", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Mono', monospace" }}>{t}</span>)}</div></div>)}
      </div>
    </div>
  );
};
