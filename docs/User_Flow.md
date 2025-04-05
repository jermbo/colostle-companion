# Colostle Companion User Flows

This document outlines the key user flows for the Colostle Companion app MVP, using Mermaid.js diagrams to visualize the essential paths users will take.

## Flow 1: Character Selection and Session Management

```mermaid
flowchart TD
    A[User Loads Site] --> B[Welcome Screen]
    B --> C{Has Existing Characters?}
    C -->|Yes| D[Display Character Selection]
    C -->|No| E[Create New Character]
    E --> F[Enter Character Name]
    F --> G[Select Character Class]
    G --> H{Class Has Companion?}
    H -->|Yes| I[Create Companion]
    H -->|No| J[Skip Companion Creation]
    I --> K[Enter Companion Name]
    K --> L[Select Companion Type]
    L --> M[Save Companion]
    M --> N[Save Character]
    J --> N
    N --> O[Character Created]
    D --> P[Select Character]
    O --> Q[Load Session Information]
    P --> Q
    Q --> R{Action?}
    R -->|Review Notes| S[Display Journal Entries]
    R -->|Start New Session| T[Begin Exploration Phase]
    S --> U[End Flow]
    T --> V[End Flow]
```

## Flow 2: Exploration Phase and Card Drawing

```mermaid
flowchart TD
    A[Exploration Phase] --> B[Draw Cards]
    B --> C{Reached Class Limit?}
    C -->|No| D[Draw Next Card]
    C -->|Yes| E[All Cards Drawn]
    D --> F{Card Type?}
    F -->|Treasure| G[Display Treasure Description]
    F -->|City/Building| H[Display Location Description]
    F -->|Enemy| I[Display Enemy Description]
    F -->|Enemy Rook| J[Display Rook Description]
    G --> K[Add Item to Inventory]
    H --> L[Update Current Location]
    I --> M[Update Current Enemy]
    J --> N[Update Current Rook]
    K --> O[Draw Replacement Card]
    L --> O
    M --> O
    N --> O
    O --> C
    E --> P[End Exploration Phase]
    P --> Q[End Flow]
```

## Flow 3: Progress Saving

```mermaid
flowchart TD
    A[Card Drawn] --> B[Update Database]
    B --> C{Save Trigger?}
    C -->|Manual Save| D[User Selects Save Progress]
    C -->|Auto Save| E[5 Minute Timer Expires]
    D --> F[Save Current State]
    E --> F
    F --> G[Confirm Save]
    G --> H[End Flow]
```

## Flow 4: Session Completion

```mermaid
flowchart TD
    A[User Completes Session] --> B[Close Session]
    B --> C[Save Session to Database]
    C --> D[Return to Character Selection]
    D --> E[End Flow]
```

## Onboarding Flow

```mermaid
flowchart TD
    A[Start App] --> B{First Time User?}
    B -->|Yes| C[Show Welcome Screen]
    B -->|No| D[Go to Dashboard]
    C --> E[Show Tutorial]
    E --> F[Start First Session]
    F --> G[Draw Initial Cards]
    G --> H[Create Journal Entry]
    H --> I[Show Dashboard]
    I --> J[End Flow]
    D --> J
```

## Session Management Flow

```mermaid
flowchart TD
    A[Dashboard] --> B[Start New Session]
    B --> C[Enter Session Name]
    C --> D[Draw Location Card]
    D --> E[Record Location]
    E --> F[Draw Weather Card]
    F --> G[Record Weather]
    G --> H[Create Journal Entry]
    H --> I[Draw Encounter Card]
    I --> J[Resolve Encounter]
    J --> K[Create Journal Entry]
    K --> L{Continue Session?}
    L -->|Yes| M[Draw Next Card]
    M --> N[Resolve Card]
    N --> O[Create Journal Entry]
    O --> L
    L -->|No| P[End Session]
    P --> Q[Save Session]
    Q --> R[Return to Dashboard]
    R --> S[End Flow]
```

## Card Drawing and Resolution Flow

```mermaid
flowchart TD
    A[Active Session] --> B[Draw Card Button]
    B --> C[Reveal Card]
    C --> D[Show Card Details]
    D --> E{Card Type?}
    E -->|Location| F[Apply Location Rules]
    E -->|Encounter| G[Apply Encounter Rules]
    E -->|Ocean Encounter| H[Apply Ocean Rules]
    E -->|Item| I[Record Item]
    E -->|Event| J[Apply Event Rules]
    E -->|Weather| K[Apply Weather Rules]
    E -->|City Amenity| L[Apply Amenity Rules]
    F --> M[Update Current Location]
    G --> N[Resolve Based on Suit]
    H --> O[Resolve Based on Color]
    I --> P[Add to Inventory]
    J --> Q[Apply Event Effects]
    K --> R[Update Current Weather]
    L --> S[Apply Amenity Effects]
    M --> T[Prompt for Journal Entry]
    N --> T
    O --> T
    P --> T
    Q --> T
    R --> T
    S --> T
    T --> U[End Flow]
```

## Journal Entry Creation Flow

```mermaid
flowchart TD
    A[Session View] --> B[Create New Journal Entry]
    B --> C[Enter Entry Title]
    C --> D[Write Entry Content]
    D --> E[Add Tags]
    E --> F[Link to Card]
    F --> G{Save Entry?}
    G -->|Yes| H[Save to Database]
    G -->|No| I[Return to Edit]
    I --> G
    H --> J[Return to Session]
    J --> K[End Flow]
```

## Journal Browsing Flow

```mermaid
flowchart TD
    A[Dashboard] --> B[View Journal]
    B --> C[Load Journal Entries]
    C --> D[Sort by Date]
    D --> E[Display Entries]
    E --> F[Select Entry]
    F --> G[View Entry Details]
    G --> H[End Flow]
```

## Session History Flow

```mermaid
flowchart TD
    A[Dashboard] --> B[View Sessions]
    B --> C[Load Session History]
    C --> D[Sort by Date]
    D --> E[Display Sessions]
    E --> F[Select Session]
    F --> G[View Session Details]
    G --> H[View Session Cards]
    H --> I[View Session Journal Entries]
    I --> J[End Flow]
```

## Data Export/Import Flow

```mermaid
flowchart TD
    A[Settings] --> B[Data Management]
    B --> C{Export or Import?}
    C -->|Export| D[Select Data to Export]
    C -->|Import| E[Select Import File]
    D --> F[Generate Export File]
    F --> G[Download File]
    G --> H[End Export Flow]
    E --> I[Validate Import File]
    I --> J{Valid File?}
    J -->|Yes| K[Process Import]
    J -->|No| L[Show Error]
    L --> E
    K --> M[Show Import Results]
    M --> N[End Import Flow]
```

## Settings Flow

```mermaid
flowchart TD
    A[Dashboard] --> B[Settings]
    B --> C[View Current Settings]
    C --> D[Modify Settings]
    D --> E{Save Changes?}
    E -->|Yes| F[Save to Database]
    E -->|No| G[Discard Changes]
    G --> C
    F --> H[Apply Changes]
    H --> I[Return to Settings]
    I --> J[End Flow]
```
