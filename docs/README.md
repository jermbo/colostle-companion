# Project wiki

This directory is the **project memory**: each document is one complete thought. If more depth is needed, **link** to it instead of inflating a single file.

## How to read it (altitude)

| Layer | Folder | What it answers |
|--------|--------|------------------|
| **Epic** — why, true north | [`epics/`](./epics/) | What mission we are serving; no code |
| **Feature** — durable capability | [`features/`](./features/) | Systems, contracts, architecture; links to domain language and ADRs |
| **Milestone** — delivery slice | [`milestones/<version>/`](./milestones/) | Stories, tasks, and decision logs for a specific cut |
| **Decisions** (history) | Next to stories under a milestone | `*-decisions.md` paired with a story |

**Domain language:** [`CONTEXT.md`](../CONTEXT.md) at repo root defines terms everyone must use consistently.

**Architecture decisions:** [`adr/`](./adr/) — only for choices that are **hard to reverse**, **surprising without context**, and the result of a **real trade-off** ([format](../skills/grill-with-docs/ADR-FORMAT.md)).

## Repo map

```
docs/
├── README.md              ← you are here
├── STANDARDS.md           ← rules for writing and maintaining wiki docs
├── epics/
├── features/
├── milestones/
│   └── <semver>/          ← e.g. v0.1.0 — colocate stories + tasks + *-decisions.md
├── adr/
├── templates/             ← copy-paste starters (empty frontmatter slots)
└── _inspiration/          ← reference wireframes / experiments (non-normative)
```

## Templates

Copy from [`templates/`](./templates/) when creating new work items.

## Authoritative rules

[**Documentation standards →**](./STANDARDS.md)
