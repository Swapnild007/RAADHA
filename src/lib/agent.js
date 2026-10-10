const VIEWPORTS = new Set(["desktop", "tablet", "mobile"]);
const COLORS = {
  purple: "#a78bfa", violet: "#8b5cf6", blue: "#60a5fa",
  orange: "#fb923c", green: "#34d399", pink: "#f472b6",
  red: "#f87171", teal: "#2dd4bf", white: "#f8fafc"
};
const PAGE_PROPERTIES = new Set([
  "title", "description", "eyebrow", "cta", "secondary", "showGrid", "heroHeight"
]);
const TOKEN_NAMES = new Set(["primary", "background", "surface", "text", "muted", "radius", "spacing"]);

function normalize(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function localPlan(input, project) {
  const text = normalize(input);
  const lower = text.toLowerCase();
  const operations = [];
  if (!text) return { intent: "empty", summary: "Enter a request to edit the current page.", operations: [] };

  const viewport = lower.match(/\b(mobile|phone|smartphone|tablet|desktop)\b/);
  if (viewport) {
    const value = /phone|smartphone/.test(viewport[1]) ? "mobile" : viewport[1];
    if (VIEWPORTS.has(value)) operations.push({ tool: "set_viewport", args: { viewport: value } });
  }

  const color = Object.entries(COLORS).find(([name]) => lower.includes(name));
  if (color && /colou?r|accent|purple|violet|blue|orange|green|pink|red|teal|white|background|button/.test(lower)) {
    const token = /background|page background/.test(lower) ? "background" : "primary";
    operations.push({ tool: "set_token", args: { token, value: color[1] } });
  }

  const hex = text.match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);
  if (hex && /colou?r|accent|background|button|primary|theme/i.test(text)) {
    operations.push({ tool: "set_token", args: { token: /background/i.test(text) ? "background" : "primary", value: hex[0] } });
  }

  if (/\b(hide|remove|disable)\b.*\b(grid|gridlines)\b/.test(lower)) {
    operations.push({ tool: "set_page_property", args: { property: "showGrid", value: false } });
  } else if (/\b(show|enable)\b.*\b(grid|gridlines)\b/.test(lower)) {
    operations.push({ tool: "set_page_property", args: { property: "showGrid", value: true } });
  }

  const propertyPatterns = [
    { property: "title", pattern: /(?:change|set|make|update)\s+(?:the\s+)?(?:hero\s+)?title\s+(?:to|as|=)\s*["']?(.+?)["']?$/i },
    { property: "description", pattern: /(?:change|set|update)\s+(?:the\s+)?(?:hero\s+)?description\s+(?:to|as|=)\s*["']?(.+?)["']?$/i },
    { property: "eyebrow", pattern: /(?:change|set|update)\s+(?:the\s+)?eyebrow\s+(?:to|as|=)\s*["']?(.+?)["']?$/i },
    { property: "cta", pattern: /(?:change|set|rename|update)\s+(?:the\s+)?(?:primary\s+)?(?:cta|button|button text)\s+(?:to|as|=)\s*["']?(.+?)["']?$/i },
    { property: "secondary", pattern: /(?:change|set|rename|update)\s+(?:the\s+)?secondary button\s+(?:to|as|=)\s*["']?(.+?)["']?$/i }
  ];
  for (const item of propertyPatterns) {
    const match = text.match(item.pattern);
    if (match?.[1]) {
      operations.push({ tool: "set_page_property", args: { property: item.property, value: match[1].replace(/["']$/, "").replace(/[.]+$/, "") } });
      break;
    }
  }

  const explicitHeight = text.match(/hero height\s*(?:to|=)\s*(\d{2,3})/i);
  if (explicitHeight) {
    operations.push({ tool: "set_page_property", args: { property: "heroHeight", value: Math.max(480, Math.min(760, Number(explicitHeight[1]))) } });
  } else if (/\b(taller|increase|increase the height|make.*taller)\b/.test(lower)) {
    operations.push({ tool: "set_page_property", args: { property: "heroHeight", value: Math.min(760, Number(project?.page?.heroHeight || 620) + 80) } });
  } else if (/\b(shorter|reduce.*height|make.*shorter)\b/.test(lower)) {
    operations.push({ tool: "set_page_property", args: { property: "heroHeight", value: Math.max(480, Number(project?.page?.heroHeight || 620) - 80) } });
  }

  if (operations.length) {
    return { intent: "edit_project", summary: "Applied locally supported edits. Connect a server-side AI provider for open-ended generation.", operations };
  }
  return {
    intent: "unsupported_local_request",
    summary: "I couldn't map that request to a supported edit yet. Try changing the title, description, accent color, background, grid, hero height, or preview viewport.",
    operations: []
  };
}

export async function requestAgentPlan(input, project) {
  // GitHub Pages is static and does not host /api routes. Try a configured server first,
  // then fall back to safe local operations so the core editor remains usable.
  try {
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
    if (response.ok) {
      const payload = await response.json();
      if (payload.ok && payload.plan) return payload.plan;
    }
  } catch {
    // Expected on static hosting. Continue with the offline planner below.
  }
  return localPlan(input, project);
}

export function applyAgentPlan(project, plan) {
  const next = structuredClone(project);
  const changes = [];

  for (const operation of plan.operations || []) {
    const args = operation?.args || {};
    if (operation.tool === "set_viewport" && VIEWPORTS.has(args.viewport)) {
      next.viewport = args.viewport;
      changes.push(`Switched preview to ${args.viewport}`);
    } else if (operation.tool === "set_token" && TOKEN_NAMES.has(args.token)) {
      const validColor = typeof args.value === "string" && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(args.value);
      const validNumber = ["radius", "spacing"].includes(args.token) && Number.isFinite(Number(args.value));
      if (validColor || validNumber) {
        next.tokens[args.token] = validNumber ? Number(args.value) : args.value;
        if (args.token === "primary") next.page.accent = args.value;
        if (args.token === "background") next.tokens.background = args.value;
        changes.push(`Updated ${args.token} token`);
      }
    } else if (operation.tool === "set_page_property" && PAGE_PROPERTIES.has(args.property)) {
      const valid =
        (["title", "description", "eyebrow", "cta", "secondary"].includes(args.property) && typeof args.value === "string" && args.value.trim().length > 0 && args.value.length <= 500) ||
        (args.property === "showGrid" && typeof args.value === "boolean") ||
        (args.property === "heroHeight" && Number.isFinite(Number(args.value)) && Number(args.value) >= 480 && Number(args.value) <= 760);
      if (valid) {
        next.page[args.property] = args.property === "heroHeight" ? Number(args.value) : args.value;
        changes.push(`Updated page ${args.property}`);
      }
    }
  }

  return { project: next, changes };
}
