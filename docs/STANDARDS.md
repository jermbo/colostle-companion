# Documentation standards

Rules for authoring and maintaining repo documentation so it behaves like a **project wiki**: stable IDs, predictable layout, frozen history after ship.

---

## Principles

1. **One doc, one coherent thought.** If depth grows out of proportion, split and **link**.
2. **Altitude discipline.** Do not bury vision in tasks or sneak implementation into epics.
3. **Hybrid identity.** Each work item uses an **immutable `id`** in frontmatter plus a **slug** in the filename. Cross-links use **both** (`id` + path) where helpful.
4. **Frozen milestones.** After a version is cut, treat `docs/milestones/<version>/` as historical record. Corrections are **additive** (correction section, dated decision entry)—not silent rewrites.

---

## ID prefixes

| Kind | Prefix | Example `id` | Filename pattern |
|------|--------|----------------|------------------|
| Epic | `E-` | `E-001` | `E-001-short-slug.md` |
| Feature | `F-` | `F-014` | `F-014-short-slug.md` |
| User story | `US-` | `US-042` | `US-042-short-slug.md` |
| Task | `T-` | `T-009` | `T-009-short-slug.md` |
| Decision log | `DEC-` (optional but useful) | `DEC-042` | `US-042-decisions.md` (paired with story) |

Stories and paired decision files share the same numeric stem (`US-042` ↔ `US-042-…`) so sorting and search stay aligned.

---

## Folder layout

- **`docs/epics/`** — flat. Few files; sparse “true north”.
- **`docs/features/`** — flat. Features are **not** release-bound; they stay valid across milestones.
- **`docs/milestones/<semver>/`** — work for **one delivery slice**. Colocate **stories**, **tasks**, and **`*-decisions.md`** files here (avoid deep nesting inside the version folder).
- **`docs/adr/`** — sequential ADRs (`0001-slug.md`). See [`skills/grill-with-docs/ADR-FORMAT.md`](../skills/grill-with-docs/ADR-FORMAT.md).
- Repo root **`CONTEXT.md`** — domain glossary and relationships ([`skills/grill-with-docs/CONTEXT-FORMAT.md`](../skills/grill-with-docs/CONTEXT-FORMAT.md)). Specs link here; they do not redefine canonical terms.

---

## Epic (`E-*`)

- **Purpose:** why we are building toward a coherent mission.
- **Allowed:** motivation, constraints, success signals, glossary references.
- **Not allowed:** code, detailed design, sprint tasks.

Link **down** to Features and milestones; do not duplicate Feature content.

---

## Feature (`F-*`)

- **Purpose:** durable capability—systems boundaries, integrations, contracts, high-level diagrams in prose if needed.
- **Allowed:** interface contracts (`what` / guarantees), pointers to ADRs when the decision bar is met, links into `CONTEXT.md` terms.
- **Not allowed:** step-by-step implementation, exhaustive QA scripts (those belong in stories).

Features sit in **`docs/features/`** and remain correct until intentionally revised—they are **not** copied per milestone.

---

## User story (`US-*`)

- **Purpose:** backlog item with **requirements** and **verification** spelled out so QA can execute without guessing.
- **Requirements:** numbering **must** allow phrases like **“requirement 4.b”** — hierarchical **numeric–alpha** lists (`4.` with subs `a.`, `b.`, …).
- **Acceptance criteria:** same addressing style for spoken shorthand (**“AC 2.e”**). Each numbered leaf (**`AC n`** or **`AC n.x`**) is **exactly one** actionable check.
- **Gherkin is the single source of truth for AC.** Each leaf is an explicit **`Given` / `When` / `Then`** chain, using **`And`** as needed — written for QA verification. Do not add parallel “Pass if:” summaries unless standards are reopened later.

**Frontmatter pointers:** `feature`, optional `epic`, `milestone`; enhancement lineage:

- **`Enhances:`** / **`Relates:`** / **`Supersedes:`** when the story follows or corrects shipped intent (**`Supersedes`** only when readers should deprecate older requirements explicitly).
- On **older** stories, add **`Enhanced by:`** when a follow-on exists (back-link for archaeology).

Tiny clarifications may live under **`### Decisions`** on the story; once non-trivial, use **`*-decisions.md`** (see below).

---

## Decision log (`US-*-decisions.md`)

- **Purpose:** replayable dialogue — questions you asked the tooling, answers, and choices — without necessarily meeting the ADR bar.
- **Scope:** defaults to **one log per story** (not per task).
- **`Refs:`** lines tie entries to **`Req`** and **`AC`** labels (not every task).

At the **top** of each story file, link: **Decisions →** `./US-XXX-decisions.md`.

---

## Task (`T-*`)

- **Purpose:** describe **what changes** without embedding code snippets; supports implementation planning.
- **Traceability:** link `feature`, `story`, `milestone`. Tasks matter less than **requirements and AC** for historical rationale unless you explicitly need them cited in a decision log.

---

## ADR vs decision log

| | **ADR** (`docs/adr/`) | **Decision log** (`*-decisions.md`) |
|--|----------------------|-------------------------------------|
| Trigger | Hard to reverse, surprising, traded alternatives | Preserve Q&A and rationale broadly |
| Audience | Future engineers reversing “why shaped this way?” | Humans retracing collaborative choices |
| When | Sparingly | Liberally beside stories |

A decision log **may motivate** drafting an ADR if the outcome crosses the threshold.

---

## Freeze and enhancements

After a milestone ships:

1. Prefer **new files** under **`docs/milestones/<next-version>/`** for continuing work.
2. Treat shipped folders **read-only** except trivial fixes (**typos**) with transparency if meaning changes.
3. **Enhancements** reference prior stories (`Enhances:` / `Relates:`); **do not rewrite** shipped narrative to pretend the old intent never existed.

---

## Context and naming

Before adding glossary entries, ask: **is this unique to Colostle Companion’s domain**, or general programming jargon? Only the former belongs in `CONTEXT.md`.

Use **canonical terms** from `CONTEXT.md` in Epics/Features/Stories; if a term conflicts, resolve the glossary **before** layering more specs.
