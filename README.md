# RADHA

**RADHA — the next generation of SAARTHI.**

RADHA is a **single intelligence platform** designed to bring the major capabilities of modern AI systems into one coherent experience.

> **One intelligence. One conversation. Any job.**

RADHA should feel like one capable intelligence, not a collection of chatbots, agents, model selectors or separate AI products.

## The correction that defines RADHA

RADHA is **not**:

- a menu of separate AI agents
- a wrapper around one model
- a dashboard containing Chat / Create / Research / Analyze as separate products
- a model-switching interface
- a visible multi-agent control panel

RADHA **is**:

**Ask → Understand → Plan → Research → Reason → Use tools → Create → Execute → Verify → Deliver**

The user describes the outcome. RADHA decides what capabilities, models, tools and workflows are required.

Internal orchestration may use multiple models, specialist agents, web search, code execution, files, memory and external services. **None of that routing should be required knowledge for the user.**

## The product benchmark

RADHA should aim for the *category direction* demonstrated by current leading products:

- **Perplexity Computer:** research, browse, code, build, create, monitor and automate as one worker.
- **ChatGPT Work:** turn a goal into finished work across apps, files and longer-running workflows.
- **ChatGPT Deep Research:** plan, investigate, synthesize and produce cited reports.
- **Gemini:** connected personal context and increasingly agentic, proactive assistance.
- **Open-source agent frameworks:** specialist execution can exist behind a unified orchestration layer.

RADHA should **learn from these patterns, not copy their branding, UI or proprietary implementation.**

## What the user sees

The primary experience is intentionally small.

### 1. One intelligence surface

The home screen is the beginning of every task.

The user can type:

- “Research the latest AI models and compare them.”
- “Analyze this Excel file and explain the anomalies.”
- “Build me a production-ready website.”
- “Create a cinematic image from this idea.”
- “Read these PDFs and prepare an executive brief.”
- “Find the best options, compare them and make a recommendation.”
- “Keep checking this every week and tell me if something changes.”

There is **no need to choose an agent or mode first.**

### 2. Contextual capabilities

The  / attachment surface exposes capabilities only when useful:

- Files
- Photos
- Search
- Create
- Analyze
- Build
- Other connected capabilities

Natural language remains the primary control.

### 3. Work happens inside the conversation

A request can evolve from:

**question → research → analysis → artifact → action**

without forcing the user into a new product section.

A research result can become a report.

A report can become a presentation.

A dataset can become analysis and a visualization.

A website request can become code, preview, iteration and deployment.

The conversation is the continuity layer.

### 4. Library is secondary

Library stores outputs, files and creations.

It is not a competing primary experience.

### 5. Settings are secondary

Settings contain account, appearance, memory, privacy, connections and permissions.

They do not compete with the intelligence surface.

## RADHA capability system

These are **internal capability domains**, not user-facing agents:

| Capability | What RADHA can do |
|---|---|
| Reason | Explain, compare, solve, decide |
| Research | Web research, deep research, source synthesis |
| Create | Images, video, documents, presentations |
| Analyze | Data, spreadsheets, PDFs, charts, structured information |
| Build | Code, websites, software, automation |
| Act | Connected services, browser workflows, approved actions |
| Remember | Conversation, project and user-approved context |
| Monitor | Scheduled checks, recurring workflows and change detection |

The architecture may use many specialists underneath these domains.

The product still says **RADHA**.

## Backend architecture

The frontend must never contain provider secrets.

The future RADHA backend should provide one API boundary:

**RADHA Client**
→ **RADHA Intelligence Gateway**
→ **Intent / Planning Layer**
→ **Model Router**
→ **Tool Runtime**
→ **Memory / Context**
→ **Artifact & File Services**
→ **Task / Workflow Runtime**
→ **Provider Adapters**

Provider adapters can connect to compatible commercial APIs, open models and specialist services where licensing and API access permit.

RADHA should be **provider-agnostic**, but not pretend that every proprietary AI product can simply be embedded without permission or API access.

> **RADHA can unify access to many AI systems. It cannot legally or technically absorb every proprietary AI product as if they were interchangeable.**

## Long-running work

RADHA must eventually support work that continues beyond a single response:

- multi-step research
- coding/build tasks
- document generation
- recurring workflows
- scheduled monitoring
- connected-app actions
- background jobs
- human approval for consequential actions
- resumable task state

The user should be able to leave a task and return to the same work.

## Trust and control

Power must not mean uncontrolled automation.

RADHA should distinguish:

**Answer** — informational response.

**Prepare** — create a draft or proposed action.

**Execute** — perform an external action.

**Monitor** — continue checking for a defined condition.

Actions that create meaningful external consequences should support confirmation and clear status.

## Current frontend status

The current repository is a **UI foundation**, not yet the finished intelligence platform.

Current frontend goals:

- premium light Apple-inspired visual language
- mobile-first responsive layout
- one primary intelligence surface
- contextual capability entry
- conversation continuity
- search
- file / image / voice input
- library and settings as secondary surfaces
- no visible agents
- no visible provider/model routing
- no unnecessary dashboard menus
- no black-heavy or retro chatbot styling

GitHub Pages is used only to validate the frontend while the UI foundation is being stabilized.

**Vercel/backend integration comes after the product shell is correct.**

## Product rule

When a new feature is proposed, ask:

> **Does this make RADHA a more capable intelligence, or does it merely add another menu?**

If it only adds a menu, it probably does not belong in the primary experience.

## Development

```bash
npm install
npm run dev
npm run build
```

**One intelligence. Many models. Many tools. One experience.**
