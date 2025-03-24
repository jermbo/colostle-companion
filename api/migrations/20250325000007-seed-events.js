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

exports.up = function (db) {
	const events = [
		{ id: "ace", name: "You Meet a Friend", description: "" },
		{ id: "2", name: "A Storm", description: "" },
		{ id: "3", name: "Something Falls from the Ceiling", description: "" },
		{ id: "4", name: "You Fall", description: "" },
		{ id: "5", name: "A Loud Noise", description: "" },
		{ id: "6", name: "A Strange Feeling", description: "" },
		{ id: "7", name: "Sun Sets or Rises", description: "" },
		{ id: "8", name: "A Fire Starts", description: "" },
		{ id: "9", name: "Something Breaks", description: "" },
		{ id: "10", name: "Your Way is Blocked", description: "" },
		{ id: "jack", name: "You Are Surrounded", description: "" },
		{ id: "queen", name: "Hunger Sets In", description: "" },
		{ id: "king", name: "Create/Repair Something", description: "" },
	];

	const promises = events.map((event) => {
		return db.insert(
			"events",
			["id", "name", "description", "created_at", "updated_at"],
			[
				event.id,
				event.name,
				event.description,
				new String("CURRENT_TIMESTAMP"),
				new String("CURRENT_TIMESTAMP"),
			]
		);
	});

	return Promise.all(promises);
};

exports.down = function (db) {
	return db.runSql("DELETE FROM events");
};

exports._meta = {
	version: 1,
};
