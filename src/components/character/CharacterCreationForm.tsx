import { useState, ReactElement, useEffect } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import {
	CharacterFormData,
	CHARACTER_CLASSES,
	Character,
} from "../../types/character";

interface Props {
	character?: Character;
	onComplete?: () => void;
}

const CharacterCreationForm = ({
	character,
	onComplete,
}: Props): ReactElement => {
	const { addCharacter, updateCharacter } = useCharacterContext();
	const [formData, setFormData] = useState<CharacterFormData>({
		characterName: character?.name || "",
		class: character?.class || "armed",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Initialize form with character data if editing
	useEffect(() => {
		if (character) {
			setFormData({
				characterName: character.name,
				class: character.class,
			});
		}
	}, [character]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.characterName.trim()) {
			newErrors.characterName = "Character name is required";
		}

		if (!formData.class) {
			newErrors.class = "Character class is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();

		if (validateForm()) {
			if (character) {
				updateCharacter(character.id, formData);
			} else {
				addCharacter(formData);
			}

			if (onComplete) {
				onComplete();
			}
		}
	};

	const selectedClass = CHARACTER_CLASSES[formData.class];

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h2 className="card__title">
				{character ? "Edit Character" : "Create New Character"}
			</h2>

			<div className="form__field">
				<label htmlFor="character-name" className="form__label">
					Character Name
				</label>
				<input
					type="text"
					id="character-name"
					name="characterName"
					value={formData.characterName}
					onChange={handleChange}
					className={`form__input ${
						errors.characterName ? "form__input--error" : ""
					}`}
					placeholder="Enter character name"
					aria-describedby={
						errors.characterName ? "characterName-error" : undefined
					}
				/>
				{errors.characterName && (
					<p className="form__error" id="characterName-error" role="alert">
						{errors.characterName}
					</p>
				)}
			</div>

			<div className="form__field">
				<label htmlFor="character-class" className="form__label">
					Character Class
				</label>
				<select
					id="character-class"
					name="class"
					value={formData.class}
					onChange={handleChange}
					className={`form__select ${
						errors.class ? "form__select--error" : ""
					}`}
					aria-describedby={errors.class ? "class-error" : undefined}
				>
					{Object.values(CHARACTER_CLASSES).map((classInfo) => (
						<option key={classInfo.name} value={classInfo.name}>
							{classInfo.displayName}
						</option>
					))}
				</select>
				{errors.class && (
					<p className="form__error" id="class-error" role="alert">
						{errors.class}
					</p>
				)}
			</div>

			<div className="card__section">
				<h3 className="card__title">{selectedClass.displayName}</h3>

				<div className="card__stats">
					<div className="card__stat">
						<span className="card__stat-label">Exploration</span>
						<div className="card__stat-bars">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className={`card__stat-bar ${
										i < selectedClass.explorationScore
											? "card__stat-bar--filled"
											: ""
									}`}
									role="presentation"
								/>
							))}
						</div>
						<span className="sr-only">
							Exploration Score: {selectedClass.explorationScore} out of 5
						</span>
					</div>

					<div className="card__stat">
						<span className="card__stat-label">Combat</span>
						<div className="card__stat-bars">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className={`card__stat-bar ${
										i < selectedClass.combatScore
											? "card__stat-bar--filled"
											: ""
									}`}
									role="presentation"
								/>
							))}
						</div>
						<span className="sr-only">
							Combat Score: {selectedClass.combatScore} out of 5
						</span>
					</div>
				</div>

				<p className="card__content">{selectedClass.description}</p>

				{selectedClass.requiresCompanion && (
					<p className="card__content" role="alert">
						<strong>Note:</strong> This class requires a companion.
					</p>
				)}
			</div>

			<div className="action-bar">
				<button type="submit" className="button button--primary">
					{character ? "Save Changes" : "Create Character"}
				</button>
			</div>
		</form>
	);
};

export default CharacterCreationForm;
