import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";
import { EventsService } from "../services/events.service";
import { ApiError } from "../middlewares/error.middleware";

const router = Router();

// GET /api/events - Get all events
router.get("/", async (req, res, next) => {
	try {
		const events = await EventsService.getAllEvents();
		res.status(200).json({
			status: "success",
			data: events,
		});
	} catch (error) {
		next(error);
	}
});

// GET /api/events/:id - Get a single event by ID
router.get(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Event ID is required"),
	]),
	async (req, res, next) => {
		try {
			const event = await EventsService.getEventById(req.params.id);
			res.status(200).json({
				status: "success",
				data: event,
			});
		} catch (error) {
			next(error);
		}
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
	async (req, res, next) => {
		try {
			const newEvent = await EventsService.createEvent(req.body);
			res.status(201).json({
				status: "success",
				data: newEvent,
			});
		} catch (error) {
			next(error);
		}
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
	async (req, res, next) => {
		try {
			const updatedEvent = await EventsService.updateEvent(
				req.params.id,
				req.body
			);
			res.status(200).json({
				status: "success",
				data: updatedEvent,
			});
		} catch (error) {
			next(error);
		}
	}
);

// DELETE /api/events/:id - Delete an event
router.delete(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Event ID is required"),
	]),
	async (req, res, next) => {
		try {
			await EventsService.deleteEvent(req.params.id);
			res.status(200).json({
				status: "success",
				message: "Event deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
);

export default router;
