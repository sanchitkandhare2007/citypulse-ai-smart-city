import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// points: [{ id, lat, lng, color, label }]
export default function MapView({ points, selectedId, onSelect, height = 440 }) {
  const el = useRef(null), map = useRef(null), layer = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    try {
      map.current = L.map(el.current, { scrollWheelZoom: false }).setView([18.5204, 73.8567], 11);
      let fails = 0;
      const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors", maxZoom: 18 }).addTo(map.current);
      tiles.on("tileerror", () => { if (++fails > 3) setFailed(true); });
      layer.current = L.layerGroup().addTo(map.current);
    } catch { setFailed(true); }
    return () => { if (map.current) { map.current.remove(); map.current = null; } };
  }, []);

  useEffect(() => {
    if (!layer.current || !map.current) return;
    layer.current.clearLayers();
    points.forEach((p) => {
      const sel = p.id === selectedId;
      L.circleMarker([p.lat, p.lng], { radius: sel ? 12 : 8, color: "#fff", weight: sel ? 3 : 1, fillColor: p.color, fillOpacity: 0.92 })
        .bindTooltip(p.label).on("click", () => onSelect && onSelect(p.id)).addTo(layer.current);
    });
    if (points.length) map.current.fitBounds(points.map((p) => [p.lat, p.lng]), { padding: [40, 40], maxZoom: 13 });
  }, [points, selectedId]);

  return (
    <div className="mapwrap" style={{ height }}>
      <div ref={el} className="map" />
      {failed && <div className="map-fallback">Map tiles could not load (offline or blocked). Markers may be hidden - use the list view instead.</div>}
    </div>
  );
}
