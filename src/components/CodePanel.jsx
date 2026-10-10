import { useMemo, useState } from "react";
import { Braces, ChevronRight, Download, FileCode2 } from "lucide-react";
import { generateSourceFiles } from "../lib/codegen";

export default function CodePanel({ project }) {
  const files = useMemo(() => generateSourceFiles(project), [project]);
  const [activePath, setActivePath] = useState("src/App.jsx");
  const activeFile = files.find((file) => file.path === activePath) || files[0];

  const downloadFile = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = activeFile.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return <div className="code-panel">
    <div className="code-header">
      <span><Braces size={14}/> Source <small>{activeFile?.path}</small></span>
      <button className="source-download" onClick={downloadFile}><Download size={13}/> Download file</button>
    </div>
    <div className="code-body">
      <div className="code-files">
        {files.map((file) => <button type="button" className={file.path === activeFile?.path ? "code-file active" : "code-file"} key={file.path} onClick={() => setActivePath(file.path)}>
          {file.path.includes("/") && <ChevronRight size={11}/>}<FileCode2 size={13}/><span>{file.name}</span>
        </button>)}
      </div>
      <div className="code-preview"><pre className="source-code"><code>{activeFile?.content || ""}</code></pre></div>
    </div>
  </div>;
}
