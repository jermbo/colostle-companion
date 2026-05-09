---
name: dev-time
description: Loads docs/README.md, docs/_session-workspace/where-we-left-off.md, and CONTEXT.md at dev-time session start; summarizes focus and next steps; keeps handoff and glossary aligned as work progresses. Use when starting a new agent, beginning focused build time, or invoking a focus reset.
disable-model-invocation: true
---

# Dev time

## When this skill runs

The user invokes this skill when **starting a new agent** or resetting focus. Do not assume other docs are loaded.

## Mandatory reads (in order)

Read these files from the repository root **before** proposing work or editing code:

1. **`docs/README.md`** — wiki altitude, folder roles, where deeper specs live  
2. **`docs/_session-workspace/where-we-left-off.md`** — last session outcomes, current state, **what to do next**  
3. **`CONTEXT.md`** — authoritative domain language; do not contradict or lightly rename terms defined here  

If a file is missing, say so and ask whether to create it or use a different path.

## After loading: response shape

Give a **short** briefing (not a full restatement of the files):

- **Focus:** what the handoff says to prioritize next (one concrete thread)  
- **Constraints:** non-negotiables called out in handoff or `CONTEXT.md` (including terminology)  
- **Open questions:** only if the handoff flags blockers or contradictions  

Then ask what the user wants to tackle this session if that isn’t already explicit.

## Optional reads (pull in only when needed)

Do **not** load the whole wiki by default. Open additional docs only when:

- **`where-we-left-off.md`** names a specific epic, feature, milestone story, or ADR for immediate work, or  
- The user’s request clearly depends on a particular spec  

Prefer **following links** from `docs/README.md` and the handoff over searching broadly.

## Focus discipline

- Treat **`where-we-left-off.md`** as the default backlog pointer unless the user redirects.  
- Prefer **`CONTEXT.md`** terminology in specs, code comments, and UI copy when domain words apply.  
- If instructions conflict, **`CONTEXT.md`** wins for vocabulary; **`where-we-left-off.md`** wins for **what to do next** unless the user overrides. Surface conflicts instead of guessing.

## Documentation hygiene

Keep docs **accurate and lean** as implementation progresses:

- **`CONTEXT.md`** — update when domain terms or relationships stabilize or change; avoid implementation trivia ([format reference](../grill-with-docs/CONTEXT-FORMAT.md) if present).  
- **`docs/_session-workspace/where-we-left-off.md`** — update at session end or major milestones: what changed, what’s next, what’s blocked. Replace stale “next steps” so the next session isn’t misled.  
- **Other wiki pages** — edit only when the work touches them; follow [`docs/STANDARDS.md`](../../docs/STANDARDS.md); **link** instead of duplicating content across files (`docs/README.md` wiki rule).

Do not create new top-level doc genres without a reason; prefer epics, features, milestones, and ADRs as described in `docs/README.md`.
