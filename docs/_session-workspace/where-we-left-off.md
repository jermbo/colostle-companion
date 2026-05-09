# Where We Left Off

**Session:** 2026-05-09 (Session 03)
**Status:** First UI pass complete. Component architecture in place. Play tab interactive and visible in browser.

---

## What Was Accomplished

### Session 01 & 02 (carried forward, complete)
- All docs locked: CONTEXT.md, DESIGN.md, INFORMATION-ARCHITECTURE.md, DATA-MODEL.md
- F-001 through F-006, ADR-0001 through ADR-0004, Epics E-001 through E-003
- v0.1.0 milestone: 6 user stories with acceptance criteria
- `src/data/oracle-tables.js` scaffolded with lookup functions

### Session 03

#### Fonts
- Google Fonts removed. `@fontsource/kalam`, `@fontsource/caveat`, `@fontsource/special-elite` installed and imported via fontsource (self-hosted, no external requests).

#### Component architecture
- `src/pages/index.astro` is now a thin composition root — imports and assembles only.
- All UI lives in components:
  - `src/components/TopBar.astro`
  - `src/components/BottomNav.astro`
  - `src/components/Counter.astro` — props: `id`, `label`, `filled`, `total`, `color`
  - `src/components/PlayingCard.astro`
  - `src/components/CardBack.astro`
  - `src/components/OraclePrompt.astro`
  - `src/components/QuickJournal.astro`
  - `src/components/CampaignCard.astro`
  - `src/components/tabs/HomeTab.astro`
  - `src/components/tabs/PlayTab.astro`
  - `src/components/tabs/PartyTab.astro`
  - `src/components/tabs/StoryTab.astro`
  - `src/components/tabs/CardsTab.astro`

#### Intrinsic layout (no media queries)
- `html` is the root container (`container-type: inline-size; container-name: root`).
- Tab panels have `container-type: inline-size; container-name: panel`.
- All responsive layout shifts use `@container` queries:
  - `@container root (min-width: 900px)` → grid switches from column to row; bottom nav becomes a left sidebar (88px)
  - `@container panel (min-width: 560px)` → play stage switches to grid (card stage left, oracle right); campaign list goes horizontal
  - `@container cards-content (min-width: 480px)` → oracle table list goes to 2-column grid
- **No `@media` queries** except the accessibility-required `prefers-reduced-motion`.
- **No `max-width` cap** on the app — content fills all available space.

#### Counter scale corrected
- Explore and Combat counters are now on a 1–5 scale (not 1–6 / 1–3).
- Mock state: Explore 3/5, Combat 1/5.

#### Working flip mechanic (UI-only, no persistence)
- Random card drawn on "Flip"
- Oracle lookup runs via `oracle-tables.js`
- A–10: exploration result (organic/non-organic based on suit color)
- J/Q/K: enemy encounter (correct size label returned)
- Card display updates, deck count decrements (wraps at 0)
- Oracle prompt box updates with tag, card label, headline, and sub-text

#### Known note: `!important` on arrow direction
- `.card-stage__arrow::before { content: '↓' !important; }` inside the container query. Equal specificity with the base `content: '→'` rule meant the container query rule wasn't winning cascade. `!important` fixes it without adding a wrapper element. Acceptable for now; revisit if the rule ever needs to be overridden.

---

## Current State

### Working in browser
- ✅ All 5 tabs navigate correctly, top bar updates per tab
- ✅ Home tab: mock campaign "The Iron Vale", tapping it navigates to Play
- ✅ Play tab: counters (1–5), card stage, oracle prompt, flip mechanic, journal toggle
- ✅ Cards tab: deck status + oracle tables listed
- ✅ Party, Story tabs: empty states
- ✅ Intrinsic layout: wide layout shifts verified in preview at ~800px (two-column Play tab)
- ✅ Sidebar nav at ≥ 900px: needs user browser verification (preview tool renders at ~800px)

### Still mock / no persistence
- ⚠️ Campaign data is hardcoded in HomeTab.astro
- ⚠️ Counter values don't change with flip (state tracked in JS only, no rules wired)
- ⚠️ Journal "Save" clears textarea only — no entry stored
- ⚠️ Deck count decrements in JS state but resets on page reload
- ⚠️ Oracle PLACEHOLDER text still in oracle-tables.js (needs rulebook content)

---

## Next Session Focus (Priority Order)

### 1. Clarify cut-off feedback item
Ask the user what the fourth bullet point was before starting new work.

### 2. Wire counter interactions
Explore counter should increment on exploration flips (A–10); Combat counter should increment on enemy encounters (J/Q/K). Need to decide: player-controlled +/- buttons, or auto-increment from flip type?

### 3. Build `src/store.js`
The data layer is the clear next milestone now that the UI feel is established. Wrap localStorage under `colostle_v1`. Persist: active campaign, deck state, session/phase, flip records, journal entries.

### 4. Wire journal save
After store.js exists, the QuickJournal "Save entry" button should persist the entry linked to the current flip and phase.

### 5. Oracle table prompt text
When the user has the Colostle rulebook handy, fill PLACEHOLDER strings in `src/data/oracle-tables.js`.

---

## Open Questions (carried forward)

1. **Counter interaction model** — auto-increment from flip type, or player +/- buttons?
2. **Counter ceiling enforcement** — enforce max 5 or let player manage?
3. **Schema version field** — add `"v": "1"` to Campaign objects?
4. **Voice memos** — v0.1.0 or v0.2.0+? (Recommend: v0.2.0+)
5. **Search** — full-text or tag-based for v0.1.0? (Recommend: full-text)

---

## Key Principles (Do Not Forget)

1. **No media queries** — use `@container` only (except `prefers-reduced-motion`)
2. **Components over monolith** — every distinct UI piece is an Astro component
3. **Intrinsic design** — no max-width caps, layout adapts to available space
4. **Counters are 1–5**, not 1–6
5. **Aces are low** — in all oracle lookups, A < 2
6. **Vanilla JS, minimal dependencies** — ask before installing anything (ADR-0003)
7. **Fontsource only** — no Google Fonts CDN
8. **No emojis** — professional language in UI and docs

---

## Files & Directory Structure

```
src/
  components/
    TopBar.astro
    BottomNav.astro
    Counter.astro
    PlayingCard.astro
    CardBack.astro
    OraclePrompt.astro
    QuickJournal.astro
    CampaignCard.astro
    tabs/
      HomeTab.astro
      PlayTab.astro
      PartyTab.astro
      StoryTab.astro
      CardsTab.astro
  data/
    oracle-tables.js      (scaffolded, PLACEHOLDERs)
  pages/
    index.astro           (thin composition root)
  styles/
    global.css            (design tokens, container queries, utility classes)
  app.js                  (tab switching, flip mechanic — no persistence)

docs/
  (all prior docs unchanged — see Session 02 handoff for full list)

.claude/
  launch.json             (dev server config for preview tool)
```

---

**Last Updated:** 2026-05-09
**Author:** Claude (Agent SDK)
**Status:** Session 03 complete. Next: clarify cut-off feedback, wire counters, build store.js.
