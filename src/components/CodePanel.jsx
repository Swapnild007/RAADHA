import { useMemo, useState } from "react";
import { Braces, ChevronRight, Download, FileCode2, Globe } from "lucide-react";
import { generateSourceFiles, generateStandaloneHtml } from "../lib/codegen";

function downloadText(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function CodePanel({ project }) {
  const files = useMemo(() => generateSourceFiles(project), [project]);
  const [activePath, setActivePath] = useState("src/App.jsx");
  const activeFile = files.find((file) => file.path === activePath) || files[0];
  const filename = (project.name || "raadha-site").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return <div className="code-panel">
    <div className="code-header">
      <span><Braces size={14}/> Source <small>{activeFile?.path}</small></span>
      <div className="source-actions">
        <button className="source-download website-download" onClick={() => downloadText(filename + ".html", generateStandaloneHtml(project), "text/html;charset=utf-8")}><Globe size={13}/> Download website</button>
        <button className="source-download" onClick={() => downloadText(activeFile.name, activeFile.content)}><Download size={13}/> File</button>
      </div>
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
