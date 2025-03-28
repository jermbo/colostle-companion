import React, { useState } from "react";
import { useGame, StoryPhase } from "../context/GameContext";
import { CardDisplay } from "../components/CardDisplay";
import { CardInterpretationDisplay } from "../components/CardInterpretationDisplay";

interface ExplorationPhaseProps {
	phase: StoryPhase;
}

export const ExplorationPhase: React.FC<ExplorationPhaseProps> = ({
	phase,
}) => {
	const {
		drawCard,
		addCardToCurrentPhase,
		updatePhaseDescription,
		updatePhaseNotes,
	} = useGame();

	const [showDrawArea, setShowDrawArea] = useState(true);
	const [description, setDescription] = useState(phase.description || "");
	const [notes, setNotes] = useState(phase.notes || "");

	const drawnCards = phase.cards || [];

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
		setDescription(phase.description || "");
		setNotes(phase.notes || "");
	}, [phase]);

	return (
		<section className="exploration-phase-container">
			<h1 className="phase-title">{phase.title}</h1>

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
						placeholder="Describe your exploration journey..."
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
						placeholder="Keep track of discoveries here..."
						className="form-textarea notes-textarea"
					/>
				</div>
			</div>

			<section className="card-section">
				<h2 className="section-title">Exploration Cards</h2>

				<div className="tab-buttons">
					<button
						onClick={() => setShowDrawArea(true)}
						className={`tab-button ${showDrawArea ? "active" : ""}`}
						aria-pressed={showDrawArea}
					>
						Draw Exploration Cards
					</button>

					<button
						onClick={() => setShowDrawArea(false)}
						className={`tab-button ${!showDrawArea ? "active" : ""}`}
						aria-pressed={!showDrawArea}
					>
						Interpretations
					</button>
				</div>

				{showDrawArea ? (
					<div
						className="draw-area"
						role="region"
						aria-label="Draw exploration cards"
					>
						<div className="draw-area-container">
							<button onClick={handleDrawCard} className="draw-button">
								Draw Exploration Card
							</button>

							<ul className="drawn-cards" aria-label="Drawn exploration cards">
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
									phaseType="exploration"
								/>
							))
						) : (
							<p>No exploration cards have been drawn yet.</p>
						)}
					</section>
				)}
			</section>
		</section>
	);
};
