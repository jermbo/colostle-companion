import { openDB } from "idb";
import type { IDBPDatabase, DBSchema } from "idb";

interface CharacterDB extends DBSchema {
	characters: {
		key: string;
		value: {
			id: string;
			name: string;
			class: string;
			level: number;
			createdAt: Date;
			updatedAt: Date;
		};
	};
}

const DB_NAME = "colostle-companion";
const DB_VERSION = 1;
const CHARACTER_STORE = "characters";

export const initDB = async (): Promise<IDBPDatabase<CharacterDB>> => {
	return openDB<CharacterDB>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(CHARACTER_STORE)) {
				db.createObjectStore(CHARACTER_STORE, { keyPath: "id" });
			}
		},
	});
};

export const characterStorage = {
	async getAll(): Promise<CharacterDB["characters"]["value"][]> {
		const db = await initDB();
		return db.getAll(CHARACTER_STORE);
	},

	async get(
		id: string,
	): Promise<CharacterDB["characters"]["value"] | undefined> {
		const db = await initDB();
		return db.get(CHARACTER_STORE, id);
	},

	async set(character: CharacterDB["characters"]["value"]): Promise<void> {
		const db = await initDB();
		await db.put(CHARACTER_STORE, character);
	},

	async delete(id: string): Promise<void> {
		const db = await initDB();
		await db.delete(CHARACTER_STORE, id);
	},
};
