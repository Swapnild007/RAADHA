const allowedOperations = new Set(["set_viewport","set_token","set_page_property","validate_project"]);

function normalizeCommand(input) {
  return String(input || "").trim().replace(/\s+/g, " ");
}

function planCommand(input) {
  const text = normalizeCommand(input);
  const lower = text.toLowerCase();
  const operations = [];

  if (!text) return { intent: "empty", summary: "No request supplied.", operations: [] };

  if (/\b(mobile|phone|responsive)\b/.test(lower)) operations.push({ tool: "set_viewport", args: { viewport: "mobile" } });
  else if (/\bdesktop\b/.test(lower)) operations.push({ tool: "set_viewport", args: { viewport: "desktop" } });
  else if (/\btablet\b/.test(lower)) operations.push({ tool: "set_viewport", args: { viewport: "tablet" } });

  const colors = { purple: "#a78bfa", blue: "#60a5fa", orange: "#fb923c", green: "#34d399", pink: "#f472b6" };
  for (const [name, value] of Object.entries(colors)) {
    if (lower.includes(name)) {
      operations.push({ tool: "set_token", args: { token: "primary", value } });
      break;
    }
  }

  if (lower.includes("hide hero grid")) operations.push({ tool: "set_page_property", args: { property: "showGrid", value: false } });
  else if (lower.includes("show hero grid") || lower.includes("show grid")) operations.push({ tool: "set_page_property", args: { property: "showGrid", value: true } });

  if (lower.includes("dark")) operations.push({ tool: "set_token", args: { token: "background", value: "#07070a" } });

  const titleMatch = text.match(/(?:hero\s+)?title\s+(?:to|as|=)\s+[\"']?(.+?)[\"']?$/i);
  if (titleMatch?.[1]) operations.push({ tool: "set_page_property", args: { property: "title", value: titleMatch[1].replace(/[.]+$/, "") } });

  operations.push({ tool: "validate_project", args: {} });

  return {
    intent: operations.length > 1 ? "edit_project" : "inspect_project",
    summary: operations.length > 1 ? "Request translated into small, inspectable project operations." : "No safe project edit was identified.",
    operations: operations.filter((operation) => allowedOperations.has(operation.tool))
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    return res.status(200).json({ ok: true, version: "1", plan: planCommand(body.input) });
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid agent request." });
  }
}
