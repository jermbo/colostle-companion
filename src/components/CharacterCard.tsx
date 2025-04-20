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
		<Link
			to={`/character/${slug}`}
			className="bg-base-200 hover:bg-base-300 relative block overflow-hidden rounded-lg p-6 shadow-lg transition-colors"
		>
			<h3 className="mb-2 text-xl font-bold">{name}</h3>
			<p className="text-base-content/60 mb-4 text-sm">
				Level {level} {characterClass}
			</p>
			<div className="mt-4">
				<span className="text-primary hover:text-primary-focus text-sm">Continue Journey →</span>
			</div>
		</Link>
	);
};
