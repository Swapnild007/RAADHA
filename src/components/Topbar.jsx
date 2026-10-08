import { ChevronDown, Cloud, Eye, Play, Undo2, Redo2, CheckCircle2 } from "lucide-react";

export default function Topbar({ project, onValidate, validation }) {
  return <header className="topbar">
    <div className="crumbs">
      <span className="brand-word">RAADHA</span>
      <span className="slash">/</span>
      <button className="project-select">{project.name}<ChevronDown size={14}/></button>
    </div>
    <div className="top-actions">
      <button className="icon-button" title="Undo"><Undo2 size={16}/></button>
      <button className="icon-button" title="Redo"><Redo2 size={16}/></button>
      <span className="divider" />
      <div className={validation.passed ? "build-status ready" : "build-status"}>
        <CheckCircle2 size={14}/>{validation.passed ? "All checks passed" : "Needs attention"}
      </div>
      <button className="ghost-button"><Cloud size={15}/> Saved</button>
      <button className="preview-button"><Eye size={15}/> Preview</button>
      <button className="deploy-button"><Play size={14} fill="currentColor"/> Deploy</button>
    </div>
  </header>;
}