# Colostle Companion Database Schema

This document outlines the database schema for the Colostle Companion app, using IndexedDB for local storage.

## Core Data Types

### Card

```typescript
interface Card {
	id: CardId; // Card value (ace, 2-10, jack, queen, king)
	suit: CardSuit; // Card suit (hearts, diamonds, clubs, spades)
	color: CardColor; // Card color (red, black)
}

type CardId =
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
type CardSuit = "hearts" | "diamonds" | "clubs" | "spades";
type CardColor = "red" | "black";
type BlackSuit = "clubs" | "spades";
type RedSuit = "hearts" | "diamonds";
```

### Item

```typescript
interface Item {
	id: CardId; // Card ID that represents this item
	name: string; // Item name
	description: string; // Item description
}
```

### Event

```typescript
interface Event {
	id: CardId; // Card ID that represents this event
	name: string; // Event name
	description: string; // Event description
}
```

### Location

```typescript
interface Location {
	id: CardId; // Card ID that represents this location
	name: string; // Location name
	description: string; // Location description
	conditions: BlackSuitConditions; // Conditions based on black suits
}

interface BlackSuitConditions {
	spades: string; // Condition for spades
	clubs: string; // Condition for clubs
}
```

### Encounter

```typescript
interface Encounter {
	id: CardId; // Card ID that represents this encounter
	name: string; // Encounter name
	description: string; // Encounter description
	conditions: RedSuitConditions; // Conditions based on red suits
}

interface RedSuitConditions {
	hearts: string; // Condition for hearts
	diamonds: string; // Condition for diamonds
}
```

### OceanEncounter

```typescript
interface OceanEncounter {
	id: CardId; // Card ID that represents this ocean encounter
	name: string; // Ocean encounter name
	description: string; // Ocean encounter description
	conditions: ColorConditions; // Conditions based on card color
}

interface ColorConditions {
	black: string; // Condition for black cards
	red: string; // Condition for red cards
}
```

### Weather

```typescript
interface Weather {
	id: CardId; // Card ID that represents this weather
	name: string; // Weather name
	description: string; // Weather description
}
```

### CityAmenity

```typescript
interface CityAmenity {
	id: CardId; // Card ID that represents this city amenity
	name: string; // City amenity name
	description: string; // City amenity description
}
```

### Journal Entry

```typescript
interface JournalEntry {
	id: string; // Unique identifier
	title: string; // Entry title
	content: string; // Entry content (rich text)
	created: Date; // Creation timestamp
	updated: Date; // Last update timestamp
	cardId?: CardId; // Associated card ID (if applicable)
	cardSuit?: CardSuit; // Associated card suit (if applicable)
	tags: string[]; // Categorization tags
	images: string[]; // URLs of attached images
	isPrivate: boolean; // Whether entry is private
}
```

### Session

```typescript
interface Session {
	id: string; // Unique identifier
	name: string; // Session name
	created: Date; // Creation timestamp
	updated: Date; // Last update timestamp
	status: SessionStatus; // Current status
	cards: {
		drawn: Card[]; // Cards drawn during the session
		discarded: Card[]; // Cards discarded during the session
	};
	journalEntries: string[]; // IDs of journal entries
	currentLocation?: CardId; // Current location card ID
	currentWeather?: CardId; // Current weather card ID
}

enum SessionStatus {
	ACTIVE = "active",
	PAUSED = "paused",
	COMPLETED = "completed",
	ABANDONED = "abandoned",
}
```

### User Settings

```typescript
interface UserSettings {
	id: string; // Unique identifier (user ID)
	theme: "light" | "dark"; // UI theme preference
	fontSize: number; // Font size preference
	notifications: boolean; // Whether notifications are enabled
	autoSave: boolean; // Whether auto-save is enabled
	cloudSync: boolean; // Whether cloud sync is enabled
	lastSync: Date; // Last cloud sync timestamp
}
```

## Database Structure

The database is organized into the following object stores:

1. `cards` - Stores card data (items, events, locations, encounters, etc.)
2. `journalEntries` - Stores journal entry data
3. `sessions` - Stores session data
4. `userSettings` - Stores user settings and preferences

## Indexes

The following indexes are created for efficient querying:

### Cards

- `id` - For finding cards by ID
- `suit` - For filtering by suit
- `color` - For filtering by color

### Journal Entries

- `title` - For searching entries by title
- `created` - For sorting by creation date
- `updated` - For sorting by last update
- `tags` - For filtering by tags
- `cardId` - For finding entries related to a specific card

### Sessions

- `name` - For searching sessions by name
- `created` - For sorting by creation date
- `updated` - For sorting by last update
- `status` - For filtering by status

## Data Relationships

The following relationships exist between data types:

1. **Card → Journal Entry**: One-to-many (a card can be referenced in many journal entries)
2. **Session → Cards**: One-to-many (a session has many drawn and discarded cards)
3. **Session → Journal Entries**: One-to-many (a session has many journal entries)
4. **Session → Location**: One-to-one (a session has one current location)
5. **Session → Weather**: One-to-one (a session has one current weather)

## Data Migration

When the schema changes, a migration strategy will be implemented to update existing data to the new schema. This will be handled through versioned migrations in the IndexedDB setup.
