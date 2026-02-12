// SoulSurf – Weather Module (v2.7)
// Uses Open-Meteo API (free, no key required)
import { useState, useEffect } from "react";

const CACHE_KEY = "soulsurf_weather";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getCached(spotId) {
  try {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw);
    const entry = cache[spotId];
    if (!entry) return null;
    if (Date.now() - entry.ts > CACHE_TTL) return null;
    return entry.data;
  } catch { return null; }
}

function setCache(spotId, data) {
  try {
    if (typeof localStorage === "undefined") return;
    const raw = localStorage.getItem(CACHE_KEY);
    const cache = raw ? JSON.parse(raw) : {};
    cache[spotId] = { data, ts: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

export function useWeather(spot) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!spot?.lat || !spot?.lng) return;

    const cached = getCached(spot.id);
    if (cached) { setWeather(cached); return; }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${spot.lat}&longitude=${spot.lng}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,weather_code&timezone=auto&forecast_days=3`;

    fetch(url)
      .then(r => { if (!r.ok) throw new Error("Weather fetch failed"); return r.json(); })
      .then(data => {
        if (cancelled) return;
        const result = {
          current: {
            temp: Math.round(data.current?.temperature_2m),
            wind: Math.round(data.current?.wind_speed_10m),
            windDir: data.current?.wind_direction_10m,
            code: data.current?.weather_code,
          },
          forecast: (data.daily?.time || []).map((date, i) => ({
            date,
            tempMax: Math.round(data.daily.temperature_2m_max[i]),
            tempMin: Math.round(data.daily.temperature_2m_min[i]),
            rain: data.daily.precipitation_sum[i],
            windMax: Math.round(data.daily.wind_speed_10m_max[i]),
            windDir: data.daily.wind_direction_10m_dominant[i],
            code: data.daily.weather_code[i],
          })),
        };
        setWeather(result);
        setCache(spot.id, result);
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [spot?.id, spot?.lat, spot?.lng]);

  return { weather, loading, error };
}

// Wind direction to compass label
export function windDirLabel(deg) {
  if (deg == null) return "–";
  const dirs = ["N", "NO", "O", "SO", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

// Wind direction to surf quality hint
export function windSurfHint(deg, breakType) {
  if (deg == null) return null;
  // Simplified: offshore is generally good for surfing
  // Real offshore depends on coast orientation, but we give a general hint
  const label = windDirLabel(deg);
  const speed = null; // would need speed too for full analysis
  if (label.includes("N") && !label.includes("O")) return "🟢 Offshore-Tendenz – gute Bedingungen möglich";
  if (label === "O" || label === "W") return "🟡 Sideshore – kann okay sein";
  if (label.includes("S")) return "🟠 Onshore-Tendenz – Wellen könnten unruhig sein";
  return null;
}

// WMO Weather code to emoji + label
export function weatherLabel(code) {
  if (code == null) return { emoji: "❓", label: "Unbekannt" };
  if (code === 0) return { emoji: "☀️", label: "Klar" };
  if (code <= 3) return { emoji: "⛅", label: "Bewölkt" };
  if (code <= 48) return { emoji: "🌫️", label: "Nebel" };
  if (code <= 57) return { emoji: "🌦️", label: "Nieselregen" };
  if (code <= 67) return { emoji: "🌧️", label: "Regen" };
  if (code <= 77) return { emoji: "❄️", label: "Schnee" };
  if (code <= 82) return { emoji: "🌧️", label: "Schauer" };
  if (code <= 86) return { emoji: "🌨️", label: "Schneeschauer" };
  if (code <= 99) return { emoji: "⛈️", label: "Gewitter" };
  return { emoji: "❓", label: "Unbekannt" };
}
