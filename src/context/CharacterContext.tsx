import {
	createContext,
	useContext,
	useState,
	ReactNode,
	ReactElement,
} from "react";
import {
	Character,
	CharacterFormData,
	Companion,
	CompanionFormData,
} from "../types/character";

interface CharacterContextType {
	characters: Character[];
	addCharacter: (characterData: CharacterFormData) => void;
	updateCharacter: (id: string, characterData: CharacterFormData) => void;
	deleteCharacter: (id: string) => void;
	addCompanion: (characterId: string, companionData: CompanionFormData) => void;
	updateCompanion: (
		id: string,
		companionData: Partial<CompanionFormData>
	) => void;
	deleteCompanion: (id: string) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
	undefined
);

export const useCharacterContext = (): CharacterContextType => {
	const context = useContext(CharacterContext);
	if (!context) {
		throw new Error(
			"useCharacterContext must be used within a CharacterProvider"
		);
	}
	return context;
};

interface CharacterProviderProps {
	children: ReactNode;
}

export const CharacterProvider = ({
	children,
}: CharacterProviderProps): ReactElement => {
	const [characters, setCharacters] = useState<Character[]>([]);

	const addCharacter = (characterData: CharacterFormData): void => {
		const newCharacter: Character = {
			id: crypto.randomUUID(),
			name: characterData.characterName,
			class: characterData.class,
			level: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
	};

	const updateCharacter = (
		id: string,
		characterData: CharacterFormData
	): void => {
		setCharacters((prevCharacters) =>
			prevCharacters.map((character) =>
				character.id === id
					? {
							...character,
							name: characterData.characterName,
							class: characterData.class,
							updatedAt: new Date(),
					  }
					: character
			)
		);
	};

	const deleteCharacter = (id: string): void => {
		setCharacters((prevCharacters) =>
			prevCharacters.filter((character) => character.id !== id)
		);
	};

	const addCompanion = (
		characterId: string,
		companionData: CompanionFormData
	): void => {
		const newCompanion: Companion = {
			id: crypto.randomUUID(),
			name: companionData.name,
			type: companionData.type,
			characterId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		setCharacters((prevCharacters) =>
			prevCharacters.map((character) =>
				character.id === characterId
					? {
							...character,
							companion: newCompanion,
							updatedAt: new Date(),
					  }
					: character
			)
		);
	};

	const updateCompanion = (
		id: string,
		companionData: Partial<CompanionFormData>
	): void => {
		setCharacters((prevCharacters) =>
			prevCharacters.map((character) =>
				character.companion && character.companion.id === id
					? {
							...character,
							companion: {
								...character.companion,
								...companionData,
								updatedAt: new Date(),
							},
							updatedAt: new Date(),
					  }
					: character
			)
		);
	};

	const deleteCompanion = (id: string): void => {
		setCharacters((prevCharacters) =>
			prevCharacters.map((character) =>
				character.companion && character.companion.id === id
					? {
							...character,
							companion: undefined,
							updatedAt: new Date(),
					  }
					: character
			)
		);
	};

	return (
		<CharacterContext.Provider
			value={{
				characters,
				addCharacter,
				updateCharacter,
				deleteCharacter,
				addCompanion,
				updateCompanion,
				deleteCompanion,
			}}
		>
			{children}
		</CharacterContext.Provider>
	);
};
