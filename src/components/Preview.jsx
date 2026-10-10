import { Monitor, Smartphone, Tablet, MousePointer2, ExternalLink } from "lucide-react";

const DETAILS = {
  portfolio: { proofA: "12", proofALabel: "projects selected", proofB: "06", proofBLabel: "years creating", cardRows: [["Brand identity", "01"], ["Digital experience", "02"], ["Art direction", "03"]] },
  restaurant: { proofA: "Seasonal", proofALabel: "ingredient-led menu", proofB: "Local", proofBLabel: "producers first", cardRows: [["Chef's tasting menu", "7 PM"], ["À la carte", "All day"], ["Private dining", "Book"]] },
  saas: { proofA: "32%", proofALabel: "less status chasing", proofB: "1 view", proofBLabel: "for team priorities", cardRows: [["Projects on track", "12"], ["Team focus score", "94%"], ["Weekly progress", "+18%"]] },
  agency: { proofA: "Strategy", proofALabel: "before the pixels", proofB: "Senior", proofBLabel: "team on every brief", cardRows: [["Brand & positioning", "01"], ["Digital products", "02"], ["Campaigns", "03"]] },
  store: { proofA: "Made well", proofALabel: "chosen with care", proofB: "Less waste", proofBLabel: "more longevity", cardRows: [["Home essentials", "Shop"], ["Objects & lighting", "Shop"], ["Everyday carry", "Shop"]] },
  event: { proofA: "One night", proofALabel: "shared experience", proofB: "Limited", proofBLabel: "tickets available", cardRows: [["Doors open", "6 PM"], ["Live performances", "7 PM"], ["After hours", "10 PM"]] }
};

export default function Preview({ project, setProject }) {
  const isMobile = project.viewport === "mobile";
  const isTablet = project.viewport === "tablet";
  const page = project.page;
  const siteType = page.siteType || "portfolio";
  const details = DETAILS[siteType] || DETAILS.portfolio;
  const navItems = Array.isArray(page.navItems) ? page.navItems : ["Work", "Process", "About"];
  const setViewport = (viewport) => setProject((p) => ({ ...p, viewport }));

  return <section className="canvas-panel">
    <div className="canvas-toolbar">
      <div className="device-switcher">
        <button className={project.viewport === "desktop" ? "device active" : "device"} onClick={() => setViewport("desktop")} aria-label="Desktop preview"><Monitor size={14}/></button>
        <button className={isTablet ? "device active" : "device"} onClick={() => setViewport("tablet")} aria-label="Tablet preview"><Tablet size={14}/></button>
        <button className={isMobile ? "device active" : "device"} onClick={() => setViewport("mobile")} aria-label="Mobile preview"><Smartphone size={14}/></button>
      </div>
      <div className="canvas-meta"><span className="live-dot"/> Live preview · {isMobile ? "390" : isTablet ? "768" : "1440"}px</div>
      <button className="icon-button" onClick={() => setProject((p) => ({ ...p, viewport: p.viewport === "desktop" ? "mobile" : "desktop" }))} title="Toggle desktop/mobile"><ExternalLink size={15}/></button>
    </div>
    <div className="canvas">
      <div className={isMobile ? "site-frame mobile" : isTablet ? "site-frame tablet" : "site-frame"}>
        <div className={"site-page site-" + siteType} style={{ "--accent": page.accent || project.tokens.primary, "--hero-height": page.heroHeight + "px", "--site-background": project.tokens.background }}>
          <nav className="site-nav">
            <div className="site-logo"><span className="logo-orb"/>{page.brand || project.name}</div>
            <div className="site-links">{navItems.map((item) => <span key={item}>{item}</span>)}</div>
            <button className="site-nav-cta">{page.cta}</button>
          </nav>
          <main className="hero">
            {page.showGrid && <div className="hero-grid"/>}
            <div className="glow glow-one"/><div className="glow glow-two"/>
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot"/>{page.eyebrow}</div>
              <h1>{page.title}</h1>
              <p>{page.description}</p>
              <div className="hero-actions">
                <button className="hero-primary" onClick={() => setProject((p) => ({...p, selected: "cta"}))}>{page.cta}<span>↗</span></button>
                <button className="hero-secondary">{page.secondary}</button>
              </div>
              <div className="proof-row"><span><b>{details.proofA}</b> {details.proofALabel}</span><span><b>{details.proofB}</b> {details.proofBLabel}</span></div>
            </div>
            <div className="hero-card">
              <div className="card-top"><span>{page.cardTitle || "Project overview"}</span><span className="status-pill">{siteType === "restaurant" ? "OPEN TODAY" : siteType === "event" ? "UPCOMING" : "READY"}</span></div>
              {details.cardRows.map(([label, value]) => <div className="terminal-line" key={label}><span className="terminal-dot"/><span>{label}</span><b>{value}</b></div>)}
              <div className="card-footer"><MousePointer2 size={13}/>{siteType === "restaurant" ? "Good food. Good company." : siteType === "store" ? "Thoughtfully selected." : siteType === "event" ? "Be part of the moment." : "Made with intention."}</div>
            </div>
          </main>
          <section className="below-fold"><div><span>01</span><h3>{page.sectionTitle || "A little more about us"}</h3></div><p>{page.sectionDescription || "Thoughtful work, built with purpose."}</p></section>
        </div>
      </div>
    </div>
  </section>;
}
