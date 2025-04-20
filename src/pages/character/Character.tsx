import { useParams } from "react-router-dom";
import { useCharacter } from "@/context/character-context";
import { CHARACTER_CLASSES, CharacterClass } from "@/types/character";
import type { Character } from "@/types/character";
import { getCharacterBySlug } from "@/lib/db";
import { useEffect, useState } from "react";

const Character = () => {
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
				<div className="mx-auto max-w-2xl">
					<div className="text-center">Loading character...</div>
				</div>
			</div>
		);
	}

	if (!character) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="mx-auto max-w-2xl">
					<h1 className="mb-6 text-4xl font-bold">Character Not Found</h1>
				</div>
			</div>
		);
	}

	const classInfo = CHARACTER_CLASSES[character.class as CharacterClass];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mx-auto max-w-2xl">
				<div className="mb-8">
					<h1 className="mb-2 text-4xl font-bold">{character.name}</h1>
					<p className="text-lg text-gray-600">
						Level {character.level} {classInfo.displayName}
					</p>
				</div>

				<div className="bg-base-200 grid grid-cols-2 gap-4 rounded-lg p-6 shadow-lg">
					<div>
						<h2 className="mb-2 text-xl font-semibold">Exploration Score</h2>
						<p className="text-primary text-3xl font-bold">{classInfo.explorationScore}</p>
					</div>
					<div>
						<h2 className="mb-2 text-xl font-semibold">Combat Score</h2>
						<p className="text-primary text-3xl font-bold">{classInfo.combatScore}</p>
					</div>
				</div>

				<div className="mt-8">
					<h2 className="mb-4 text-2xl font-bold">Class Description</h2>
					<p className="text-gray-700">{classInfo.description}</p>
				</div>

				{character.companion && (
					<div className="mt-8">
						<h2 className="mb-4 text-2xl font-bold">Companion</h2>
						<div className="bg-base-200 rounded-lg p-6 shadow-lg">
							<h3 className="text-xl font-semibold">{character.companion.name}</h3>
							<p className="text-gray-600">{character.companion.type}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Character;
