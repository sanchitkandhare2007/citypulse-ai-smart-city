import { useEffect, useMemo, useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { SEED_REPORTS } from "./data.js";
import Assistant from "./Assistant.jsx";
import { Home, Explore, SafeRoute, Compare, Insights, Reports } from "./Pages.jsx";

const KEY = "citypulse_reports_v1";
const NAV = [["home", "Home"], ["explore", "Explore"], ["saferoute", "SafeRoute"], ["compare", "Compare Places"], ["insights", "City Insights"], ["reports", "Citizen Reports"]];
const loadReports = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };

export default function App() {
  const [page, setPage] = useState("home");
  const [menu, setMenu] = useState(false);
  const [mine, setMine] = useState(loadReports);
  const [storageError, setStorageError] = useState(false);
  const [compare, setCompare] = useState(["shaniwar", "aga"]);

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(mine)); } catch { setStorageError(true); } }, [mine]);
  const reports = useMemo(() => [...mine, ...SEED_REPORTS], [mine]);
  const go = (p) => { setPage(p); setMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const addReport = (r) => setMine((m) => [r, ...m]);
  const clearMine = () => setMine([]);
  const shared = { go, reports, compare, setCompare };

  return (
    <>
      <header className="nav">
        <button className="brand" onClick={() => go("home")} aria-label="CityPulse AI home"><span className="logo"><MapPin size={18} /></span>CityPulse <b>AI</b></button>
        <nav className={menu ? "open" : ""}>
          {NAV.map(([id, label]) => <button key={id} className={page === id ? "active" : ""} onClick={() => go(id)}>{label}</button>)}
          <button className="btn primary navcta" onClick={() => go("explore")}>Explore City</button>
        </nav>
        <button className="burger" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X /> : <Menu />}</button>
      </header>
      <main>
        {page === "home" && <Home {...shared} />}
        {page === "explore" && <Explore {...shared} />}
        {page === "saferoute" && <SafeRoute {...shared} />}
        {page === "compare" && <Compare {...shared} />}
        {page === "insights" && <Insights {...shared} />}
        {page === "reports" && <Reports {...shared} mine={mine} addReport={addReport} clearMine={clearMine} storageError={storageError} />}
      </main>
      <footer>CityPulse AI · Demonstration data for Pune (sample places, scores and reports - not live). Reports are stored only in your browser and are not sent to any authority.</footer>
      <Assistant reports={reports} />
    </>
  );
}
