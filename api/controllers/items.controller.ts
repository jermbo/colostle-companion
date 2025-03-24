import { Request, Response, NextFunction } from "express";
import { ItemsService } from "../services/items.service.js";
import { ApiError } from "../middlewares/error.middleware.js";
import { Item } from "../../types/gameData.js";

export const ItemsController = {
	// Get all items
	async getAllItems(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const items = await ItemsService.getAllItems();

			res.status(200).json({
				status: "success",
				data: items,
			});
		} catch (error) {
			next(error);
		}
	},

	// Get item by ID
	async getItemById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.params;
			const item = await ItemsService.getItemById(id);

			res.status(200).json({
				status: "success",
				data: item,
			});
		} catch (error) {
			next(error);
		}
	},

	// Create a new item
	async createItem(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const itemData = req.body as Item;

			// Basic validation
			if (!itemData.id || !itemData.name) {
				throw new ApiError("ID and name are required fields", 400);
			}

			const newItem = await ItemsService.createItem(itemData);

			res.status(201).json({
				status: "success",
				data: newItem,
			});
		} catch (error) {
			next(error);
		}
	},

	// Update an item
	async updateItem(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.params;
			const itemData = req.body as Partial<Item>;

			const updatedItem = await ItemsService.updateItem(id, itemData);

			res.status(200).json({
				status: "success",
				data: updatedItem,
			});
		} catch (error) {
			next(error);
		}
	},

	// Delete an item
	async deleteItem(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.params;

			await ItemsService.deleteItem(id);

			res.status(200).json({
				status: "success",
				message: "Item deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	},
};
