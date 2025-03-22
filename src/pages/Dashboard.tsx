import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { PhaseHistory } from "../components/PhaseHistory";
import { NewPhaseForm } from "../components/NewPhaseForm";
import { ExplorationPhase } from "./ExplorationPhase";
import { CombatPhase } from "./CombatPhase";
import { EventPhase } from "./EventPhase";

export const Dashboard: React.FC = () => {
	const { gameState } = useGame();
	const { storyPhases, currentPhaseIndex, character } = gameState;
	const [showNewPhaseForm, setShowNewPhaseForm] = useState(false);

	const currentPhase = storyPhases[currentPhaseIndex];

	// Render the current phase based on its type
	const renderCurrentPhase = () => {
		if (!currentPhase) {
			return (
				<div
					className="no-phase"
					style={{
						padding: "30px",
						textAlign: "center",
						backgroundColor: "#f8f9fa",
						borderRadius: "8px",
						margin: "20px 0",
					}}
				>
					<h2>No Active Phase</h2>
					<p>Start a new phase to continue your journey through Colostle.</p>
					<button
						onClick={() => setShowNewPhaseForm(true)}
						style={{
							padding: "10px 20px",
							fontSize: "16px",
							backgroundColor: "#4a69bd",
							color: "white",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
							marginTop: "10px",
						}}
					>
						Start New Phase
					</button>
				</div>
			);
		}

		switch (currentPhase.type) {
			case "exploration":
				return <ExplorationPhase />;
			case "combat":
				return <CombatPhase />;
			case "event":
				return <EventPhase />;
			default:
				return <div>Unknown phase type</div>;
		}
	};

	return (
		<div className="dashboard-container">
			<header
				style={{
					backgroundColor: "#343a40",
					color: "white",
					padding: "15px 20px",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div className="logo">
					<h1 style={{ margin: 0, fontSize: "24px" }}>Colostle Companion</h1>
				</div>

				{character && (
					<div
						className="character-info"
						style={{ display: "flex", alignItems: "center" }}
					>
						<div style={{ marginRight: "15px", textAlign: "right" }}>
							<div style={{ fontWeight: "bold" }}>{character.name}</div>
							<div style={{ fontSize: "12px", opacity: "0.8" }}>
								{character.traits.join(" • ")}
							</div>
						</div>

						<div
							style={{
								width: "40px",
								height: "40px",
								borderRadius: "50%",
								backgroundColor: "#6c757d",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "18px",
							}}
						>
							{character.name.charAt(0)}
						</div>
					</div>
				)}
			</header>

			<div
				style={{
					display: "flex",
					height: "calc(100vh - 70px)",
				}}
			>
				{/* Sidebar */}
				<div
					style={{
						width: "300px",
						borderRight: "1px solid #dee2e6",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<div style={{ padding: "15px" }}>
						<button
							onClick={() => setShowNewPhaseForm(true)}
							style={{
								width: "100%",
								padding: "10px",
								fontSize: "16px",
								backgroundColor: "#4a69bd",
								color: "white",
								border: "none",
								borderRadius: "5px",
								cursor: "pointer",
							}}
						>
							+ New Phase
						</button>
					</div>

					<div style={{ flex: 1, overflowY: "auto" }}>
						<PhaseHistory />
					</div>
				</div>

				{/* Main content */}
				<div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
					{renderCurrentPhase()}
				</div>
			</div>

			{showNewPhaseForm && (
				<NewPhaseForm onClose={() => setShowNewPhaseForm(false)} />
			)}
		</div>
	);
};
