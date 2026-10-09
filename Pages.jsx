import { useMemo, useState } from "react";
import { Search, ArrowRight, Navigation, Info, Trash2, Landmark, FileWarning, Wallet, MapPin, CheckCircle2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import MapView from "./MapView.jsx";
import { CATS, SEV, REPORT_TYPES, PLACES, afford, budgetText, dirLink } from "./data.js";

const PALETTE = ["#22d3ee", "#4ade80", "#fbbf24", "#a78bfa", "#f472b6", "#f87171"];
const tip = { contentStyle: { background: "#0b1830", border: "1px solid #1e4a7a", borderRadius: 10, color: "#e6f1ff" } };
const placeName = (id) => PLACES.find((p) => p.id === id)?.name;
const count = (arr, fn) => Object.entries(arr.reduce((a, x) => ((a[fn(x)] = (a[fn(x)] || 0) + 1), a), {})).map(([name, value]) => ({ name, value }));

function Title({ kicker, title, sub }) { return <div className="title"><span className="kicker">{kicker}</span><h2>{title}</h2>{sub && <p>{sub}</p>}</div>; }
function Bar5({ v }) { return <div className="meter" title={`${v}/5`}><i style={{ width: (v / 5) * 100 + "%" }} /></div>; }
function Sev({ s }) { return <span className="badge" style={{ color: SEV[s].color, borderColor: SEV[s].color }}>{SEV[s].label}</span>; }
function Demo({ children }) { return <p className="demo"><Info size={15} /> {children}</p>; }

function Skyline() {
  const b = [[20, 200, 50], [80, 150, 40], [130, 230, 60], [200, 120, 45], [255, 180, 55], [320, 90, 50], [380, 170, 45], [435, 130, 60], [505, 210, 55]];
  return (
    <svg viewBox="0 0 600 380" className="skyline" role="img" aria-label="Illustrated smart city skyline with glowing route and location pins">
      <defs>
        <linearGradient id="g1" x1="0" x2="1"><stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#4ade80" /></linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16355c" /><stop offset="1" stopColor="#0b1830" /></linearGradient>
      </defs>
      {b.map(([x, h, w], i) => (
        <g key={i}>
          <rect x={x} y={340 - h} width={w} height={h} rx="4" fill="url(#g2)" stroke="#1e4a7a" />
          {Array.from({ length: Math.floor(h / 28) }).map((_, j) => <rect key={j} x={x + 8} y={340 - h + 12 + j * 28} width={w - 16} height="6" rx="3" fill="#22d3ee" opacity={(i + j) % 3 ? 0.12 : 0.55} />)}
        </g>
      ))}
      <rect x="0" y="340" width="600" height="3" fill="#1e4a7a" />
      <path className="route" d="M20 330 C120 250 200 320 290 220 S470 150 580 80" fill="none" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 10" />
      {[[120, 275], [290, 220], [470, 140], [580, 80]].map(([x, y], i) => (
        <g key={i}><circle className="ring" cx={x} cy={y} r="14" fill="none" stroke="#22d3ee" /><circle cx={x} cy={y} r="6" fill="#22d3ee" stroke="#fff" strokeWidth="2" /></g>
      ))}
    </svg>
  );
}

/* ---------------- HOME + COMMAND CENTER ---------------- */
export function Home({ go, reports }) {
  const stats = [
    ["Places to Explore", PLACES.length, MapPin], ["Citizen Reports", reports.length, FileWarning],
    ["Heritage Locations", PLACES.filter((p) => p.cat === "heritage").length, Landmark], ["Budget-Friendly Places", PLACES.filter((p) => p.budget === 1).length, Wallet],
  ];
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="kicker">City Life · Pune demo</span>
          <h1>Your City. <em>Reimagined.</em></h1>
          <p>Discover hidden places, explore local culture, understand city conditions, and make smarter decisions about the places you visit.</p>
          <div className="row">
            <button className="btn primary" onClick={() => go("explore")}>Explore the City <ArrowRight size={16} /></button>
            <button className="btn" onClick={() => document.getElementById("command")?.scrollIntoView({ behavior: "smooth" })}>Open Smart Dashboard</button>
          </div>
        </div>
        <div className="hero-art glass"><Skyline /></div>
      </section>
      <section className="stats">
        {stats.map(([l, v, Icon]) => <div key={l} className="glass stat"><Icon size={20} /><b>{v}</b><span>{l}</span></div>)}
      </section>
      <Demo>Statistics are calculated from the sample (demo) dataset, not live city data.</Demo>
      <CommandCenter reports={reports} go={go} />
    </>
  );
}

