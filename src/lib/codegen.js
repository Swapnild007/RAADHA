const safe = (value) => JSON.stringify(String(value ?? ""));

export function generateSourceFiles(project) {
  const page = project?.page || {};
  const tokens = project?.tokens || {};
  const app = [
    'import React from "react";',
    'import "./styles.css";',
    "",
    "const content = {",
    "  eyebrow: " + safe(page.eyebrow) + ",",
    "  title: " + safe(page.title) + ",",
    "  description: " + safe(page.description) + ",",
    "  cta: " + safe(page.cta) + ",",
    "  secondary: " + safe(page.secondary),
    "};",
    "const accent = " + safe(page.accent || tokens.primary || "#8b5cf6") + ";",
    "const showGrid = " + String(page.showGrid !== false) + ";",
    "const heroHeight = " + String(Number(page.heroHeight) || 620) + ";",
    "",
    "export default function App() {",
    "  return (",
    '    <div className="site-page" style={{ "--accent": accent, "--hero-height": heroHeight + "px" }}>',
    '      <nav className="site-nav"><a className="brand" href="#">Aurora</a><div className="nav-links"><a href="#work">Work</a><a href="#process">Process</a><a href="#about">About</a></div><a className="nav-cta" href="#contact">Let\'s talk</a></nav>',
    '      <main className={"hero" + (showGrid ? " has-grid" : "")}>',
    '        <div className="hero-copy"><p className="eyebrow">' + '<span className="eyebrow-dot" />{content.eyebrow}</p>',
    "          <h1>{content.title}</h1><p className=\"description\">{content.description}</p>",
    '          <div className="actions"><a className="primary" href="#contact">{content.cta} <span>↗</span></a><a className="secondary" href="#work">{content.secondary}</a></div>',
    "        </div>",
    '        <aside className="agent-card"><p>RAADHA Agent <span>READY</span></p><div>Intent understood <b>✓</b></div><div>Design system <b>✓</b></div><div>Responsive layout <b>✓</b></div></aside>',
    "      </main>",
    '      <section className="below-fold" id="work"><span>01</span><h2>Idea → working product</h2><p>One workspace for ideas, design, code and delivery.</p></section>',
    "    </div>",
    "  );",
    "}",
    ""
  ].join("\n");

  const styles = [
    ":root { font-family: Inter, ui-sans-serif, system-ui, sans-serif; color: #f7f7f8; background: " + (tokens.background || "#09090b") + "; font-synthesis: none; }",
    "* { box-sizing: border-box; } body { margin: 0; } a { color: inherit; text-decoration: none; }",
    ".site-page { min-height: 100vh; background: radial-gradient(ellipse at 75% 35%, color-mix(in srgb, var(--accent), transparent 86%), transparent 45%), #09090b; overflow: hidden; }",
    ".site-nav { height: 76px; max-width: 1180px; margin: auto; padding: 0 28px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #ffffff14; }",
    ".brand { font-size: 20px; font-weight: 750; letter-spacing: -.05em; } .nav-links { display: flex; gap: 30px; color: #a1a1aa; font-size: 13px; }",
    ".nav-cta,.primary { background: var(--accent); color: white; border-radius: 12px; padding: 12px 17px; font-size: 13px; font-weight: 650; }",
    ".hero { min-height: var(--hero-height); max-width: 1180px; margin: auto; padding: 90px 28px; display: flex; align-items: center; justify-content: space-between; gap: 44px; position: relative; }",
    ".hero.has-grid:before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .16; background-image: linear-gradient(#ffffff15 1px, transparent 1px), linear-gradient(90deg, #ffffff15 1px, transparent 1px); background-size: 48px 48px; mask-image: linear-gradient(90deg, black, transparent); }",
    ".hero-copy { position: relative; z-index: 1; max-width: 650px; } .eyebrow { color: #c4b5fd; display: flex; gap: 9px; align-items: center; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }",
    ".eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); } h1 { font-size: clamp(42px, 5.6vw, 76px); line-height: 1.04; letter-spacing: -.065em; margin: 24px 0; max-width: 680px; }",
    ".description { color: #a1a1aa; font-size: 17px; line-height: 1.8; max-width: 540px; } .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 28px; }",
    ".primary span { margin-left: 18px; } .secondary { border: 1px solid #ffffff20; border-radius: 12px; padding: 12px 17px; font-size: 13px; }",
    ".agent-card { z-index: 1; flex: 0 0 275px; padding: 22px; border: 1px solid #ffffff20; border-radius: 20px; background: #141419dd; box-shadow: 0 24px 80px #0008; }",
    ".agent-card p { display: flex; justify-content: space-between; font-size: 12px; margin: 0 0 22px; } .agent-card p span { color: #86efac; font-size: 10px; } .agent-card div { display: flex; justify-content: space-between; color: #a1a1aa; padding: 11px 0; border-top: 1px solid #ffffff10; font-size: 12px; } .agent-card b { color: #86efac; }",
    ".below-fold { border-top: 1px solid #ffffff14; padding: 30px max(28px, calc((100% - 1124px) / 2)); display: grid; grid-template-columns: auto 1fr 1fr; align-items: center; gap: 20px; } .below-fold span { color: var(--accent); } .below-fold h2 { font-size: 16px; } .below-fold p { color: #a1a1aa; font-size: 13px; }",
    "@media (max-width: 720px) { .nav-links { display: none; } .hero { min-height: auto; padding: 70px 22px; flex-direction: column; align-items: stretch; } h1 { font-size: clamp(40px, 12vw, 58px); } .agent-card { flex-basis: auto; } .below-fold { padding: 24px 22px; grid-template-columns: auto 1fr; } .below-fold p { grid-column: 2; margin-top: -10px; } }",
    ""
  ].join("\n");

  const main = 'import React from "react";\nimport { createRoot } from "react-dom/client";\nimport App from "./App.jsx";\nimport "./styles.css";\n\ncreateRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);\n';
  const packageJson = JSON.stringify({ name: (project?.name || "raadha-site").toLowerCase().replace(/[^a-z0-9-]+/g, "-"), version: "1.0.0", private: true, type: "module", scripts: { dev: "vite", build: "vite build", preview: "vite preview" }, dependencies: { react: "^19.1.1", "react-dom": "^19.1.1" }, devDependencies: { "@vitejs/plugin-react": "^4.3.4", vite: "^6.0.7" } }, null, 2) + "\n";
  const html = '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta name="theme-color" content="' + (tokens.background || "#09090b") + '" />\n    <title>' + String(page.title || project?.name || "Aurora Studio").replace(/[&<>"]/g, "") + '</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>\n';

  return [
    { name: "App.jsx", path: "src/App.jsx", content: app },
    { name: "styles.css", path: "src/styles.css", content: styles },
    { name: "main.jsx", path: "src/main.jsx", content: main },
    { name: "package.json", path: "package.json", content: packageJson },
    { name: "index.html", path: "index.html", content: html }
  ];
}
