export type CharacterClass = "armed" | "followed" | "helmed" | "mounted";

export interface CharacterClassInfo {
	name: string;
	displayName: string;
	explorationScore: number;
	combatScore: number;
	description: string;
	requiresCompanion: boolean;
}

export const CHARACTER_CLASSES: Record<CharacterClass, CharacterClassInfo> = {
	armed: {
		name: "armed",
		displayName: "The Armed",
		explorationScore: 3,
		combatScore: 4,
		description:
			"The Armed quite literally have an arm from a Rook connected to them via a complex ritual, attuning its intention to them. The Armed are proficient in melee combat and are highly capable adventurers. They are warriors. An Armed adventurer could have any type of arm; a blade, a hand, a cannon, a strange machine the user doesn't yet understand. If the arm has a hand or the ability to hold items, it can be used to carry an additional weapon if you have one.",
		requiresCompanion: false,
	},
	followed: {
		name: "followed",
		displayName: "The Followed",
		explorationScore: 5,
		combatScore: 3,
		description:
			"The Followed have a small Rook companion, like a pet or familiar that follows them and their commands. These 'Rooklings' are found in the cores of larger Rooks - as yet it is not known why. They display a base level of sentience akin to that of a dog or a cat and can form deep and personal bonds with their human companions. The Followed are excellent rangers, pathfinders and navigators.",
		requiresCompanion: true,
	},
	helmed: {
		name: "helmed",
		displayName: "The Helmed",
		explorationScore: 2,
		combatScore: 5,
		description:
			"The Helmed harvest a piece of strange machinery from the very core of a Rook and, using rituals and a real working understanding of the crystal patterns and stones, they are able to create a Helm that can be worn and operated, granting them the magical abilities of the Rook it was harvested from.",
		requiresCompanion: false,
	},
	mounted: {
		name: "mounted",
		displayName: "The Mounted",
		explorationScore: 5,
		combatScore: 2,
		description:
			"The Mounted ride an adapted mechanism taken from Rook parts, as a vehicle or mount to allow them easier traversal across the land and sea of the Colostle. Typically this involves taking a part of the Rook responsible for its locomotion and disconnecting it from the main body, and turning it into something that can be operated with crude controls, mechanisms and levers. The Mounted's mounts can vary from horse-like creatures to boats and even bikes.",
		requiresCompanion: false,
	},
};

export interface Character {
	id: string;
	slug: string;
	name: string;
	class: CharacterClass;
	level: number;
	companion?: Companion;
	createdAt: Date;
	updatedAt: Date;
}

export interface Companion {
	id: string;
	name: string;
	type: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CharacterFormData {
	characterName: string;
	class: CharacterClass;
}

export interface CompanionFormData {
	name: string;
	type: string;
}

export const generateSlug = (name: string): string => {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
};
