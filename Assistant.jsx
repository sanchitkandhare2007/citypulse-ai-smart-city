import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { PLACES, afford, budgetText } from "./data.js";

// Rule-based answers from the demo dataset. No AI service is connected.
export function reply(q, reports) {
  const s = q.toLowerCase();
  const found = PLACES.filter((p) => s.includes(p.key));
  const list = (arr) => arr.map((p) => `• ${p.name} (${budgetText(p.budget)}, ${p.area})`).join("\n");
  if (s.includes("compar")) {
    if (found.length < 2) return "To compare, name two places, e.g. “Compare Shaniwar Wada and Aga Khan Palace”. You can also use the Compare Places page.";
    const [a, b] = found;
    const n = (p) => reports.filter((r) => r.placeId === p.id).length;
    return `${a.name} vs ${b.name} (illustrative demo scores):\n• Affordability: ${afford(a)} vs ${afford(b)}\n• Cleanliness: ${a.clean} vs ${b.clean}\n• Accessibility: ${a.access} vs ${b.access}\n• Reported concerns: ${n(a)} vs ${n(b)}`;
  }
  if (s.includes("report") || s.includes("road") || s.includes("pothole") || s.includes("complain"))
    return "To report a road problem: open Citizen Reports, choose “Road”, enter the location, describe the issue and pick a severity. Reports stay in your browser as unverified demo reports. For real complaints in Pune, use the official civic channels of the Pune Municipal Corporation.";
  if (s.includes("afford") || s.includes("cheap") || s.includes("budget") || s.includes("free"))
    return "Budget-friendly places in the demo data:\n" + list(PLACES.filter((p) => p.budget === 1));
  if (s.includes("histor") || s.includes("heritage") || s.includes("fort") || s.includes("old"))
    return "Historical attractions:\n" + list(PLACES.filter((p) => p.historic));
  if (s.includes("park") || s.includes("garden")) return "Parks and gardens:\n" + list(PLACES.filter((p) => p.cat === "parks"));
  if (s.includes("food") || s.includes("restaurant") || s.includes("eat")) return "Food places:\n" + list(PLACES.filter((p) => p.cat === "restaurants"));
  if (s.includes("hotel") || s.includes("stay")) return "Hotels:\n" + list(PLACES.filter((p) => p.cat === "hotels"));
  if (found.length === 1) return `${found[0].name}: ${found[0].desc}`;
  return "I can help with: affordable places, historical attractions, parks, food, comparing two places, or how to report a problem. Try one of the suggestions below.";
}

const TIPS = ["Suggest affordable places in Pune", "Show historical attractions", "Compare Shaniwar Wada and Aga Khan Palace", "How can I report a road problem?"];

export default function Assistant({ reports }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Hi! I'm the CityPulse assistant. I answer from the demo dataset using simple rules - no live AI is connected." }]);
  const send = (t) => {
    const q = (t ?? text).trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: "me", text: q }, { from: "bot", text: reply(q, reports) }]);
    setText("");
  };
  return (
    <>
      <button className="fab" onClick={() => setOpen(!open)} aria-label={open ? "Close assistant" : "Open city assistant"}>{open ? <X /> : <MessageCircle />}</button>
      {open && (
        <div className="chat glass" role="dialog" aria-label="City assistant">
          <div className="chat-head"><Bot size={18} /> City Assistant <small>rule-based</small></div>
          <div className="chat-body">
            {msgs.map((m, i) => <div key={i} className={"msg " + m.from}>{m.text}</div>)}
          </div>
          <div className="chat-tips">{TIPS.map((t) => <button key={t} className="chip" onClick={() => send(t)}>{t}</button>)}</div>
          <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about places or reports…" aria-label="Message" />
            <button className="btn primary" aria-label="Send"><Send size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
}
