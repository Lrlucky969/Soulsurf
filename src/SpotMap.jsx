// SoulSurf – Spot Map Component (v3.2)
// Uses Leaflet via CDN (loaded dynamically)
import { useState, useEffect, useRef } from "react";

let leafletLoaded = false;
function loadLeaflet() {
  if (leafletLoaded) return Promise.resolve();
  return new Promise((resolve) => {
    if (document.querySelector('link[data-soulsurf-leaflet]')) { leafletLoaded = true; resolve(); return; }
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    css.setAttribute("data-soulsurf-leaflet", "1");
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    js.onload = () => { leafletLoaded = true; resolve(); };
    document.head.appendChild(js);
  });
}

const POI_ICONS = {
  spot: { emoji: "🏄", color: "#009688" },
  school: { emoji: "🎓", color: "#FF7043" },
  shop: { emoji: "🛒", color: "#7986CB" },
};

export default function SpotMap({ spot, pois, dm }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadLeaflet().then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready || !spot?.lat || !mapRef.current) return;
    if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }

    const L = window.L;
    const map = L.map(mapRef.current, { scrollWheelZoom: false }).setView([spot.lat, spot.lng], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://openstreetmap.org">OSM</a>',
      maxZoom: 18,
    }).addTo(map);

    // Custom icon factory
    const makeIcon = (emoji, color) => L.divIcon({
      html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${emoji}</div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18],
    });

    // Main spot marker
    L.marker([spot.lat, spot.lng], { icon: makeIcon("📍", "#E65100") })
      .addTo(map)
      .bindPopup(`<b>${spot.emoji} ${spot.name}</b><br>${spot.waveType}<br>🌊 ${spot.difficulty} · ${spot.season}`);

    // POI markers
    if (pois) {
      pois.forEach(poi => {
        if (filter !== "all" && poi.type !== filter) return;
        const cfg = POI_ICONS[poi.type] || POI_ICONS.spot;
        L.marker([poi.lat, poi.lng], { icon: makeIcon(cfg.emoji, cfg.color) })
          .addTo(map)
          .bindPopup(`<b>${cfg.emoji} ${poi.name}</b><br><span style="color:#666">${poi.desc}</span>${poi.url ? `<br><a href="${poi.url}" target="_blank" style="color:#1565C0">Website →</a>` : ""}`);
      });
    }

    mapInstanceRef.current = map;
    setTimeout(() => map.invalidateSize(), 100);

    return () => { if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; } };
  }, [ready, spot?.id, pois, filter]);

  if (!spot?.lat) return null;

  const t = dm ? { bg: "#1a2332", border: "#2d3f50", text: "#e8eaed", text2: "#9aa0a6", accent: "#4DB6AC" }
    : { bg: "#FFFDF7", border: "#E0E0E0", text: "#263238", text2: "#546E7A", accent: "#009688" };

  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${t.border}`, marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 6, padding: "10px 14px", background: dm ? "rgba(30,45,61,0.9)" : "#F5F5F5", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginRight: 6 }}>🗺️ Karte</span>
        {[
          { k: "all", l: "Alle", e: "📍" },
          { k: "spot", l: "Spots", e: "🏄" },
          { k: "school", l: "Schulen", e: "🎓" },
          { k: "shop", l: "Shops", e: "🛒" },
        ].map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 8, cursor: "pointer", fontWeight: 600,
            background: filter === f.k ? t.accent : "transparent",
            color: filter === f.k ? "white" : t.text2,
            border: `1px solid ${filter === f.k ? t.accent : t.border}`,
          }}>{f.e} {f.l}</button>
        ))}
      </div>
      {!ready ? (
        <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", background: dm ? "#0d1820" : "#E3F2FD", color: t.text2, fontSize: 13 }}>🗺️ Karte wird geladen...</div>
      ) : (
        <div ref={mapRef} style={{ height: 300, width: "100%" }} />
      )}
    </div>
  );
}
