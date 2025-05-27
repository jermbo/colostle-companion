import { openDB } from "idb";
import type { IDBPDatabase, DBSchema } from "idb";
import type { Campaign } from "@/types/campaign";

interface CampaignDB extends DBSchema {
	campaigns: {
		key: string;
		value: Campaign;
		indexes: { "by-character": string };
	};
}

const DB_NAME = "colostle-companion";
const DB_VERSION = 2; // Increment version for new store
const CAMPAIGN_STORE = "campaigns";

export const initDB = async (): Promise<IDBPDatabase<CampaignDB>> => {
	return openDB<CampaignDB>(DB_NAME, DB_VERSION, {
		upgrade(db, oldVersion, newVersion) {
			if (oldVersion < 2) {
				// Create campaigns store if upgrading from version 1
				if (!db.objectStoreNames.contains(CAMPAIGN_STORE)) {
					const store = db.createObjectStore(CAMPAIGN_STORE, { keyPath: "id" });
					store.createIndex("by-character", "characterId");
				}
			}
		},
	});
};

export const campaignStorage = {
	async getAll(): Promise<Campaign[]> {
		const db = await initDB();
		return db.getAll(CAMPAIGN_STORE);
	},

	async getByCharacter(characterId: string): Promise<Campaign[]> {
		const db = await initDB();
		const tx = db.transaction(CAMPAIGN_STORE, "readonly");
		const index = tx.store.index("by-character");
		return index.getAll(characterId);
	},

	async get(id: string): Promise<Campaign | undefined> {
		const db = await initDB();
		return db.get(CAMPAIGN_STORE, id);
	},

	async set(campaign: Campaign): Promise<void> {
		const db = await initDB();
		await db.put(CAMPAIGN_STORE, campaign);
	},

	async delete(id: string): Promise<void> {
		const db = await initDB();
		await db.delete(CAMPAIGN_STORE, id);
	},
};