function CommandCenter({ reports, go }) {
  const [cat, setCat] = useState("all");
  const [sel, setSel] = useState(null);
  const [showReports, setShowReports] = useState(true);
  const places = PLACES.filter((p) => cat === "all" || p.cat === cat);
  const points = useMemo(() => [
    ...places.map((p) => ({ id: p.id, lat: p.lat, lng: p.lng, color: CATS[p.cat].color, label: p.name })),
    ...(showReports ? reports.map((r) => ({ id: "r" + r.id, lat: r.lat, lng: r.lng, color: SEV[r.severity].color, label: `${r.type} report (${SEV[r.severity].label})` })) : []),
  ], [cat, showReports, reports]);
  const place = PLACES.find((p) => p.id === sel);
  const onSelect = (id) => { if (PLACES.some((p) => p.id === id)) setSel(id); };
  return (
    <section id="command" className="command">
      <Title kicker="Command Center" title="Smart City Command Center" sub="Interactive map of places and citizen report indicators. Dots are places (by category) and reports (by severity)." />
      <div className="chips">
        {["all", ...Object.keys(CATS)].map((c) => <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => { setCat(c); setSel(null); }}>{c === "all" ? "All" : CATS[c].label}</button>)}
        <label className="check"><input type="checkbox" checked={showReports} onChange={(e) => setShowReports(e.target.checked)} /> Show reports</label>
      </div>
      <div className="cmd-grid">
        <div className="glass pad0"><MapView points={points} selectedId={sel} onSelect={onSelect} height={460} /></div>
        <aside className="glass side">
          {place ? (
            <>
              <span className="badge" style={{ color: CATS[place.cat].color, borderColor: CATS[place.cat].color }}>{CATS[place.cat].label}</span>
              <h3>{place.name}</h3><p className="muted">{place.area}</p><p>{place.desc}</p>
              <div className="kv"><span>Budget</span><b>{budgetText(place.budget)} <small>(demo level)</small></b></div>
              <div className="kv"><span>Cleanliness</span><Bar5 v={place.clean} /></div>
              <div className="kv"><span>Accessibility</span><Bar5 v={place.access} /></div>
              <a className="btn primary full" href={dirLink(place.lat, place.lng)} target="_blank" rel="noreferrer"><Navigation size={15} /> Directions</a>
            </>
          ) : <p className="muted">Select a place marker to see details here.</p>}
          <h4>Recent reports <small>(sample + yours)</small></h4>
          <ul className="mini">{reports.slice(0, 4).map((r) => <li key={r.id}><Sev s={r.severity} /> {r.type} · <span className="muted">{r.location}</span></li>)}</ul>
          <button className="btn full" onClick={() => go("insights")}>Open City Insights</button>
        </aside>
      </div>
    </section>
  );
}

