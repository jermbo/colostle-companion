import { ItemsRepository } from "../repositories/items.repository";
import { Item } from "../../types/gameData";
import { ApiError } from "../middlewares/error.middleware";

export const ItemsService = {
	// Get all items
	async getAllItems(): Promise<Item[]> {
		try {
			return await ItemsRepository.getAll();
		} catch (error: any) {
			throw new ApiError(error.message);
		}
	},

	// Get item by ID
	async getItemById(id: string): Promise<Item> {
		try {
			const item = await ItemsRepository.getById(id);

			if (!item) {
				const error = new ApiError(`Item with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return item;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(error.message);
		}
	},

	// Create a new item
	async createItem(itemData: Item): Promise<Item> {
		try {
			// Check if item with the same ID already exists
			const existingItem = await ItemsRepository.getById(itemData.id);

			if (existingItem) {
				const error = new ApiError(
					`Item with ID ${itemData.id} already exists`
				);
				error.statusCode = 409; // Conflict
				throw error;
			}

			return await ItemsRepository.create(itemData);
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to create item: ${error.message}`);
		}
	},

	// Update an existing item
	async updateItem(id: string, itemData: Partial<Item>): Promise<Item> {
		try {
			const updatedItem = await ItemsRepository.update(id, itemData);

			if (!updatedItem) {
				const error = new ApiError(`Item with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return updatedItem;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to update item: ${error.message}`);
		}
	},

	// Delete an item
	async deleteItem(id: string): Promise<void> {
		try {
			const deleted = await ItemsRepository.delete(id);

			if (!deleted) {
				const error = new ApiError(`Item with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to delete item: ${error.message}`);
		}
	},

	// Batch import items (used for initial data seeding)
	async importItems(items: Item[]): Promise<number> {
		try {
			return await ItemsRepository.batchInsert(items);
		} catch (error: any) {
			throw new ApiError(`Failed to import items: ${error.message}`);
		}
	},
};
