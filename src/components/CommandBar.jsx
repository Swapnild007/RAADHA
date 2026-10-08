import { ArrowUp, AtSign, Paperclip, Sparkles } from "lucide-react";
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
      <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="Tell RAADHA what to change…" />
      <button className="command-tool"><Paperclip size={16}/></button>
      <button className="command-tool"><AtSign size={16}/></button>
      <button className="send-button" onClick={submit}>{busy ? "…" : <ArrowUp size={17}/>}</button>
    </div>
    <div className="command-hints"><span>Try: “make the hero purple”</span><span>•</span><span>“switch to mobile”</span><span>•</span><span>“hide hero grid”</span></div>
  </div>;
}