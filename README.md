# RAADHA

RAADHA is an AI-native website builder and agentic development workspace.

## Product thesis

RAADHA does not generate a website once and stop. It maintains a living project that can be understood, edited, validated, versioned and eventually deployed.

## Current foundation

- React + Vite workspace
- Live responsive preview
- File/project model
- Design token inspector
- Natural-language command bar
- Structured validation model
- Agent activity and build pipeline UI
- Source-code workspace surface
- Git/deployment concepts built into the product model

## Roadmap

### P0 · Build Engine
Project persistence, structured build plans, real file operations, incremental edits, runtime validation and controlled repair loops.

### P1 · Visual Builder
DOM/component selection, component tree, design tokens, asset manager, routing and visual regression.

### P2 · Agentic Engineering
Browser execution, test runs, accessibility/security scanning, Git checkpoints and preview deployments.

## Local development

```bash
npm install
npm run dev
```

## Architecture principle

Prefer small, inspectable tool operations over giant generated project blobs:

create_project -> create_file -> read_file -> modify_file -> validate -> build -> browser_check -> repair -> checkpoint -> deploy

RAADHA is intentionally independent from NOVA.
