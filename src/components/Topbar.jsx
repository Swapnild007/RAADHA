import { ChevronDown, Download, Eye, Undo2, Redo2, CheckCircle2, HardDrive } from "lucide-react";

export default function Topbar({ project, validation, onUndo, onRedo, canUndo, canRedo, saved, onPreview, onExport }) {
  return <header className="topbar">
    <div className="crumbs">
      <span className="brand-word">RAADHA</span>
      <span className="slash">/</span>
      <button className="project-select" title="Current project">{project.name}<ChevronDown size={14}/></button>
    </div>
    <div className="top-actions">
      <button className="icon-button" title="Undo last change" onClick={onUndo} disabled={!canUndo}><Undo2 size={16}/></button>
      <button className="icon-button" title="Redo change" onClick={onRedo} disabled={!canRedo}><Redo2 size={16}/></button>
      <span className="divider" />
      <div className={validation.passed ? "build-status ready" : "build-status"} title="Local project checks">
        <CheckCircle2 size={14}/>{validation.passed ? "Checks passed" : "Needs attention"}
      </div>
      <span className="save-status" title="Saved in this browser"><HardDrive size={13}/>{saved ? "Saved locally" : "Saving…"}</span>
      <button className="preview-button" onClick={onPreview}><Eye size={15}/> Preview</button>
      <button className="deploy-button" onClick={onExport}><Download size={14}/> Export</button>
    </div>
  </header>;
}
