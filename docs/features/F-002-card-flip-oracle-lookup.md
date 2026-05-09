# F-002: Card Flip & Oracle Lookup

Flip the virtual deck and instantly resolve the card to a prompt via an **oracle table**. The core mechanic that replaces book-fumbling.

## What it does

- **Player selects an oracle** — exploration (land/sea), combat, settlement, items, yes-no, or custom
- **Player flips the deck** — draws the next card, consumes it from the deck
- **App resolves the prompt** — looks up the card's value and suit in the selected oracle table, returns the prompt
- **App records the flip** — flip is added to session history and linked to the card used
- **Player journals the result** — writes what they imagined in response to the prompt

## Oracle tables

All tables are keyed by **card value** (2–10, J, Q, K, A) and **suit color** (red = positive, black = negative).

**Official Colostle tables:**
- **Exploration (Land)** — environmental prompts, discoveries, obstacles
- **Exploration (Sea)** — water-based prompts, navigation, sea encounters
- **Combat** — enemy builder (type + difficulty based on player's combat counter)
- **Settlement** — location builder (features, inhabitants, mood)
- **Items** — object/treasure generator
- **Yes-No Oracle** — binary outcome (yes/no/maybe) with narrative flavor
- **Custom tables** — player-created oracles and house rules

## Player control

- **Which oracle to consult** — explicit choice, not guessed from narrative
- **When to flip** — player initiates each flip when ready for a prompt
- **How to interpret** — oracle gives the prompt, player decides narrative meaning

## Contracts

**Flip Deck:**
- Precondition: campaign has at least one card remaining
- Input: oracle selection (e.g., "exploration/land")
- Output: card drawn, prompt returned from oracle table
- Side effects: 
  - Card removed from deck (not reshuffled yet)
  - Flip recorded in session history
  - If deck exhausted, reshuffle triggered (see [ADR-0001](../adr/0001-single-shuffled-deck-per-campaign.md))

**Reshuffle Deck:**
- Precondition: all 52 cards have been flipped
- Output: deck reset with same 52 cards, shuffled
- Side effect: reshuffle count incremented (optional, for reference)

## UX Flow: "Flip for a Prompt"

**User goal:** I'm playing a phase and want to know what happens next. I'll flip a card and get a prompt.

```mermaid
graph TD
    A["Active Session<br/>(Play Tab)"]
    B["Select Oracle<br/>(Exploration, Combat, etc.)"]
    C["[Flip] Button"]
    D["Draw Card<br/>from Deck"]
    E["Lookup<br/>Card in Oracle"]
    F["Display<br/>Oracle Prompt"]
    G{"Action?"}
    H["[Journal]<br/>Quick Entry"]
    I["[Re-flip]<br/>Same Card"]
    J["Save Entry"]
    K["Ready for<br/>Next Flip"]
    
    A -->|default: Explore| B
    B -->|or change| A
    A -->|[Flip]| C
    C -->|consume card| D
    D -->|value + color| E
    E -->|display| F
    F -->|player reads| G
    G -->|write it down| H
    G -->|explore more| I
    H -->|[Save]| J
    I -->|change narrative| F
    J -->|recorded| K
    K -->|ready| C
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style F fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style H fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style K fill:#f4efe6,stroke:#4a7a5c,color:#1f1a17
```

**Step-by-step:**

1. Player is in active session (Play tab)
2. Player selects an oracle (often **Exploration** for a phase start, shown as default)
3. Player taps **[Flip]** button
4. App:
   - Draws next card from deck (consumes from available cards)
   - Looks up card value + suit color in chosen oracle table
   - Displays prompt with card metadata (suit, type, optional card value)
5. Player reads prompt, imagines narrative
6. Player taps **[Journal]** to capture what they imagined (quick entry or full editor)
7. Entry saved → flip recorded → player ready for next flip

**Context switching:**

If player needs a different oracle mid-phase:
- Oracle selector available (radio buttons or dropdown above flip button)
- "Exploration (Land)" / "Exploration (Sea)" / "Combat" / "Settlement" / "Yes-No" / "Items"
- Selecting a different oracle doesn't consume a flip—just changes which table is consulted next flip

**Re-flip option:**

- If player taps **[↻ Re-flip]** instead of journaling, the same card is reused (narrative interpretation changes)
- Does NOT consume a new card
- Useful if player is exploring multiple narrative threads from one card

## Design References

**Wireframe:** See [Session A](../../docs/_inspiration/screens-session.jsx) (centered card stage variant) or [Session B](../../docs/_inspiration/screens-session.jsx) (timeline variant) in `_inspiration/` for visual reference.

**Design system:** Font is Caveat for title, Kalam for body. Card displays in `--paper-warm` background with sketchy border. Oracle result in `.wf-box-double` (double-border effect) for emphasis.

## Related

- **Epic:** [E-003: Instant Oracle Lookup](../epics/E-003-instant-oracle-lookup.md)
- **ADR:** [0001: Single Shuffled Deck Per Campaign](../adr/0001-single-shuffled-deck-per-campaign.md)
- **Domain terms:** Flip, Deck, Oracle, Table (see [CONTEXT.md](../../CONTEXT.md))
- **Design:** See [DESIGN.md](../DESIGN.md) for typography, spacing, components
- **IA:** See [INFORMATION-ARCHITECTURE.md](../INFORMATION-ARCHITECTURE.md) for Play tab structure
