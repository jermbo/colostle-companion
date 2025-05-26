import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Character, CharacterClass } from "@/types/character";
import { characterStorage } from "@/lib/storage/characterStorage";

interface CharacterContextType {
	characters: Character[];
	isLoading: boolean;
	error: Error | null;
	createCharacter: (
		character: Omit<Character, "id" | "createdAt" | "updatedAt">,
	) => Promise<void>;
	updateCharacter: (character: Character) => Promise<void>;
	deleteCharacter: (id: string) => Promise<void>;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
	undefined,
);

export const useCharacters = () => {
	const context = useContext(CharacterContext);
	if (!context) {
		throw new Error("useCharacters must be used within a CharacterProvider");
	}
	return context;
};

interface CharacterProviderProps {
	children: ReactNode;
}

export const CharacterProvider = ({ children }: CharacterProviderProps) => {
	const queryClient = useQueryClient();

	const {
		data: characters = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["characters"],
		queryFn: async () => {
			const storedCharacters = await characterStorage.getAll();
			return storedCharacters.map((char) => ({
				...char,
				class: char.class as CharacterClass,
				createdAt: new Date(char.createdAt),
				updatedAt: new Date(char.updatedAt),
			}));
		},
	});

	const createMutation = useMutation({
		mutationFn: async (
			newCharacter: Omit<Character, "id" | "createdAt" | "updatedAt">,
		) => {
			const character: Character = {
				...newCharacter,
				id: crypto.randomUUID(),
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			await characterStorage.set(character);
			return character;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["characters"] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: async (character: Character) => {
			const updatedCharacter = {
				...character,
				updatedAt: new Date(),
			};
			await characterStorage.set(updatedCharacter);
			return updatedCharacter;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["characters"] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			await characterStorage.delete(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["characters"] });
		},
	});

	const value: CharacterContextType = {
		characters,
		isLoading,
		error: error as Error | null,
		createCharacter: async (character) => {
			await createMutation.mutateAsync(character);
		},
		updateCharacter: async (character) => {
			await updateMutation.mutateAsync(character);
		},
		deleteCharacter: async (id) => {
			await deleteMutation.mutateAsync(id);
		},
	};

	return (
		<CharacterContext.Provider value={value}>
			{children}
		</CharacterContext.Provider>
	);
};
