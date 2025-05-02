# Technical Specifications

## Data Models

### Character

```typescript
interface Character {
	id: string;
	name: string;
	class: CharacterClass;
	companion?: Companion;
	createdAt: Date;
	updatedAt: Date;
}
```

### Companion

```typescript
interface Companion {
	id: string;
	name: string;
	type: CompanionType;
	createdAt: Date;
	updatedAt: Date;
}
```

### Journal Entry

```typescript
interface JournalEntry {
	id: string;
	characterId: string;
	content: string;
	cardEvent?: CardEvent;
	createdAt: Date;
	updatedAt: Date;
}
```

### Card Event

```typescript
interface CardEvent {
	id: string;
	suit: CardSuit;
	value: CardValue;
	drawnAt: Date;
}
```

## State Management

### Global State

```typescript
interface AppState {
	characters: Character[];
	currentCharacterId: string | null;
	journalEntries: JournalEntry[];
	cardEvents: CardEvent[];
	drawPile: CardEvent[];
	discardPile: CardEvent[];
}
```

### State Actions

```typescript
type AppAction =
	| { type: "SET_CHARACTERS"; payload: Character[] }
	| { type: "SET_CURRENT_CHARACTER"; payload: string | null }
	| { type: "ADD_JOURNAL_ENTRY"; payload: JournalEntry }
	| { type: "ADD_CARD_EVENT"; payload: CardEvent }
	| { type: "UPDATE_DRAW_PILE"; payload: CardEvent[] }
	| { type: "UPDATE_DISCARD_PILE"; payload: CardEvent[] };
```

## Storage Strategy

### IndexedDB Structure

- **Characters Store**
  - Primary key: id
  - Indexes: name, class, createdAt
- **Companions Store**
  - Primary key: id
    | Indexes: characterId, type, createdAt
- **Journal Entries Store**
  - Primary key: id
  - Indexes: characterId, createdAt, cardEventId
- **Card Events Store**
  - Primary key: id
  - Indexes: suit, value, drawnAt
- **Sessions Store**
  - Primary key: id
  - Indexes: characterId, createdAt, updatedAt

### Storage Operations

- Auto-save on state changes
- Manual save option
- Load previous state
- Clear session data
- Export/Import functionality (future)

## Type Definitions

### Character Class

```typescript
type CharacterClass = "knight" | "rogue" | "wizard" | "ranger";
```

### Companion Type

```typescript
type CompanionType = "animal" | "construct" | "spirit";
```

### Card Suit

```typescript
type CardSuit = "hearts" | "diamonds" | "clubs" | "spades";
```

### Card Value

```typescript
type CardValue =
	| "ace"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| "10"
	| "jack"
	| "queen"
	| "king";
```
