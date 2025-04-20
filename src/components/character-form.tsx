import { useState } from "react";
import { CharacterClass, CHARACTER_CLASSES } from "@/types/character";
import Button from "./ui/Button";

interface Props {
	onSubmit: (data: { characterName: string; class: CharacterClass }) => void;
}

export const CharacterForm = ({ onSubmit }: Props) => {
	const [characterName, setCharacterName] = useState("");
	const [selectedClass, setSelectedClass] = useState<CharacterClass>("armed");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await onSubmit({
				characterName,
				class: selectedClass,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box flex flex-col gap-4 border p-4">
				<legend className="fieldset-legend">Create Character</legend>

				<label className="label w-full" htmlFor="characterName">
					Character Name
				</label>
				<input
					type="text"
					id="characterName"
					value={characterName}
					onChange={(e) => setCharacterName(e.target.value)}
					className="input w-full"
					placeholder="Enter character name"
					required
				/>

				<label className="label w-full" htmlFor="characterClass">
					Character Class
				</label>
				<select
					id="characterClass"
					value={selectedClass}
					onChange={(e) => setSelectedClass(e.target.value as CharacterClass)}
					className="input w-full"
					required
				>
					{Object.entries(CHARACTER_CLASSES).map(([key, value]) => (
						<option key={key} value={key}>
							{value.displayName}
						</option>
					))}
				</select>

				<Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? "Creating..." : "Create Character"}
				</Button>
			</fieldset>
		</form>
	);
};
