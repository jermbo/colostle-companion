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
		<div
			className="card-interpretation-container"
			style={{
				display: "flex",
				margin: "20px 0",
				padding: "15px",
				borderRadius: "8px",
				backgroundColor: "#f8f9fa",
				boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
			}}
		>
			<div className="card-visual" style={{ flexShrink: 0 }}>
				<CardDisplay card={card} showDetails={true} />
			</div>

			<div
				className="interpretation-details"
				style={{ marginLeft: "20px", flex: 1 }}
			>
				<div
					className="interpretation-type"
					style={{
						display: "inline-block",
						padding: "5px 10px",
						borderRadius: "4px",
						backgroundColor: "#e9ecef",
						fontSize: "14px",
						marginBottom: "10px",
					}}
				>
					{typeToLabel[interpretation.type]}
				</div>

				<h3 style={{ marginTop: 0, marginBottom: "10px", fontSize: "20px" }}>
					{interpretation.name}
				</h3>

				<p
					style={{ marginBottom: "15px", fontSize: "16px", lineHeight: "1.5" }}
				>
					{interpretation.description}
				</p>

				{interpretation.conditionText && (
					<div
						className="condition-text"
						style={{
							padding: "10px",
							backgroundColor: "#e2e3e5",
							borderRadius: "4px",
							fontSize: "14px",
						}}
					>
						<strong>Condition:</strong> {interpretation.conditionText}
					</div>
				)}
			</div>
		</div>
	);
};
