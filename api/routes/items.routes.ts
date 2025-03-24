import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";

const router = Router();

// GET /api/items - Get all items
router.get("/", (_req, res) => {
	res.status(200).json({
		status: "success",
		data: [],
	});
});

// GET /api/items/:id - Get a single item by ID
router.get(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Item ID is required"),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			data: {
				id: req.params.id,
				name: "Sample Item",
				description: "Sample description",
			},
		});
	}
);

// POST /api/items - Create a new item
router.post(
	"/",
	validate([
		body("id").isString().notEmpty().withMessage("Item ID is required"),
		body("name").isString().notEmpty().withMessage("Item name is required"),
		body("description").optional().isString(),
	]),
	(req, res) => {
		res.status(201).json({
			status: "success",
			data: req.body,
		});
	}
);

// PUT /api/items/:id - Update an item
router.put(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Item ID is required"),
		body("name").optional().isString(),
		body("description").optional().isString(),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			data: { ...req.body, id: req.params.id },
		});
	}
);

// DELETE /api/items/:id - Delete an item
router.delete(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Item ID is required"),
	]),
	(_, res) => {
		res.status(200).json({
			status: "success",
			message: "Item deleted successfully",
		});
	}
);

export default router;
