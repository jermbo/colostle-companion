# Architecture Decision Records (ADRs)

ADRs capture **architecture and other hard-to-reverse decisions** — sparingly — when **all** of these apply:

1. **Hard to reverse** — undoing carries real cost.
2. **Surprising without context** — a newcomer would reasonably ask “why?”
3. **Real trade-off** — genuine alternatives existed.

Template and rules: **[`skills/grill-with-docs/ADR-FORMAT.md`](../../skills/grill-with-docs/ADR-FORMAT.md)**.

This directory uses sequential filenames **`0001-slug.md`**, **`0002-slug.md`**, … Scan for the highest number before adding.

**Not** ADRs:

- Ordinary Q&A and pair-programming breadcrumbs → **`US-*-decisions.md`** under the relevant milestone.
- Obvious tooling choices unless they impose serious lock-in.
