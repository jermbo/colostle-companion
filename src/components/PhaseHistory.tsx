import React from "react";
import { useGame, StoryPhase } from "../context/GameContext";

export const PhaseHistory: React.FC = () => {
	const { gameState, goToPhase } = useGame();
	const { storyPhases, currentPhaseIndex } = gameState;

	if (storyPhases.length === 0) {
		return (
			<div
				className="empty-history"
				style={{ padding: "20px", textAlign: "center" }}
			>
				<p>
					No story phases yet. Start your adventure by creating a new phase.
				</p>
			</div>
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
		<div className="phase-history" style={{ padding: "15px" }}>
			<h2 style={{ marginBottom: "20px" }}>Journey Log</h2>
			<div className="phase-list">
				{storyPhases.map((phase, index) => (
					<div
						key={phase.id}
						onClick={() => goToPhase(index)}
						className={`phase-item ${
							index === currentPhaseIndex ? "active" : ""
						}`}
						style={{
							padding: "12px 15px",
							marginBottom: "10px",
							borderRadius: "5px",
							backgroundColor:
								index === currentPhaseIndex ? "#f8f9fa" : "white",
							border: `1px solid ${
								index === currentPhaseIndex
									? getPhaseColor(phase.type)
									: "#dee2e6"
							}`,
							boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
						}}
					>
						<div
							className="phase-icon"
							style={{
								width: "35px",
								height: "35px",
								borderRadius: "50%",
								backgroundColor: getPhaseColor(phase.type),
								color: "white",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginRight: "12px",
								fontSize: "18px",
							}}
						>
							{getPhaseIcon(phase.type)}
						</div>

						<div className="phase-details" style={{ flex: "1" }}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<h3 style={{ margin: "0", fontSize: "16px" }}>{phase.title}</h3>
								<span style={{ fontSize: "12px", color: "#6c757d" }}>
									{formatDate(phase.timestamp)}
								</span>
							</div>

							{phase.description && (
								<p
									style={{
										margin: "5px 0 0 0",
										fontSize: "14px",
										color: "#495057",
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									{phase.description.substring(0, 100)}
									{phase.description.length > 100 ? "..." : ""}
								</p>
							)}

							<div style={{ marginTop: "5px", fontSize: "12px" }}>
								<span style={{ marginRight: "10px" }}>
									<strong>Cards:</strong> {phase.cards.length}
								</span>
								{phase.notes && <span>📝 Has notes</span>}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
