---
feature: F-005
epic: E-001
---

# US-002: Session and Phase Play

**As a player, I want to start a session, move through phases, and track my counters.**

## Scope

- Play tab: active session screen with phase header (session number, phase number)
- Counter controls: [−] and [+] for Exploration and Combat counters
- Phase menu (⋯): [New Phase], [End Session], [View Session Recap]
- [New Phase] resets counters and increments phase number
- [End Session] closes session, shows recap modal, returns to Home tab
- Session Recap: phases played, flips made, journal entries written, deck status
- Resume: if a session is active when user opens the app, Play tab loads its state
- Empty state: if no active session, prompt to start one

## Out of scope for this story

- Combat activation button (counter is always visible; player manages it manually for v0.1.0)
- Configurable counter ceilings (v0.2.0+)

## Acceptance criteria

- [ ] Starting a new session creates Session and first Phase records
- [ ] Counter [+] and [−] update instantly without a save action
- [ ] Counters cannot go below zero
- [ ] [New Phase] archives current phase and starts a new one with counters at zero
- [ ] [End Session] sets `endedAt`, shows recap, navigates to Home
- [ ] Recap shows correct counts (phases, flips, entries)
- [ ] Resuming a campaign restores the most recent active session and phase state

## Notes

Counter tap targets must meet 44×44px minimum. Include `aria-label` on [+] and [−] buttons.
