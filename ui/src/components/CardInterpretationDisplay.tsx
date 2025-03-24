import React from "react";
import { Card } from "../types/gameData";
import {
	useCardInterpreter,
	CardInterpretation,
} from "../hooks/useCardInterpreter";
import { PhaseType } from "../context/GameContext";
import { CardDisplay } from "./CardDisplay";

interface CardInterpretationDisplayProps {
	card: Card;
	phaseType: PhaseType;
}

export const CardInterpretationDisplay: React.FC<
	CardInterpretationDisplayProps
> = ({ card, phaseType }) => {
	const { interpretCard } = useCardInterpreter();
	const interpretation = interpretCard(card, phaseType);

	const typeToLabel = {
		location: "Location",
		encounter: "Encounter",
		oceanEncounter: "Ocean Encounter",
		weather: "Weather",
		cityAmenity: "City Amenity",
		event: "Event",
		item: "Item",
	};

	return (
		<article
			className="card-interpretation-container"
			aria-labelledby={`interpretation-title-${card.id}`}
		>
			<div className="card-visual">
				<CardDisplay card={card} showDetails={true} />
			</div>

			<div className="interpretation-details">
				<span className="interpretation-type-tag">
					{typeToLabel[interpretation.type]}
				</span>

				<h3
					id={`interpretation-title-${card.id}`}
					className="interpretation-title"
				>
					{interpretation.name}
				</h3>

				<p className="interpretation-description">
					{interpretation.description}
				</p>

				{interpretation.conditionText && (
					<div className="condition-text">
						<strong>Condition:</strong> {interpretation.conditionText}
					</div>
				)}
			</div>
		</article>
	);
};
