import { ReactElement } from "react";
import { Character } from "../../types/character";
import { useCharacterContext } from "../../context/CharacterContext";
import { CHARACTER_CLASSES } from "../../types/character";

interface Props {
	character: Character;
	onEdit: (character: Character) => void;
	onEditCompanion?: (character: Character) => void;
}

const CharacterCard = ({
	character,
	onEdit,
	onEditCompanion,
}: Props): ReactElement => {
	const { deleteCharacter } = useCharacterContext();
	const classInfo = CHARACTER_CLASSES[character.class];

	const handleDelete = (): void => {
		if (window.confirm(`Are you sure you want to delete ${character.name}?`)) {
			deleteCharacter(character.id);
		}
	};

	return (
		<div className="card">
			<div className="card__header">
				<h3 className="card__title">{character.name}</h3>
				<p className="card__subtitle">{classInfo.displayName}</p>
			</div>

			<div className="card__content">
				<div className="card__stats">
					<div className="card__stat">
						<span className="card__stat-label">Exploration</span>
						<div className="card__stat-bars">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className={`card__stat-bar ${
										i < classInfo.explorationScore
											? "card__stat-bar--filled"
											: ""
									}`}
									role="presentation"
								/>
							))}
						</div>
					</div>
					<div className="card__stat">
						<span className="card__stat-label">Combat</span>
						<div className="card__stat-bars">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className={`card__stat-bar ${
										i < classInfo.combatScore ? "card__stat-bar--filled" : ""
									}`}
									role="presentation"
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			{character.companion && (
				<div className="card__section">
					<div className="card__section-header">
						<span className="card__stat-label">Companion</span>
						{onEditCompanion && (
							<button
								className="button button--secondary button--small"
								onClick={() => onEditCompanion(character)}
							>
								Edit Companion
							</button>
						)}
					</div>
					<p className="card__content">{character.companion.name}</p>
					<p className="card__content">{character.companion.type}</p>
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
