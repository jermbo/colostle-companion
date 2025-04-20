interface Props {
	name: string;
	lastPlayed: string;
	onContinue: () => void;
	onMenuClick: () => void;
}

const CharacterCard = ({ name, lastPlayed, onContinue, onMenuClick }: Props) => {
	return (
		<div className="bg-base-200 relative overflow-hidden rounded-lg p-6 shadow-lg">
			<div className="absolute top-4 right-4">
				<button onClick={onMenuClick} className="text-base-content/60 hover:text-base-content">
					<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
					</svg>
				</button>
			</div>
			<h3 className="mb-2 text-xl font-bold">{name}</h3>
			<p className="text-base-content/60 mb-4 text-sm">{lastPlayed}</p>
			<div className="mt-4">
				<button onClick={onContinue} className="text-primary hover:text-primary-focus text-sm">
					Continue Journey →
				</button>
			</div>
		</div>
	);
};

export default CharacterCard;
