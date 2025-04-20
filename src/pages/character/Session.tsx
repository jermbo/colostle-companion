import { useParams } from "react-router-dom";
import { useCharacter } from "@/context/character-context";
import { ExplorationPhase } from "@/components/ExplorationPhase";
import { CHARACTER_CLASSES } from "@/types/character";
import { getCharacterBySlug } from "@/lib/db";
import { useEffect, useState } from "react";
import type { Character } from "@/types/character";

const Session = () => {
	const { slug } = useParams<{ slug: string }>();
	const [character, setCharacter] = useState<Character | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCharacter = async () => {
			if (!slug) return;
			try {
				const character = await getCharacterBySlug(slug);
				setCharacter(character);
			} catch (error) {
				console.error("Failed to fetch character:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCharacter();
	}, [slug]);

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">Loading session...</div>
			</div>
		);
	}

	if (!character) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 text-4xl font-bold">Character Not Found</h1>
			</div>
		);
	}

	const classInfo = CHARACTER_CLASSES[character.class];

	return (
		<div className="container mx-auto px-4 py-8">
			<ExplorationPhase characterName={character.name} classInfo={classInfo} />
		</div>
	);
};

export default Session;
