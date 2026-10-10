import { useEffect, useMemo, useState } from "react";
import { Activity, ChevronDown, Code2, FileText, GitCommitHorizontal, ShieldCheck, TerminalSquare, X } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Preview from "./components/Preview";
import Inspector from "./components/Inspector";
import CommandBar from "./components/CommandBar";
import CodePanel from "./components/CodePanel";
import { activitySeed, initialProject } from "./data/templates";
import { requestAgentPlan, applyAgentPlan } from "./lib/agent";
import { validateProject } from "./lib/project";

const STORAGE_KEY = "raadha.project.v1";
const HISTORY_LIMIT = 40;

function loadProject() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(initialProject);
    const parsed = JSON.parse(saved);
    if (!parsed || !Array.isArray(parsed.files) || !parsed.page || !parsed.tokens) return structuredClone(initialProject);
    return parsed;
  } catch {
    return structuredClone(initialProject);
  }
}

export default function App() {
  const [project, setProjectState] = useState(loadProject);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [saved, setSaved] = useState(true);
  const [active, setActive] = useState("workspace");
  const [showCode, setShowCode] = useState(false);
  const [activity, setActivity] = useState(activitySeed);
  const [busy, setBusy] = useState(false);
  const validation = useMemo(() => validateProject(project), [project]);

  // Centralize edits so every inspector and agent change participates in undo/redo.
  const setProject = (updater) => {
    setProjectState((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      if (next !== current) {
        setPast((items) => [...items, current].slice(-HISTORY_LIMIT));
        setFuture([]);
        setSaved(false);
      }
      return next;
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [project]);

  const undo = () => {
    if (!past.length) return;
    const previous = past[past.length - 1];
    setFuture([project, ...future].slice(0, HISTORY_LIMIT));
    setPast(past.slice(0, -1));
    setProjectState(previous);
  };

  const redo = () => {
    if (!future.length) return;
    const nextProject = future[0];
    setPast([...past, project].slice(-HISTORY_LIMIT));
    setFuture(future.slice(1));
    setProjectState(nextProject);
  };

  const exportProject = () => {
    const payload = {
      product: "RAADHA",
      formatVersion: 1,
      exportedAt: new Date().toISOString(),
      project
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(project.name || "raadha-project").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.raadha.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActivity((items) => [{ type: "success", text: "Project configuration exported", time: "now" }, ...items]);
  };

  const runCommand = async (input) => {
    setBusy(true);
    setActivity((items) => [{ type: "agent", text: "Interpreting request…", time: "now" }, ...items]);
    try {
      const plan = await requestAgentPlan(input, project);
      const result = applyAgentPlan(project, plan);
      if (result.changes.length) {
        setProject(result.project);
        setActivity((items) => [
          ...result.changes.map((text) => ({ type: "success", text, time: "now" })),
          { type: "check", text: "Project changes applied", time: "now" },
          ...items
        ]);
      } else {
        setActivity((items) => [{ type: "error", text: plan.summary || "No supported edit was found.", time: "now" }, ...items]);
      }
    } catch (error) {
      setActivity((items) => [{ type: "error", text: error.message || "Agent request failed", time: "now" }, ...items]);
    } finally {
      setBusy(false);
    }
  };

  const openPreview = () => {
    document.querySelector(".canvas-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive("workspace");
  };

  return <div className="app-shell">
    <Sidebar active={active} setActive={setActive}/>
    <div className="main-shell">
      <Topbar
        project={project}
        validation={validation}
        onUndo={undo}
        onRedo={redo}
        canUndo={past.length > 0}
        canRedo={future.length > 0}
        saved={saved}
        onPreview={openPreview}
        onExport={exportProject}
      />
      <div className="workspace">
        <section className="left-panel">
          <div className="panel-heading compact"><div><span className="kicker">Workspace</span><h2>Project files</h2></div><button className="mini-action" title="New file (coming soon)" onClick={() => setActivity((items) => [{ type: "agent", text: "File creation is on the build-engine roadmap.", time: "now" }, ...items])}>+</button></div>
          <div className="project-path"><span className="folder-dot"/> /aurora-studio</div>
          <div className="file-tree">
            {project.files.map((file) => <div key={file.name + file.parent} className={file.name === "App.jsx" ? "tree-row active" : "tree-row"}><span className="tree-indent"/>{file.type === "folder" ? <ChevronDown size={13}/> : <FileText size={13}/>}<span>{file.name}</span></div>)}
          </div>
          <div className="left-section">
            <div className="section-label">Build pipeline</div>
            <Pipeline icon={TerminalSquare} label="Intent parsed" state="done"/>
            <Pipeline icon={Code2} label="Agent plan" state={busy ? "ready" : "done"}/>
            <Pipeline icon={ShieldCheck} label="Quality checks" state={validation.passed ? "done" : "ready"}/>
            <Pipeline icon={GitCommitHorizontal} label="Checkpoint" state="ready"/>
          </div>
          <div className="left-section activity-section">
            <div className="section-label"><Activity size={12}/> Agent activity</div>
            {activity.slice(0,5).map((item, i) => <div className="activity-row" key={i}><span className={"activity-icon " + item.type}/><span>{item.text}</span><time>{item.time}</time></div>)}
          </div>
        </section>
        <main className="center-panel">
          <Preview project={project} setProject={setProject}/>
          <CommandBar onCommand={runCommand} busy={busy}/>
        </main>
        <Inspector project={project} setProject={setProject}/>
      </div>
      {showCode && <div className="code-overlay"><div className="code-modal"><button className="close-code" onClick={() => setShowCode(false)}><X size={18}/></button><CodePanel project={project}/></div></div>}
      <button className="source-toggle" onClick={() => setShowCode(true)}><Code2 size={15}/> Code</button>
    </div>
  </div>;
}

function Pipeline({ icon: Icon, label, state }) {
  return <div className="pipeline-row"><Icon size={14}/><span>{label}</span><span className={"pipeline-state " + state}>{state === "done" ? "✓" : "•"}</span></div>;
}
