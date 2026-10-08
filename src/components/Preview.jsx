import { Monitor, Smartphone, Tablet, MousePointer2, ExternalLink } from "lucide-react";

export default function Preview({ project, setProject }) {
  const isMobile = project.viewport === "mobile";
  const isTablet = project.viewport === "tablet";
  const setViewport = (viewport) => setProject((p) => ({ ...p, viewport }));

  return <section className="canvas-panel">
    <div className="canvas-toolbar">
      <div className="device-switcher">
        <button className={project.viewport === "desktop" ? "device active" : "device"} onClick={() => setViewport("desktop")}><Monitor size={14}/></button>
        <button className={isTablet ? "device active" : "device"} onClick={() => setViewport("tablet")}><Tablet size={14}/></button>
        <button className={isMobile ? "device active" : "device"} onClick={() => setViewport("mobile")}><Smartphone size={14}/></button>
      </div>
      <div className="canvas-meta"><span className="live-dot"/> Live preview · {isMobile ? "390" : isTablet ? "768" : "1440"}px</div>
      <button className="icon-button"><ExternalLink size={15}/></button>
    </div>
    <div className="canvas">
      <div className={isMobile ? "site-frame mobile" : isTablet ? "site-frame tablet" : "site-frame"}>
        <div className="site-page" style={{ "--accent": project.page.accent, "--hero-height": project.page.heroHeight + "px" }}>
          <nav className="site-nav">
            <div className="site-logo"><span className="logo-orb"/> Aurora</div>
            <div className="site-links"><span>Work</span><span>Process</span><span>About</span></div>
            <button className="site-nav-cta">Let's talk</button>
          </nav>
          <main className="hero">
            {project.page.showGrid && <div className="hero-grid"/>}
            <div className="glow glow-one"/><div className="glow glow-two"/>
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot"/>{project.page.eyebrow}</div>
              <h1>{project.page.title}</h1>
              <p>{project.page.description}</p>
              <div className="hero-actions">
                <button className="hero-primary" onClick={() => setProject((p) => ({...p, selected: "cta"}))}>{project.page.cta}<span>↗</span></button>
                <button className="hero-secondary">{project.page.secondary}</button>
              </div>
              <div className="proof-row"><span><b>4.9/5</b> builder rating</span><span><b>12k+</b> projects shipped</span></div>
            </div>
            <div className="hero-card">
              <div className="card-top"><span>RAADHA Agent</span><span className="status-pill">BUILDING</span></div>
              <div className="terminal-line"><span className="terminal-dot"/><span>Analyzing intent</span><b>100%</b></div>
              <div className="terminal-line"><span className="terminal-dot"/><span>Design tokens</span><b>100%</b></div>
              <div className="terminal-line"><span className="terminal-dot"/><span>Responsive pass</span><b>96%</b></div>
              <div className="card-footer"><MousePointer2 size={13}/> Select anything to edit</div>
            </div>
          </main>
          <section className="below-fold"><div><span>01</span><h3>Idea → working product</h3></div><p>One workspace for prompts, source code, visual edits and verification.</p></section>
        </div>
      </div>
    </div>
  </section>;
}