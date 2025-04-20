import { createContext, useContext, useEffect, useState } from "react";
import { Character, Companion, CharacterClass, generateSlug } from "@/types/character";
import { Session, SessionStatus } from "@/types/session";
import { getAllCharacters, addCharacter, addCompanion } from "@/lib/db";

interface CharacterContextType {
	// Character Management
	characters: Character[];
	currentCharacter: Character | null;
	isLoading: boolean;
	error: Error | null;

	// Character Actions
	createCharacter: (name: string, characterClass: CharacterClass) => Promise<Character>;
	createCompanion: (characterId: string, name: string, type: string) => Promise<Companion>;
	selectCharacter: (slug: string) => void;

	// Session Management
	currentSession: Session | null;
	startSession: (characterId: string) => Promise<Session>;
	endSession: () => Promise<void>;

	// Data Refresh
	refreshCharacters: () => Promise<void>;
}

const CharacterContext = createContext<CharacterContextType | null>(null);

export const CharacterProvider = ({ children }: { children: React.ReactNode }) => {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
	const [currentSession, setCurrentSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const refreshCharacters = async () => {
		try {
			setIsLoading(true);
			const allCharacters = await getAllCharacters();
			setCharacters(allCharacters);
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Failed to load characters"));
		} finally {
			setIsLoading(false);
		}
	};

	const createCharacter = async (name: string, characterClass: CharacterClass): Promise<Character> => {
		try {
			const slug = generateSlug(name);
			const character = await addCharacter({
				name,
				slug,
				class: characterClass,
				level: 1,
			});
			await refreshCharacters();
			return character;
		} catch (err) {
			throw err instanceof Error ? err : new Error("Failed to create character");
		}
	};

	const createCompanion = async (characterId: string, name: string, type: string): Promise<Companion> => {
		try {
			const companion = await addCompanion({
				name,
				type,
				characterId,
			});
			await refreshCharacters();
			return companion;
		} catch (err) {
			throw err instanceof Error ? err : new Error("Failed to create companion");
		}
	};

	const selectCharacter = (slug: string) => {
		const character = characters.find((c) => c.slug === slug);
		if (character) {
			setCurrentCharacter(character);
		}
	};

	const startSession = async (characterId: string): Promise<Session> => {
		// TODO: Implement session creation
		throw new Error("Not implemented");
	};

	const endSession = async (): Promise<void> => {
		// TODO: Implement session ending
		throw new Error("Not implemented");
	};

	useEffect(() => {
		refreshCharacters();
	}, []);

	return (
		<CharacterContext.Provider
			value={{
				characters,
				currentCharacter,
				currentSession,
				isLoading,
				error,
				createCharacter,
				createCompanion,
				selectCharacter,
				startSession,
				endSession,
				refreshCharacters,
			}}
		>
			{children}
		</CharacterContext.Provider>
	);
};

export const useCharacter = () => {
	const context = useContext(CharacterContext);
	if (!context) {
		throw new Error("useCharacter must be used within a CharacterProvider");
	}
	return context;
};
