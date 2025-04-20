export type CardId = "ace" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "jack" | "queen" | "king";

export type CardSuit = "hearts" | "diamonds" | "clubs" | "spades";
export type CardColor = "red" | "black";
export type BlackSuit = "clubs" | "spades";
export type RedSuit = "hearts" | "diamonds";

export interface Card {
	id: CardId;
	suit: CardSuit;
	color: CardColor;
}
