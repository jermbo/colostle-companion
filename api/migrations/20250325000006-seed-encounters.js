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
	const encounters = [
		{
			id: "ace",
			name: "Cultist Stranger",
			description:
				"A stranger in unusual robes with a castle symbol on them. Perhaps he has clues about the nature of the Colostle, but these strangers are often unwilling to even be found, let alone be spoken to. You've heard tell of them before - a cult maybe? People don't talk about them kindly; strangers with strange practices... but they definitely know something. If you fight them, create a human opponent in your COMBAT phase.",
			conditions_hearts: "Unarmed",
			conditions_diamonds: "Armed",
		},
		{
			id: "2",
			name: "Animal",
			description:
				"Animal to hunt for food. The animals in the wilds are strange and unfamiliar; weird combinations of animals you might know, a boar with scales, or a fowl with 2 sets of wings. Adventuring is hungry work, you should make time to eat.",
			conditions_hearts: "Easy Prey",
			conditions_diamonds: "Dangerous",
		},
		{
			id: "3",
			name: "Calling NPC",
			description:
				"CALLING - You come across someone who is key to your CALLING. Maybe they have a clue about what you're looking for, or they block your way to learning more...",
			conditions_hearts: "Friendly",
			conditions_diamonds: "Not friendly",
		},
		{
			id: "4",
			name: "Quest Giver",
			description:
				"A person you meet asks you to find something for them. Maybe they have lost something, or they are too afraid to get it. Draw a card and check the ITEM table (page 27) to see how they will reward you if you do this for them. Use the other cards drawn in this EXPLORATION phase to inform where you might need to go. If you fight them, create a human opponent in your COMBAT phase.",
			conditions_hearts: "Trustworthy",
			conditions_diamonds: "Untrustworthy",
		},
		{
			id: "5",
			name: "Dead Body",
			description:
				"A dead body of another human. Who are they? What are they wearing? Either draw a card from the ITEM table to see if they have something on their person, OR draw from the EVENT table to see if the situation develops.",
			conditions_hearts: "Seems safe",
			conditions_diamonds: "Something's off...",
		},
		{
			id: "6",
			name: "Adventurer",
			description:
				"Another adventurer like yourself, garbed in Rook Armour and armed as one of the classes. But what do they want? Are they here to help you take down a Rook? If so what do they want in return? Or are their intentions darker? If you fight them, create a human opponent in your COMBAT phase.",
			conditions_hearts: "Friendly",
			conditions_diamonds: "Not friendly",
		},
		{
			id: "7",
			name: "Gargoyle",
			description:
				"A screech from the sky, the beat of heavy wings... gargoyles. You thought they were just stories you were told as a child. Apparently not! It grabs you by the shoulders and starts to carry you upward. ♥: It takes you to a whole new area. ♦: It takes you up to its nest in the rafters of the ceiling. There is no fighting a Gargoyle...",
			conditions_hearts: "Taken to a new area",
			conditions_diamonds: "Taken to the rafters",
		},
		{
			id: "8",
			name: "Settlement",
			description:
				"You come across a small settlement, maybe a farming village, the buildings are all wooden and skins, like most small settlements. If it is SAFE, draw an ITEM card to see what can be found there. Otherwise, draw an EVENT card.",
			conditions_hearts: "Safe",
			conditions_diamonds: "Event",
		},
		{
			id: "9",
			name: "Giant Skeleton",
			description:
				"A massive skeleton. 'It looks humanoid. But it can't be, can it?'",
			conditions_hearts: "Safe",
			conditions_diamonds: "Bandit camp",
		},
		{
			id: "10",
			name: "Non-Human Camp",
			description:
				"It's a camp of people. At least, they look like people; they walk on 2 legs and carry tools in 2 arms, but they're not.... human. Who are they? What do they want?",
			conditions_hearts: "They don't notice you",
			conditions_diamonds: "You are captured and taken prisoner",
		},
	];

	const promises = encounters.map((encounter) => {
		return db.insert(
			"encounters",
			[
				"id",
				"name",
				"description",
				"conditions_hearts",
				"conditions_diamonds",
				"created_at",
				"updated_at",
			],
			[
				encounter.id,
				encounter.name,
				encounter.description,
				encounter.conditions_hearts,
				encounter.conditions_diamonds,
				new String("CURRENT_TIMESTAMP"),
				new String("CURRENT_TIMESTAMP"),
			]
		);
	});

	return Promise.all(promises);
};

exports.down = function (db) {
	return db.runSql("DELETE FROM encounters");
};

exports._meta = {
	version: 1,
};
