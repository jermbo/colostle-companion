import { useNavigate } from "react-router-dom";
import { CharacterForm } from "@/components/character-form";
import { useCharacter } from "@/context/character-context";
import { CharacterClass } from "@/types/character";

export default function Create() {
	const navigate = useNavigate();
	const { createCharacter } = useCharacter();

	const handleSubmit = async (formData: { characterName: string; class: CharacterClass }) => {
		try {
			const character = await createCharacter(formData.characterName, formData.class);
			navigate(`/character/${character.slug}`);
		} catch (error) {
			console.error("Failed to create character:", error);
		}
	};

	return (
		<div className="container mx-auto">
			<h1 className="mb-4 text-3xl font-bold">Create New Character</h1>
			<CharacterForm onSubmit={handleSubmit} />
		</div>
	);
}
