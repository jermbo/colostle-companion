import { ReactElement } from "react";
import { Character } from "../../types/character";
import { useCharacterContext } from "../../context/CharacterContext";

interface Props {
	character: Character;
	onEdit: (character: Character) => void;
}

const CharacterCard = ({ character, onEdit }: Props): ReactElement => {
	const { deleteCharacter } = useCharacterContext();

	const handleDelete = (): void => {
		if (window.confirm(`Are you sure you want to delete ${character.name}?`)) {
			deleteCharacter(character.id);
		}
	};

	return (
		<div className="character-card">
			<h3 className="character-card__title">{character.name}</h3>
			<p className="character-card__class">
				Level {character.level} {character.class}
			</p>

			{character.companion && (
				<div className="character-card__companion">
					<p className="character-card__companion-title">Companion:</p>
					<p className="character-card__companion-name">
						{character.companion.name}
					</p>
					<p className="character-card__companion-type">
						{character.companion.type}
					</p>
				</div>
			)}

			<div className="character-card__actions">
				<button
					className="character-card__button character-card__button--edit"
					onClick={() => onEdit(character)}
				>
					Edit
				</button>
				<button
					className="character-card__button character-card__button--delete"
					onClick={handleDelete}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default CharacterCard;
