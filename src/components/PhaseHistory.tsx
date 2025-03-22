import React from "react";
import { useGame, StoryPhase } from "../context/GameContext";

export const PhaseHistory: React.FC = () => {
	const { gameState, goToPhase } = useGame();
	const { storyPhases, currentPhaseIndex } = gameState;

	if (storyPhases.length === 0) {
		return (
			<section className="empty-history">
				<p>
					No story phases yet. Start your adventure by creating a new phase.
				</p>
			</section>
		);
	}

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleString(undefined, {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getPhaseIcon = (type: StoryPhase["type"]) => {
		switch (type) {
			case "exploration":
				return "🧭";
			case "combat":
				return "⚔️";
			case "event":
				return "🎲";
			default:
				return "📜";
		}
	};

	const getPhaseColor = (type: StoryPhase["type"]) => {
		switch (type) {
			case "exploration":
				return "#4a69bd";
			case "combat":
				return "#9b2226";
			case "event":
				return "#457b9d";
			default:
				return "#6c757d";
		}
	};

	return (
		<section className="phase-history">
			<h2 id="journey-log-title">Journey Log</h2>
			<ul
				className="phase-list"
				aria-labelledby="journey-log-title"
				role="list"
			>
				{storyPhases.map((phase, index) => (
					<li
						key={phase.id}
						className={`phase-item ${
							index === currentPhaseIndex ? "active" : ""
						}`}
					>
						<button
							onClick={() => goToPhase(index)}
							className="phase-item-button"
							aria-pressed={index === currentPhaseIndex}
							aria-label={`${phase.title}, ${phase.type} phase`}
						>
							<span
								className="phase-icon"
								aria-hidden="true"
								style={{ backgroundColor: getPhaseColor(phase.type) }}
							>
								{getPhaseIcon(phase.type)}
							</span>

							<div className="phase-details">
								<div className="phase-header">
									<h3 className="phase-title">{phase.title}</h3>
									<time
										className="phase-date"
										dateTime={new Date(phase.timestamp).toISOString()}
									>
										{formatDate(phase.timestamp)}
									</time>
								</div>

								{phase.description && (
									<p className="phase-description">
										{phase.description.substring(0, 100)}
										{phase.description.length > 100 ? "..." : ""}
									</p>
								)}

								<div className="phase-metadata">
									<span className="phase-cards-count">
										<strong>Cards:</strong> {phase.cards.length}
									</span>
									{phase.notes && (
										<span className="phase-has-notes">📝 Has notes</span>
									)}
								</div>
							</div>
						</button>
					</li>
				))}
			</ul>
		</section>
	);
};
