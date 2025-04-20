import { CardId, CardSuit } from "./card";

export interface JournalEntry {
	id: string;
	title: string;
	content: string;
	created: Date;
	updated: Date;
	cardId?: CardId;
	cardSuit?: CardSuit;
	tags: string[];
	images: string[];
	isPrivate: boolean;
}
