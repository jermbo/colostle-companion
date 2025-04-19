import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import { ItemCategory } from "../../types/inventory";

interface Props {
	onClose: () => void;
}

const AddItemForm = ({ onClose }: Props) => {
	const { addItem } = useInventory();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category: "misc" as ItemCategory,
		weight: 0,
		quantity: 1,
	});
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			await addItem(formData);
			onClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to add item");
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "weight" || name === "quantity" ? Number(value) : value,
		}));
	};

	return (
		<form className="add-item-form" onSubmit={handleSubmit}>
			<div className="add-item-form__header">
				<h2 className="add-item-form__title">Add Item</h2>
				<button
					type="button"
					className="add-item-form__close"
					onClick={onClose}
				>
					×
				</button>
			</div>

			{error && <div className="add-item-form__error">{error}</div>}

			<div className="add-item-form__content">
				<div className="add-item-form__field">
					<label htmlFor="name" className="add-item-form__label">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="add-item-form__input"
						required
					/>
				</div>

				<div className="add-item-form__field">
					<label htmlFor="description" className="add-item-form__label">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="add-item-form__textarea"
						required
					/>
				</div>

				<div className="add-item-form__field">
					<label htmlFor="category" className="add-item-form__label">
						Category
					</label>
					<select
						id="category"
						name="category"
						value={formData.category}
						onChange={handleChange}
						className="add-item-form__select"
						required
					>
						<option value="weapon">Weapon</option>
						<option value="armor">Armor</option>
						<option value="consumable">Consumable</option>
						<option value="resource">Resource</option>
						<option value="misc">Miscellaneous</option>
					</select>
				</div>

				<div className="add-item-form__field">
					<label htmlFor="weight" className="add-item-form__label">
						Weight (kg)
					</label>
					<input
						type="number"
						id="weight"
						name="weight"
						value={formData.weight}
						onChange={handleChange}
						className="add-item-form__input"
						min="0"
						step="0.1"
						required
					/>
				</div>

				<div className="add-item-form__field">
					<label htmlFor="quantity" className="add-item-form__label">
						Quantity
					</label>
					<input
						type="number"
						id="quantity"
						name="quantity"
						value={formData.quantity}
						onChange={handleChange}
						className="add-item-form__input"
						min="1"
						required
					/>
				</div>
			</div>

			<div className="add-item-form__actions">
				<button type="submit" className="add-item-form__submit">
					Add Item
				</button>
			</div>
		</form>
	);
};

export default AddItemForm;
