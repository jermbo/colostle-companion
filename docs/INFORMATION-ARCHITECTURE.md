# Information Architecture

How screens relate and how users navigate through the app.

## Core Navigation Model

The app uses **bottom tab navigation** (5 main tabs) as the primary navigation method. Each tab represents a distinct activity or view mode. Within each tab, there may be sub-screens accessed via push navigation (backward arrow) or modal overlays.

### Tab Structure

```mermaid
graph LR
    HOME["HOME<br/>Campaign list"]
    PLAY["PLAY<br/>Active session"]
    PARTY["PARTY<br/>World-building"]
    STORY["STORY<br/>Journal archive"]
    CARDS["CARDS<br/>Deck & oracles"]
    
    HOME ↔ PLAY ↔ PARTY ↔ STORY ↔ CARDS
    
    style HOME fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style PLAY fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style PARTY fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style STORY fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style CARDS fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
```

**Home** — Campaign list and lifecycle management  
**Play** — Active session, flip mechanic, prompt display  
**Party** — Character / world-building details (NPCs, settlements)  
**Story** — Journal archive, session recaps  
**Cards** — Deck management, oracle tables, custom tables (later)

---

## Screen Map

### HOME Tab: Campaign Management

```mermaid
graph TD
    A["Campaign List<br/>(all campaigns with metadata)"]
    B["Campaign Detail<br/>(overview, sessions, world)"]
    C["New Campaign<br/>(form)"]
    D["Edit Campaign<br/>(modal)"]
    E["Confirmation Modal<br/>(delete/export)"]
    F["Play Tab<br/>(session resume)"]
    
    A -->|Tap campaign| B
    A -->|+ New button| C
    B -->|Resume Latest| F
    B -->|⋯ Menu| D
    D -->|Export| E
    D -->|Delete| E
    C -->|Create| A
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style B fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style D fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style E fill:#ebe3d3,stroke:#b04030,color:#1f1a17
    style F fill:#f4efe6,stroke:#4a7a5c,color:#1f1a17
```

### PLAY Tab: Active Session & Flip Mechanic

```mermaid
graph TD
    A{"Session<br/>Active?"}
    B["Empty State<br/>(No session in progress)"]
    C["Campaign Picker<br/>(modal)"]
    D["Active Session Screen<br/>(header, counters, deck, prompt, journal)"]
    E["Quick Journal Entry<br/>(pop-up form)"]
    F["Full Entry Editor<br/>(expand mode)"]
    G["Session Menu<br/>(⋯)"]
    H["Phase Controls<br/>(new/end phase)"]
    
    A -->|No| B
    B -->|Start session| C
    C -->|Resume| D
    A -->|Yes| D
    D -->|"Flip"| D
    D -->|"Journal"| E
    E -->|"Expand"| F
    F -->|"Save"| D
    D -->|"⋯"| G
    G -->|New Phase| D
    G -->|End Session| A
    
    style B fill:#ebe3d3,stroke:#8a8079,color:#1f1a17
    style D fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style E fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style F fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
```

**Oracle Prompt Display**
```
┌─────────────────────────┐
│ ♣ COMBAT                │
│ 9 of clubs              │
├─────────────────────────┤
│ A wandering Rook,       │
│ scarred but proud       │
│                         │
│ It blocks the path.     │
│ Will you fight, parley, │
│ or flee?                │
└─────────────────────────┘
```

**Quick Journal Entry**
```
Pop-up or inline form:
├─ Text area (prose entry)
├─ [Voice] button (optional voice memo)
├─ [Save] button
└─ [Expand] → full journal editor
```

**Phase Menu** (⋯)
```
├─ [New Phase]
├─ [End Session]
├─ [View Session Recap]
└─ [Cancel]
```

**Campaign Picker** (start session modal)
```
Recent Campaigns
├─ [The Iron Vale] — last played 2 days ago
├─ [Salt & Stone] — last played 1 week ago
└─ [Glasswood] — last played 30 days ago
```

### PARTY Tab: World-Building

```mermaid
graph TD
    A["World-Building Hub<br/>(NPCs & Settlements)"]
    B["NPC List"]
    C["Settlement List"]
    D["NPC Detail<br/>(name, role, notes, linked entries)"]
    E["Settlement Detail<br/>(type, features, inhabitants)"]
    F["NPC Editor<br/>(form)"]
    G["Settlement Editor<br/>(form)"]
    H["Journal Entry<br/>(view with links)"]
    
    A -->|NPCs section| B
    A -->|Settlements section| C
    B -->|Tap NPC| D
    C -->|Tap Settlement| E
    D -->|"Edit"| F
    E -->|"Edit"| G
    F -->|"Save"| D
    G -->|"Save"| E
    D -->|"Link to entries"| H
    E -->|"Link to entries"| H
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style B fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style D fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style E fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style F fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style G fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
```

### STORY Tab: Journal Archive

