const VIEWPORTS = new Set(["desktop", "tablet", "mobile"]);
const TEMPLATES = new Set(["portfolio", "restaurant", "saas", "agency", "store", "event"]);
const PAGE_PROPERTIES = new Set([
  "title", "description", "eyebrow", "cta", "secondary", "showGrid", "heroHeight",
  "brand", "siteType", "sectionTitle", "sectionDescription", "cardTitle", "navItems"
]);
const TOKEN_NAMES = new Set(["primary", "background", "surface", "text", "muted", "radius", "spacing"]);
const COLORS = {
  purple: "#a78bfa", violet: "#8b5cf6", blue: "#60a5fa", orange: "#fb923c",
  green: "#34d399", pink: "#f472b6", red: "#f87171", teal: "#2dd4bf",
  white: "#f8fafc", gold: "#d6ad60", yellow: "#facc15", black: "#18181b"
};

const SITE_PRESETS = {
  portfolio: {
    brand: "FORMA", eyebrow: "Independent creative portfolio",
    title: "Design that makes brands impossible to ignore.",
    description: "A considered collection of identity, digital experiences and ideas built to move businesses forward.",
    cta: "Explore selected work", secondary: "About the studio", sectionTitle: "Selected work, made with intent",
    sectionDescription: "A few recent projects where strategy met craft.", cardTitle: "Creative direction",
    navItems: ["Work", "Studio", "Journal"], accent: "#f472b6", background: "#101014", showGrid: true
  },
  restaurant: {
    brand: "SAFFRON & STONE", eyebrow: "Seasonal kitchen · Local ingredients",
    title: "Gather around something unforgettable.",
    description: "Thoughtful plates, ingredients at their peak, and warm hospitality. Your table is waiting.",
    cta: "Reserve a table", secondary: "Explore the menu", sectionTitle: "A menu shaped by the seasons",
    sectionDescription: "Fresh produce, open-fire cooking, and food made to be shared.", cardTitle: "Tonight's experience",
    navItems: ["Our menu", "Our story", "Find us"], accent: "#d6ad60", background: "#17120e", showGrid: false
  },
  saas: {
    brand: "NORTHSTAR", eyebrow: "The operating system for focused teams",
    title: "Turn complex work into clear momentum.",
    description: "Bring projects, decisions and team priorities into one calm workspace. Less chasing. More meaningful progress.",
    cta: "Start for free", secondary: "See how it works", sectionTitle: "Everything moving in one direction",
    sectionDescription: "Plan, collaborate and measure progress without the busywork.", cardTitle: "Workspace overview",
    navItems: ["Product", "Solutions", "Pricing"], accent: "#60a5fa", background: "#080e19", showGrid: true
  },
  agency: {
    brand: "KINETIC", eyebrow: "Strategy · Design · Digital",
    title: "We turn ambitious ideas into real-world impact.",
    description: "A small, senior team partnering with brands to solve meaningful problems and build what comes next.",
    cta: "Start a project", secondary: "Our capabilities", sectionTitle: "Good work starts with a good question",
    sectionDescription: "Brand strategy, digital products and campaigns made to make a difference.", cardTitle: "How we help",
    navItems: ["Capabilities", "Work", "About"], accent: "#34d399", background: "#0a1210", showGrid: true
  },
  store: {
    brand: "OBJECTS & CO.", eyebrow: "Considered goods for everyday living",
    title: "Fewer things. Better things.",
    description: "Useful objects, honest materials and timeless pieces chosen to earn their place in your everyday.",
    cta: "Shop the collection", secondary: "Our philosophy", sectionTitle: "Made to be lived with",
    sectionDescription: "Explore pieces selected for function, material and lasting design.", cardTitle: "Editor's picks",
    navItems: ["Shop", "Collections", "Our story"], accent: "#a3b18a", background: "#121510", showGrid: false
  },
  event: {
    brand: "AFTERGLOW", eyebrow: "A night worth remembering",
    title: "Make room for a little wonder.",
    description: "An intimate gathering of music, art and people shaping what's next. One night, one shared moment.",
    cta: "Get tickets", secondary: "View the lineup", sectionTitle: "The night, in good company",
    sectionDescription: "Discover the artists, moments and details that make this gathering different.", cardTitle: "Event details",
    navItems: ["Lineup", "Details", "Venue"], accent: "#c4b5fd", background: "#100d1b", showGrid: true
  }
};

