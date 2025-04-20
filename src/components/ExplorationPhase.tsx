import { useState } from "react";
import { CharacterClassInfo } from "@/types/character";
import ENCOUNTERS from "@/data/encounters";
import LOCATIONS from "@/data/locations";

interface Props {
	characterName: string;
	classInfo: CharacterClassInfo;
}

export const ExplorationPhase = ({ characterName, classInfo }: Props) => {
	const [drawnCards, setDrawnCards] = useState<Array<{ type: string; card: any }>>([]);
	const [currentCard, setCurrentCard] = useState<{ type: string; card: any } | null>(null);

	const drawCard = () => {
		if (drawnCards.length >= classInfo.explorationScore) {
			return; // Reached exploration limit
		}

		// Randomly choose between location and encounter
		const cardType = Math.random() < 0.5 ? "location" : "encounter";
		const deck = cardType === "location" ? LOCATIONS : ENCOUNTERS;
		const randomIndex = Math.floor(Math.random() * deck.length);
		const card = deck[randomIndex];

		setCurrentCard({ type: cardType, card });
		setDrawnCards((prev) => [...prev, { type: cardType, card }]);
	};

	const handleCardAction = () => {
		setCurrentCard(null);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mx-auto max-w-2xl">
				<div className="mb-8">
					<h1 className="mb-2 text-4xl font-bold">Exploration Phase</h1>
					<p className="text-lg text-gray-600">
						{characterName} - {classInfo.displayName}
					</p>
					<p className="text-lg text-gray-600">
						Cards drawn: {drawnCards.length} / {classInfo.explorationScore}
					</p>
				</div>

				<div className="mb-8">
					<button
						onClick={drawCard}
						disabled={drawnCards.length >= classInfo.explorationScore}
						className="btn btn-primary"
					>
						Draw Card
					</button>
				</div>

				{currentCard && (
					<div className="bg-base-200 rounded-lg p-6 shadow-lg">
						<h2 className="mb-4 text-2xl font-bold">{currentCard.card.name}</h2>
						<p className="mb-4 text-gray-700">{currentCard.card.description}</p>
						{currentCard.card.conditions && (
							<div className="mb-4">
								<h3 className="mb-2 text-xl font-semibold">Conditions:</h3>
								<ul className="list-disc pl-5">
									{Object.entries(currentCard.card.conditions).map(([key, value]) => (
										<li key={key} className="text-gray-600">
											{key}: {String(value)}
										</li>
									))}
								</ul>
							</div>
						)}
						<button onClick={handleCardAction} className="btn btn-secondary">
							Continue
						</button>
					</div>
				)}

				{drawnCards.length > 0 && (
					<div className="mt-8">
						<h2 className="mb-4 text-2xl font-bold">Drawn Cards</h2>
						<div className="space-y-4">
							{drawnCards.map((drawnCard, index) => (
								<div key={index} className="bg-base-200 rounded-lg p-4 shadow">
									<h3 className="text-xl font-semibold">{drawnCard.card.name}</h3>
									<p className="text-sm text-gray-600">Type: {drawnCard.type}</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ExplorationPhase;
