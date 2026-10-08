export const initialProject = {
  name: "Aurora Studio",
  framework: "React + Vite",
  files: [
    { name: "src", type: "folder" },
    { name: "App.jsx", type: "file", parent: "src" },
    { name: "styles.css", type: "file", parent: "src" },
    { name: "main.jsx", type: "file", parent: "src" },
    { name: "package.json", type: "file" },
    { name: "index.html", type: "file" }
  ],
  selected: "hero",
  viewport: "desktop",
  tokens: {
    primary: "#8b5cf6",
    background: "#09090b",
    surface: "#111114",
    text: "#f7f7f8",
    muted: "#a1a1aa",
    radius: 18,
    spacing: 24
  },
  page: {
    eyebrow: "AI-native creative studio",
    title: "Build beautiful websites at the speed of thought.",
    description: "RAADHA turns your idea into a living codebase. Design, edit, validate and ship without leaving the workspace.",
    cta: "Start building",
    secondary: "Explore workspace",
    accent: "#8b5cf6",
    showGrid: true,
    heroHeight: 620
  }
};

export const activitySeed = [
  { type: "success", text: "Workspace initialized", time: "now" },
  { type: "agent", text: "Design system tokens loaded", time: "1m" },
  { type: "check", text: "Accessibility baseline passed", time: "2m" }
];