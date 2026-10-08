export function applyCommand(project, input) {
  const text = input.toLowerCase();
  const next = structuredClone(project);
  const changes = [];

  if (text.includes("mobile") || text.includes("responsive")) {
    next.viewport = "mobile";
    changes.push("Switched preview to mobile");
  }
  if (text.includes("desktop")) {
    next.viewport = "desktop";
    changes.push("Switched preview to desktop");
  }
  if (text.includes("purple")) {
    next.page.accent = "#a78bfa";
    next.tokens.primary = "#a78bfa";
    changes.push("Updated primary accent");
  }
  if (text.includes("blue")) {
    next.page.accent = "#60a5fa";
    next.tokens.primary = "#60a5fa";
    changes.push("Updated primary accent");
  }
  if (text.includes("orange")) {
    next.page.accent = "#fb923c";
    next.tokens.primary = "#fb923c";
    changes.push("Updated primary accent");
  }
  if (text.includes("hero")) {
    if (text.includes("title")) {
      const match = input.match(/title(?: to|:)?\s+["']?(.+?)["']?$/i);
      if (match?.[1]) {
        next.page.title = match[1].replace(/[.]+$/, "");
        changes.push("Updated hero title");
      }
    }
    if (text.includes("hide grid")) {
      next.page.showGrid = false;
      changes.push("Removed hero grid");
    }
    if (text.includes("show grid")) {
      next.page.showGrid = true;
      changes.push("Enabled hero grid");
    }
  }
  if (text.includes("dark")) {
    next.tokens.background = "#07070a";
    changes.push("Refined dark background");
  }
  return { project: next, changes };
}

export function validateProject(project) {
  const checks = [
    { name: "Structure", pass: project.files.length >= 5 },
    { name: "Design tokens", pass: Boolean(project.tokens.primary && project.tokens.background) },
    { name: "Content", pass: project.page.title.length > 10 },
    { name: "Responsive", pass: ["desktop", "mobile"].includes(project.viewport) }
  ];
  return {
    checks,
    passed: checks.every((item) => item.pass)
  };
}