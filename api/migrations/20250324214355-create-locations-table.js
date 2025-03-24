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
	return db.createTable("locations", {
		id: { type: "string", primaryKey: true, notNull: true },
		name: { type: "string", notNull: true, length: 100 },
		description: { type: "text" },
		conditions_spades: { type: "string", length: 255 },
		conditions_clubs: { type: "string", length: 255 },
		created_at: {
			type: "timestamp",
			notNull: true,
			defaultValue: new String("CURRENT_TIMESTAMP"),
		},
		updated_at: {
			type: "timestamp",
			notNull: true,
			defaultValue: new String("CURRENT_TIMESTAMP"),
		},
	});
};

exports.down = function (db) {
	return db.dropTable("locations");
};

exports._meta = {
	version: 1,
};
