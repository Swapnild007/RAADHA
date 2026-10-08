import { Braces, ChevronRight, FileCode2, Search } from "lucide-react";

export default function CodePanel({ project }) {
  return <div className="code-panel">
    <div className="code-header"><span><Braces size={14}/> Source</span><div><Search size={14}/><span>⌘P</span></div></div>
    <div className="code-body">
      <div className="code-files">
        {project.files.map((file) => <div className={file.name === "App.jsx" ? "code-file active" : "code-file"} key={file.name}><FileCode2 size={13}/>{file.parent && <ChevronRight size={11}/>}<span>{file.name}</span></div>)}
      </div>
      <div className="code-preview"><div className="code-line"><i>1</i><span><b>const</b> <em>Hero</em> = () =&gt; {"{"}</span></div><div className="code-line"><i>2</i><span>  <b>return</b> (</span></div><div className="code-line"><i>3</i><span>    &lt;section className=<mark>"hero"</mark>&gt;</span></div><div className="code-line"><i>4</i><span>      &lt;h1&gt;{project.page.title}&lt;/h1&gt;</span></div><div className="code-line"><i>5</i><span>      &lt;p&gt;{project.page.description}&lt;/p&gt;</span></div><div className="code-line"><i>6</i><span>    &lt;/section&gt;</span></div><div className="code-line"><i>7</i><span>  );</span></div><div className="code-line"><i>8</i><span>{"}"}</span></div></div>
    </div>
  </div>;
}