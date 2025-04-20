import { Character, Companion, generateSlug } from "@/types/character";
import { Card } from "@/types/card";
import { Session } from "@/types/session";
import { UserSettings } from "@/types/settings";

const DB_NAME = "colostle-companion";
const DB_VERSION = 1;

const STORES = {
	CARDS: "cards",
	SESSIONS: "sessions",
	USER_SETTINGS: "userSettings",
	CHARACTERS: "characters",
	COMPANIONS: "companions",
} as const;

export const initDB = async (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			// Cards store
			if (!db.objectStoreNames.contains(STORES.CARDS)) {
				const cardStore = db.createObjectStore(STORES.CARDS, { keyPath: "id" });
				cardStore.createIndex("suit", "suit", { unique: false });
				cardStore.createIndex("color", "color", { unique: false });
			}

			// Sessions store
			if (!db.objectStoreNames.contains(STORES.SESSIONS)) {
				const sessionStore = db.createObjectStore(STORES.SESSIONS, { keyPath: "id" });
				sessionStore.createIndex("title", "title", { unique: false });
				sessionStore.createIndex("created", "created", { unique: false });
				sessionStore.createIndex("updated", "updated", { unique: false });
				sessionStore.createIndex("status", "status", { unique: false });
				sessionStore.createIndex("tags", "tags", { unique: false, multiEntry: true });
				sessionStore.createIndex("isPrivate", "isPrivate", { unique: false });
			}

			// User Settings store
			if (!db.objectStoreNames.contains(STORES.USER_SETTINGS)) {
				db.createObjectStore(STORES.USER_SETTINGS, { keyPath: "id" });
			}

			// Characters store
			if (!db.objectStoreNames.contains(STORES.CHARACTERS)) {
				const characterStore = db.createObjectStore(STORES.CHARACTERS, { keyPath: "id" });
				characterStore.createIndex("name", "name", { unique: false });
				characterStore.createIndex("slug", "slug", { unique: true });
				characterStore.createIndex("class", "class", { unique: false });
			}

			// Companions store
			if (!db.objectStoreNames.contains(STORES.COMPANIONS)) {
				const companionStore = db.createObjectStore(STORES.COMPANIONS, { keyPath: "id" });
				companionStore.createIndex("characterId", "characterId", { unique: false });
			}
		};
	});
};

export const addCharacter = async (
	character: Omit<Character, "id" | "createdAt" | "updatedAt">,
): Promise<Character> => {
	const db = await initDB();
	const transaction = db.transaction(STORES.CHARACTERS, "readwrite");
	const store = transaction.objectStore(STORES.CHARACTERS);

	const newCharacter: Character = {
		...character,
		id: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	return new Promise((resolve, reject) => {
		const request = store.add(newCharacter);

		request.onsuccess = () => resolve(newCharacter);
		request.onerror = () => reject(request.error);
	});
};

export const addCompanion = async (
	companion: Omit<Companion, "id" | "createdAt" | "updatedAt">,
): Promise<Companion> => {
	const db = await initDB();
	const transaction = db.transaction(STORES.COMPANIONS, "readwrite");
	const store = transaction.objectStore(STORES.COMPANIONS);

	const newCompanion: Companion = {
		...companion,
		id: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	return new Promise((resolve, reject) => {
		const request = store.add(newCompanion);

		request.onsuccess = () => resolve(newCompanion);
		request.onerror = () => reject(request.error);
	});
};

export const getAllCharacters = async (): Promise<Character[]> => {
	const db = await initDB();
	const transaction = db.transaction(STORES.CHARACTERS, "readonly");
	const store = transaction.objectStore(STORES.CHARACTERS);

	return new Promise((resolve, reject) => {
		const request = store.getAll();

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
};

export const getCharacterBySlug = async (slug: string): Promise<Character | null> => {
	const db = await initDB();
	const transaction = db.transaction(STORES.CHARACTERS, "readonly");
	const store = transaction.objectStore(STORES.CHARACTERS);
	const index = store.index("slug");

	return new Promise((resolve, reject) => {
		const request = index.get(slug);

		request.onsuccess = () => resolve(request.result || null);
		request.onerror = () => reject(request.error);
	});
};
