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

	const handleSubmit = () => {
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
		<div
			className="character-creation-container"
			style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
		>
			<h1 style={{ textAlign: "center", marginBottom: "30px" }}>
				Create Your Character
			</h1>

			{error && (
				<div
					style={{
						backgroundColor: "#f8d7da",
						color: "#721c24",
						padding: "10px",
						borderRadius: "5px",
						marginBottom: "20px",
					}}
				>
					{error}
				</div>
			)}

			<div style={{ marginBottom: "20px" }}>
				<label
					htmlFor="name"
					style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
				>
					Character Name
				</label>
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{
						width: "100%",
						padding: "10px",
						fontSize: "16px",
						borderRadius: "5px",
						border: "1px solid #ccc",
					}}
				/>
			</div>

			<div style={{ marginBottom: "20px" }}>
				<label
					style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
				>
					Character Traits
				</label>
				<p style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>
					What makes your character unique? Add up to three defining traits.
				</p>

				{traits.map((trait, index) => (
					<div key={`trait-${index}`} style={{ marginBottom: "10px" }}>
						<input
							type="text"
							value={trait}
							onChange={(e) => handleTraitChange(index, e.target.value)}
							placeholder={`Trait ${index + 1}`}
							style={{
								width: "100%",
								padding: "10px",
								fontSize: "16px",
								borderRadius: "5px",
								border: "1px solid #ccc",
							}}
						/>
					</div>
				))}
			</div>

			<div style={{ marginBottom: "30px" }}>
				<label
					style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
				>
					Starting Inventory
				</label>
				<p style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>
					What items does your character possess? Add up to three starting
					items.
				</p>

				{inventory.map((item, index) => (
					<div key={`item-${index}`} style={{ marginBottom: "10px" }}>
						<input
							type="text"
							value={item}
							onChange={(e) => handleInventoryChange(index, e.target.value)}
							placeholder={`Item ${index + 1}`}
							style={{
								width: "100%",
								padding: "10px",
								fontSize: "16px",
								borderRadius: "5px",
								border: "1px solid #ccc",
							}}
						/>
					</div>
				))}
			</div>

			<button
				onClick={handleSubmit}
				style={{
					width: "100%",
					padding: "12px",
					fontSize: "18px",
					backgroundColor: "#4a69bd",
					color: "white",
					border: "none",
					borderRadius: "5px",
					cursor: "pointer",
				}}
			>
				Create Character & Begin Journey
			</button>
		</div>
	);
};
