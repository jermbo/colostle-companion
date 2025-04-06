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
		<div className="card">
			<h3 className="card__title">{character.name}</h3>
			<p className="card__content">
				Level {character.level} {character.class}
			</p>

			{character.companion && (
				<div className="card__content">
					<p>
						<strong>Companion:</strong>
					</p>
					<p>{character.companion.name}</p>
					<p>{character.companion.type}</p>
				</div>
			)}

			<div className="action-bar">
				<button
					className="button button--secondary"
					onClick={() => onEdit(character)}
				>
					Edit
				</button>
				<button className="button button--danger" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default CharacterCard;
