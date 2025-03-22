import React, { createContext, useContext, ReactNode, useState } from "react";
import { Card, CardId, CardSuit } from "../types/gameData";

// Character definition
interface Character {
	name: string;
	traits: string[];
	inventory: string[];
}

// Story phase types
export type PhaseType = "exploration" | "combat" | "event";

// Story phase interface
export interface StoryPhase {
	id: string;
	type: PhaseType;
	title: string;
	description: string;
	timestamp: Date;
	cards: Card[];
	notes: string;
}

// Game state interface
interface GameState {
	character: Character | null;
	storyPhases: StoryPhase[];
	currentPhaseIndex: number;
}

// Context actions
interface GameContextProps {
	gameState: GameState;
	createCharacter: (character: Character) => void;
	startNewPhase: (type: PhaseType, title: string) => void;
	addCardToCurrentPhase: (card: Card) => void;
	updatePhaseDescription: (description: string) => void;
	updatePhaseNotes: (notes: string) => void;
	goToPhase: (index: number) => void;
	drawCard: (suit?: CardSuit) => Card;
}

const defaultGameState: GameState = {
	character: null,
	storyPhases: [],
	currentPhaseIndex: -1,
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [gameState, setGameState] = useState<GameState>(defaultGameState);

	// Create a character
	const createCharacter = (character: Character) => {
		setGameState((prev) => ({
			...prev,
			character,
		}));
	};

	// Start a new story phase
	const startNewPhase = (type: PhaseType, title: string) => {
		const newPhase: StoryPhase = {
			id: Date.now().toString(),
			type,
			title,
			description: "",
			timestamp: new Date(),
			cards: [],
			notes: "",
		};

		setGameState((prev) => ({
			...prev,
			storyPhases: [...prev.storyPhases, newPhase],
			currentPhaseIndex: prev.storyPhases.length,
		}));
	};

	// Add a card to the current phase
	const addCardToCurrentPhase = (card: Card) => {
		if (gameState.currentPhaseIndex < 0) return;

		setGameState((prev) => {
			const updatedPhases = [...prev.storyPhases];
			updatedPhases[prev.currentPhaseIndex] = {
				...updatedPhases[prev.currentPhaseIndex],
				cards: [...updatedPhases[prev.currentPhaseIndex].cards, card],
			};
			return { ...prev, storyPhases: updatedPhases };
		});
	};

	// Update phase description
	const updatePhaseDescription = (description: string) => {
		if (gameState.currentPhaseIndex < 0) return;

		setGameState((prev) => {
			const updatedPhases = [...prev.storyPhases];
			updatedPhases[prev.currentPhaseIndex] = {
				...updatedPhases[prev.currentPhaseIndex],
				description,
			};
			return { ...prev, storyPhases: updatedPhases };
		});
	};

	// Update phase notes
	const updatePhaseNotes = (notes: string) => {
		if (gameState.currentPhaseIndex < 0) return;

		setGameState((prev) => {
			const updatedPhases = [...prev.storyPhases];
			updatedPhases[prev.currentPhaseIndex] = {
				...updatedPhases[prev.currentPhaseIndex],
				notes,
			};
			return { ...prev, storyPhases: updatedPhases };
		});
	};

	// Navigate to a specific phase
	const goToPhase = (index: number) => {
		if (index >= 0 && index < gameState.storyPhases.length) {
			setGameState((prev) => ({ ...prev, currentPhaseIndex: index }));
		}
	};

	// Draw a random card
	const drawCard = (suit?: CardSuit): Card => {
		const cardIds: CardId[] = [
			"ace",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"jack",
			"queen",
			"king",
		];
		const suits: CardSuit[] = suit
			? [suit]
			: ["hearts", "diamonds", "clubs", "spades"];

		const randomId = cardIds[Math.floor(Math.random() * cardIds.length)];
		const randomSuit = suits[Math.floor(Math.random() * suits.length)];
		const color =
			randomSuit === "hearts" || randomSuit === "diamonds" ? "red" : "black";

		return { id: randomId, suit: randomSuit, color };
	};

	return (
		<GameContext.Provider
			value={{
				gameState,
				createCharacter,
				startNewPhase,
				addCardToCurrentPhase,
				updatePhaseDescription,
				updatePhaseNotes,
				goToPhase,
				drawCard,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

// Custom hook to use the game context
export const useGame = () => {
	const context = useContext(GameContext);
	if (context === undefined) {
		throw new Error("useGame must be used within a GameProvider");
	}
	return context;
};
