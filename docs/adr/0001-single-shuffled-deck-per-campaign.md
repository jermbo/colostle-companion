# Single Shuffled Deck Per Campaign

One deck of cards per campaign. When the deck is exhausted, it reshuffles and the same cards cycle again. No separate decks, no infinite card generation.

## Rationale

- **Repeating cards force reinterpretation** — when you flip a card you've seen before, you have to imagine it differently in light of where the story is now. That constraint creates narrative depth.
- **Consistent constraint across campaign lifetime** — long campaigns and short campaigns both operate within the same card set. No "running out" of unique content.
- **Simplicity** — one deck per campaign is straightforward to implement and reason about. No deck composition logic, no per-phase shuffles.

## Implications

- **Long campaigns will cycle through the deck multiple times** — this is intentional. The repeating cards aren't a bug; they're a feature that forces creative reinterpretation.
- **Short campaigns (one or two phases) may never see a reshuffle** — that's fine. Campaigns can be as short or long as the player decides.
- **Card history is available for reference** — the app records which cards were flipped, so players can see patterns if they want. (Useful but optional.)

## Alternatives considered

1. **Infinite deck** — generate new cards on demand. Rejected: removes the constraint that forces reinterpretation; removes the "closure" of deck exhaustion.
2. **Fresh deck per phase** — reshuffle at phase boundaries. Rejected: too frequent, removes narrative coherence across a multi-phase session.
3. **Multiple themed decks** — separate decks for exploration, combat, settlement. Rejected: adds complexity and breaks the unified card metaphor.
