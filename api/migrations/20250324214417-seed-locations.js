"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

// Locations data from the UI
const LOCATIONS = [
	{
		id: "ace",
		name: "Treasure",
		description:
			"A large treasure. Maybe a chest or a valuable golden object, perched atop an altar. Whatever it is, it fills you with hope for your adventure. Add 1 point to either your EXPLORATION or COMBAT scores and come up with an item for your inventory.",
		spades: "Untouched",
		clubs: "Evidence of attempted raids",
	},
	{
		id: "2",
		name: "Door",
		description:
			"A door. No ordinary door - a door between Rooms in the Colostle; it's impossible, huge beyond imagining, disappearing upward into the sky. If you hadn't seen it from a distance, you'd have thought it was just another wall. If it's RUINED maybe you can slip through a gap, but if it's INTACT you might have to find a mechanism to unlock or open it.",
		spades: "Intact/Locked",
		clubs: "Ruined",
	},
	{
		id: "3",
		name: "Staircase",
		description:
			"A staircase leading to another floor in the Colostle. Massive - and a quest in itself to climb - it vanishes into mist and clouds. Each step is the height of a small house - who could have possibly built this? If this is not the first staircase you have come across, you can consult the BATTLEMENTS module to take you to the Colostle Rooftops. If it is the first staircase you have found, it takes you to another floor of the Colostle.",
		spades: "Intact",
		clubs: "Ruined",
	},
	{
		id: "4",
		name: "Ruins",
		description:
			"Ruins of a people you've never heard of. The unfamiliar inscriptions and architecture suggest these people lived a very long time ago. Draw an EVENT card for something else to happen here.",
		spades: "Somewhat intact",
		clubs: "Mostly rubble",
	},
	{
		id: "5",
		name: "Mechanism",
		description:
			"A great, strange mechanism that seems to operate something in the Colostle. Pipes, gearwheels and levers; it seems oversized but you think you can operate it. If DAMAGED maybe you need to find something to repair it?",
		spades: "Functional",
		clubs: "Damaged",
	},
	{
		id: "6",
		name: "Trap",
		description:
			"A trap! Maybe a hunters trap, or a pit, or some old machinery. What do you do now?",
		spades: "You avoid it!",
		clubs: "You are caught in it!",
	},
	{
		id: "7",
		name: "Cave Entrance",
		description:
			"A cave entrance. A darkness beckons beyond. Could it lead to deeper parts of the Colostle itself?",
		spades: "Flat and easily navigable",
		clubs: "Deep and hard to climb into",
	},
	{
		id: "8",
		name: "Sea",
		description:
			"The sea. A huge expanse of water stretches out before you. You stand on a rocky coast, or a beach, looking out. The water stretches to the horizon but beyond it you can see the tell-tale columns and ceiling supports of the Colostle; it's all still within a room. If you don't want to use the expansion module, consider this a coastal region of cliffs and beaches. Otherwise, consult the OCEANS module to explore the SEA!",
		spades: "Calm",
		clubs: "Stormy",
	},
	{
		id: "9",
		name: "Calling",
		description:
			"CALLING - You come across a place that is key to your CALLING. Maybe a building with a clue in it, or one of the locations you were looking for on your quest!",
		spades: "Something you were looking for",
		clubs: "A clue to the next step on your quest",
	},
	{
		id: "10",
		name: "City",
		description:
			"You come across a City; a huge settlement unlike anything you have ever seen before. Buildings constructed from Rook parts, seemingly motorised vehicles and mechanisms on every corner, and best of all, shops, culture, and hunters; a place of commerce, trade and meeting. If you don't want to use the expansion module, consider the city ABANDONED. Otherwise, consult the CITY module to discover this astonishing new location.",
		spades: "Thriving",
		clubs: "Abandoned",
	},
];

exports.up = function (db) {
	// Create a promise array for all inserts
	const insertPromises = LOCATIONS.map((location) => {
		return db.insert(
			"locations",
			["id", "name", "description", "conditions_spades", "conditions_clubs"],
			[
				location.id,
				location.name,
				location.description,
				location.spades,
				location.clubs,
			]
		);
	});

	// Execute all inserts
	return Promise.all(insertPromises);
};

exports.down = function (db) {
	// Delete all seeded locations
	return db.runSql(
		"DELETE FROM locations WHERE id IN (" +
			LOCATIONS.map((location) => `'${location.id}'`).join(",") +
			")"
	);
};

exports._meta = {
	version: 1,
};
