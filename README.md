# RAADHA

**RAADHA Studio** is a local-first website builder. It turns supported natural-language requests into structured edits and complete starter source files without calling an AI API.

## Product promise

Describe a website or a change in natural language. RAADHA should translate it into inspectable project operations, show the result in a live preview, support visual and source editing, validate the project, and ultimately help publish it.

## Current capabilities

- Responsive React + Vite studio workspace
- Live preview with desktop, tablet, and mobile viewports
- Design-token and hero-content inspector
- Local-first natural-language intent engine with no AI API or network dependency
- Six deterministic website starter systems: portfolio, restaurant, SaaS, agency, store and event
- Safe allowlisted operation planner and incremental follow-up edits
- Local browser persistence, session undo/redo, configuration export, standalone single-file HTML export, and project validation
- Automated tests, GitHub Actions CI, and GitHub Pages deployment

## Important product boundary

RAADHA's current command engine is deliberately local-first: it makes no AI-provider calls and requires no API keys. It uses a deterministic intent parser and curated site blueprints to create supported website starters and apply follow-up edits. This is reliable and private, but it is not an unrestricted language model: requests outside the supported intents need new local rules or a bundled local model.

The current JSON export is a project-configuration snapshot, not a complete downloadable source-code repository. Do not describe it as a full website export.

## Local engine boundary

The intent engine is deterministic, not a bundled large language model. It can build from supported site blueprints and interpret supported follow-up edits. It does not yet invent arbitrary React components from any prompt. The architecture is intentionally set up to expand the local grammar, templates, and component catalog without requiring external inference.

## Architecture principles

- Small, inspectable operations over giant generated blobs
- Validate every operation against an allowlist and schema
- Keep project state separate from the intent parser
- Treat all user-provided text as data, not executable code
- Keep the editor functional without external service credentials
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
- [x] Standalone single-file HTML export with embedded responsive CSS
- [ ] Editable file content model and full project import/export
- [ ] Reliable save/recovery states and error reporting

### P1 · Real AI build loop
- [x] Local-first website intent parser and template selection
- [ ] Editable file content model and create/modify/delete file tools
- [ ] Build execution and error capture
- [ ] Bounded repair loop with explicit diffs and user-visible checkpoints
- [ ] Local intent grammar coverage and component catalog

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
