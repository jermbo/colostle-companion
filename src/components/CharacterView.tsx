import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import type { Character } from "@/types/character";
import { useCharacters } from "@/lib/store/CharacterContext";
import CharacterForm from "@/components/CharacterForm";
import CharacterList from "@/components/CharacterList";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";

interface CharacterViewProps {
	onSelectCharacter: (character: Character) => void;
}

export const CharacterView = ({
	onSelectCharacter,
}: CharacterViewProps): React.ReactElement => {
	const { characters, isLoading, error, createCharacter } = useCharacters();
	const [isCreating, setIsCreating] = useState(false);
	const router = useRouter();
	const [characterForm, setCharacterForm] = useState<
		Omit<Character, "id" | "createdAt" | "updatedAt">
	>({
		name: "",
		class: "armed",
		level: 1,
	});

	if (isLoading) {
		return (
			<div className="text-center text-muted-foreground">
				Loading characters...
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center text-red-500">
				Error loading characters: {error.message}
			</div>
		);
	}

	const handleCreateCharacter = async () => {
		await createCharacter(characterForm);
		setCharacterForm({ name: "", class: "armed", level: 1 });
		setIsCreating(false);
	};

	const handleSelectCharacter = (character: Character) => {
		onSelectCharacter(character);
		router.navigate({
			to: "/characters/$characterId",
			params: { characterId: character.id },
		});
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold flex items-center gap-2">
					<User className="h-5 w-5" /> Characters
				</h2>
				<Button onClick={() => setIsCreating(true)}>
					<Plus className="mr-2 h-4 w-4" /> New Character
				</Button>
			</div>

			{isCreating ? (
				<CharacterForm
					characterForm={characterForm}
					onSetCharacterForm={setCharacterForm}
					onCreateCharacter={handleCreateCharacter}
					onCancel={() => setIsCreating(false)}
				/>
			) : (
				<CharacterList
					characters={characters}
					onSelectCharacter={handleSelectCharacter}
				/>
			)}
		</div>
	);
};
