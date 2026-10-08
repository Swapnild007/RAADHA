import { Files, Layers3, Sparkles, GitBranch, ShieldCheck, Settings2, FolderKanban } from "lucide-react";

const items = [
  ["workspace", Files, "Files"],
  ["components", Layers3, "Components"],
  ["agent", Sparkles, "Agent"],
  ["history", GitBranch, "History"],
  ["shield", ShieldCheck, "Shield"]
];

export default function Sidebar({ active, setActive }) {
  return <aside className="sidebar">
    <div className="brand-mark">R</div>
    <div className="nav-stack">
      {items.map(([id, Icon, label]) => (
        <button key={id} className={active === id ? "nav-item active" : "nav-item"} onClick={() => setActive(id)} title={label}>
          <Icon size={18} strokeWidth={1.8} />
          <span>{label}</span>
        </button>
      ))}
    </div>
    <div className="sidebar-bottom">
      <button className="nav-item"><FolderKanban size={18}/><span>Projects</span></button>
      <button className="nav-item"><Settings2 size={18}/><span>Settings</span></button>
    </div>
  </aside>;
}