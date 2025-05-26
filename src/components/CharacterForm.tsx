import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
}: CharacterFormProps): React.ReactElement => {
	const isFormValid: boolean =
		!!characterForm.name && characterForm.level > 0 && !!characterForm.class;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (isFormValid) {
			onCreateCharacter();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
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
					<Button type="submit" disabled={!isFormValid}>
						Create Character
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
};

export default CharacterForm;
