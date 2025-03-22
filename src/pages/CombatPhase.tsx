import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { CardDisplay } from "../components/CardDisplay";
import { CardInterpretationDisplay } from "../components/CardInterpretationDisplay";

export const CombatPhase: React.FC = () => {
	const {
		gameState,
		drawCard,
		addCardToCurrentPhase,
		updatePhaseDescription,
		updatePhaseNotes,
	} = useGame();

	const [showDrawArea, setShowDrawArea] = useState(true);
	const [description, setDescription] = useState("");
	const [notes, setNotes] = useState("");

	const currentPhase = gameState.storyPhases[gameState.currentPhaseIndex];
	const drawnCards = currentPhase?.cards || [];

	const handleDrawCard = () => {
		const card = drawCard();
		addCardToCurrentPhase(card);
	};

	const handleSaveDescription = () => {
		updatePhaseDescription(description);
	};

	const handleSaveNotes = () => {
		updatePhaseNotes(notes);
	};

	// Set local state from phase data when it changes
	React.useEffect(() => {
		if (currentPhase) {
			setDescription(currentPhase.description || "");
			setNotes(currentPhase.notes || "");
		}
	}, [currentPhase]);

	if (!currentPhase) {
		return <div>No active combat phase. Please start a new phase.</div>;
	}

	return (
		<div className="combat-phase-container" style={{ padding: "20px" }}>
			<h1 style={{ marginBottom: "20px" }}>{currentPhase.title}</h1>

			<div className="phase-inputs" style={{ marginBottom: "30px" }}>
				<div style={{ marginBottom: "20px" }}>
					<label
						htmlFor="description"
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: "bold",
						}}
					>
						Description
					</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						onBlur={handleSaveDescription}
						placeholder="Describe the combat encounter..."
						style={{
							width: "100%",
							padding: "10px",
							fontSize: "16px",
							borderRadius: "5px",
							border: "1px solid #ccc",
							minHeight: "100px",
							resize: "vertical",
						}}
					/>
				</div>

				<div>
					<label
						htmlFor="notes"
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: "bold",
						}}
					>
						Notes
					</label>
					<textarea
						id="notes"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						onBlur={handleSaveNotes}
						placeholder="Track combat details here..."
						style={{
							width: "100%",
							padding: "10px",
							fontSize: "16px",
							borderRadius: "5px",
							border: "1px solid #ccc",
							minHeight: "80px",
							resize: "vertical",
						}}
					/>
				</div>
			</div>

			<div className="card-section">
				<h2 style={{ marginBottom: "15px" }}>Combat Cards</h2>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "20px",
					}}
				>
					<button
						onClick={() => setShowDrawArea(true)}
						style={{
							padding: "8px 15px",
							backgroundColor: showDrawArea ? "#9b2226" : "#e9ecef", // Red theme for combat
							color: showDrawArea ? "white" : "#495057",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
						}}
					>
						Draw Combat Cards
					</button>

					<button
						onClick={() => setShowDrawArea(false)}
						style={{
							padding: "8px 15px",
							backgroundColor: !showDrawArea ? "#9b2226" : "#e9ecef",
							color: !showDrawArea ? "white" : "#495057",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
						}}
					>
						Interpretations
					</button>
				</div>

				{showDrawArea ? (
					<div className="draw-area">
						<div
							style={{
								border: "2px dashed #ccc",
								borderRadius: "10px",
								padding: "30px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "#f8f9fa",
							}}
						>
							<button
								onClick={handleDrawCard}
								style={{
									padding: "12px 24px",
									fontSize: "18px",
									backgroundColor: "#9b2226", // Red theme for combat
									color: "white",
									border: "none",
									borderRadius: "5px",
									cursor: "pointer",
									marginBottom: "20px",
								}}
							>
								Draw Combat Card
							</button>

							<div
								className="drawn-cards"
								style={{
									display: "flex",
									flexWrap: "wrap",
									justifyContent: "center",
								}}
							>
								{drawnCards.map((card, index) => (
									<CardDisplay
										key={`card-${index}`}
										card={card}
										onClick={() => setShowDrawArea(false)}
									/>
								))}
							</div>
						</div>
					</div>
				) : (
					<div className="interpretation-area">
						{drawnCards.length > 0 ? (
							drawnCards.map((card, index) => (
								<CardInterpretationDisplay
									key={`interp-${index}`}
									card={card}
									phaseType="combat"
								/>
							))
						) : (
							<p>No combat cards have been drawn yet.</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
