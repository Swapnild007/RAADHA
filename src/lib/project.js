export function validateProject(project) {
  const checks = [
    { name: "Structure", pass: project.files.length >= 5 },
    { name: "Design tokens", pass: Boolean(project.tokens.primary && project.tokens.background) },
    { name: "Content", pass: project.page.title.length > 10 },
    { name: "Responsive", pass: ["desktop", "tablet", "mobile"].includes(project.viewport) }
  ];
  return { checks, passed: checks.every((item) => item.pass) };
}
