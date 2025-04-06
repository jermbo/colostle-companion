import { useState, ReactElement } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import { CharacterFormData, CHARACTER_CLASSES } from "../../types/character";

interface Props {
	onComplete?: () => void;
}

const CharacterCreationForm = ({ onComplete }: Props): ReactElement => {
	const { addCharacter } = useCharacterContext();
	const [formData, setFormData] = useState<CharacterFormData>({
		characterName: "",
		class: "armed",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

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
			newErrors.name = "Character name is required";
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
			addCharacter(formData);
			if (onComplete) {
				onComplete();
			}
		}
	};

	const selectedClass = CHARACTER_CLASSES[formData.class];

	return (
		<form className="character-form" onSubmit={handleSubmit}>
			<h3>Create New Character</h3>

			<div className="character-form__field">
				<label htmlFor="character-name" className="character-form__label">
					Character Name
				</label>
				<input
					type="text"
					id="character-name"
					name="character-name"
					value={formData.characterName}
					onChange={handleChange}
					className={`character-form__input ${
						errors.name ? "character-form__input--error" : ""
					}`}
					placeholder="Enter character name"
				/>
				{errors.name && <p className="character-form__error">{errors.name}</p>}
			</div>

			<div className="character-form__field">
				<label htmlFor="class" className="character-form__label">
					Character Class
				</label>
				<select
					id="class"
					name="class"
					value={formData.class}
					onChange={handleChange}
					className={`character-form__select ${
						errors.class ? "character-form__select--error" : ""
					}`}
				>
					{Object.values(CHARACTER_CLASSES).map((classInfo) => (
						<option key={classInfo.name} value={classInfo.name}>
							{classInfo.displayName}
						</option>
					))}
				</select>
				{errors.class && (
					<p className="character-form__error">{errors.class}</p>
				)}
			</div>

			<div className="character-form__class-info">
				<h4>{selectedClass.displayName}</h4>
				<div className="character-form__scores">
					<div className="character-form__score">
						<span className="character-form__score-label">Exploration:</span>
						<div className="character-form__score-bars">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className={`character-form__score-bar ${
										i < selectedClass.explorationScore
											? "character-form__score-bar--filled"
											: ""
									}`}
								/>
							))}
						</div>
					</div>
					<div className="character-form__score">
						<span className="character-form__score-label">Combat:</span>
						<div className="character-form__score-bars">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className={`character-form__score-bar ${
										i < selectedClass.combatScore
											? "character-form__score-bar--filled"
											: ""
									}`}
								/>
							))}
						</div>
					</div>
				</div>
				<p className="character-form__description">
					{selectedClass.description}
				</p>
				{selectedClass.requiresCompanion && (
					<p className="character-form__companion-note">
						<strong>Note:</strong> This class requires a companion.
					</p>
				)}
			</div>

			<div className="character-form__actions">
				<button type="submit" className="character-form__button">
					Create Character
				</button>
			</div>
		</form>
	);
};

export default CharacterCreationForm;
