# F-004: World-Building Persistence

Record NPCs, settlements, and locations discovered during play. Keep world details in one searchable place, linked to the journal entries where they were introduced.

## What it does

- **Create/edit world details** — add NPCs and settlements with name, role/type, and freeform notes
- **Link to journal entries** — tag NPCs and settlements in entries so both sides show the connection
- **Quick lookup during play** — browse who you've met and where you've been without scrolling through journal prose
- **Relationship notes** — add plain-text notes describing how characters and locations connect (no graph engine; flat notes are enough for MVP)

## Scope note

World-building in v0.1.0 is v0.2.0+. This feature is fully specced so implementation can be planned, but it ships after the core play loop. See [INFORMATION-ARCHITECTURE.md](../INFORMATION-ARCHITECTURE.md) for the screen priority list.

## Contracts

**Create NPC:**
- Input: name (required), role (optional), notes (optional)
- Output: NPC record created and linked to campaign
- Side effect: NPC appears in Party tab list, available for linking in journal entries

**Edit NPC:**
- Input: NPC ID, updated fields
- Output: NPC record updated
- Note: linked journal entry IDs are not affected by an edit

**Create Settlement:**
- Input: name (required), type (optional, e.g., "fortress", "market town"), features/inhabitants (optional, freeform)
- Output: Settlement record created and linked to campaign
- Side effect: Settlement appears in Party tab list, available for linking

**Link World Detail to Journal Entry:**
- Input: entry ID, NPC IDs and/or Settlement IDs to link
- Output: entry updated with links; each linked NPC/settlement now references this entry ID
- Note: linking is bidirectional — the entry and the world detail both hold the reference

**Delete NPC / Settlement:**
- Input: NPC or Settlement ID
- Output: record deleted
- Side effect: references removed from linked journal entries
- Confirmation required

## UX Flows

### Flow 1: "Create an NPC"

**User goal:** I just encountered a character during play. I want to record them before I forget.

```mermaid
graph TD
    A["Party Tab<br/>(World Hub)"]
    B["NPCs Section"]
    C["[+ Add NPC]<br/>button"]
    D["NPC Form<br/>(modal or inline)"]
    E{"Input?"}
    F["Enter name<br/>+ role + notes"]
    G["[Save]"]
    H["NPC Detail<br/>(new record)"]
    I["Party Tab<br/>(list updated)"]

    A -->|NPCs section| B
    B -->|[+ Add NPC]| C
    C -->|open| D
    D -->|type| E
    E -->|fill in| F
    F -->|[Save]| G
    G -->|create record| H
    H -->|back| I

    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style D fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style H fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style I fill:#f4efe6,stroke:#4a7a5c,color:#1f1a17
```

**User actions:**
1. Tap PARTY tab
2. Scroll to NPCs section
3. Tap [+ Add NPC]
4. Form opens: name field (required), role field (optional), notes textarea (optional)
5. Fill in details
6. Tap [Save]
7. NPC Detail screen shows the new record
8. Back arrow returns to Party tab with NPC now in list

### Flow 2: "Link an NPC to a Journal Entry"

**User goal:** I wrote an entry about meeting the Rook-Warden. I want to tag her so she shows up in my world notes.

Two entry points: from the NPC detail, or from within the journal entry editor.

```mermaid
graph TD
    A["Full Entry Editor<br/>(Story or Play tab)"]
    B["[Link World Details]<br/>section"]
    C["NPC Checklist<br/>(all campaign NPCs)"]
    D["Check NPC name"]
    E["[Save Entry]"]
    F["Entry updated<br/>NPC now references entry"]

    G["NPC Detail<br/>(Party tab)"]
    H["[Linked Entries]<br/>section"]
    I["Entry in list"]

    A -->|scroll| B
    B -->|expand| C
    C -->|tap| D
    D -->|[Save]| E
    E -->|bidirectional link| F

    F -.->|same NPC| G
    G -->|section| H
    H -->|tap| I

    style A fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style C fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style F fill:#f4efe6,stroke:#4a7a5c,color:#1f1a17
    style G fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
```

