import { useState } from "react";
import { CharacterClass, CHARACTER_CLASSES } from "@/types/character";

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
		<form onSubmit={handleSubmit} className="max-w-md space-y-6">
			<div>
				<label htmlFor="characterName" className="block text-sm font-medium text-gray-700">
					Character Name
				</label>
				<input
					type="text"
					id="characterName"
					value={characterName}
					onChange={(e) => setCharacterName(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					required
				/>
			</div>

			<div>
				<label htmlFor="characterClass" className="block text-sm font-medium text-gray-700">
					Character Class
				</label>
				<select
					id="characterClass"
					value={selectedClass}
					onChange={(e) => setSelectedClass(e.target.value as CharacterClass)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					required
				>
					{Object.entries(CHARACTER_CLASSES).map(([key, value]) => (
						<option key={key} value={key}>
							{value.displayName}
						</option>
					))}
				</select>
			</div>

			<div className="mt-4">
				<button
					type="submit"
					disabled={isSubmitting}
					className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? "Creating..." : "Create Character"}
				</button>
			</div>
		</form>
	);
};
