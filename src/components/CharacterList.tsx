import CharacterCard from "./CharacterCard";

interface Character {
	id: string;
	name: string;
	lastPlayed: string;
}

interface Props {
	characters: Character[];
	onContinue: (id: string) => void;
	onMenuClick: (id: string) => void;
}

const CharacterList = ({ characters, onContinue, onMenuClick }: Props) => {
	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
								lastPlayed={character.lastPlayed}
								onContinue={() => onContinue(character.id)}
								onMenuClick={() => onMenuClick(character.id)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CharacterList;
