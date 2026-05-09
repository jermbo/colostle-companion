/**
 * Oracle table data for Colostle Companion.
 *
 * All entries marked PLACEHOLDER need to be filled in with the actual
 * Colostle rulebook prompts before these tables are usable in play.
 *
 * Card value ordering: Ace (low) → 2 → 3 → … → 10 → J → Q → K
 * Aces are low in Colostle. Do not treat Ace as high (14).
 *
 * Key used for card values: 'A', '2'–'10', 'J', 'Q', 'K'
 */

// ---------------------------------------------------------------------------
// Exploration Table
//
// Red suits (hearts, diamonds) → organic result (person, creature, being)
// Black suits (spades, clubs)  → non-organic result (place, object, structure)
//
// Suit modifies the base result:
//   Hearts   = positive organic      (friendly, helpful, welcoming)
//   Diamonds = negative organic      (aggressive, dangerous, hostile)
//   Spades   = positive non-organic  (thriving, safe, intact)
//   Clubs    = negative non-organic  (ruined, dangerous, abandoned)
//
// IMPORTANT: J, Q, and K trigger an enemy encounter instead of a normal
// exploration result. See `enemySize` below. The exploration lookup helper
// will return `{ enemyEncounter: true }` for these values — the caller
// should start the enemy creation flow (3 additional flips).
//
// Display logic for A–10:
//   Full result = base + ", " + suitModifier
//   e.g. "A fellow traveler like you, friendly"
// ---------------------------------------------------------------------------

export const exploration = {
  red: {
    // Organic — person, creature, or living being
    A:  { base: 'PLACEHOLDER — lone individual',     hearts: 'PLACEHOLDER — positive', diamonds: 'PLACEHOLDER — negative' },
    2:  { base: 'PLACEHOLDER — small creature',      hearts: 'PLACEHOLDER — positive', diamonds: 'PLACEHOLDER — negative' },
    3:  { base: 'PLACEHOLDER — young person',        hearts: 'PLACEHOLDER — positive', diamonds: 'PLACEHOLDER — negative' },
    4:  { base: 'PLACEHOLDER — wounded figure',      hearts: 'PLACEHOLDER — positive', diamonds: 'PLACEHOLDER — negative' },
    5:  { base: 'PLACEHOLDER — traveler or trader',  hearts: 'PLACEHOLDER — positive', diamonds: 'PLACEHOLDER — negative' },
    6:  { base: 'PLACEHOLDER — scout or group',      hearts: 'PLACEHOLDER — positive', diamonds: 'PLACEHOLDER — negative' },
    7:  { base: 'PLACEHOLDER — small group',         hearts: 'PLACEHOLDER — positive', diamonds: 'PLACEHOLDER — negative' },
    8:  { base: 'PLACEHOLDER — mounted rider',       hearts: 'PLACEHOLDER — positive', diamonds: 'PLACEHOLDER — negative' },
    9:  { base: 'PLACEHOLDER — skilled individual',  hearts: 'PLACEHOLDER — positive', diamonds: 'PLACEHOLDER — negative' },
    10: { base: 'PLACEHOLDER — large group',         hearts: 'PLACEHOLDER — positive', diamonds: 'PLACEHOLDER — negative' },
    // J, Q, K → enemy encounter (see enemySize)
    J:  { enemyEncounter: true },
    Q:  { enemyEncounter: true },
    K:  { enemyEncounter: true },
  },

  black: {
    // Non-organic — place, object, or structure
    A:  { base: 'PLACEHOLDER — small structure or marker', spades: 'PLACEHOLDER — positive', clubs: 'PLACEHOLDER — negative' },
    2:  { base: 'PLACEHOLDER — path or trail',             spades: 'PLACEHOLDER — positive', clubs: 'PLACEHOLDER — negative' },
    3:  { base: 'PLACEHOLDER — cache or stash',            spades: 'PLACEHOLDER — positive', clubs: 'PLACEHOLDER — negative' },
    4:  { base: 'PLACEHOLDER — landmark',                  spades: 'PLACEHOLDER — positive', clubs: 'PLACEHOLDER — negative' },
    5:  { base: 'PLACEHOLDER — camp or outpost',           spades: 'PLACEHOLDER — positive', clubs: 'PLACEHOLDER — negative' },
    6:  { base: 'PLACEHOLDER — small settlement',          spades: 'PLACEHOLDER — positive', clubs: 'PLACEHOLDER — negative' },
    7:  { base: 'PLACEHOLDER — fortified position',        spades: 'PLACEHOLDER — positive', clubs: 'PLACEHOLDER — negative' },
    8:  { base: 'PLACEHOLDER — ruin or remnant',           spades: 'PLACEHOLDER — positive', clubs: 'PLACEHOLDER — negative' },
    9:  { base: 'PLACEHOLDER — large structure',           spades: 'PLACEHOLDER — positive', clubs: 'PLACEHOLDER — negative' },
    10: { base: 'PLACEHOLDER — city or large village',     spades: 'PLACEHOLDER — positive', clubs: 'PLACEHOLDER — negative' },
    // J, Q, K → enemy encounter (see enemySize)
    J:  { enemyEncounter: true },
    Q:  { enemyEncounter: true },
    K:  { enemyEncounter: true },
  },
};

// ---------------------------------------------------------------------------
// Enemy Creation
//
// Drawing J, Q, or K during exploration triggers an enemy encounter.
// The drawn card determines enemy size. Then flip 3 additional cards
// to determine type, range, and magic.
//
// enemySize: what the triggering card means
// ---------------------------------------------------------------------------

