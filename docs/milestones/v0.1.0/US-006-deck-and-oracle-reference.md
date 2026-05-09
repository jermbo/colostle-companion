---
feature: F-002
epic: E-003
---

# US-006: Deck Status and Oracle Table Reference (Cards Tab)

**As a player, I want to see how many cards I have left and look up what each oracle result means.**

## Scope

- Cards tab: deck status section + oracle tables list
- Deck status: cards remaining, reshuffle count, [View Flip History] link
- Flip history: list of all flips in the current campaign (card, oracle, timestamp, entry snippet)
- Oracle tables list: all 6 official tables (Exploration Land, Exploration Sea, Combat, Settlement, Items, Yes-No)
- Oracle Table View: full table of card value + suit color → prompt text
- Tables are read-only in v0.1.0

## Out of scope for this story

- Custom oracle tables (v0.2.0+)
- Table editing (v0.2.0+)

## Acceptance criteria

- [ ] Deck status reflects the real-time card count from the active campaign's Deck record
- [ ] Reshuffle count is visible and accurate
- [ ] Flip history is complete (all FlipRecords for the campaign), newest first
- [ ] Each flip history item shows: card (value + suit), oracle type, timestamp, entry snippet (first 60 chars or "No entry")
- [ ] Tapping a flip history item navigates to the linked journal entry (if one exists)
- [ ] All 6 oracle tables are present and display the correct Colostle prompts
- [ ] Oracle Table View is scrollable and readable at small font sizes

## Notes

Oracle table data is static — no database reads needed for the reference view. Tables can be bundled as a JS object in the codebase.