/* ---------------- EXPLORE ---------------- */
export function Explore({ go, reports, setCompare }) {
  const [q, setQ] = useState(""), [cat, setCat] = useState("all"), [view, setView] = useState("grid"), [open, setOpen] = useState(null);
  const list = PLACES.filter((p) => (cat === "all" || p.cat === cat) && (p.name + p.area + p.desc).toLowerCase().includes(q.trim().toLowerCase()));
  const points = useMemo(() => list.map((p) => ({ id: p.id, lat: p.lat, lng: p.lng, color: CATS[p.cat].color, label: p.name })), [q, cat]);
  const p = PLACES.find((x) => x.id === open);
  return (
    <section>
      <Title kicker="City Explorer" title="Explore Pune" sub="Search and filter places. Scores and budget levels are illustrative demo values." />
      <div className="toolbar">
        <div className="search"><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search places, areas…" aria-label="Search places" /></div>
        <div className="seg"><button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")}>Grid</button><button className={view === "map" ? "on" : ""} onClick={() => setView("map")}>Map</button></div>
      </div>
      <div className="chips">{["all", ...Object.keys(CATS)].map((c) => <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c === "all" ? "All" : CATS[c].label}</button>)}</div>
      {list.length === 0 ? <div className="glass empty">No places match “{q}”. Try another word or clear the filter.</div> :
        view === "map" ? <div className="glass pad0"><MapView points={points} selectedId={open} onSelect={setOpen} height={500} /></div> :
        <div className="cards">{list.map((x) => (
          <button key={x.id} className="glass place" onClick={() => setOpen(x.id)}>
            <div className="thumb" style={{ background: `linear-gradient(135deg, ${CATS[x.cat].color}55, #0b1830)` }}><MapPin /></div>
            <span className="badge" style={{ color: CATS[x.cat].color, borderColor: CATS[x.cat].color }}>{CATS[x.cat].label}</span>
            <h3>{x.name}</h3><p className="muted">{x.area}</p>
            <div className="foot"><span>{budgetText(x.budget)} <small>budget</small></span><span>★ {x.rating} <small>demo</small></span></div>
          </button>))}</div>}
      {p && (
        <div className="modal-bg" onClick={() => setOpen(null)}>
          <div className="modal glass" role="dialog" aria-label={p.name} onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpen(null)} aria-label="Close">×</button>
            <span className="badge" style={{ color: CATS[p.cat].color, borderColor: CATS[p.cat].color }}>{CATS[p.cat].label}</span>
            <h3>{p.name}</h3><p className="muted">{p.area}</p><p>{p.desc}</p>
            <div className="kv"><span>Affordability</span><Bar5 v={afford(p)} /></div>
            <div className="kv"><span>Cleanliness</span><Bar5 v={p.clean} /></div>
            <div className="kv"><span>Accessibility</span><Bar5 v={p.access} /></div>
            <p className="muted">Reports linked to this place: <b>{reports.filter((r) => r.placeId === p.id).length}</b> (unverified)</p>
            <div className="row">
              <a className="btn primary" href={dirLink(p.lat, p.lng)} target="_blank" rel="noreferrer"><Navigation size={15} /> Directions</a>
              <button className="btn" onClick={() => { setCompare((c) => (c.includes(p.id) ? c : [p.id, ...c].slice(0, 3))); go("compare"); }}>Compare</button>
            </div>
          </div>
        </div>)}
    </section>
  );
}

/* ---------------- SAFEROUTE ---------------- */
export function SafeRoute({ reports }) {
  const [sev, setSev] = useState("all"), [type, setType] = useState("all"), [sel, setSel] = useState(null);
  const list = reports.filter((r) => (sev === "all" || r.severity === sev) && (type === "all" || r.type === type));
  const points = useMemo(() => list.map((r) => ({ id: r.id, lat: r.lat, lng: r.lng, color: SEV[r.severity].color, label: `${r.type}: ${r.location}` })), [sev, type, reports]);
  return (
    <section>
      <Title kicker="SafeRoute AI" title="Route & Safety Information" sub="Reported concerns around the city, shown by severity." />
      <div className="warn"><Info size={18} /><div><b>Please read:</b> Reports may be unverified or incomplete. CityPulse AI cannot guarantee that any route is safe. Use your own judgement and official sources.</div></div>
      <div className="chips">
        {["all", "low", "medium", "high"].map((s) => <button key={s} className={"chip" + (sev === s ? " on" : "")} onClick={() => setSev(s)}>{s === "all" ? "All severity" : SEV[s].label}</button>)}
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Category"><option value="all">All categories</option>{REPORT_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
      </div>
      <div className="cmd-grid">
        <div className="glass pad0"><MapView points={points} selectedId={sel} onSelect={setSel} height={480} /></div>
        <aside className="glass side scroll">
          <h4>{list.length} report(s)</h4>
          {list.length === 0 && <p className="muted">No reports match these filters.</p>}
          {list.map((r) => (
            <div key={r.id} className={"rep" + (sel === r.id ? " sel" : "")} onClick={() => setSel(r.id)}>
              <div><Sev s={r.severity} /> <b>{r.type}</b> <span className="muted">· {r.status}{r.sample ? " · sample" : ""}</span></div>
              <p>{r.text}</p><small className="muted">{r.location}</small><br />
              <a href={dirLink(r.lat, r.lng)} target="_blank" rel="noreferrer">Plan route to this area ↗</a>
            </div>))}
        </aside>
      </div>
      <Demo>Green = low, amber = medium, red = high severity. Sample reports are for demonstration only.</Demo>
    </section>
  );
}

