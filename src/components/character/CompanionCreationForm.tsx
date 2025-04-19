import { useState, ReactElement, useEffect } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import {
	CompanionFormData,
	CHARACTER_CLASSES,
	Companion,
} from "../../types/character";

interface Props {
	characterId: string;
	companion?: Companion;
	onComplete?: () => void;
}

interface CompanionType {
	value: string;
	label: string;
	description: string;
	image: string;
}

const COMPANION_TYPES: CompanionType[] = [
	{
		value: "familiar",
		label: "Familiar",
		description:
			"A small Rook companion that follows you like a pet, providing guidance and companionship.",
		image: "https://picsum.photos/seed/familiar/400/400",
	},
	{
		value: "mount",
		label: "Mount",
		description:
			"A mechanical mount adapted from Rook parts, allowing for faster travel across the Colostle.",
		image: "https://picsum.photos/seed/mount/400/400",
	},
	{
		value: "servant",
		label: "Servant",
		description:
			"A loyal mechanical servant that assists with tasks and provides support during adventures.",
		image: "https://picsum.photos/seed/servant/400/400",
	},
	{
		value: "guardian",
		label: "Guardian",
		description:
			"A protective companion that helps defend against threats and provides combat support.",
		image: "https://picsum.photos/seed/guardian/400/400",
	},
	{
		value: "friend",
		label: "Friend",
		description:
			"A sentient Rook companion that forms a deep bond with you, offering both emotional and practical support.",
		image: "https://picsum.photos/seed/friend/400/400",
	},
];

const CompanionCreationForm = ({
	characterId,
	companion,
	onComplete,
}: Props): ReactElement => {
	const { characters, addCompanion, updateCompanion } = useCharacterContext();
	const [formData, setFormData] = useState<CompanionFormData>({
		name: "",
		type: "familiar",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Initialize form with companion data if editing
	useEffect(() => {
		if (companion) {
			setFormData({
				name: companion.name,
				type: companion.type,
			});
		}
	}, [companion]);

	// Find the character and check if they can have a companion
	const character = characters.find((c) => c.id === characterId);
	const canHaveCompanion =
		character && CHARACTER_CLASSES[character.class].requiresCompanion;

	const selectedCompanionType = COMPANION_TYPES.find(
		(type) => type.value === formData.type
	);

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

		if (!formData.name.trim()) {
			newErrors.name = "Companion name is required";
		} else if (formData.name.length < 2) {
			newErrors.name = "Companion name must be at least 2 characters long";
		} else if (formData.name.length > 50) {
			newErrors.name = "Companion name must be less than 50 characters";
		}

		if (!formData.type) {
			newErrors.type = "Companion type is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();

		if (validateForm()) {
			if (companion) {
				updateCompanion(companion.id, formData);
			} else {
				addCompanion(characterId, formData);
			}
			if (onComplete) {
				onComplete();
			}
		}
	};

	if (!character) {
		return (
			<div className="card">
				<p className="card__content">Character not found</p>
			</div>
		);
	}

	if (!canHaveCompanion && !companion) {
		return (
			<div className="card">
				<p className="card__content">
					{CHARACTER_CLASSES[character.class].displayName} cannot have
					companions.
				</p>
			</div>
		);
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h2 className="card__title">
				{companion ? "Edit Companion" : "Create Companion"}
			</h2>

			<div className="form__field">
				<label htmlFor="name" className="form__label">
					Companion Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className={`form__input ${errors.name ? "form__input--error" : ""}`}
					placeholder="Enter companion name"
					maxLength={50}
					aria-describedby={errors.name ? "name-error" : undefined}
				/>
				{errors.name && (
					<p className="form__error" id="name-error" role="alert">
						{errors.name}
					</p>
				)}
			</div>

			<div className="form__field">
				<label htmlFor="type" className="form__label">
					Companion Type
				</label>
				<select
					id="type"
					name="type"
					value={formData.type}
					onChange={handleChange}
					className={`form__select ${errors.type ? "form__select--error" : ""}`}
					aria-describedby={errors.type ? "type-error" : undefined}
				>
					{COMPANION_TYPES.map((type) => (
						<option key={type.value} value={type.value}>
							{type.label}
						</option>
					))}
				</select>
				{errors.type && (
					<p className="form__error" id="type-error" role="alert">
						{errors.type}
					</p>
				)}
			</div>

			{selectedCompanionType && (
				<div className="card__section">
					<h3 className="card__title">{selectedCompanionType.label}</h3>
					<div className="card__content">
						<div className="card__image">
							<img
								src={selectedCompanionType.image}
								alt={selectedCompanionType.label}
							/>
						</div>
						<p className="card__description">
							{selectedCompanionType.description}
						</p>
						{formData.name && (
							<p className="card__content">
								Your companion will be named: <strong>{formData.name}</strong>
							</p>
						)}
					</div>
				</div>
			)}

			<div className="action-bar">
				<button
					type="submit"
					className="button button--primary"
					disabled={!formData.name.trim()}
				>
					{companion ? "Save Changes" : "Create Companion"}
				</button>
			</div>
		</form>
	);
};

export default CompanionCreationForm;
