import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import type { Character } from "@/types/character";
import { CHARACTER_CLASSES } from "@/types/character";
import { Link } from "@tanstack/react-router";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { NotFoundState } from "@/components/NotFoundState";

interface CharacterListProps {
	characters: Character[];
	onEditCharacter: (character: Character) => void;
	onDeleteCharacter: (character: Character) => Promise<void>;
	isLoading?: boolean;
	error?: Error | null;
}

const CharacterList = ({
	characters,
	onEditCharacter,
	onDeleteCharacter,
	isLoading = false,
	error = null,
}: CharacterListProps): React.ReactElement => {
	const [characterToDelete, setCharacterToDelete] = useState<Character | null>(
		null,
	);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		if (!characterToDelete) return;

		try {
			setIsDeleting(true);
			await onDeleteCharacter(characterToDelete);
		} catch (error) {
			console.error("Failed to delete character:", error);
			throw error;
		} finally {
			setIsDeleting(false);
			setCharacterToDelete(null);
		}
	};

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

	if (characters.length === 0) {
		return <NotFoundState message="No characters have been created yet" />;
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{characters.map((character) => (
					<Card
						key={character.id}
						className="hover:bg-gray-50 transition-colors"
					>
						<Link
							to="/character/$characterId"
							params={{ characterId: character.id }}
							className="block"
							title={character.name}
						>
							<CardHeader>
								<CardTitle>{character.name}</CardTitle>
								<CardDescription>
									{CHARACTER_CLASSES[character.class].displayName} - Level{" "}
									{character.level}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground line-clamp-3">
									{CHARACTER_CLASSES[character.class].description}
								</p>
							</CardContent>
						</Link>
						<CardFooter className="flex justify-end gap-2 border-t">
							<Button
								variant="outline"
								size="sm"
								onClick={(e) => {
									e.preventDefault();
									onEditCharacter(character);
								}}
								title={`Edit ${character.name}`}
							>
								<Pencil className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={(e) => {
									e.preventDefault();
									setCharacterToDelete(character);
								}}
								title={`Delete ${character.name}`}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			<AlertDialog
				open={!!characterToDelete}
				onOpenChange={() => setCharacterToDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Delete {characterToDelete?.name}
						</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete {characterToDelete?.name}? This
							action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isDeleting}
							className="bg-red-500 hover:bg-red-600"
						>
							{isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
							{!isDeleting && "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default CharacterList;
