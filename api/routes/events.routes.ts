import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";

const router = Router();

// GET /api/events - Get all events
router.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		data: [],
	});
});

// GET /api/events/:id - Get a single event by ID
router.get(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Event ID is required"),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			data: {
				id: req.params.id,
				name: "Sample Event",
				description: "Sample description",
			},
		});
	}
);

// POST /api/events - Create a new event
router.post(
	"/",
	validate([
		body("id").isString().notEmpty().withMessage("Event ID is required"),
		body("name").isString().notEmpty().withMessage("Event name is required"),
		body("description").optional().isString(),
	]),
	(req, res) => {
		res.status(201).json({
			status: "success",
			data: req.body,
		});
	}
);

// PUT /api/events/:id - Update an event
router.put(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Event ID is required"),
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

// DELETE /api/events/:id - Delete an event
router.delete(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Event ID is required"),
	]),
	(req, res) => {
		res.status(200).json({
			status: "success",
			message: "Event deleted successfully",
		});
	}
);

export default router;
