# RAADHA

**RAADHA Studio** is an AI-native website builder designed around a living project, not a one-shot generated mockup.

## Product promise

Describe a website or a change in natural language. RAADHA should translate it into inspectable project operations, show the result in a live preview, support visual and source editing, validate the project, and ultimately help publish it.

## Current capabilities

- Responsive React + Vite studio workspace
- Live preview with desktop, tablet, and mobile viewports
- Design-token and hero-content inspector
- Natural-language command bar with safe local edits when the hosted API is unavailable
- Local browser persistence for the current project
- Undo/redo history for edits made in the current session
- Export of the current project configuration as a JSON file
- Project validation checks
- Automated tests for command planning and operation validation
- GitHub Actions CI and GitHub Pages deployment

## Important product boundary

The GitHub Pages deployment is static. It does **not** run the `/api/agent` server function. The editor therefore falls back to a deterministic local command planner for the edits it supports. Open-ended AI generation requires a deployed server endpoint and provider credentials stored only in server-side environment variables. Never put provider keys in browser code, committed files, or `VITE_*` variables.

The current JSON export is a project-configuration snapshot, not a complete downloadable source-code repository. Do not describe it as a full website export.

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
- [ ] Real file content model and project import/export
- [ ] Reliable save/recovery states and error reporting

### P1 · Real AI build loop
- [ ] Server-side provider adapter with server-only credentials
- [ ] Structured, schema-validated plans and operation execution
- [ ] Read/create/modify/delete file tools with path and size limits
- [ ] Build execution and error capture
- [ ] Bounded repair loop with explicit diffs and user-visible checkpoints
- [ ] Provider timeouts, rate limits, usage limits, and audit logs

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
