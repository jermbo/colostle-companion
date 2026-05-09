---
feature: F-003
epic: E-002
---

# US-004: Quick Journal Entry During Play

**As a player, I want to capture what I imagined right after a flip without leaving the play screen.**

## Scope

- After a flip, a text area appears (or is tappable) inline on the Play tab
- Player types narrative prose and taps [Save]
- JournalEntry created and linked to the FlipRecord
- FlipRecord updated with `journalEntryId`
- [Expand] navigates to a full entry editor screen (larger textarea, no world-linking for v0.1.0)
- Confirmation: brief "Entry saved" feedback (not a modal, inline)

## Out of scope for this story

- NPC / Settlement linking from entry editor (v0.2.0+, depends on Party tab)
- Voice memos (v0.2.0+)
- Tag support (v0.2.0+)

## Acceptance criteria

- [ ] Text area is accessible immediately after a flip without a page navigation
- [ ] [Save] creates a JournalEntry record with correct FK references (flip, phase, session, campaign)
- [ ] Saved entry appears in Story tab journal archive (US-005 dependency)
- [ ] [Expand] opens a full editor screen; saves update the same entry
- [ ] Empty entry can be saved (player may want to journal later)
- [ ] "Entry saved" confirmation is visible and dismisses automatically

## Notes

Quick entry text area should not auto-dismiss on tap-outside — players may pause mid-sentence. [Save] is the only commit action.
