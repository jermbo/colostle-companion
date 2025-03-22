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

	return (
		<div
			onClick={onClick}
			className={`card-display ${color} ${showDetails ? "expanded" : ""}`}
			style={{
				width: showDetails ? "200px" : "120px",
				height: showDetails ? "280px" : "170px",
				background: "white",
				border: "1px solid #ccc",
				borderRadius: "10px",
				boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
				display: "flex",
				flexDirection: "column",
				padding: "10px",
				position: "relative",
				margin: "10px",
				cursor: onClick ? "pointer" : "default",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: "10px",
					left: "10px",
					fontSize: showDetails ? "24px" : "18px",
					color: color,
					fontWeight: "bold",
				}}
			>
				{id.toUpperCase()}
			</div>

			<div
				style={{
					position: "absolute",
					top: "10px",
					right: "10px",
					fontSize: showDetails ? "24px" : "18px",
					color: color,
					fontWeight: "bold",
				}}
			>
				{suitSymbol}
			</div>

			<div
				style={{
					position: "absolute",
					bottom: "10px",
					right: "10px",
					fontSize: showDetails ? "24px" : "18px",
					color: color,
					fontWeight: "bold",
					transform: "rotate(180deg)",
				}}
			>
				{id.toUpperCase()}
			</div>

			<div
				style={{
					position: "absolute",
					bottom: "10px",
					left: "10px",
					fontSize: showDetails ? "24px" : "18px",
					color: color,
					fontWeight: "bold",
					transform: "rotate(180deg)",
				}}
			>
				{suitSymbol}
			</div>

			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					fontSize: showDetails ? "64px" : "40px",
					color: color,
				}}
			>
				{suitSymbol}
			</div>
		</div>
	);
};
