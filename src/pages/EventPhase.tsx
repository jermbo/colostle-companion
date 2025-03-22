import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { CardDisplay } from "../components/CardDisplay";
import { CardInterpretationDisplay } from "../components/CardInterpretationDisplay";

export const EventPhase: React.FC = () => {
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
		return (
			<section aria-label="No active phase" className="no-active-phase">
				No active event phase. Please start a new phase.
			</section>
		);
	}

	return (
		<section className="event-phase-container">
			<h1 className="phase-title">{currentPhase.title}</h1>

			<div className="phase-inputs">
				<div className="form-group">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						onBlur={handleSaveDescription}
						placeholder="Describe the event that's happening..."
						className="form-textarea"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="notes" className="form-label">
						Notes
					</label>
					<textarea
						id="notes"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						onBlur={handleSaveNotes}
						placeholder="Add event outcomes and details here..."
						className="form-textarea notes-textarea"
					/>
				</div>
			</div>

			<section className="card-section">
				<h2 className="section-title">Event Cards</h2>

				<div className="tab-buttons">
					<button
						onClick={() => setShowDrawArea(true)}
						className={`tab-button ${
							showDrawArea ? "active event-active" : ""
						}`}
						aria-pressed={showDrawArea}
					>
						Draw Event Cards
					</button>

					<button
						onClick={() => setShowDrawArea(false)}
						className={`tab-button ${
							!showDrawArea ? "active event-active" : ""
						}`}
						aria-pressed={!showDrawArea}
					>
						Interpretations
					</button>
				</div>

				{showDrawArea ? (
					<div
						className="draw-area"
						role="region"
						aria-label="Draw event cards"
					>
						<div className="draw-area-container">
							<button
								onClick={handleDrawCard}
								className="draw-button event-button"
							>
								Draw Event Card
							</button>

							<ul className="drawn-cards" aria-label="Drawn event cards">
								{drawnCards.map((card, index) => (
									<li key={`card-${index}`}>
										<CardDisplay
											card={card}
											onClick={() => setShowDrawArea(false)}
										/>
									</li>
								))}
							</ul>
						</div>
					</div>
				) : (
					<section
						className="interpretation-area"
						aria-label="Card interpretations"
					>
						{drawnCards.length > 0 ? (
							drawnCards.map((card, index) => (
								<CardInterpretationDisplay
									key={`interp-${index}`}
									card={card}
									phaseType="event"
								/>
							))
						) : (
							<p>No event cards have been drawn yet.</p>
						)}
					</section>
				)}
			</section>
		</section>
	);
};
