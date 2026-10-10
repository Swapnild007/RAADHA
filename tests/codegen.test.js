import test from "node:test";
import assert from "node:assert/strict";
import { generateSourceFiles, generateStandaloneHtml } from "../src/lib/codegen.js";
import { initialProject } from "../src/data/templates.js";

test("source generator emits a complete minimal Vite project", () => {
  const files = generateSourceFiles(structuredClone(initialProject));
  assert.deepEqual(files.map((file) => file.path), ["src/App.jsx", "src/styles.css", "src/main.jsx", "package.json", "index.html"]);
  assert.ok(files.find((file) => file.path === "src/App.jsx").content.includes(initialProject.page.title));
  assert.ok(files.find((file) => file.path === "src/styles.css").content.includes("@media (max-width: 720px)"));
  const packageJson = JSON.parse(files.find((file) => file.path === "package.json").content);
  assert.equal(packageJson.scripts.build, "vite build");
  assert.equal(packageJson.devDependencies.vite, "^6.0.7");
  assert.equal(packageJson.dependencies["@vitejs"], undefined);
});

test("source generator safely serializes changed hero copy", () => {
  const project = structuredClone(initialProject);
  project.page.title = 'Quote "this" & ship';
  const files = generateSourceFiles(project);
  const app = files.find((file) => file.path === "src/App.jsx").content;
  assert.ok(app.includes('Quote \\"this\\" & ship'));
});

test("standalone website export is self-contained and safely escapes user content", () => {
  const project = structuredClone(initialProject);
  project.page.siteType = "restaurant";
  project.page.title = '<script>alert("no")</script>';
  const html = generateStandaloneHtml(project);
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("<style>"));
  assert.ok(html.includes("class=" + String.fromCharCode(34) + "site site-restaurant" + String.fromCharCode(34)));
  assert.ok(!html.includes('src="https://'));
  assert.ok(!html.includes("<script>alert"));
});
