import { ChevronDown, Palette, Type, Ruler, Sparkles } from "lucide-react";

export default function Inspector({ project, setProject }) {
  const updateToken = (key, value) => setProject((p) => ({...p, tokens: {...p.tokens, [key]: value}, page: {...p.page, ...(key === "primary" ? {accent: value} : {})}}));
  return <aside className="inspector">
    <div className="panel-heading"><div><span className="kicker">Inspector</span><h2>{project.selected === "hero" ? "Hero section" : "CTA button"}</h2></div><Sparkles size={16}/></div>
    <div className="selection-pill"><span className="selection-dot"/>{project.selected === "hero" ? "section.hero" : "button.primary"}<span>⌘K</span></div>
    <InspectorGroup icon={Palette} title="Appearance">
      <label>Primary accent</label>
      <div className="color-row"><input type="color" value={project.tokens.primary} onChange={(e) => updateToken("primary", e.target.value)}/><input className="text-input" value={project.tokens.primary} onChange={(e) => updateToken("primary", e.target.value)}/></div>
      <label>Background</label>
      <div className="color-row"><input type="color" value={project.tokens.background} onChange={(e) => updateToken("background", e.target.value)}/><input className="text-input" value={project.tokens.background} onChange={(e) => updateToken("background", e.target.value)}/></div>
    </InspectorGroup>
    <InspectorGroup icon={Type} title="Content">
      <label>Hero title</label>
      <textarea className="text-area" value={project.page.title} onChange={(e) => setProject((p) => ({...p, page: {...p.page, title: e.target.value}}))}/>
      <label>Description</label>
      <textarea className="text-area small" value={project.page.description} onChange={(e) => setProject((p) => ({...p, page: {...p.page, description: e.target.value}}))}/>
    </InspectorGroup>
    <InspectorGroup icon={Ruler} title="Layout">
      <div className="range-row"><span>Hero height</span><b>{project.page.heroHeight}px</b></div>
      <input type="range" min="480" max="760" value={project.page.heroHeight} onChange={(e) => setProject((p) => ({...p, page: {...p.page, heroHeight: Number(e.target.value)}}))}/>
      <div className="range-row"><span>Radius</span><b>{project.tokens.radius}px</b></div>
      <input type="range" min="8" max="32" value={project.tokens.radius} onChange={(e) => updateToken("radius", Number(e.target.value))}/>
    </InspectorGroup>
    <button className="ai-tune"><Sparkles size={15}/> Ask RAADHA to refine</button>
  </aside>;
}

function InspectorGroup({icon: Icon, title, children}) {
  return <div className="inspector-group"><div className="group-title"><Icon size={14}/><span>{title}</span><ChevronDown size={13}/></div>{children}</div>;
}