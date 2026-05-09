---
feature: F-001
epic: E-001
---

# US-001: Campaign List and Detail

**As a player, I want to see all my campaigns and open one to continue my story.**

## Scope

- Home tab: campaign list, sorted by last-played (most recent first)
- Campaign Detail: name, last-played date, session count, deck status (cards remaining)
- [+ New Campaign] button → create form (name required, hook optional)
- [↻ Resume Latest] button → navigates to Play tab with session restored
- [⋯ Menu] → Edit campaign notes, Delete (with confirmation modal)
- Empty state: prompt when no campaigns exist

## Out of scope for this story

- Export/import (US-005)
- World summary on Campaign Detail (Party tab is v0.2.0+)

## Acceptance criteria

- [ ] Campaign list renders with correct sort order
- [ ] Tapping a campaign opens Campaign Detail
- [ ] Create form validates name (required), saves campaign, returns to list with new item visible
- [ ] Resume Latest navigates to Play tab (US-002 dependency)
- [ ] Delete requires confirmation, removes campaign and all child data
- [ ] Empty state is shown when no campaigns exist

## Notes

Wireframe reference: Home screen variant B (card-stack) or C (journal). See `_inspiration/screens-home.jsx` for visual guidance.
