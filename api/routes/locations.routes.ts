import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";

const router = Router();

// GET /api/locations - Get all locations
router.get("/", (_, res) => {
	res.status(200).json({
		status: "success",
		data: [],
	});
});

// GET /api/locations/:id - Get a single location by ID
router.get(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Location ID is required"),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			data: {
				id: req.params.id,
				name: "Sample Location",
				description: "Sample description",
			},
		});
	}
);

// POST /api/locations - Create a new location
router.post(
	"/",
	validate([
		body("id").isString().notEmpty().withMessage("Location ID is required"),
		body("name").isString().notEmpty().withMessage("Location name is required"),
		body("description").optional().isString(),
		body("conditions")
			.isObject()
			.withMessage("Location conditions are required"),
		body("conditions.spades")
			.isString()
			.withMessage("Spades condition is required"),
		body("conditions.clubs")
			.isString()
			.withMessage("Clubs condition is required"),
	]),
	(req, res) => {
		res.status(201).json({
			status: "success",
			data: req.body,
		});
	}
);

// PUT /api/locations/:id - Update a location
router.put(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Location ID is required"),
		body("name").optional().isString(),
		body("description").optional().isString(),
		body("conditions").optional().isObject(),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			data: { ...req.body, id: req.params.id },
		});
	}
);

// DELETE /api/locations/:id - Delete a location
router.delete(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Location ID is required"),
	]),
	(_, res) => {
		res.status(200).json({
			status: "success",
			message: "Location deleted successfully",
		});
	}
);

export default router;
