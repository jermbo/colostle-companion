import React from "react";
import { Card } from "../types/gameData";

interface CardDisplayProps {
	card: Card;
	onClick?: () => void;
	showDetails?: boolean;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({
	card,
	onClick,
	showDetails = false,
}) => {
	const { id, suit, color } = card;

	const suitSymbol = {
		hearts: "♥",
		diamonds: "♦",
		clubs: "♣",
		spades: "♠",
	}[suit];

	const cardClasses = `card-display ${color} ${showDetails ? "expanded" : ""}`;
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (onClick && (e.key === "Enter" || e.key === " ")) {
			onClick();
		}
	};

	return (
		<button
			onClick={onClick}
			onKeyPress={handleKeyPress}
			className={cardClasses}
			type="button"
			aria-label={`${id} of ${suit}`}
			tabIndex={onClick ? 0 : -1}
		>
			<span className="card-corner card-top-left">{id.toUpperCase()}</span>

			<span className="card-corner card-top-right">{suitSymbol}</span>

			<span className="card-corner card-bottom-right rotated">
				{id.toUpperCase()}
			</span>

			<span className="card-corner card-bottom-left rotated">{suitSymbol}</span>

			<span className="card-center-symbol">{suitSymbol}</span>
		</button>
	);
};