/* ---------------- COMPARE ---------------- */
export function Compare({ reports, compare, setCompare }) {
  const chosen = compare.map((id) => PLACES.find((p) => p.id === id)).filter(Boolean);
  const toggle = (id) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < 3 ? [...c, id] : c));
  const concerns = (p) => reports.filter((r) => r.placeId === p.id).length;
  const rows = [["Affordability", afford], ["Cleanliness", (p) => p.clean], ["Accessibility", (p) => p.access], ["Rating (demo)", (p) => p.rating]];
  const chart = rows.map(([label, fn]) => Object.fromEntries([["metric", label], ...chosen.map((p) => [p.name, fn(p)])]));
  return (
    <section>
      <Title kicker="Compare Places" title="Side-by-side comparison" sub="Pick up to 3 places. Scores are illustrative values from the demo dataset; concerns are counted from reports." />
      <div className="chips">{PLACES.map((p) => <button key={p.id} className={"chip" + (compare.includes(p.id) ? " on" : "")} onClick={() => toggle(p.id)}>{p.name}</button>)}</div>
      {chosen.length < 2 ? <div className="glass empty">Select at least two places to compare.</div> : (
        <>
          <div className="cards">{chosen.map((p) => (
            <div key={p.id} className="glass place"><span className="badge" style={{ color: CATS[p.cat].color, borderColor: CATS[p.cat].color }}>{CATS[p.cat].label}</span><h3>{p.name}</h3>
              {rows.slice(0, 3).map(([l, fn]) => <div key={l} className="kv"><span>{l}</span><Bar5 v={fn(p)} /></div>)}
              <p className="muted">Reported concerns: <b>{concerns(p)}</b></p></div>))}</div>
          <div className="glass tablewrap"><table><thead><tr><th>Metric</th>{chosen.map((p) => <th key={p.id}>{p.name}</th>)}</tr></thead><tbody>
            {rows.map(([l, fn]) => <tr key={l}><td>{l}</td>{chosen.map((p) => <td key={p.id}>{fn(p)}</td>)}</tr>)}
            <tr><td>Reported concerns</td>{chosen.map((p) => <td key={p.id}>{concerns(p)}</td>)}</tr>
            <tr><td>Budget level</td>{chosen.map((p) => <td key={p.id}>{budgetText(p.budget)}</td>)}</tr></tbody></table></div>
          <div className="glass chart"><ResponsiveContainer width="100%" height={300}><BarChart data={chart}><CartesianGrid stroke="#1e4a7a55" /><XAxis dataKey="metric" stroke="#8fb3d9" /><YAxis domain={[0, 5]} stroke="#8fb3d9" /><Tooltip {...tip} /><Legend />
            {chosen.map((p, i) => <Bar key={p.id} dataKey={p.name} fill={PALETTE[i]} radius={[6, 6, 0, 0]} />)}</BarChart></ResponsiveContainer></div>
        </>)}
    </section>
  );
}

