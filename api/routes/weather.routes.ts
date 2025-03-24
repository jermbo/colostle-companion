import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";

const router = Router();

// GET /api/weather - Get all weather entries
router.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		data: [],
	});
});

// GET /api/weather/:id - Get a single weather entry by ID
router.get(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Weather ID is required"),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			data: {
				id: req.params.id,
				name: "Sample Weather",
				description: "Sample description",
			},
		});
	}
);

// POST /api/weather - Create a new weather entry
router.post(
	"/",
	validate([
		body("id").isString().notEmpty().withMessage("Weather ID is required"),
		body("name").isString().notEmpty().withMessage("Weather name is required"),
		body("description").optional().isString(),
	]),
	(req, res) => {
		res.status(201).json({
			status: "success",
			data: req.body,
		});
	}
);

// PUT /api/weather/:id - Update a weather entry
router.put(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Weather ID is required"),
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

// DELETE /api/weather/:id - Delete a weather entry
router.delete(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Weather ID is required"),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			message: "Weather entry deleted successfully",
		});
	}
);

export default router;
