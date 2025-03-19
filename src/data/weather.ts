import { Weather } from "../types/gameData";

const WEATHER: Weather[] = [
	{
		id: "ace",
		name: "Sunshine",
		description: "Add one to your EXPLORATION or COMBAT score.",
	},
	{
		id: "2",
		name: "Strong Winds",
		description: "A good wind takes your boat where you want to go, quickly.",
	},
	{
		id: "3",
		name: "Fog",
		description:
			"Visibility is reduced to 2 feet in front of you. It is unnervingly quiet.",
	},
	{
		id: "4",
		name: "Heavy Rain",
		description:
			"No shelter, it pelts against your skin. You'll just have to sail on.",
	},
	{
		id: "5",
		name: "Calm",
		description:
			"No winds, baking heat. You will be stuck in the middle of the sea with no way to move for 24 hours.",
	},
	{
		id: "6",
		name: "Crosswind",
		description: "You are blown off course and are lost at sea for 24 hours.",
	},
	{
		id: "7",
		name: "Snow",
		description:
			"Small flakes settle on your boat, this is going to get cold...",
	},
	{
		id: "8",
		name: "Waterspout",
		description:
			"A column of water twirling with wind, it's heading toward you!",
	},
	{
		id: "9",
		name: "Storm",
		description: "Your boat is tossed by huge waves and heavy winds.",
	},
	{
		id: "10",
		name: "Lightning",
		description:
			"Forks of lightning light up the sky, the sea churns with malice.",
	},
	{
		id: "jack",
		name: "Ice",
		description:
			"The ocean freezes instantly around your boat. You are stuck for 24 hours.",
	},
	{
		id: "queen",
		name: "Tsunami",
		description:
			"A huge wave looms above your boat. Can you ride it out or will it smash your boat to pieces?",
	},
	{
		id: "king",
		name: "Maelstrom",
		description:
			"Your boat is damaged and you wake up stranded on a new island. Return to base book Encounter tables for your next EXPLORATION Phase",
	},
];

export default WEATHER;
