import test from "node:test";
import assert from "node:assert/strict";
import { initialProject } from "../src/data/templates.js";
import { requestAgentPlan, applyAgentPlan } from "../src/lib/agent.js";

test("offline command planner supports viewport and accent edits", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error("static hosting has no API route"); };
  try {
    const plan = await requestAgentPlan("switch to mobile and make the accent purple", structuredClone(initialProject));
    const result = applyAgentPlan(structuredClone(initialProject), plan);
    assert.equal(result.project.viewport, "mobile");
    assert.equal(result.project.tokens.primary, "#a78bfa");
    assert.ok(result.changes.length >= 2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("offline command planner can update hero copy", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error("offline"); };
  try {
    const plan = await requestAgentPlan('change hero title to "Launch your next big idea"', structuredClone(initialProject));
    const result = applyAgentPlan(structuredClone(initialProject), plan);
    assert.equal(result.project.page.title, "Launch your next big idea");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("agent rejects unsupported properties and malformed colors", () => {
  const result = applyAgentPlan(structuredClone(initialProject), {
    operations: [
      { tool: "set_page_property", args: { property: "dangerous", value: "nope" } },
      { tool: "set_token", args: { token: "primary", value: "not-a-color" } }
    ]
  });
  assert.equal(result.project.page.dangerous, undefined);
  assert.equal(result.project.tokens.primary, initialProject.tokens.primary);
  assert.deepEqual(result.changes, []);
});

test("offline command planner builds a local restaurant website without fetch", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("Network must not be used"); };
  try {
    const project = structuredClone(initialProject);
    const plan = await requestAgentPlan("Build a restaurant website", project);
    assert.equal(plan.intent, "build_or_edit_site");
    const result = applyAgentPlan(project, plan);
    assert.equal(result.project.page.siteType, "restaurant");
    assert.equal(result.project.page.brand, "SAFFRON & STONE");
    assert.equal(result.project.page.cta, "Reserve a table");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("offline command planner can build a SaaS starter and keep explicit follow-up edits", async () => {
  const project = structuredClone(initialProject);
  const plan = await requestAgentPlan("Create a SaaS product landing page and make the accent blue", project);
  const result = applyAgentPlan(project, plan);
  assert.equal(result.project.page.siteType, "saas");
  assert.equal(result.project.tokens.primary, "#60a5fa");
});

test("offline command planner does not call fetch", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("unexpected network call"); };
  try {
    const plan = await requestAgentPlan("switch to mobile", structuredClone(initialProject));
    assert.equal(plan.operations[0].tool, "set_viewport");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("local composition engine adds, reorders and removes sections", async () => {
  const project = structuredClone(initialProject);
  const addPlan = await requestAgentPlan("Add a testimonials section", project);
  assert.equal(addPlan.operations[0].tool, "add_section");
  assert.equal(addPlan.operations[0].args.type, "testimonials");
  const added = applyAgentPlan(project, addPlan).project;
  assert.ok(added.page.sections.some((section) => section.type === "testimonials"));

  const movePlan = await requestAgentPlan("Move the testimonials section up", added);
  const moved = applyAgentPlan(added, movePlan).project;
  const index = moved.page.sections.findIndex((section) => section.type === "testimonials");
  assert.equal(index, added.page.sections.findIndex((section) => section.type === "testimonials") - 1);

  const removePlan = await requestAgentPlan("Remove the testimonials section", moved);
  const removed = applyAgentPlan(moved, removePlan).project;
  assert.ok(!removed.page.sections.some((section) => section.type === "testimonials"));
});

test("building a SaaS site composes a relevant starter section set", async () => {
  const project = structuredClone(initialProject);
  const plan = await requestAgentPlan("Build a SaaS website", project);
  const result = applyAgentPlan(project, plan).project;
  assert.ok(result.page.sections.some((section) => section.type === "features"));
  assert.ok(result.page.sections.some((section) => section.type === "pricing"));
  assert.ok(result.page.sections.some((section) => section.type === "faq"));
});
