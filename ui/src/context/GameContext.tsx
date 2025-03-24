import React, {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from "react";
import { Card, CardId, CardSuit } from "../types/gameData";
import * as IndexedDB from "../services/indexedDB";

// Character definition
export interface Character {
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
export interface GameState {
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
	// New actions for multiple characters
	saveCurrentGame: () => Promise<string>;
	loadCharacter: (id: string) => Promise<void>;
	getAllCharacters: () => Promise<any[]>;
	deleteCharacter: (id: string) => Promise<void>;
	startNewGame: () => void;
	currentCharacterId: string | null;
	isDatabaseInitialized: boolean;
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
	const [currentCharacterId, setCurrentCharacterId] = useState<string | null>(
		null
	);
	const [dbInitialized, setDbInitialized] = useState(false);

	// Initialize the database
	useEffect(() => {
		const initDb = async () => {
			try {
				await IndexedDB.initDatabase();
				setDbInitialized(true);
			} catch (error) {
				console.error("Failed to initialize database:", error);
			}
		};

		initDb();
	}, []);

	// Create a character
	const createCharacter = (character: Character): Promise<void> => {
		return new Promise((resolve) => {
			setGameState((prev) => ({
				...prev,
				character,
			}));

			// Using requestAnimationFrame to ensure state is updated
			requestAnimationFrame(() => {
				resolve();
			});
		});
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

	// Save current game state to IndexedDB
	const saveCurrentGame = async (): Promise<string> => {
		if (!dbInitialized) {
			throw new Error("Database not initialized");
		}

		// Log game state for debugging
		IndexedDB.logGameState("Before saving game state", gameState);

		if (!gameState.character) {
			console.error("No character to save - current game state:", gameState);
			throw new Error("No character to save");
		}

		try {
			// If we have a current character ID, update that record
			if (currentCharacterId) {
				await IndexedDB.updateCharacterData(currentCharacterId, gameState);
				console.log("Updated character with ID:", currentCharacterId);
				return currentCharacterId;
			} else {
				// Otherwise create a new record
				const newId = await IndexedDB.saveCharacterData(gameState);
				setCurrentCharacterId(newId);
				console.log("Created new character with ID:", newId);
				return newId;
			}
		} catch (error) {
			console.error("Error saving game:", error);
			throw error;
		}
	};

	// Load a character by ID
	const loadCharacter = async (id: string): Promise<void> => {
		if (!dbInitialized) {
			throw new Error("Database not initialized");
		}

		try {
			const characterData = await IndexedDB.getCharacterById(id);
			setGameState({
				character: characterData.character,
				storyPhases: characterData.storyPhases,
				currentPhaseIndex: characterData.currentPhaseIndex,
			});
			setCurrentCharacterId(id);
		} catch (error) {
			console.error("Error loading character:", error);
			throw error;
		}
	};

	// Get all characters
	const getAllCharacters = async () => {
		if (!dbInitialized) {
			throw new Error("Database not initialized");
		}

		try {
			const characters = await IndexedDB.getAllCharacters();
			return characters;
		} catch (error) {
			console.error("Error getting all characters:", error);
			throw error;
		}
	};

	// Delete a character
	const deleteCharacter = async (id: string): Promise<void> => {
		if (!dbInitialized) {
			throw new Error("Database not initialized");
		}

		try {
			await IndexedDB.deleteCharacterById(id);

			// If we're deleting the current character, reset the game state
			if (currentCharacterId === id) {
				setGameState(defaultGameState);
				setCurrentCharacterId(null);
			}
		} catch (error) {
			console.error("Error deleting character:", error);
			throw error;
		}
	};

	// Start a new game (reset game state)
	const startNewGame = () => {
		setGameState(defaultGameState);
		setCurrentCharacterId(null);
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
				saveCurrentGame,
				loadCharacter,
				getAllCharacters,
				deleteCharacter,
				startNewGame,
				currentCharacterId,
				isDatabaseInitialized: dbInitialized,
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
