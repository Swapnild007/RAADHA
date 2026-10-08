import { useMemo, useState } from "react";
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

export default function App() {
  const [project, setProject] = useState(initialProject);
  const [active, setActive] = useState("workspace");
  const [showCode, setShowCode] = useState(false);
  const [activity, setActivity] = useState(activitySeed);
  const [busy, setBusy] = useState(false);
  const validation = useMemo(() => validateProject(project), [project]);

  const runCommand = async (input) => {
    setBusy(true);
    setActivity((items) => [{ type: "agent", text: "Planning request…", time: "now" }, ...items]);
    try {
      const plan = await requestAgentPlan(input, project);
      const result = applyAgentPlan(project, plan);
      setProject(result.project);
      const changes = result.changes.length ? result.changes : [plan.summary];
      setActivity((items) => [
        ...changes.map((text) => ({ type: "success", text, time: "now" })),
        { type: "check", text: "Agent plan executed", time: "now" },
        ...items
      ]);
    } catch (error) {
      setActivity((items) => [{ type: "error", text: error.message || "Agent request failed", time: "now" }, ...items]);
    } finally {
      setBusy(false);
    }
  };

  return <div className="app-shell">
    <Sidebar active={active} setActive={setActive}/>
    <div className="main-shell">
      <Topbar project={project} onValidate={() => {}} validation={validation}/>
      <div className="workspace">
        <section className="left-panel">
          <div className="panel-heading compact"><div><span className="kicker">Workspace</span><h2>Project files</h2></div><button className="mini-action">+</button></div>
          <div className="project-path"><span className="folder-dot"/> /aurora-studio</div>
          <div className="file-tree">
            {project.files.map((file) => <div key={file.name + file.parent} className={file.name === "App.jsx" ? "tree-row active" : "tree-row"}><span className="tree-indent"/>{file.type === "folder" ? <ChevronDown size={13}/> : <FileText size={13}/>}<span>{file.name}</span></div>)}
          </div>
          <div className="left-section">
            <div className="section-label">Build pipeline</div>
            <Pipeline icon={TerminalSquare} label="Intent parsed" state="done"/>
            <Pipeline icon={Code2} label="Agent plan" state="done"/>
            <Pipeline icon={ShieldCheck} label="Quality checks" state={validation.passed ? "done" : "ready"}/>
            <Pipeline icon={GitCommitHorizontal} label="Checkpoint" state="ready"/>
          </div>
          <div className="left-section activity-section">
            <div className="section-label"><Activity size={12}/> Agent activity</div>
            {activity.slice(0,4).map((item, i) => <div className="activity-row" key={i}><span className={"activity-icon " + item.type}/><span>{item.text}</span><time>{item.time}</time></div>)}
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
