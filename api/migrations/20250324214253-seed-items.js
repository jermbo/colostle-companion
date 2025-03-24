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

// Items data from the UI
const ITEMS = [
	{ id: "ace", name: "Treasure", description: "For trading" },
	{ id: "2", name: "Supplies", description: "" },
	{ id: "3", name: "Knowledge", description: "" },
	{
		id: "4",
		name: "Herbs/Ingredients",
		description: "To make a healing potion to heal one WOUND",
	},
	{ id: "5", name: "Key", description: "" },
	{ id: "6", name: "Vehicle", description: "" },
	{ id: "7", name: "Tame Animal", description: "" },
	{ id: "8", name: "Potion", description: "" },
	{ id: "9", name: "Machine Part", description: "" },
	{ id: "10", name: "Map", description: "" },
	{ id: "jack", name: "Weapon", description: "" },
	{ id: "queen", name: "Artefact/Idol", description: "" },
	{ id: "king", name: "Treasures", description: "For trading (2)" },
];

exports.up = function (db) {
	// Create a promise array for all inserts
	const insertPromises = ITEMS.map((item) => {
		return db.insert(
			"items",
			["id", "name", "description"],
			[item.id, item.name, item.description || ""]
		);
	});

	// Execute all inserts
	return Promise.all(insertPromises);
};

exports.down = function (db) {
	// Delete all seeded items
	return db.runSql(
		"DELETE FROM items WHERE id IN (" +
			ITEMS.map((item) => `'${item.id}'`).join(",") +
			")"
	);
};

exports._meta = {
	version: 1,
};
