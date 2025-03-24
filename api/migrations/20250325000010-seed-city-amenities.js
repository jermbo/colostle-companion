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
	const cityAmenities = [
		{
			id: "ace",
			name: "Palace Grounds",
			description:
				"This city has a palace, and a ruler as well. This is likely a place of sumptuous architecture built out of only the most ornate Rook husks, at a high point in the city looking over everyone else. It is doubtful that a wanderer such as yourself would simply be allowed in but perhaps your story has given your character a reason to speak to the ruler? An offering would certainly help - maybe you have picked up a treasure on your adventure?",
		},
		{
			id: "2",
			name: "Lapidarist",
			description:
				"A Rookstone specialist; someone who can work these ancient magical stones and magically upgrade your equipment, for a price of course.\nFOR 1 TREASURE - they can add an additional magical ability (Ice, Rumble or Electric) to your helm.\nFOR 2 TREASURES - they can add a magical ability to an Arm, Rookling or Mount.\nFOR 3 TREASURES - they will share with you a Rookstone from their private collection. One that isn't Ice, Rumble or Electric; but a new one-of-a-kind magical power. You can come up with what this power is and how your character can use it.",
		},
		{
			id: "3",
			name: "Rooksmith",
			description:
				"Toiling away in their Mount Garages; Rooksmiths work on the mechanical parts of Rooks and convert them into vehicles or mounts to be ridden upon.\nFOR 3 TREASURES - they will build a custom mount for your character. It could be seaworthy, or landworthy and will feature some form of WEAPON based attack ability which you can choose (such as cannon, crossbow, battering ram etc.) See MOUNTED class info for fighting with MOUNT weapons.",
		},
		{
			id: "4",
			name: "Cartographer",
			description:
				"A wise and bookish individual dedicated to the difficult art of mapping the lands around the city. Cartographers rely on information from Rook Hunters as they cannot go out and collect it themselves.\nTHEY WILL PAY 2 TREASURES for a map of a new area. Take a quest from the Hunter's Guild. Draw a map of your adventure marking anything discovered from your EXPLORATION phases whilst on the quest. Return it to the Cartographer for your reward.",
		},
		{
			id: "5",
			name: "Weapon Smith",
			description:
				"A tough person covered in oil and rumble powder working in a hot and smoky forge. They take Rook weapons and adapt and upgrade them for hunters.\nFOR 1 TREASURE - they can upgrade your current weapon. Add 1 to your COMBAT score.\nFOR 2 TREASURES - they can give you a whole new weapon. This is yours to come up with; perhaps a great hammer or a long Rookspear? Add 1 to your COMBAT score.",
		},
		{
			id: "6",
			name: "Arms Dealer",
			description:
				"They stand behind their counter; a great number of small arms coming out of their back like a stone spider. The Arms dealer can find a new arm for you and help you with the ritual of attunement.\nFOR 2 TREASURES - they can provide you with a whole new arm. This can be whatever you imagine - perhaps it is coiled like a snake, or huge and thick like a tree trunk; able to lift a boulder with ease?",
		},
		{
			id: "7",
			name: "Rookling Crèche",
			description: "See page 37 for details",
		},
		{
			id: "8",
			name: "Gourmet District",
			description:
				"The centre of food production in the city; a bustling place of restaurants, food markets and spice bazaars. Here, hunters who have caught wild beasts out in the lands surrounding the city can find a great price for their prize - and also get a great meal while they're bargaining.\nTHEY WILL PAY 1 TREASURE for a wild beast caught by a hunter.\nFOR 1 TREASURE - enjoy a meal from one of the many restaurants and add 1 to your EXPLORATION score.",
		},
		{
			id: "9",
			name: "House for sale",
			description: "See page 37 for details",
		},
	];

	const promises = cityAmenities.map((amenity) => {
		return db.insert(
			"city_amenities",
			["id", "name", "description", "created_at", "updated_at"],
			[
				amenity.id,
				amenity.name,
				amenity.description,
				new String("CURRENT_TIMESTAMP"),
				new String("CURRENT_TIMESTAMP"),
			]
		);
	});

	return Promise.all(promises);
};

exports.down = function (db) {
	return db.runSql("DELETE FROM city_amenities");
};

exports._meta = {
	version: 1,
};
