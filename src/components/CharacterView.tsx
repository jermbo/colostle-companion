import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, User } from "lucide-react";
import type { Character, CharacterClass } from "@/types/character";
import { CHARACTER_CLASSES } from "@/types/character";

interface CharacterFormProps {
	characterForm: Omit<Character, "id" | "createdAt" | "updatedAt">;
	onSetCharacterForm: React.Dispatch<
		React.SetStateAction<Omit<Character, "id" | "createdAt" | "updatedAt">>
	>;
	onCreateCharacter: () => void;
	onCancel: () => void;
}

const CharacterForm = ({
	characterForm,
	onSetCharacterForm,
	onCreateCharacter,
	onCancel,
}: CharacterFormProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Create New Character</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<Label htmlFor="characterName">Name</Label>
					<Input
						id="characterName"
						value={characterForm.name}
						onChange={(e) =>
							onSetCharacterForm({
								...characterForm,
								name: e.target.value,
							})
						}
						placeholder="Character name"
					/>
				</div>
				<div>
					<Label htmlFor="characterLevel">Level</Label>
					<Input
						id="characterLevel"
						type="number"
						value={characterForm.level}
						onChange={(e) =>
							onSetCharacterForm({
								...characterForm,
								level: parseInt(e.target.value, 10) || 1,
							})
						}
						placeholder="Character level"
					/>
				</div>
				<div>
					<Label htmlFor="characterClass">Class</Label>
					<select
						id="characterClass"
						value={characterForm.class}
						onChange={(e) =>
							onSetCharacterForm({
								...characterForm,
								class: e.target.value as CharacterClass,
							})
						}
						className="w-full p-2 border rounded mt-1"
					>
						{(Object.keys(CHARACTER_CLASSES) as CharacterClass[]).map(
							(classKey) => (
								<option key={classKey} value={classKey}>
									{CHARACTER_CLASSES[classKey].displayName}
								</option>
							),
						)}
					</select>
				</div>
			</CardContent>
			<CardFooter className="flex justify-end gap-2">
				<Button variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button onClick={onCreateCharacter}>Create Character</Button>
			</CardFooter>
		</Card>
	);
};

interface CharacterListProps {
	characters: Character[];
	onSelectCharacter: (character: Character) => void;
}

const CharacterList = ({
	characters,
	onSelectCharacter,
}: CharacterListProps) => {
	if (characters.length === 0) {
		return (
			<Card>
				<CardContent className="p-6 text-center">
					<p className="text-muted-foreground">No characters created yet</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{characters.map((character) => (
				<Card
					key={character.id}
					className="hover:bg-gray-50 cursor-pointer"
					onClick={() => onSelectCharacter(character)} // Make the whole card clickable
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
					{/* Footer can be removed if select is on the whole card, or kept for explicit button */}
					{/* <CardFooter>
            <Button
              className="w-full"
              onClick={() => onSelectCharacter(character)}
            >
              Select Character
            </Button>
          </CardFooter> */}
				</Card>
			))}
		</div>
	);
};

interface Props {
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
}: Props) => {
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
