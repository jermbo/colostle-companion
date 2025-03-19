export interface Item {
	id: CardId;
	name: string;
	description: string;
}

export interface Event {
	id: CardId;
	name: string;
	description: string;
}

// More specific condition types
export interface BlackSuitConditions {
	spades: string;
	clubs: string;
}

export interface RedSuitConditions {
	hearts: string;
	diamonds: string;
}

export interface ColorConditions {
	black: string;
	red: string;
}

export interface Location {
	id: CardId;
	name: string;
	description: string;
	conditions: BlackSuitConditions;
}

export interface Encounter {
	id: CardId;
	name: string;
	description: string;
	conditions: RedSuitConditions;
}

export interface OceanEncounter {
	id: CardId;
	name: string;
	description: string;
	conditions: ColorConditions;
}

export interface Weather {
	id: CardId;
	name: string;
	description: string;
}

export interface CityAmenity {
	id: CardId;
	name: string;
	description: string;
}

// Common type for card IDs
export type CardId =
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

// Card suit types
export type CardSuit = "hearts" | "diamonds" | "clubs" | "spades";
export type BlackSuit = "clubs" | "spades";
export type RedSuit = "hearts" | "diamonds";
export type CardColor = "red" | "black";

// Card representation
export interface Card {
	id: CardId;
	suit: CardSuit;
	color: CardColor;
}

// Helper types for card creation
export interface CardWithBlackSuitConditions extends Card {
	suit: BlackSuit;
	color: "black";
	conditions: BlackSuitConditions;
}

export interface CardWithRedSuitConditions extends Card {
	suit: RedSuit;
	color: "red";
	conditions: RedSuitConditions;
}
