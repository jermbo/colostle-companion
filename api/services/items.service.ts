import { ItemsRepository } from "../repositories/items.repository.js";
import { Item } from "../../types/gameData.js";
import { ApiError } from "../middlewares/error.middleware.js";

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
	async createItem(data: Item): Promise<Item> {
		try {
			// Check if item with the same ID already exists
			const existingItem = await ItemsRepository.getById(data.id);

			if (existingItem) {
				const error = new ApiError(`Item with ID ${data.id} already exists`);
				error.statusCode = 409; // Conflict
				throw error;
			}

			return await ItemsRepository.create(data);
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(error.message);
		}
	},

	// Update an existing item
	async updateItem(id: string, data: Partial<Item>): Promise<Item> {
		try {
			const updatedItem = await ItemsRepository.update(id, data);

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

			throw new ApiError(error.message);
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

			throw new ApiError(error.message);
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
