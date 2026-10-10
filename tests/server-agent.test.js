import test from "node:test";
import assert from "node:assert/strict";
import { sanitizePlan, createPlan } from "../api/agent.js";

test("AI plan sanitizer allows supported operations and rejects unsafe output", () => {
  const plan = sanitizePlan({ summary: "Safe edits", operations: [
    { tool: "set_viewport", args: { viewport: "mobile" } },
    { tool: "set_page_property", args: { property: "title", value: "Launch something useful" } },
    { tool: "run_shell", args: { command: "rm -rf /" } },
    { tool: "set_token", args: { token: "primary", value: "javascript:alert(1)" } },
    { tool: "set_page_property", args: { property: "heroHeight", value: 9999 } }
  ] });
  assert.equal(plan.operations.length, 2);
  assert.equal(plan.operations[0].args.viewport, "mobile");
  assert.equal(plan.operations[1].args.value, "Launch something useful");
});

test("server agent fails clearly when no provider key is configured", async () => {
  await assert.rejects(createPlan("make a portfolio", {}, {}),
    (error) => error.statusCode === 503 && error.code === "AI_NOT_CONFIGURED");
});

test("server agent rejects oversized requests", async () => {
  await assert.rejects(createPlan("x".repeat(3001), {}, {}),
    (error) => error.statusCode === 413);
});
