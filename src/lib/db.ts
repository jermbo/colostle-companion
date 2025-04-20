import { Character, Companion } from "@/types/character";

const DB_NAME = "colostle-companion";
const DB_VERSION = 1;

const STORES = {
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

const withTransaction = async <T>(
	storeName: string,
	mode: IDBTransactionMode,
	operation: (store: IDBObjectStore) => Promise<T>,
): Promise<T> => {
	const db = await initDB();
	const transaction = db.transaction(storeName, mode);
	const store = transaction.objectStore(storeName);

	return new Promise((resolve, reject) => {
		transaction.oncomplete = () => {
			// Transaction completed successfully
		};
		transaction.onerror = () => {
			reject(transaction.error);
		};

		operation(store).then(resolve).catch(reject);
	});
};

export const addCharacter = async (
	character: Omit<Character, "id" | "createdAt" | "updatedAt">,
): Promise<Character> => {
	const newCharacter: Character = {
		...character,
		id: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	return withTransaction(STORES.CHARACTERS, "readwrite", (store) => {
		return new Promise((resolve, reject) => {
			const request = store.add(newCharacter);
			request.onsuccess = () => resolve(newCharacter);
			request.onerror = () => reject(request.error);
		});
	});
};

export const addCompanion = async (
	companion: Omit<Companion, "id" | "createdAt" | "updatedAt">,
): Promise<Companion> => {
	const newCompanion: Companion = {
		...companion,
		id: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	return withTransaction(STORES.COMPANIONS, "readwrite", (store) => {
		return new Promise((resolve, reject) => {
			const request = store.add(newCompanion);
			request.onsuccess = () => resolve(newCompanion);
			request.onerror = () => reject(request.error);
		});
	});
};

export const getAllCharacters = async (): Promise<Character[]> => {
	return withTransaction(STORES.CHARACTERS, "readonly", (store) => {
		return new Promise((resolve, reject) => {
			const request = store.getAll();
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	});
};

export const getCharacterBySlug = async (slug: string): Promise<Character | null> => {
	return withTransaction(STORES.CHARACTERS, "readonly", (store) => {
		return new Promise((resolve, reject) => {
			const index = store.index("slug");
			const request = index.get(slug);
			request.onsuccess = () => resolve(request.result || null);
			request.onerror = () => reject(request.error);
		});
	});
};