```mermaid
graph TD
    A["Journal Archive<br/>(sessions list)"]
    B["Session Recap<br/>(collapsible)"]
    C["Entry List<br/>(within session)"]
    D["Full Journal Entry<br/>(prose + metadata + links)"]
    E["Entry Editor"]
    F["Search Box"]
    G["Search Results"]
    H["NPC Detail<br/>(from entry link)"]
    
    A -->|"Tap session"| B
    B -->|Expand| C
    C -->|"Tap entry"| D
    D -->|"Edit"| E
    E -->|"Save"| D
    A -->|"Search"| F
    F -->|"Query"| G
    G -->|"Result"| D
    D -->|"Tap NPC link"| H
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style B fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style D fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style E fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style F fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style G fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
```

### CARDS Tab: Deck & Oracles

```mermaid
graph TD
    A["Deck & Oracles Hub<br/>(status + tables)"]
    B["Deck Status<br/>(cards remaining, reshuffles)"]
    C["Flip History<br/>(list of flips)"]
    D["Oracle Tables List<br/>(6 official + custom)"]
    E["Oracle Table View<br/>(card value → prompt)"]
    F["Add Custom Table<br/>(form)"]
    G["Table Editor"]
    
    A -->|Deck section| B
    B -->|"View flip history"| C
    A -->|Oracle tables| D
    D -->|"Tap table"| E
    E -->|"Edit"| G
    G -->|"Save"| E
    D -->|"+ Add custom"| F
    F -->|"Save"| D
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style B fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style D fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style E fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style F fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style G fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
```

---

## Navigation Flows

### "Start New Campaign" Flow

```mermaid
graph LR
    A["Home<br/>(list)"]
    B["New Campaign<br/>(form)"]
    C["Home<br/>(list)<br/>+ focus new"]
    
    A -->|+ New button| B
    B -->|"Create"| C
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style B fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style C fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
```

### "Play Campaign" Flow

```mermaid
graph LR
    A["Home<br/>(list)"]
    B["Campaign<br/>Detail"]
    C["Play Tab<br/>(active)"]
    D["Oracle<br/>Result"]
    E["Quick<br/>Journal"]
    
    A -->|Tap campaign| B
    B -->|Resume/New| C
    C -->|"Flip"| D
    C -->|"Journal"| E
    E -->|"Save"| C
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style B fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style D fill:#f4efe6,stroke:#4a7a5c,color:#1f1a17
    style E fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
```

### "Review World" Flow

```mermaid
graph LR
    A["Play Tab<br/>(session)"]
    B["Entry<br/>Detail"]
    C["Party Tab<br/>(world)"]
    D["NPC<br/>Detail"]
    
    A -->|"Tap NPC link"| B
    B -->|Jump tab| C
    C -->|"Tap NPC"| D
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style B fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style D fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
```

### "Export Campaign" Flow

```mermaid
graph LR
    A["Home<br/>(list)"]
    B["Campaign<br/>Detail"]
    C["Menu<br/>(⋯)"]
    D["Confirmation<br/>Modal"]
    E["File<br/>Download"]
    
    A -->|Tap campaign| B
    B -->|"⋯"| C
    C -->|"Export"| D
    D -->|"Confirm"| E
    
    style A fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style B fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
    style C fill:#ebe3d3,stroke:#2b4a7a,color:#1f1a17
    style D fill:#ebe3d3,stroke:#b04030,color:#1f1a17
    style E fill:#f4efe6,stroke:#2b4a7a,color:#1f1a17
```

---

## Key Design Decisions

### Tab Navigation

- **Why tabs?** Clear mental model. Each tab = one mode (list, play, world, story, cards).
- **Why 5?** Covers core workflows: campaign list (home), gameplay (play), world-building (party), journal (story), oracle reference (cards).
- **Tab persistence:** When you switch tabs and come back, you're back where you left off (scroll position, open entry, etc.).

### No Deep Nesting

- Maximum one level of push navigation (detail screen from list).
- Modals used sparingly (confirmation, pickers, forms).
- Goal: users always know where they are and how to get back (back button or tab switch).

### Quick Entry Pop-up

- Journal entry form appears inline during play, not a separate screen.
- Users can "expand" to full editor if needed.
- Keeps flow fast and uninterrupted.

### World-Building Integrated

- Party tab shows all world details (NPCs, settlements) in one place.
- Linked to journal entries (so you see where they were discovered).
- Not a separate wiki or complex graph—just a searchable reference.

---

## Screen Priority (MVP)

**Must have for v0.1.0:**
1. Home → Campaign list + detail
2. Play → Flip mechanic + oracle prompt
3. Play → Quick journal entry
4. Story → Journal archive (flat list)
5. Cards → Deck status + oracle table view

**Nice to have (v0.2.0+):**
- Party → Full NPC/settlement management
- Story → Advanced search, timeline view
- Cards → Custom oracle builder
- Full entry editor (expand mode)
- Session recap view

---

## Accessibility Notes

- **Tab order:** Natural reading order (top to bottom, left to right)
- **Focus management:** Clear focus indicators on interactive elements
- **Modal trapping:** Focus trapped in modals (OK/Cancel)
- **Gestures:** All interactions available via touch + tap (no long-press-only actions)
- **Mobile:** all touch targets min 44×44px
