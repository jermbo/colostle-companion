import { useCharacter } from "@/context/character-context";
import { CharacterCard } from "./CharacterCard";

export const CharacterList = () => {
	const { characters, isLoading, error } = useCharacter();

	if (isLoading) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="text-center">Loading characters...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="text-center text-red-600">Error loading characters: {error.message}</div>
			</div>
		);
	}

	if (characters.length === 0) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="text-center text-gray-500">No characters found. Create one to get started!</div>
			</div>
		);
	}

	return (
		<div className="">
			<h2 className="mb-6 text-2xl font-bold">Your Characters</h2>

			{/* Horizontal scroll container */}
			<div className="relative">
				{/* Gradient fade effect for scroll indication */}
				<div className="from-base-100 pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l" />

				{/* Scrollable container */}
				<div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
					{characters.map((character) => (
						<div key={character.id} className="min-w-[280px] flex-none snap-center first:pl-8 last:pr-8">
							<CharacterCard
								name={character.name}
								level={character.level}
								characterClass={character.class}
								slug={character.slug}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
