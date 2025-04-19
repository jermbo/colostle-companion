export type ItemCategory =
	| "weapon"
	| "armor"
	| "consumable"
	| "resource"
	| "misc";

export interface Item {
	id: string;
	name: string;
	description: string;
	category: ItemCategory;
	weight: number;
	quantity: number;
	maxQuantity?: number;
	isEquipped?: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface Inventory {
	id: string;
	characterId: string;
	items: Item[];
	capacity: number;
	currentWeight: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface InventoryContextType {
	inventory: Inventory | null;
	addItem: (
		item: Omit<Item, "id" | "createdAt" | "updatedAt">
	) => Promise<void>;
	removeItem: (itemId: string) => Promise<void>;
	updateItem: (itemId: string, updates: Partial<Item>) => Promise<void>;
	useItem: (itemId: string) => Promise<void>;
	equipItem: (itemId: string) => Promise<void>;
	unequipItem: (itemId: string) => Promise<void>;
	isLoading: boolean;
	error: string | null;
}
