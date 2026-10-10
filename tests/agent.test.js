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
