import { useParams, useNavigate } from "react-router-dom";
import { useCharacter } from "@/context/character-context";
import { CHARACTER_CLASSES, CharacterClass } from "@/types/character";
import type { Character } from "@/types/character";
import { getCharacterBySlug } from "@/lib/db";
import { useEffect, useState } from "react";
import { CompanionForm } from "@/components/companion-form";
import { CompanionCard } from "@/components/CompanionCard";
import Button from "@/components/ui/Button";

const Character = () => {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const [character, setCharacter] = useState<Character | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showCompanionForm, setShowCompanionForm] = useState(false);
	const { startSession, createCompanion } = useCharacter();

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

	const handleStartSession = async () => {
		if (!character) return;

		try {
			const session = await startSession(character.id);
			if (session) {
				navigate(`/character/${character.slug}/session/${session.id}`);
			} else {
				console.error("Failed to create session");
			}
		} catch (error) {
			console.error("Error starting session:", error);
		}
	};

	const handleCreateCompanion = async (data: { name: string; type: string }) => {
		if (!character) return;

		try {
			await createCompanion(character.id, data.name, data.type);
			// Refresh the character data
			const updatedCharacter = await getCharacterBySlug(slug!);
			setCharacter(updatedCharacter);
			setShowCompanionForm(false);
		} catch (error) {
			console.error("Error creating companion:", error);
		}
	};

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
	const requiresCompanion = classInfo.requiresCompanion;
	const hasCompanion = character.companions.length > 0;

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

				<div className="mt-8">
					<h2 className="mb-4 text-2xl font-bold">Companions</h2>
					<div className="relative">
						{/* Gradient fade effect for scroll indication */}
						<div className="from-base-100 pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l" />
						<div className="from-base-100 pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r" />

						{/* Scrollable container */}
						<div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
							{character.companions.map((companion) => (
								<div key={companion.id} className="min-w-[280px] flex-none snap-center first:pl-8 last:pr-8">
									<CompanionCard name={companion.name} type={companion.type} />
								</div>
							))}
							<div className="min-w-[280px] flex-none snap-center first:pl-8 last:pr-8">
								<div
									className="bg-base-200 hover:bg-base-300 relative block cursor-pointer overflow-hidden rounded-lg p-6 shadow-lg transition-colors"
									onClick={() => setShowCompanionForm(true)}
								>
									<h3 className="mb-2 text-xl font-bold">Add Companion</h3>
									<p className="text-base-content/60 mb-4 text-sm">Create a new companion</p>
									<div className="text-primary hover:text-primary-focus text-sm">Click to add →</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{showCompanionForm && (
					<div className="mt-8">
						<h2 className="mb-4 text-2xl font-bold">Create Your Companion</h2>
						<p className="mb-4 text-gray-700">
							{requiresCompanion
								? `As a ${classInfo.displayName}, you need a companion to accompany you on your journey.`
								: "Add a companion to join you on your journey."}
						</p>
						<CompanionForm onSubmit={handleCreateCompanion} />
					</div>
				)}

				<div className="mt-8">
					<button onClick={handleStartSession} className="btn btn-primary w-full">
						Start New Session
					</button>
				</div>
			</div>
		</div>
	);
};

export default Character;
