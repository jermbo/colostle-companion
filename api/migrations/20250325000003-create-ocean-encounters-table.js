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
	return db.createTable("ocean_encounters", {
		id: { type: "string", primaryKey: true, notNull: true },
		name: { type: "string", notNull: true, length: 100 },
		description: { type: "text" },
		conditions_red: { type: "string", length: 255 },
		conditions_black: { type: "string", length: 255 },
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
	return db.dropTable("ocean_encounters");
};

exports._meta = {
	version: 1,
};
