# F-003: Narrative Journaling

Capture what you imagined after each flip. Build your campaign's persistent narrative archive—the story as it emerges.

## What it does

- **Quick journal entry** — after each flip, write a brief note about what you imagined (prose, bullets, or voice memo)
- **Expand entries** — revisit and expand quick notes into fuller narrative prose later
- **Session recaps** — review what happened in a session: phases played, flips made, key moments
- **Campaign archive** — full journal of all entries, searchable and linked to world details (NPCs, settlements, locations)
- **Voice memos** — optional: record spoken narrative, store alongside written entries

## Entry structure

Each **journal entry** is linked to:
- One **flip** (the card and oracle that prompted it)
- One **phase** (part of play structure)
- One **session** (when it was written)
- One **campaign** (the story it belongs to)

An entry contains:
- **Narrative prose** — what you imagined in response to the prompt
- **Metadata** — timestamp, word count, tags (optional)
- **Editable** — revise and expand at any time

## World-building connection

Journal entries can reference and link to:
- **NPCs** — characters introduced in this entry
- **Settlements** — locations discovered or developed
- **Items** — objects or treasures gained
- **Relationships** — connections between characters or factions

When you open a **world detail** (e.g., an NPC), you can see all the journal entries that mention them. When you write a journal entry, you can tag NPCs/settlements to weave them into the record.

## Contracts

**Create Journal Entry:**
- Input: flip ID, narrative text (or voice memo)
- Output: entry created, linked to flip/phase/session
- Side effect: entry appears in campaign archive and in phase timeline

**Expand Entry:**
- Input: entry ID, new/updated prose
- Output: entry updated
- Note: original entry preserved in version history (optional)

**Search Archive:**
- Input: search terms, date range, tags
- Output: matching journal entries with context

## UX Flows

### Flow 1: "Quick Journal Entry During Play"

**User goal:** I just flipped a card and got a prompt. I want to quickly capture what I imagined before the moment passes.

```mermaid
graph TD
    A["PLAY Tab<br/>(Oracle shown)"]
    B["[Tap text area]"]
    C["Quick Entry Form<br/>(pop-up)"]
    D{"Action?"}
    E["Type prose"]
    F["Voice memo<br/>(optional)"]
    G["[Save]"]
    H["Entry created<br/>+ linked"]
    I["Back to Play<br/>(ready for next)"]
    
    A -->|Oracle displayed| A
    A -->|[Journal]| B
    B -->|input focus| C
    C -->|[Voice]| F
    C -->|type| E
    E -->|continue| E
    F -->|or type| C
    C -->|[Save]| G
    G -->|create entry| H
    H -->|confirm| I
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style I fill:#f4efe6,stroke:#4a7a5c,color:#1f1a17
```

**User actions:**
1. During play, after flip, user taps in quick entry text area
2. Keyboard appears
3. User types narrative prose (a few lines, or full paragraph)
4. User taps [Save]
5. Entry created, linked to flip, phase, session
6. Confirmation "Entry saved"
7. User ready to flip again

**Optional voice memo:**
- User can tap [Voice] button to record audio instead of typing
- Audio stored alongside text entry
- Playback available in full entry view later

### Flow 2: "Expand Entry to Full Editor"

**User goal:** I want to write more, edit, or add tags.

```mermaid
graph TD
    A["Quick Entry<br/>Form"]
    B["[Expand]"]
    C["Full Editor<br/>Screen"]
    D["Edit prose"]
    E["Link world<br/>details"]
    F["[Save]"]
    G["Entry updated<br/>+ linked"]
    
    A -->|[Expand]| B
    B -->|open| C
    C -->|textarea| D
    C -->|checkboxes| E
    D -->|edit| D
    E -->|select| E
    D -->|[Save]| F
    E -->|[Save]| F
    F -->|update| G
    
    style A fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style C fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style G fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
```

**User actions:**
1. User taps [Expand] in quick entry form
2. Full editor screen opens
3. User can edit prose text
4. User can check boxes to link NPCs, settlements, items they mentioned
5. User taps [Save]
6. Entry updated, world details linked

### Flow 3: "Review Journal Archive"

**User goal:** I want to read past entries and remember what happened.

```mermaid
graph TD
    A["Story Tab<br/>(archive list)"]
    B["Session 1<br/>(expanded)"]
    C["Entry List<br/>(within session)"]
    D["Full Entry<br/>View"]
    E["[Edit]<br/>or<br/>[Delete]"]
    
    A -->|Sessions| B
    B -->|Expand| C
    C -->|[Tap entry]| D
    D -->|[Edit]| E
    D -->|[Delete]| E
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style B fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style D fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style E fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
```

**User actions:**
1. Tap STORY tab
2. See sessions listed with expand/collapse
3. Tap a session to expand and see entries
4. Tap an entry to read full text
5. See metadata (flip, phase, date) and links (NPCs, settlements)
6. Can [Edit] to revise or [Delete] to remove

### Flow 4: "Search Journal"

**User goal:** I remember writing about the Rook, but can't find the entry.

```mermaid
graph LR
    A["Story Tab"]
    B["[Search]"]
    C["Search Form"]
    D["Enter query"]
    E["Results<br/>(entries + NPCs)"]
    F["Full Entry<br/>View"]
    
    A -->|[Search button]| B
    B -->|open| C
    C -->|type term| D
    D -->|query| E
    E -->|[Tap result]| F
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style E fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style F fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
```

**User actions:**
1. Tap [Search] on STORY tab
2. Enter search term
3. Results show matching entries + linked NPCs/settlements
4. Tap result to view full entry

## Design References

**Wireframes:** Quick journal visible in [Session A](../../docs/_inspiration/screens-session.jsx). Full entry editor not yet wireframed, but uses standard textarea + checkboxes + buttons.

**Design system:** Quick journal in `.wf-box-dashed` (draft aesthetic). Full editor uses `.wf-box` containers for prose. Metadata in small Kalam font (`--ink-soft`). Related world details as checkboxes with NPC/settlement names.

**Handwriting lines:** SVG squiggle pattern used for empty journal state (simulating blank page).

## Related

- **Epic:** [E-002: Narrative Capture System](../epics/E-002-narrative-capture-system.md)
- **Feature:** [F-004: World-Building Persistence](./F-004-world-building-persistence.md)
- **Feature:** [F-002: Card Flip & Oracle Lookup](./F-002-card-flip-oracle-lookup.md)
- **Domain terms:** Journal Entry, Campaign, Session, Phase (see [CONTEXT.md](../../CONTEXT.md))
- **Design:** See [DESIGN.md](../DESIGN.md) for typography, components
- **IA:** See [INFORMATION-ARCHITECTURE.md](../INFORMATION-ARCHITECTURE.md) for Story tab structure
