interface Props {
	name: string;
	lastPlayed: string;
	onContinue: () => void;
	onMenuClick: () => void;
}

const CharacterCard = ({ name, lastPlayed, onContinue, onMenuClick }: Props) => {
	return (
		<div className="relative overflow-hidden rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
			<div className="absolute top-4 right-4">
				<button
					onClick={onMenuClick}
					className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
				>
					<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
					</svg>
				</button>
			</div>
			<h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
			<p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{lastPlayed}</p>
			<div className="mt-4">
				<button
					onClick={onContinue}
					className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
				>
					Continue Journey →
				</button>
			</div>
		</div>
	);
};

export default CharacterCard;
