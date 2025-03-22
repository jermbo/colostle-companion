import React, { useState } from "react";
import { useGame } from "../context/GameContext";

export const CharacterCreation: React.FC = () => {
	const { createCharacter } = useGame();
	const [name, setName] = useState("");
	const [traits, setTraits] = useState<string[]>(["", "", ""]);
	const [inventory, setInventory] = useState<string[]>(["", "", ""]);
	const [error, setError] = useState("");

	const handleTraitChange = (index: number, value: string) => {
		const newTraits = [...traits];
		newTraits[index] = value;
		setTraits(newTraits);
	};

	const handleInventoryChange = (index: number, value: string) => {
		const newInventory = [...inventory];
		newInventory[index] = value;
		setInventory(newInventory);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validation
		if (!name.trim()) {
			setError("Please enter a character name");
			return;
		}

		const validTraits = traits.filter((trait) => trait.trim() !== "");
		if (validTraits.length < 1) {
			setError("Please enter at least one character trait");
			return;
		}

		const validInventory = inventory.filter((item) => item.trim() !== "");

		// Create character
		createCharacter({
			name: name.trim(),
			traits: validTraits,
			inventory: validInventory,
		});
	};

	return (
		<main className="character-creation-container">
			<h1>Create Your Character</h1>

			{error && (
				<div className="error-message" role="alert">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className="visually-hidden">Character Information</legend>

					<div className="form-group">
						<label htmlFor="name" className="form-label">
							Character Name
						</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="form-input"
							aria-required="true"
						/>
					</div>

					<div className="form-group">
						<fieldset>
							<legend className="form-label">Character Traits</legend>
							<p className="form-help-text">
								What makes your character unique? Add up to three defining
								traits.
							</p>

							{traits.map((trait, index) => (
								<div key={`trait-${index}`} className="input-group">
									<label htmlFor={`trait-${index}`} className="visually-hidden">
										Trait {index + 1}
									</label>
									<input
										id={`trait-${index}`}
										type="text"
										value={trait}
										onChange={(e) => handleTraitChange(index, e.target.value)}
										placeholder={`Trait ${index + 1}`}
										className="form-input"
										aria-required={index === 0 ? "true" : "false"}
									/>
								</div>
							))}
						</fieldset>
					</div>

					<div className="form-group">
						<fieldset>
							<legend className="form-label">Starting Inventory</legend>
							<p className="form-help-text">
								What items does your character possess? Add up to three starting
								items.
							</p>

							{inventory.map((item, index) => (
								<div key={`item-${index}`} className="input-group">
									<label htmlFor={`item-${index}`} className="visually-hidden">
										Item {index + 1}
									</label>
									<input
										id={`item-${index}`}
										type="text"
										value={item}
										onChange={(e) =>
											handleInventoryChange(index, e.target.value)
										}
										placeholder={`Item ${index + 1}`}
										className="form-input"
									/>
								</div>
							))}
						</fieldset>
					</div>

					<button type="submit" className="primary-button">
						Create Character & Begin Journey
					</button>
				</fieldset>
			</form>
		</main>
	);
};
