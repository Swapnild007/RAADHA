# RADHA

**RADHA — the next generation of SAARTHI.**

RADHA carries forward the original SAARTHI philosophy — one unified intelligence that helps a person understand, decide, create and act — and turns it into a world-class product platform with the missing capabilities built into the experience.

## Product principle

**One intelligence. Many capabilities.**

Users should never need to understand internal agents, model routing, provider selection or orchestration. RADHA presents one consistent intelligence while the underlying platform can combine reasoning, research, tools, files and specialist execution.

Core intelligence flow:

**Understand → Think → Use tools → Create → Verify → Deliver**

## Current product foundation

- Premium light, Apple-inspired responsive interface
- Mobile-first navigation with desktop workspace layout
- Splash experience and responsive application shell
- Home with unified composer, intent shortcuts and capability entry points
- Chats with search and persistent workspace context
- Conversation workspace with contextual rail, actions and composer
- Create workspace for Image, Video and Document workflows
- Library foundation for saved work and files
- Workspace foundation for Projects, Tasks, Memory and Insights
- Settings and privacy/data-control entry points
- Search, toasts, loading/empty/error-ready interaction patterns
- Reduced-motion and keyboard/focus considerations
- Internal agents and provider names intentionally hidden from the UI

## Architecture boundary

The current frontend is deliberately provider-agnostic. External model/provider integrations are **not** connected yet. The product shell, navigation, responsive behavior and interaction contracts are being stabilized first.

The future backend boundary is a unified RADHA API layer, compatible with Vercel deployment, with provider adapters kept server-side. API credentials must never be exposed in the frontend.

## Product hierarchy

RADHA
- Home
- Chats
- Create
- Library
- Workspace
  - Projects
  - Tasks
  - Memory
  - Insights
- Settings

## Development

```bash
npm install
npm run dev
npm run build
```

GitHub Pages is currently used to validate the frontend during the UI build phase. Vercel/backend integration remains intentionally deferred until the product foundation is stable.
