import { OceanEncounter } from "../types/gameData";

const OCEAN_ENCOUNTERS: OceanEncounter[] = [
	{
		id: "ace",
		name: "Castle Tower",
		description:
			"A single castle tower sticks up out of the water, waves splashing around where it connects with the sea. There is a doorway that is accessible from the height of the sea, and when you look down into the interior you are stunned to see that it goes deep down into an underwater complex, completely airtight from the sea around it. Check WEATHER.",
		conditions: {
			black: "Uninhabited",
			red: "You hear voices deep within...",
		},
	},
	{
		id: "2",
		name: "Adventurer",
		description:
			"Another seagoing adventurer in their own vessel. If not friendly and you choose to fight instead of flee, consult the COMBAT rules and create a person opponent. Check WEATHER.",
		conditions: {
			black: "Friendly",
			red: "Not friendly",
		},
	},
	{
		id: "3",
		name: "Shipwreck",
		description:
			"Shipwreck. You pull up alongside the wrecked vessel. If it is intact then you can explore within and find 2 ITEMS. If it is wrecked then you find a single ITEM floating in the wreckage.",
		conditions: {
			black: "Intact",
			red: "Wrecked",
		},
	},
	{
		id: "4",
		name: "Castle Island",
		description:
			"An island with the tell-tale crenellations of a castle around its perimeter. Could it be that you are seeing just the very top of a huge Rook below the waves?",
		conditions: {
			black: "Dead",
			red: "The Rooks traps are still active!",
		},
	},
	{
		id: "5",
		name: "Sea Creature",
		description:
			"A huge seagoing creature is swimming just below the surface. Maybe it's leading you somewhere, maybe you could hunt it for food? Check WEATHER.",
		conditions: {
			black: "Swims past your vessel",
			red: "Hits your vessel as it passes!",
		},
	},
	{
		id: "6",
		name: "Sea Cave",
		description:
			"Sea cave, large enough for your vessel to enter. It's huge, cavernous within, like an underground river leading from one cavern to the next. If inhabited the creatures you meet are not human. If Uninhabited check the ITEM table for what you find.",
		conditions: {
			black: "Uninhabited",
			red: "Inhabited",
		},
	},
	{
		id: "7",
		name: "Pirate Ship",
		description:
			"A pirate ship! The pirates lasso your ship and bring you aboard. This is not a time to fight - you must sneak out and escape the pirate ship! Tell your story of how you navigate the halls and decks of the pirate ship and how you find either the treasure or the weapon that you take back with you.",
		conditions: {
			black: "TREASURE to find",
			red: "A WEAPON to find",
		},
	},
	{
		id: "8",
		name: "Underwater Ruins",
		description:
			"Shallow waters and underwater ruins. If the weather is good, you could drop anchor and swim down to investigate...",
		conditions: {
			black: "TREASURE to find",
			red: "ROOK PARTS to find",
		},
	},
	{
		id: "9",
		name: "Small Island",
		description:
			"A small island. Consult the base rulebook for what you find here for ONE EXPLORATION phase. That is all there is to find here, return to the SEA to continue. Check WEATHER.",
		conditions: {
			black: "Uninhabited",
			red: "Inhabited",
		},
	},
	{
		id: "10",
		name: "Coastline",
		description:
			"A coastline. If you decide to disembark here then return to the base rulebook for ongoing EXPLORATION phases. Check WEATHER.",
		conditions: {
			black: "Unguarded",
			red: "Guarded",
		},
	},
	{
		id: "jack",
		name: "Small Island with Item",
		description:
			"You find a small island, upon which you discover an Item. Check the ITEM table",
		conditions: {
			black: "",
			red: "",
		},
	},
	{
		id: "queen",
		name: "Medium Rook",
		description: "Medium Rook",
		conditions: {
			black: "",
			red: "",
		},
	},
	{
		id: "king",
		name: "Massive Rook",
		description: "Massive Rook",
		conditions: {
			black: "",
			red: "",
		},
	},
];

export default OCEAN_ENCOUNTERS;
