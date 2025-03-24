"use strict";

exports.up = function (db) {
	return db.createTable("items", {
		id: { type: "string", primaryKey: true, notNull: true },
		name: { type: "string", notNull: true, length: 100 },
		description: { type: "text" },
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
	return db.dropTable("items");
};

exports._meta = {
	version: 1,
};
