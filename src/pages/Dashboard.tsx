import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { PhaseHistory } from "../components/PhaseHistory";
import { NewPhaseForm } from "../components/NewPhaseForm";
import { ExplorationPhase } from "./ExplorationPhase";
import { CombatPhase } from "./CombatPhase";
import { EventPhase } from "./EventPhase";
import ThemeSwitcher from "../components/ThemeSwitcher";

export const Dashboard: React.FC = () => {
	const { gameState } = useGame();
	const { storyPhases, currentPhaseIndex, character } = gameState;
	const [showNewPhaseForm, setShowNewPhaseForm] = useState(false);

	const currentPhase = storyPhases[currentPhaseIndex];

	// Render the current phase based on its type
	const renderCurrentPhase = () => {
		if (!currentPhase) {
			return (
				<section className="no-phase">
					<h2>No Active Phase</h2>
					<p>Start a new phase to continue your journey through Colostle.</p>
					<button
						onClick={() => setShowNewPhaseForm(true)}
						className="primary-button"
						aria-label="Start New Phase"
					>
						Start New Phase
					</button>
				</section>
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
				return <section aria-label="Unknown phase">Unknown phase type</section>;
		}
	};

	return (
		<div className="dashboard-container">
			<header className="main-header">
				<div className="logo">
					<h1>Colostle Companion</h1>
				</div>

				<div className="header-actions">
					<ThemeSwitcher />

					{character && (
						<div className="character-info">
							<div className="character-text">
								<div className="character-name">{character.name}</div>
								<div className="character-traits">
									{character.traits.join(" • ")}
								</div>
							</div>

							<div className="character-avatar" aria-hidden="true">
								{character.name.charAt(0)}
							</div>
						</div>
					)}
				</div>
			</header>

			<main className="dashboard-content">
				{/* Sidebar */}
				<nav className="phases-sidebar">
					<div className="new-phase-button-container">
						<button
							onClick={() => setShowNewPhaseForm(true)}
							className="new-phase-button"
							aria-label="Create new phase"
						>
							+ New Phase
						</button>
					</div>

					<div className="phase-history-container">
						<PhaseHistory />
					</div>
				</nav>

				{/* Main content */}
				<article className="main-phase-content">{renderCurrentPhase()}</article>
			</main>

			{showNewPhaseForm && (
				<NewPhaseForm onClose={() => setShowNewPhaseForm(false)} />
			)}
		</div>
	);
};
