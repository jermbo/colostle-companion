import React, { useState, useEffect } from "react";
import { useGame, PhaseType } from "../context/GameContext";
import { PhaseHistory } from "../components/PhaseHistory";
import { NewPhaseForm } from "../components/NewPhaseForm";
import { ExplorationPhase } from "./ExplorationPhase";
import ThemeSwitcher from "../components/ThemeSwitcher";

export const Dashboard: React.FC = () => {
	const { gameState, saveCurrentGame } = useGame();
	const { character, storyPhases, currentPhaseIndex } = gameState;
	const [showNewPhaseForm, setShowNewPhaseForm] = useState(false);
	const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
	const [saveStatus, setSaveStatus] = useState<
		"saving" | "saved" | "error" | null
	>(null);

	// Auto-save functionality - save after any change
	useEffect(() => {
		// Skip initial render
		if (!character) return;

		// Set a debounce timer to avoid too frequent saves
		const saveTimer = setTimeout(async () => {
			try {
				setSaveStatus("saving");
				await saveCurrentGame();
				setLastSaveTime(new Date());
				setSaveStatus("saved");

				// Reset the "saved" status after a few seconds
				setTimeout(() => {
					setSaveStatus(null);
				}, 3000);
			} catch (err) {
				console.error("Auto-save failed:", err);
				setSaveStatus("error");
			}
		}, 2000); // 2 second debounce

		return () => clearTimeout(saveTimer);
	}, [storyPhases, currentPhaseIndex, character, saveCurrentGame]);

	// Render the current phase based on its type
	const renderCurrentPhase = () => {
		if (storyPhases.length === 0 || currentPhaseIndex < 0) {
			return (
				<div className="empty-phase">
					<p>
						No phases created yet. Start by adding a new phase to begin your
						story.
					</p>
					<button
						onClick={() => setShowNewPhaseForm(true)}
						className="new-phase-button mobile-only"
					>
						+ New Phase
					</button>
				</div>
			);
		}

		const currentPhase = storyPhases[currentPhaseIndex];
		switch (currentPhase.type) {
			case "exploration":
				return <ExplorationPhase phase={currentPhase} />;
			case "combat":
				return <ExplorationPhase phase={currentPhase} />;
			case "event":
				return <ExplorationPhase phase={currentPhase} />;
			default:
				return <ExplorationPhase phase={currentPhase} />;
		}
	};

	// Render save status indicator
	const renderSaveStatus = () => {
		if (saveStatus === "saving") {
			return <span className="save-status saving">Saving...</span>;
		} else if (saveStatus === "saved") {
			return (
				<span className="save-status saved">
					Saved at {lastSaveTime?.toLocaleTimeString()}
				</span>
			);
		} else if (saveStatus === "error") {
			return <span className="save-status error">Error saving</span>;
		} else if (lastSaveTime) {
			return (
				<span className="save-status">
					Last saved: {lastSaveTime.toLocaleTimeString()}
				</span>
			);
		}
		return null;
	};

	return (
		<div className="dashboard-container">
			<header className="main-header">
				<div className="logo">
					<h1>Colostle Companion</h1>
				</div>

				<div className="header-actions">
					<div className="save-status-container">{renderSaveStatus()}</div>

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