/* ---------------- INSIGHTS ---------------- */
export function Insights({ reports }) {
  const byCat = count(PLACES, (p) => CATS[p.cat].label);
  const budget = count(PLACES, (p) => ["Low", "Medium", "High"][p.budget - 1]);
  const byType = count(reports, (r) => r.type);
  const status = count(reports, (r) => r.status);
  const top = [...PLACES].sort((a, b) => b.rating - a.rating).slice(0, 6).map((p) => ({ name: p.name.split(" ").slice(0, 2).join(" "), Rating: p.rating, Cleanliness: p.clean }));
  const Pie1 = ({ data }) => <ResponsiveContainer width="100%" height={250}><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>{data.map((_, i) => <Cell key={i} fill={PALETTE[i % 6]} />)}</Pie><Tooltip {...tip} /><Legend /></PieChart></ResponsiveContainer>;
  const Bar1 = ({ data, keys = ["value"] }) => <ResponsiveContainer width="100%" height={250}><BarChart data={data}><CartesianGrid stroke="#1e4a7a55" /><XAxis dataKey="name" stroke="#8fb3d9" fontSize={11} /><YAxis stroke="#8fb3d9" allowDecimals={false} /><Tooltip {...tip} />{keys.map((k, i) => <Bar key={k} dataKey={k} fill={PALETTE[i]} radius={[6, 6, 0, 0]} />)}{keys.length > 1 && <Legend />}</BarChart></ResponsiveContainer>;
  return (
    <section>
      <Title kicker="City Insights" title="Data insights" sub="Charts are built from the app's own dataset (sample places + sample and your reports). No live statistics." />
      <div className="charts">
        <div className="glass chart"><h4>Places by category</h4><Bar1 data={byCat} /></div>
        <div className="glass chart"><h4>Budget distribution</h4><Pie1 data={budget} /></div>
        <div className="glass chart"><h4>Reports by type</h4><Bar1 data={byType} /></div>
        <div className="glass chart"><h4>Report status</h4><Pie1 data={status} /></div>
        <div className="glass chart wide"><h4>Location comparison (illustrative demo scores)</h4><Bar1 data={top} keys={["Rating", "Cleanliness"]} /></div>
      </div>
    </section>
  );
}

/* ---------------- REPORTS ---------------- */
export function Reports({ mine, addReport, clearMine, storageError }) {
  const empty = { type: "Road", location: "", text: "", severity: "medium" };
  const [f, setF] = useState(empty), [err, setErr] = useState({}), [done, setDone] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.location.trim().length < 3) er.location = "Enter a location (at least 3 characters).";
    if (f.text.trim().length < 10) er.text = "Describe the problem in at least 10 characters.";
    setErr(er);
    if (Object.keys(er).length) return;
    const near = PLACES.find((p) => f.location.toLowerCase().includes(p.key));
    addReport({ id: "u" + Date.now(), ...f, location: f.location.trim(), text: f.text.trim(), status: "Unverified", date: new Date().toISOString().slice(0, 10), placeId: near?.id || null, lat: near?.lat ?? 18.5204 + (Math.random() - 0.5) * 0.02, lng: near?.lng ?? 73.8567 + (Math.random() - 0.5) * 0.02 });
    setF(empty); setDone(true); setTimeout(() => setDone(false), 4000);
  };
  return (
    <section>
      <Title kicker="Citizen Reports" title="Report a city problem" sub="Demo feature: reports are saved only in your browser and are NOT sent to any authority. They show as unverified." />
      <div className="cmd-grid">
        <form className="glass side form" onSubmit={submit} noValidate>
          <label>Category<select value={f.type} onChange={set("type")}>{REPORT_TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
          <label>Location<input value={f.location} onChange={set("location")} placeholder="e.g. FC Road near Vaishali" />{err.location && <small className="err">{err.location}</small>}</label>
          <label>Severity<select value={f.severity} onChange={set("severity")}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label>
          <label>Description<textarea rows="4" value={f.text} onChange={set("text")} placeholder="What is the problem?" />{err.text && <small className="err">{err.text}</small>}</label>
          <button className="btn primary full">Submit report</button>
          {done && <div className="ok"><CheckCircle2 size={16} /> Saved in this browser as an unverified demo report.</div>}
          {storageError && <div className="err">Browser storage is unavailable, so reports will be lost on refresh.</div>}
        </form>
        <div className="glass side scroll">
          <div className="between"><h4>Your report history</h4>{mine.length > 0 && <button className="btn" onClick={clearMine}><Trash2 size={14} /> Clear</button>}</div>
          {mine.length === 0 ? <p className="muted">You have not submitted any reports yet.</p> : mine.map((r) => (
            <div key={r.id} className="rep"><div><Sev s={r.severity} /> <b>{r.type}</b> <span className="muted">· {r.status}</span></div><p>{r.text}</p><small className="muted">{r.location} · {r.date}{r.placeId ? " · near " + placeName(r.placeId) : ""}</small></div>))}
        </div>
      </div>
    </section>
  );
}
