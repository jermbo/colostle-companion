import { useNavigate } from "react-router-dom";
import { CharacterForm } from "@/components/character-form";
import { CharacterClass, generateSlug } from "@/types/character";
import { addCharacter } from "@/lib/db";

export default function Create() {
	const navigate = useNavigate();

	const handleSubmit = async (formData: { characterName: string; class: CharacterClass }) => {
		try {
			const character = await addCharacter({
				name: formData.characterName,
				slug: generateSlug(formData.characterName),
				class: formData.class,
				level: 1,
			});
			navigate(`/character/${character.slug}`);
		} catch (error) {
			console.error("Failed to create character:", error);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-8 text-3xl font-bold">Create New Character</h1>
			<CharacterForm onSubmit={handleSubmit} />
		</div>
	);
}
