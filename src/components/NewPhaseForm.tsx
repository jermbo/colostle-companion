import React, { useState } from "react";
import { useGame, PhaseType } from "../context/GameContext";

export const NewPhaseForm: React.FC<{ onClose: () => void }> = ({
	onClose,
}) => {
	const { startNewPhase } = useGame();
	const [title, setTitle] = useState("");
	const [type, setType] = useState<PhaseType>("exploration");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			setError("Please enter a phase title");
			return;
		}

		startNewPhase(type, title.trim());
		onClose();
	};

	return (
		<div
			className="new-phase-modal"
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 1000,
			}}
		>
			<div
				className="modal-content"
				style={{
					backgroundColor: "white",
					borderRadius: "8px",
					padding: "25px",
					width: "90%",
					maxWidth: "500px",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "20px",
					}}
				>
					<h2 style={{ margin: 0 }}>Start New Phase</h2>
					<button
						onClick={onClose}
						style={{
							background: "none",
							border: "none",
							fontSize: "20px",
							cursor: "pointer",
						}}
					>
						×
					</button>
				</div>

				{error && (
					<div
						style={{
							backgroundColor: "#f8d7da",
							color: "#721c24",
							padding: "10px",
							borderRadius: "5px",
							marginBottom: "15px",
						}}
					>
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: "20px" }}>
						<label
							htmlFor="title"
							style={{
								display: "block",
								marginBottom: "8px",
								fontWeight: "bold",
							}}
						>
							Phase Title
						</label>
						<input
							id="title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter a title for this phase"
							style={{
								width: "100%",
								padding: "10px",
								fontSize: "16px",
								borderRadius: "5px",
								border: "1px solid #ccc",
							}}
						/>
					</div>

					<div style={{ marginBottom: "25px" }}>
						<label
							style={{
								display: "block",
								marginBottom: "8px",
								fontWeight: "bold",
							}}
						>
							Phase Type
						</label>
						<div style={{ display: "flex", gap: "10px" }}>
							<TypeOption
								selected={type === "exploration"}
								onClick={() => setType("exploration")}
								icon="🧭"
								label="Exploration"
								color="#4a69bd"
							/>
							<TypeOption
								selected={type === "combat"}
								onClick={() => setType("combat")}
								icon="⚔️"
								label="Combat"
								color="#9b2226"
							/>
							<TypeOption
								selected={type === "event"}
								onClick={() => setType("event")}
								icon="🎲"
								label="Event"
								color="#457b9d"
							/>
						</div>
					</div>

					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<button
							type="button"
							onClick={onClose}
							style={{
								padding: "10px 15px",
								fontSize: "16px",
								backgroundColor: "#e9ecef",
								color: "#495057",
								border: "none",
								borderRadius: "5px",
								cursor: "pointer",
							}}
						>
							Cancel
						</button>
						<button
							type="submit"
							style={{
								padding: "10px 20px",
								fontSize: "16px",
								backgroundColor:
									type === "exploration"
										? "#4a69bd"
										: type === "combat"
										? "#9b2226"
										: "#457b9d",
								color: "white",
								border: "none",
								borderRadius: "5px",
								cursor: "pointer",
							}}
						>
							Start Phase
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

interface TypeOptionProps {
	selected: boolean;
	onClick: () => void;
	icon: string;
	label: string;
	color: string;
}

const TypeOption: React.FC<TypeOptionProps> = ({
	selected,
	onClick,
	icon,
	label,
	color,
}) => {
	return (
		<div
			onClick={onClick}
			style={{
				flex: 1,
				padding: "15px 10px",
				border: `2px solid ${selected ? color : "#dee2e6"}`,
				borderRadius: "5px",
				backgroundColor: selected ? `${color}19` : "white", // 10% opacity of the color
				cursor: "pointer",
				textAlign: "center",
				transition: "all 0.2s ease",
			}}
		>
			<div style={{ fontSize: "24px", marginBottom: "5px" }}>{icon}</div>
			<div style={{ fontWeight: selected ? "bold" : "normal" }}>{label}</div>
		</div>
	);
};
