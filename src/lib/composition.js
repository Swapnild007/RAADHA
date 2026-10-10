export const SECTION_CATALOG = {
  features: {
    label: "Features",
    title: "Everything you need to move forward",
    description: "A thoughtful set of tools and capabilities, designed to work beautifully together.",
    items: ["A clearer way to work", "Built around your needs", "Ready when you are"]
  },
  stats: {
    label: "Impact metrics",
    title: "Small details. Meaningful impact.",
    description: "The progress behind the promise, measured in outcomes that matter.",
    items: ["98% satisfaction", "2.4× faster", "24/7 support"]
  },
  testimonials: {
    label: "Testimonials",
    title: "Good things happen when it works",
    description: "Real feedback from people who put the work into practice.",
    items: ["“Thoughtful from the first click to the last.”", "“The difference was clear within the first week.”", "“A team and product we trust.”"]
  },
  pricing: {
    label: "Pricing",
    title: "Straightforward plans that scale",
    description: "Start with what you need today, then grow when the time is right.",
    items: ["Starter · Free", "Pro · $19 / month", "Team · Let's talk"]
  },
  faq: {
    label: "FAQ",
    title: "A few things you might be wondering",
    description: "Clear answers to the questions that come up most often.",
    items: ["How do we get started?", "Can this grow with our needs?", "Where can I get support?"]
  },
  contact: {
    label: "Contact",
    title: "Let's make something meaningful",
    description: "Tell us what you have in mind. We'll help you figure out the next step.",
    items: ["Share your brief", "Talk through the details", "Build a plan together"]
  },
  about: {
    label: "About",
    title: "Good work starts with a point of view",
    description: "We combine curiosity, craft and clear thinking to make work that earns its place.",
    items: ["People first", "Craft with purpose", "Always learning"]
  },
  gallery: {
    label: "Gallery",
    title: "A closer look at the work",
    description: "Selected moments, details and outcomes from recent projects.",
    items: ["01 · Direction", "02 · In the making", "03 · The final detail"]
  },
  process: {
    label: "Process",
    title: "A clear path from idea to impact",
    description: "A collaborative process that keeps the work focused and the decisions clear.",
    items: ["01 · Discover", "02 · Design", "03 · Deliver"]
  }
};

export const SECTION_TYPES = Object.keys(SECTION_CATALOG);

export function createSection(type, index = 0) {
  const preset = SECTION_CATALOG[type];
  if (!preset) return null;
  return {
    id: type + "-" + (index + 1),
    type,
    label: preset.label,
    title: preset.title,
    description: preset.description,
    items: [...preset.items]
  };
}

export function createStarterSections(template = "portfolio") {
  const byTemplate = {
    portfolio: ["gallery", "about", "contact"],
    restaurant: ["about", "gallery", "contact"],
    saas: ["features", "stats", "pricing", "faq", "contact"],
    agency: ["features", "process", "gallery", "contact"],
    store: ["gallery", "features", "faq", "contact"],
    event: ["stats", "gallery", "faq", "contact"]
  };
  return (byTemplate[template] || ["features", "about", "contact"])
    .map((type, index) => createSection(type, index));
}

export function normalizeSections(sections) {
  if (!Array.isArray(sections)) return [];
  return sections
    .filter((section) => section && SECTION_TYPES.includes(section.type))
    .slice(0, 20)
    .map((section, index) => {
      const preset = SECTION_CATALOG[section.type];
      return {
        ...createSection(section.type, index),
        ...section,
        id: String(section.id || section.type + "-" + (index + 1)).slice(0, 80),
        title: String(section.title || preset.title).slice(0, 180),
        description: String(section.description || preset.description).slice(0, 500),
        items: (Array.isArray(section.items) ? section.items : preset.items).slice(0, 6).map((item) => String(item).slice(0, 180))
      };
    });
}
