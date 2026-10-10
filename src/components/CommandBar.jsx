import { ArrowUp, Sparkles } from "lucide-react";
import { useState } from "react";

export default function CommandBar({ onCommand, busy }) {
  const [value, setValue] = useState("");
  const submit = () => {
    if (!value.trim() || busy) return;
    onCommand(value.trim());
    setValue("");
  };
  return <div className="command-wrap">
    <div className="command-bar">
      <div className="agent-avatar"><Sparkles size={15}/></div>
      <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="Describe a website or change… (works offline)" aria-label="Describe a website or change" />
      <button className="send-button" onClick={submit} disabled={busy || !value.trim()} aria-label="Run local command">{busy ? "…" : <ArrowUp size={17}/>}</button>
    </div>
    <div className="command-hints"><span>Try: “build a portfolio”</span><span>•</span><span>“create a restaurant website”</span><span>•</span><span>“make the accent blue”</span></div>
  </div>;
}
