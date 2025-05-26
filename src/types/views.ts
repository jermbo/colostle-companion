export interface Campaign {
	id: string;
	characterId: string;
	title: string;
	description: string;
}

export interface Session {
	id: string;
	campaignId: string;
	title: string;
	explorationLog: string;
	combatLog: string;
	drawnCards: { type: "exploration" | "combat"; text: string }[];
}
