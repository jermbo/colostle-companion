import { useCallback } from "react";
import {
	Card,
	Location,
	Encounter,
	OceanEncounter,
	Weather,
	CityAmenity,
	Event,
	Item,
} from "../types/gameData";

// Import the data with type assertions
import locationsData from "../data/locations";
import encountersData from "../data/encounters";
import oceanEncountersData from "../data/ocean-encounters";
import eventsData from "../data/events";
import itemsData from "../data/items";
import weatherData from "../data/weather";
import cityAmenitiesData from "../data/city-amenities";

export interface CardInterpretation {
	type:
		| "location"
		| "encounter"
		| "oceanEncounter"
		| "weather"
		| "cityAmenity"
		| "event"
		| "item";
	name: string;
	description: string;
	conditionText?: string;
}

export const useCardInterpreter = () => {
	const interpretCard = useCallback(
		(
			card: Card,
			phase: "exploration" | "combat" | "event"
		): CardInterpretation => {
			const { id, suit, color } = card;

			switch (phase) {
				case "exploration":
					if (color === "black") {
						// Locations for black cards during exploration
						const location = (locationsData as Location[]).find(
							(loc) => loc.id === id
						);
						const conditionText =
							suit === "spades"
								? location?.conditions.spades
								: location?.conditions.clubs;

						return {
							type: "location",
							name: location?.name || "Unknown Location",
							description: location?.description || "Description not available",
							conditionText,
						};
					} else {
						// Encounters for red cards during exploration
						const encounter = (encountersData as Encounter[]).find(
							(enc) => enc.id === id
						);
						const conditionText =
							suit === "hearts"
								? encounter?.conditions.hearts
								: encounter?.conditions.diamonds;

						return {
							type: "encounter",
							name: encounter?.name || "Unknown Encounter",
							description:
								encounter?.description || "Description not available",
							conditionText,
						};
					}

				case "combat":
					// For combat phases, the card can represent different things
					if (color === "black") {
						// Ocean encounters for black cards during combat
						const oceanEncounter = (
							oceanEncountersData as OceanEncounter[]
						).find((enc) => enc.id === id);
						const conditionText = oceanEncounter?.conditions.black;

						return {
							type: "oceanEncounter",
							name: oceanEncounter?.name || "Unknown Ocean Encounter",
							description:
								oceanEncounter?.description || "Description not available",
							conditionText,
						};
					} else {
						// Weather conditions for red cards during combat
						const weatherCondition = (weatherData as Weather[]).find(
							(w) => w.id === id
						);

						return {
							type: "weather",
							name: weatherCondition?.name || "Unknown Weather",
							description:
								weatherCondition?.description || "Description not available",
						};
					}

				case "event":
					// For event phases, cards can represent city amenities, events, or items
					if (suit === "hearts") {
						const cityAmenity = (cityAmenitiesData as CityAmenity[]).find(
							(ca) => ca.id === id
						);
						return {
							type: "cityAmenity",
							name: cityAmenity?.name || "Unknown City Amenity",
							description:
								cityAmenity?.description || "Description not available",
						};
					} else if (suit === "diamonds") {
						const event = (eventsData as Event[]).find((e) => e.id === id);
						return {
							type: "event",
							name: event?.name || "Unknown Event",
							description: event?.description || "Description not available",
						};
					} else {
						const item = (itemsData as Item[]).find((i) => i.id === id);
						return {
							type: "item",
							name: item?.name || "Unknown Item",
							description: item?.description || "Description not available",
						};
					}

				default:
					return {
						type: "event",
						name: "Unknown Card",
						description: "This card could not be interpreted.",
					};
			}
		},
		[]
	);

	return { interpretCard };
};
