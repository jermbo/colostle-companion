import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import type { Character } from "@/types/character";
import CharacterForm from "@/components/CharacterForm";
import CharacterList from "@/components/CharacterList";

interface CharacterViewProps {
	characters: Character[];
	characterForm: Omit<Character, "id" | "createdAt" | "updatedAt">;
	isCreating: boolean;
	onSetCharacterForm: React.Dispatch<
		React.SetStateAction<Omit<Character, "id" | "createdAt" | "updatedAt">>
	>;
	onCreateCharacter: () => void;
	onSelectCharacter: (character: Character) => void;
	onSetIsCreating: (isCreating: boolean) => void;
}

export const CharacterView = ({
	characters,
	characterForm,
	isCreating,
	onSetCharacterForm,
	onCreateCharacter,
	onSelectCharacter,
	onSetIsCreating,
}: CharacterViewProps): React.ReactElement => {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold flex items-center gap-2">
					<User className="h-5 w-5" /> Characters
				</h2>
				<Button onClick={() => onSetIsCreating(true)}>
					<Plus className="mr-2 h-4 w-4" /> New Character
				</Button>
			</div>

			{isCreating ? (
				<CharacterForm
					characterForm={characterForm}
					onSetCharacterForm={onSetCharacterForm}
					onCreateCharacter={onCreateCharacter}
					onCancel={() => onSetIsCreating(false)}
				/>
			) : (
				<CharacterList
					characters={characters}
					onSelectCharacter={onSelectCharacter}
				/>
			)}
		</div>
	);
};
