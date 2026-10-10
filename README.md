# RAADHA

**RAADHA Studio** is an AI-native website builder designed around a living project, not a one-shot generated mockup.

## Product promise

Describe a website or a change in natural language. RAADHA should translate it into inspectable project operations, show the result in a live preview, support visual and source editing, validate the project, and ultimately help publish it.

## Current capabilities

- Responsive React + Vite studio workspace
- Live preview with desktop, tablet, and mobile viewports
- Design-token and hero-content inspector
- Natural-language command bar with safe local edits when the hosted API is unavailable
- Server-side AI planning endpoint supporting OpenRouter, Groq, or Gemini
- Provider fallback and strict allowlist sanitization of model-generated operations
- Local browser persistence, session undo/redo, configuration export, and project validation
- Automated tests, GitHub Actions CI, and GitHub Pages deployment

## Important product boundary

The GitHub Pages deployment is static. It does **not** run the `/api/agent` server function. The editor therefore falls back to a deterministic local command planner for supported edits. The API route now supports OpenRouter, Groq, and Gemini using server-side environment variables, but real AI planning becomes active only after the endpoint is deployed and at least one provider key is configured on that server.

The current JSON export is a project-configuration snapshot, not a complete downloadable source-code repository. Do not describe it as a full website export.

## AI provider setup

Use `.env.example` as the reference when configuring the server environment. Configure at least one of `OPENROUTER_API_KEY`, `GROQ_API_KEY`, or `GEMINI_API_KEY`. Keys must remain server-side and must never be committed or exposed through `VITE_*` variables. `RAADHA_AI_PROVIDER` sets provider preference; the server tries other configured providers if the preferred one fails.

## Architecture principles

- Small, inspectable operations over giant generated blobs
- Validate every operation against an allowlist and schema
- Keep project state separate from provider/model choice
- Treat model output as untrusted input
- Keep provider credentials server-side
- Do not claim a build, browser test, save, or deployment succeeded unless the relevant check actually ran
- RAADHA remains independent from NOVA

## Development

```bash
npm install
npm run dev
npm test
npm run build
```

## Product roadmap

### P0 · Reliable editor and build engine
- [x] Responsive studio foundation
- [x] Local project persistence
- [x] Session undo/redo
- [x] Safe local command operations
- [x] Configuration export
- [x] Automated tests wired into CI
- [ ] Verify CI and deployed mobile behavior
- [x] Generated source representation for the current project and per-file downloads
- [ ] Editable file content model and full project import/export
- [ ] Reliable save/recovery states and error reporting

### P1 · Real AI build loop
- [x] Server-side provider adapter with server-only credentials
- [x] Structured, schema-validated plans and operation sanitization
- [ ] Deploy the API endpoint and configure a provider key server-side
- [ ] Real file content model and create/modify/delete file tools
- [ ] Build execution and error capture
- [ ] Bounded repair loop with explicit diffs and user-visible checkpoints
- [ ] Rate limits, usage limits, and audit logs

### P2 · Visual builder
- [ ] Select elements directly in preview
- [ ] Component tree and property binding
- [ ] Asset manager and page routing
- [ ] Responsive/accessibility checks and visual regression
- [ ] Project templates and reusable design systems

### P3 · Ship and collaborate
- [ ] Git checkpoints and restore
- [ ] Preview deployments
- [ ] Explicit production deployment flow
- [ ] Project sharing and collaboration
- [ ] Security review and production observability

## Definition of done

A feature is done only when its primary flow works, failures are visible and recoverable, automated checks pass, mobile and desktop behavior are reviewed, and the documentation describes what the feature actually does.
