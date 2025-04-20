import { Link } from "react-router-dom";
import { CharacterClass } from "@/types/character";

interface Props {
	name: string;
	level: number;
	characterClass: CharacterClass;
	slug: string;
}

export const CharacterCard = ({ name, level, characterClass, slug }: Props) => {
	return (
		<div className="bg-base-200 relative overflow-hidden rounded-lg p-6 shadow-lg">
			<div className="absolute top-4 right-4">
				<Link to={`/character/${slug}`} className="text-base-content/60 hover:text-base-content">
					<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
					</svg>
				</Link>
			</div>
			<h3 className="mb-2 text-xl font-bold">{name}</h3>
			<p className="text-base-content/60 mb-4 text-sm">
				Level {level} {characterClass}
			</p>
			<div className="mt-4">
				<Link to={`/character/${slug}`} className="text-primary hover:text-primary-focus text-sm">
					Continue Journey →
				</Link>
			</div>
		</div>
	);
};
