import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";

const router = Router();

// GET /api/ocean-encounters - Get all ocean encounters
router.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		data: [],
	});
});

// GET /api/ocean-encounters/:id - Get a single ocean encounter by ID
router.get(
	"/:id",
	validate([
		param("id")
			.isString()
			.notEmpty()
			.withMessage("Ocean Encounter ID is required"),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			data: {
				id: req.params.id,
				name: "Sample Ocean Encounter",
				description: "Sample description",
			},
		});
	}
);

// POST /api/ocean-encounters - Create a new ocean encounter
router.post(
	"/",
	validate([
		body("id")
			.isString()
			.notEmpty()
			.withMessage("Ocean Encounter ID is required"),
		body("name")
			.isString()
			.notEmpty()
			.withMessage("Ocean Encounter name is required"),
		body("description").optional().isString(),
		body("conditions")
			.isObject()
			.withMessage("Ocean Encounter conditions are required"),
		body("conditions.black")
			.isString()
			.withMessage("Black condition is required"),
		body("conditions.red").isString().withMessage("Red condition is required"),
	]),
	(req, res) => {
		res.status(201).json({
			status: "success",
			data: req.body,
		});
	}
);

// PUT /api/ocean-encounters/:id - Update an ocean encounter
router.put(
	"/:id",
	validate([
		param("id")
			.isString()
			.notEmpty()
			.withMessage("Ocean Encounter ID is required"),
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

// DELETE /api/ocean-encounters/:id - Delete an ocean encounter
router.delete(
	"/:id",
	validate([
		param("id")
			.isString()
			.notEmpty()
			.withMessage("Ocean Encounter ID is required"),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			message: "Ocean Encounter deleted successfully",
		});
	}
);

export default router;