**User actions (from entry editor):**
1. In the full entry editor, scroll to "Link World Details" section
2. Expand NPC checklist — shows all NPCs in the campaign
3. Check the box next to relevant NPC(s) or Settlement(s)
4. Tap [Save]
5. Entry saved with links; NPC detail now shows this entry in "Linked Entries"

**User actions (from NPC detail):**
1. On NPC Detail, "Linked Entries" section shows all journal entries that reference this NPC
2. Tap an entry to navigate directly to the full entry view

### Flow 3: "Review World Summary"

**User goal:** I'm starting a new session and want to remind myself who I've met and where I've been.

```mermaid
graph TD
    A["Party Tab<br/>(World Hub)"]
    B["NPCs Section<br/>(list)"]
    C["Settlements Section<br/>(list)"]
    D["NPC Detail<br/>(name, role, notes, linked entries)"]
    E["Settlement Detail<br/>(name, type, features, linked entries)"]
    F["Journal Entry<br/>(via link)"]

    A -->|scroll| B
    A -->|scroll| C
    B -->|[Tap NPC]| D
    C -->|[Tap Settlement]| E
    D -->|[Tap linked entry]| F
    E -->|[Tap linked entry]| F

    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style B fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style D fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style E fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style F fill:#f4efe6,stroke:#4a7a5c,color:#1f1a17
```

**User actions:**
1. Tap PARTY tab
2. Browse NPCs list (name + role summary)
3. Tap an NPC to open detail: name, role, full notes, list of linked journal entries
4. Tap a linked entry to read the prose from when that character was introduced
5. Back arrow returns to NPC detail, then to Party tab
6. Same flow for Settlements

**Empty state (no NPCs or settlements yet):**
- Party tab shows a prompt: "No world details yet. When you encounter characters or locations, add them here."
- [+ Add NPC] and [+ Add Settlement] buttons visible

## Screen Details

**Party Tab (World Hub)**
```
World — [campaign name]

NPCs
  ├─ [Maren, the Rook-Warden]  — merchant, met in Session 1
  ├─ [The Hollow Duke]         — antagonist, unknown origin
  └─ [+ Add NPC]

Settlements
  ├─ [Ironhold]   — fortress, 3 sessions
  ├─ [Salt Reach] — coastal market
  └─ [+ Add Settlement]
```

**NPC Detail**
```
Maren, the Rook-Warden
Role: Merchant / NPC
────────────────────────
Notes:
Tall, weathered. Trades in Rook parts.
Doesn't trust outsiders but respects
persistence.

Linked Entries (2)
  ├─ Session 1 · Phase 2 · "A deal in the rain"
  └─ Session 2 · Phase 1 · "Maren's debt"

[Edit]   [Delete]
```

## Design References

**Design system:** Party tab uses `.wf-box` list items. NPC/Settlement names in Kalam (medium weight). Role/type label in small Kalam (`--ink-soft`). Linked entries use underline style (tappable). [+ Add] buttons use dashed border (`.wf-box-dashed`) to signal "add new" affordance.

**Empty state:** SVG squiggle line used as visual separator for empty sections (consistent with the blank journal page treatment in F-003).

## Related

- **Epic:** [E-002: Narrative Capture System](../epics/E-002-narrative-capture-system.md)
- **Feature:** [F-003: Narrative Journaling](./F-003-narrative-journaling.md)
- **Domain terms:** Settlement, Campaign, Journal Entry (see [CONTEXT.md](../../CONTEXT.md))
- **Design:** See [DESIGN.md](../DESIGN.md) for typography, colors, components
- **IA:** See [INFORMATION-ARCHITECTURE.md](../INFORMATION-ARCHITECTURE.md) for Party tab structure
- **Data:** See [DATA-MODEL.md](../DATA-MODEL.md) for NPC and Settlement object schemas
