import { Character, StoryPhase, GameState } from "../context/GameContext";

const DB_NAME = "colostle-companion";
const DB_VERSION = 1;
const CHARACTER_STORE = "characters";

interface CharacterData extends GameState {
	id: string;
	lastUpdated: Date;
}

// Check if IndexedDB is available in the browser
export const isIndexedDBAvailable = (): boolean => {
	try {
		// This will throw in environments where IndexedDB is not available
		return (
			typeof window !== "undefined" &&
			window.indexedDB !== undefined &&
			window.indexedDB !== null
		);
	} catch (e) {
		console.error("IndexedDB is not available in this browser:", e);
		return false;
	}
};

// Initialize the database
export const initDatabase = (): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		if (!isIndexedDBAvailable()) {
			console.error("IndexedDB is not available in this browser");
			reject(new Error("IndexedDB is not available in this browser"));
			return;
		}

		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = (event) => {
			console.error("IndexedDB error:", event);
			reject(new Error("Failed to open database"));
		};

		request.onsuccess = () => {
			console.log("Database opened successfully");
			resolve(true);
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			// Create object store for characters
			if (!db.objectStoreNames.contains(CHARACTER_STORE)) {
				const characterStore = db.createObjectStore(CHARACTER_STORE, {
					keyPath: "id",
				});
				characterStore.createIndex("byName", "character.name", {
					unique: false,
				});
				characterStore.createIndex("byLastUpdated", "lastUpdated", {
					unique: false,
				});
			}
		};
	});
};

// Save a character and its story data
export const saveCharacterData = (gameState: GameState): Promise<string> => {
	return new Promise((resolve, reject) => {
		const id = gameState.character?.name
			? `${gameState.character.name
					.toLowerCase()
					.replace(/\s+/g, "-")}-${Date.now()}`
			: `character-${Date.now()}`;

		const characterData: CharacterData = {
			...gameState,
			id,
			lastUpdated: new Date(),
		};

		const request = indexedDB.open(DB_NAME);

		request.onerror = (event) => {
			console.error("IndexedDB error:", event);
			reject(new Error("Failed to open database"));
		};

		request.onsuccess = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			const transaction = db.transaction([CHARACTER_STORE], "readwrite");
			const store = transaction.objectStore(CHARACTER_STORE);

			const saveRequest = store.put(characterData);

			saveRequest.onsuccess = () => {
				resolve(id);
			};

			saveRequest.onerror = (event) => {
				console.error("Error saving character:", event);
				reject(new Error("Failed to save character data"));
			};

			transaction.oncomplete = () => {
				db.close();
			};
		};
	});
};

// Update existing character data
export const updateCharacterData = (
	id: string,
	gameState: GameState
): Promise<void> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME);

		request.onerror = (event) => {
			console.error("IndexedDB error:", event);
			reject(new Error("Failed to open database"));
		};

		request.onsuccess = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			const transaction = db.transaction([CHARACTER_STORE], "readwrite");
			const store = transaction.objectStore(CHARACTER_STORE);

			// First check if the character exists
			const getRequest = store.get(id);

			getRequest.onsuccess = () => {
				if (!getRequest.result) {
					reject(new Error("Character not found"));
					return;
				}

				// Update character data
				const characterData: CharacterData = {
					...gameState,
					id,
					lastUpdated: new Date(),
				};

				const updateRequest = store.put(characterData);

				updateRequest.onsuccess = () => {
					resolve();
				};

				updateRequest.onerror = (event) => {
					console.error("Error updating character:", event);
					reject(new Error("Failed to update character data"));
				};
			};

			getRequest.onerror = (event) => {
				console.error("Error getting character:", event);
				reject(new Error("Failed to get character data"));
			};

			transaction.oncomplete = () => {
				db.close();
			};
		};
	});
};

// Get a character by ID
export const getCharacterById = (id: string): Promise<CharacterData> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME);

		request.onerror = (event) => {
			console.error("IndexedDB error:", event);
			reject(new Error("Failed to open database"));
		};

		request.onsuccess = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			const transaction = db.transaction([CHARACTER_STORE], "readonly");
			const store = transaction.objectStore(CHARACTER_STORE);
			const getRequest = store.get(id);

			getRequest.onsuccess = () => {
				if (!getRequest.result) {
					reject(new Error("Character not found"));
				} else {
					resolve(getRequest.result as CharacterData);
				}
			};

			getRequest.onerror = (event) => {
				console.error("Error getting character:", event);
				reject(new Error("Failed to get character data"));
			};

			transaction.oncomplete = () => {
				db.close();
			};
		};
	});
};

// Delete a character by ID
export const deleteCharacterById = (id: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME);

		request.onerror = (event) => {
			console.error("IndexedDB error:", event);
			reject(new Error("Failed to open database"));
		};

		request.onsuccess = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			const transaction = db.transaction([CHARACTER_STORE], "readwrite");
			const store = transaction.objectStore(CHARACTER_STORE);
			const deleteRequest = store.delete(id);

			deleteRequest.onsuccess = () => {
				resolve();
			};

			deleteRequest.onerror = (event) => {
				console.error("Error deleting character:", event);
				reject(new Error("Failed to delete character data"));
			};

			transaction.oncomplete = () => {
				db.close();
			};
		};
	});
};

// Get all characters
export const getAllCharacters = (): Promise<CharacterData[]> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME);

		request.onerror = (event) => {
			console.error("IndexedDB error:", event);
			reject(new Error("Failed to open database"));
		};

		request.onsuccess = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			const transaction = db.transaction([CHARACTER_STORE], "readonly");
			const store = transaction.objectStore(CHARACTER_STORE);
			const getAllRequest = store.getAll();

			getAllRequest.onsuccess = () => {
				resolve(getAllRequest.result as CharacterData[]);
			};

			getAllRequest.onerror = (event) => {
				console.error("Error getting all characters:", event);
				reject(new Error("Failed to get all characters"));
			};

			transaction.oncomplete = () => {
				db.close();
			};
		};
	});
};

// Helper function to log game state for debugging
export const logGameState = (message: string, gameState: any): void => {
	console.log(`%c ${message}`, "color: blue; font-weight: bold;");
	console.log("Character:", gameState.character);
	console.log("Story Phases:", gameState.storyPhases);
	console.log("Current Phase Index:", gameState.currentPhaseIndex);
};
