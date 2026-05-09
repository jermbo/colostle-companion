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
const DB_VERSION = 1;
const CAMPAIGN_STORE = "campaigns";

async function getDB(): Promise<IDBPDatabase<CampaignDB>> {
	return openDB<CampaignDB>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			// Create campaigns store
			const store = db.createObjectStore(CAMPAIGN_STORE, { keyPath: "id" });
			store.createIndex("by-character", "characterId");
		},
	});
}

export const campaignStorage = {
	async getAll(): Promise<Campaign[]> {
		const db = await getDB();
		return db.getAll(CAMPAIGN_STORE);
	},

	async getByCharacter(characterId: string): Promise<Campaign[]> {
		const db = await getDB();
		const tx = db.transaction(CAMPAIGN_STORE, "readonly");
		const index = tx.store.index("by-character");
		return index.getAll(characterId);
	},

	async get(id: string): Promise<Campaign | undefined> {
		const db = await getDB();
		return db.get(CAMPAIGN_STORE, id);
	},

	async set(campaign: Campaign): Promise<void> {
		const db = await getDB();
		await db.put(CAMPAIGN_STORE, campaign);
	},

	async delete(id: string): Promise<void> {
		const db = await getDB();
		await db.delete(CAMPAIGN_STORE, id);
	},
};
