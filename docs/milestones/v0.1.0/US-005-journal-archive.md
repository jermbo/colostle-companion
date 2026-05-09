---
feature: F-003
epic: E-002
---

# US-005: Journal Archive (Story Tab)

**As a player, I want to read back through my journal to remember what happened in my campaign.**

## Scope

- Story tab: list of sessions, each collapsible
- Each session shows: session number, date, phase count, entry count
- Expanding a session shows all journal entries within it, in chronological order
- Each entry in list: first line of prose, flip metadata (oracle type, card), timestamp
- Tapping an entry opens Full Entry View: full prose, flip card/oracle, phase/session context
- Full Entry View: [Edit] opens editor, [Delete] removes with confirmation
- Entry editor: large textarea, [Save] updates the entry

## Out of scope for this story

- Search (v0.2.0+, see open question in where-we-left-off.md)
- NPC/Settlement linking (v0.2.0+)
- Session recap from this tab (recap available from Play tab only in v0.1.0)

## Acceptance criteria

- [ ] Story tab shows all sessions for the active campaign
- [ ] Sessions are sorted newest-first; entries within a session are oldest-first (chronological play order)
- [ ] Collapsible sessions work correctly (expand/collapse)
- [ ] Empty entry prose shows a placeholder ("No entry written") rather than a blank item
- [ ] Full Entry View shows flip card metadata correctly
- [ ] Edit saves changes to prose; timestamp updated
- [ ] Delete removes entry and confirmation is required

## Notes

If no active campaign is selected, Story tab shows an empty state prompting the player to open a campaign from Home.
