export async function requestAgentPlan(input, project) {
  const response = await fetch("/api/agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input,
      project: {
        name: project.name,
        viewport: project.viewport,
        tokens: project.tokens,
        page: project.page
      }
    })
  });

  if (!response.ok) throw new Error("RAADHA agent API is unavailable.");

  const payload = await response.json();
  if (!payload.ok || !payload.plan) throw new Error(payload.error || "RAADHA returned an invalid plan.");
  return payload.plan;
}

export function applyAgentPlan(project, plan) {
  const next = structuredClone(project);
  const changes = [];

  for (const operation of plan.operations || []) {
    if (operation.tool === "set_viewport") {
      next.viewport = operation.args.viewport;
      changes.push(`Switched preview to ${operation.args.viewport}`);
    }
    if (operation.tool === "set_token") {
      next.tokens[operation.args.token] = operation.args.value;
      if (operation.args.token === "primary") next.page.accent = operation.args.value;
      changes.push(`Updated ${operation.args.token} token`);
    }
    if (operation.tool === "set_page_property") {
      next.page[operation.args.property] = operation.args.value;
      changes.push(`Updated page ${operation.args.property}`);
    }
  }

  return { project: next, changes };
}
