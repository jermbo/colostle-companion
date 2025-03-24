import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";
import { ItemsController } from "../controllers/items.controller";

const router = Router();

// GET /api/items - Get all items
router.get("/", ItemsController.getAllItems);

// GET /api/items/:id - Get a single item by ID
router.get(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Item ID is required"),
	]),
	ItemsController.getItemById
);

// POST /api/items - Create a new item
router.post(
	"/",
	validate([
		body("id").isString().notEmpty().withMessage("Item ID is required"),
		body("name").isString().notEmpty().withMessage("Item name is required"),
		body("description").optional().isString(),
	]),
	ItemsController.createItem
);

// PUT /api/items/:id - Update an item
router.put(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Item ID is required"),
		body("name").optional().isString(),
		body("description").optional().isString(),
	]),
	ItemsController.updateItem
);

// DELETE /api/items/:id - Delete an item
router.delete(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Item ID is required"),
	]),
	ItemsController.deleteItem
);

export default router;
