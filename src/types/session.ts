import { Card } from "./card";

export enum SessionStatus {
	ACTIVE = "active",
	PAUSED = "paused",
	COMPLETED = "completed",
	ABANDONED = "abandoned",
}

export interface Session {
	id: string;
	title: string;
	content: string;
	created: Date;
	updated: Date;
	status: SessionStatus;
	cards: {
		drawn: Card[];
		discarded: Card[];
	};
	tags: string[];
	images: string[];
	isPrivate: boolean;
	currentLocation?: string;
	currentWeather?: string;
}
