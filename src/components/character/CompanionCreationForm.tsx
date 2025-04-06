import { useState, ReactElement } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import { CompanionFormData } from "../../types/character";

interface Props {
	characterId: string;
	onComplete?: () => void;
}

const CompanionCreationForm = ({
	characterId,
	onComplete,
}: Props): ReactElement => {
	const { addCompanion } = useCharacterContext();
	const [formData, setFormData] = useState<CompanionFormData>({
		name: "",
		type: "familiar",
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

		if (!formData.name.trim()) {
			newErrors.name = "Companion name is required";
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
			addCompanion(characterId, formData);
			if (onComplete) {
				onComplete();
			}
		}
	};

	return (
		<form className="companion-form" onSubmit={handleSubmit}>
			<h3>Create Companion</h3>

			<div className="companion-form__field">
				<label htmlFor="name" className="companion-form__label">
					Companion Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className={`companion-form__input ${
						errors.name ? "companion-form__input--error" : ""
					}`}
					placeholder="Enter companion name"
				/>
				{errors.name && <p className="companion-form__error">{errors.name}</p>}
			</div>

			<div className="companion-form__field">
				<label htmlFor="type" className="companion-form__label">
					Companion Type
				</label>
				<select
					id="type"
					name="type"
					value={formData.type}
					onChange={handleChange}
					className={`companion-form__select ${
						errors.type ? "companion-form__select--error" : ""
					}`}
				>
					<option value="familiar">Familiar</option>
					<option value="mount">Mount</option>
					<option value="servant">Servant</option>
					<option value="guardian">Guardian</option>
					<option value="friend">Friend</option>
				</select>
				{errors.type && <p className="companion-form__error">{errors.type}</p>}
			</div>

			<div className="companion-form__actions">
				<button type="submit" className="companion-form__button">
					Create Companion
				</button>
			</div>
		</form>
	);
};

export default CompanionCreationForm;
