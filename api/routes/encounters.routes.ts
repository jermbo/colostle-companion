import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";

const router = Router();

// GET /api/encounters - Get all encounters
router.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		data: [],
	});
});

// GET /api/encounters/:id - Get a single encounter by ID
router.get(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Encounter ID is required"),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			data: {
				id: req.params.id,
				name: "Sample Encounter",
				description: "Sample description",
			},
		});
	}
);

// POST /api/encounters - Create a new encounter
router.post(
	"/",
	validate([
		body("id").isString().notEmpty().withMessage("Encounter ID is required"),
		body("name")
			.isString()
			.notEmpty()
			.withMessage("Encounter name is required"),
		body("description").optional().isString(),
		body("conditions")
			.isObject()
			.withMessage("Encounter conditions are required"),
		body("conditions.hearts")
			.isString()
			.withMessage("Hearts condition is required"),
		body("conditions.diamonds")
			.isString()
			.withMessage("Diamonds condition is required"),
	]),
	(req, res) => {
		res.status(201).json({
			status: "success",
			data: req.body,
		});
	}
);

// PUT /api/encounters/:id - Update an encounter
router.put(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Encounter ID is required"),
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

// DELETE /api/encounters/:id - Delete an encounter
router.delete(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Encounter ID is required"),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			message: "Encounter deleted successfully",
		});
	}
);

export default router;