function normalize(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function inferTemplate(lower) {
  if (/\b(restaurant|cafe|café|coffee shop|bakery|food truck|bistro|fine dining|bar website)\b/.test(lower)) return "restaurant";
  if (/\b(saas|software as a service|startup product|product landing|dashboard product|app landing)\b/.test(lower)) return "saas";
  if (/\b(portfolio|photographer|photography|designer portfolio|artist portfolio|personal brand)\b/.test(lower)) return "portfolio";
  if (/\b(agency|consultancy|consulting firm|creative studio|marketing firm|design studio)\b/.test(lower)) return "agency";
  if (/\b(e-?commerce|online store|shop|product store|clothing brand|fashion brand)\b/.test(lower)) return "store";
  if (/\b(event|conference|festival|concert|summit|ticketing)\b/.test(lower)) return "event";
  return null;
}

function localPlan(input, project) {
  const text = normalize(input);
  const lower = text.toLowerCase();
  const operations = [];
  if (!text) return { intent: "empty", summary: "Describe the website or change you want. RAADHA runs locally without an AI API.", operations: [] };

  const template = inferTemplate(lower);
  if (template && /\b(create|build|make|design|generate|start|turn this into|switch to|convert to)\b/.test(lower)) {
    operations.push({ tool: "set_site_template", args: { template } });
  }

  const viewport = lower.match(/\b(mobile|phone|smartphone|tablet|desktop)\b/);
  if (viewport && /\b(switch|change|preview|view|make|set|responsive|layout)\b/.test(lower)) {
    const value = /phone|smartphone/.test(viewport[1]) ? "mobile" : viewport[1];
    if (VIEWPORTS.has(value)) operations.push({ tool: "set_viewport", args: { viewport: value } });
  }

  const color = Object.entries(COLORS).find(([name]) => new RegExp("\\b" + name + "\\b", "i").test(lower));
  if (color && /colou?r|accent|theme|background|button|primary|make.*(purple|violet|blue|orange|green|pink|red|teal|white|gold|yellow|black)/i.test(text)) {
    const token = /background|page background/i.test(lower) ? "background" : "primary";
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
  if (explicitHeight) operations.push({ tool: "set_page_property", args: { property: "heroHeight", value: Math.max(480, Math.min(760, Number(explicitHeight[1]))) } });
  else if (/\b(taller|increase.*height|make.*taller)\b/.test(lower)) operations.push({ tool: "set_page_property", args: { property: "heroHeight", value: Math.min(760, Number(project?.page?.heroHeight || 620) + 80) } });
  else if (/\b(shorter|reduce.*height|make.*shorter)\b/.test(lower)) operations.push({ tool: "set_page_property", args: { property: "heroHeight", value: Math.max(480, Number(project?.page?.heroHeight || 620) - 80) } });

  if (operations.length) return {
    intent: template ? "build_or_edit_site" : "edit_project",
    summary: template ? "Built a " + template + " starter locally. You can refine its copy, colors and layout with more prompts." : "Applied the requested local edits.",
    operations
  };
  return {
    intent: "unsupported_local_request",
    summary: "I couldn't map that request to a supported local action yet. Try creating a portfolio, restaurant, SaaS, agency, store or event website, or change copy, colors, grid, hero height or viewport.",
    operations: []
  };
}

export async function requestAgentPlan(input, project) {
  // Deliberately local-only: no network calls, AI APIs, or provider credentials.
  return localPlan(input, project);
}

export function applyAgentPlan(project, plan) {
  const next = structuredClone(project);
  const changes = [];
  for (const operation of plan.operations || []) {
    const args = operation?.args || {};
    if (operation.tool === "set_site_template" && TEMPLATES.has(args.template)) {
      const preset = SITE_PRESETS[args.template];
      next.name = preset.brand + " Website";
      next.page = { ...next.page, ...structuredClone(preset), siteType: args.template, heroHeight: 620 };
      next.tokens = { ...next.tokens, primary: preset.accent, background: preset.background, surface: "#17171c" };
      next.files = next.files.map((file) => file.name === "App.jsx" ? { ...file, parent: "src" } : file);
      changes.push("Created " + args.template + " website starter");
    } else if (operation.tool === "set_viewport" && VIEWPORTS.has(args.viewport)) {
      next.viewport = args.viewport;
      changes.push("Switched preview to " + args.viewport);
    } else if (operation.tool === "set_token" && TOKEN_NAMES.has(args.token)) {
      const validColor = typeof args.value === "string" && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(args.value);
      const validNumber = ["radius", "spacing"].includes(args.token) && Number.isFinite(Number(args.value));
      if ((validColor && !["radius", "spacing"].includes(args.token)) || validNumber) {
        next.tokens[args.token] = validNumber ? Number(args.value) : args.value;
        if (args.token === "primary") next.page.accent = args.value;
        changes.push("Updated " + args.token + " token");
      }
    } else if (operation.tool === "set_page_property" && PAGE_PROPERTIES.has(args.property)) {
      const validText = ["title", "description", "eyebrow", "cta", "secondary", "brand", "sectionTitle", "sectionDescription", "cardTitle"].includes(args.property) && typeof args.value === "string" && args.value.trim().length > 0 && args.value.length <= 500;
      const valid = validText ||
        (args.property === "showGrid" && typeof args.value === "boolean") ||
        (args.property === "heroHeight" && Number.isFinite(Number(args.value)) && Number(args.value) >= 480 && Number(args.value) <= 760);
      if (valid) {
        next.page[args.property] = args.property === "heroHeight" ? Number(args.value) : args.value;
        if (args.property === "title" || args.property === "description") next.page.siteType = next.page.siteType || "custom";
        changes.push("Updated page " + args.property);
      }
    }
  }
  return { project: next, changes };
}
