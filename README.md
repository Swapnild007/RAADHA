# RADHA

RADHA is a unified intelligence workspace: one intelligence, many capabilities.

## UI foundation

- Responsive React + Vite application
- Light, premium, Apple-inspired visual language without copying another product
- Splash, Home, Chats, Conversation, Create, Library and Settings experiences
- Responsive desktop sidebar and mobile bottom navigation
- Unified composer with Auto/Web/Files/Create modes
- Search overlay, profile menu, settings sheet, toasts and interaction states
- Conversation workspace with message stream and composer
- Creation workspace for Image, Video and Document flows
- Library with search/filter presentation
- Accessibility-minded focus states and reduced-motion support
- Provider names, model routing and internal agents are intentionally hidden from the product UI

## Architecture boundary

The frontend is designed to remain provider-agnostic. Provider integrations and the RADHA API are deliberately deferred until the product UI, navigation and responsive behavior are stable.

## Development

```bash
npm install
npm run dev
npm run build
```

Vercel deployment remains intentionally deferred during the UI build phase.