// Values that trigger an enemy encounter when drawn during exploration.
export const ENEMY_TRIGGER_VALUES = new Set(['J', 'Q', 'K']);

// All three trigger an enemy with the same 3 characteristic flips (type, range, magic).
export const enemySize = {
  J: { label: 'Non-Rook enemy', isRook: false },
  Q: { label: 'Medium Rook',    isRook: true  },
  K: { label: 'Large Rook',     isRook: true  },
};

// ---------------------------------------------------------------------------
// Enemy characteristic flips (3 additional cards after the trigger)
//
// Suits do not matter. Aces are low.
//
// Each flip maps card values to one of the possible outcomes for that aspect.
// The value ranges below (TODO) must be confirmed from the rulebook.
// ---------------------------------------------------------------------------

export const enemy = {
  // Flip 1: Rook type — A–6 = defensive, 7–K = attack
  type: {
    defensive: { values: 'A–6', description: 'PLACEHOLDER' },
    attack:    { values: '7–K', description: 'PLACEHOLDER' },
  },

  // Flip 2: Rook range — A–6 = short, 7–K = long
  range: {
    short: { values: 'A–6', description: 'PLACEHOLDER' },
    long:  { values: '7–K', description: 'PLACEHOLDER' },
  },

  // Flip 3: Magic — A–3 = none, 4–7 = rumble, 8–10 = ice, J–K = lightning
  magic: {
    none:      { values: 'A–3', description: 'No magic ability' },
    rumble:    { values: '4–7', description: 'PLACEHOLDER' },
    ice:       { values: '8–10', description: 'PLACEHOLDER' },
    lightning: { values: 'J–K', description: 'PLACEHOLDER' },
  },
};

// ---------------------------------------------------------------------------
// Items Table
//
// Single flip. Suits do not matter. Aces are low.
// ---------------------------------------------------------------------------

export const items = {
  A:  'PLACEHOLDER',
  2:  'PLACEHOLDER',
  3:  'PLACEHOLDER',
  4:  'PLACEHOLDER',
  5:  'PLACEHOLDER',
  6:  'PLACEHOLDER',
  7:  'PLACEHOLDER',
  8:  'PLACEHOLDER',
  9:  'PLACEHOLDER',
  10: 'PLACEHOLDER',
  J:  'PLACEHOLDER',
  Q:  'PLACEHOLDER',
  K:  'PLACEHOLDER',
};

// ---------------------------------------------------------------------------
// Settlement Builder Table
//
// Single flip. Suits do not matter. Aces are low.
// ---------------------------------------------------------------------------

export const settlement = {
  A:  'PLACEHOLDER',
  2:  'PLACEHOLDER',
  3:  'PLACEHOLDER',
  4:  'PLACEHOLDER',
  5:  'PLACEHOLDER',
  6:  'PLACEHOLDER',
  7:  'PLACEHOLDER',
  8:  'PLACEHOLDER',
  9:  'PLACEHOLDER',
  10: 'PLACEHOLDER',
  J:  'PLACEHOLDER',
  Q:  'PLACEHOLDER',
  K:  'PLACEHOLDER',
};

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Returns the exploration result for a given card.
 * If the card triggers an enemy encounter (J, Q, K), returns
 * { enemyEncounter: true, size: enemySize[value] } — the caller should
 * start the enemy creation flow (3 additional flips).
 *
 * @param {'A'|'2'|...|'K'} value
 * @param {'hearts'|'diamonds'|'spades'|'clubs'} suit
 * @returns {{ enemyEncounter: true, size: object } | { base: string, modifier: string }}
 */
export function lookupExploration(value, suit) {
  if (ENEMY_TRIGGER_VALUES.has(value)) {
    return { enemyEncounter: true, size: enemySize[value] };
  }
  const color = suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black';
  const entry = exploration[color][value];
  return { base: entry.base, modifier: entry[suit] };
}

// Card values in ascending order (Ace is low).
const VALUE_ORDER = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function valueIndex(v) {
  return VALUE_ORDER.indexOf(v);
}

/**
 * Returns 'defensive' (A–6) or 'attack' (7–K) for a card value.
 *
 * @param {'A'|'2'|...|'K'} value
 * @returns {'defensive'|'attack'}
 */
export function lookupEnemyType(value) {
  return valueIndex(value) <= 5 ? 'defensive' : 'attack';
}

/**
 * Returns 'short' (A–6) or 'long' (7–K) for a card value.
 *
 * @param {'A'|'2'|...|'K'} value
 * @returns {'short'|'long'}
 */
export function lookupEnemyRange(value) {
  return valueIndex(value) <= 5 ? 'short' : 'long';
}

/**
 * Returns the magic outcome for a card value.
 *   A–3  → 'none'
 *   4–7  → 'rumble'
 *   8–10 → 'ice'
 *   J–K  → 'lightning'
 *
 * @param {'A'|'2'|...|'K'} value
 * @returns {'none'|'rumble'|'ice'|'lightning'}
 */
export function lookupEnemyMagic(value) {
  const i = valueIndex(value);
  if (i <= 2)  return 'none';
  if (i <= 6)  return 'rumble';
  if (i <= 9)  return 'ice';
  return 'lightning';
}

/**
 * @param {'A'|'2'|...|'K'} value
 * @returns {string}
 */
export function lookupItem(value) {
  return items[value];
}

/**
 * @param {'A'|'2'|...|'K'} value
 * @returns {string}
 */
export function lookupSettlement(value) {
  return settlement[value];
}
