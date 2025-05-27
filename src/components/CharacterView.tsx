import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import type { Character } from "@/types/character";
import { useCharacters } from "@/lib/store/CharacterContext";
import CharacterForm from "@/components/CharacterForm";
import CharacterList from "@/components/CharacterList";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";

interface CharacterViewProps {
	onSelectCharacter: (character: Character) => void;
}

export const CharacterView = ({
	onSelectCharacter,
}: CharacterViewProps): React.ReactElement => {
	const {
		characters,
		isLoading,
		error,
		createCharacter,
		updateCharacter,
		deleteCharacter,
	} = useCharacters();
	const [isCreating, setIsCreating] = useState(false);
	const [editingCharacter, setEditingCharacter] = useState<Character | null>(
		null,
	);
	const router = useRouter();
	const [characterForm, setCharacterForm] = useState<
		Omit<Character, "id" | "createdAt" | "updatedAt">
	>({
		name: "",
		class: "armed",
		level: 1,
	});

	if (isLoading) {
		return <LoadingState />;
	}

	if (error) {
		return (
			<ErrorState
				message={error.message}
				onRetry={() => window.location.reload()}
			/>
		);
	}

	const handleCreateCharacter = async () => {
		try {
			await createCharacter(characterForm);
			setCharacterForm({ name: "", class: "armed", level: 1 });
			setIsCreating(false);
		} catch (error) {
			console.error("Failed to create character:", error);
			throw error;
		}
	};

	const handleEditCharacter = (character: Character) => {
		setEditingCharacter(character);
		setCharacterForm({
			name: character.name,
			class: character.class,
			level: character.level,
		});
	};

	const handleUpdateCharacter = async () => {
		if (!editingCharacter) return;

		try {
			await updateCharacter({
				...editingCharacter,
				...characterForm,
				updatedAt: new Date(),
			});
			setEditingCharacter(null);
			setCharacterForm({ name: "", class: "armed", level: 1 });
		} catch (error) {
			console.error("Failed to update character:", error);
			throw error;
		}
	};

	const handleDeleteCharacter = async (character: Character) => {
		try {
			await deleteCharacter(character.id);
		} catch (error) {
			console.error("Failed to delete character:", error);
			throw error;
		}
	};

	const handleSelectCharacter = (character: Character) => {
		onSelectCharacter(character);
		router.navigate({
			to: "/characters/$characterId",
			params: { characterId: character.id },
		});
	};

	const handleCancel = () => {
		setEditingCharacter(null);
		setIsCreating(false);
		setCharacterForm({ name: "", class: "armed", level: 1 });
	};

	return (
		<ErrorBoundary>
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-bold flex items-center gap-2">
						<User className="h-5 w-5" /> Characters
					</h2>
					{!isCreating && !editingCharacter && (
						<Button onClick={() => setIsCreating(true)}>
							<Plus className="mr-2 h-4 w-4" /> New Character
						</Button>
					)}
				</div>

				{isCreating || editingCharacter ? (
					<CharacterForm
						characterForm={characterForm}
						onSetCharacterForm={setCharacterForm}
						onCreateCharacter={
							editingCharacter ? handleUpdateCharacter : handleCreateCharacter
						}
						onCancel={handleCancel}
						isEditing={!!editingCharacter}
					/>
				) : (
					<CharacterList
						characters={characters}
						onSelectCharacter={handleSelectCharacter}
						onEditCharacter={handleEditCharacter}
						onDeleteCharacter={handleDeleteCharacter}
						isLoading={isLoading}
						error={error}
					/>
				)}
			</div>
		</ErrorBoundary>
	);
};
