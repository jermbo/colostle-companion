import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";
import { EncountersService } from "../services/encounters.service";
import { ApiError } from "../middlewares/error.middleware";

const router = Router();

// GET /api/encounters - Get all encounters
router.get("/", async (req, res, next) => {
	try {
		const encounters = await EncountersService.getAllEncounters();
		res.status(200).json({
			status: "success",
			data: encounters,
		});
	} catch (error) {
		next(error);
	}
});

// GET /api/encounters/:id - Get a single encounter by ID
router.get(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Encounter ID is required"),
	]),
	async (req, res, next) => {
		try {
			const encounter = await EncountersService.getEncounterById(req.params.id);
			res.status(200).json({
				status: "success",
				data: encounter,
			});
		} catch (error) {
			next(error);
		}
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
	async (req, res, next) => {
		try {
			const newEncounter = await EncountersService.createEncounter(req.body);
			res.status(201).json({
				status: "success",
				data: newEncounter,
			});
		} catch (error) {
			next(error);
		}
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
	async (req, res, next) => {
		try {
			const updatedEncounter = await EncountersService.updateEncounter(
				req.params.id,
				req.body
			);
			res.status(200).json({
				status: "success",
				data: updatedEncounter,
			});
		} catch (error) {
			next(error);
		}
	}
);

// DELETE /api/encounters/:id - Delete an encounter
router.delete(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Encounter ID is required"),
	]),
	async (req, res, next) => {
		try {
			await EncountersService.deleteEncounter(req.params.id);
			res.status(200).json({
				status: "success",
				message: "Encounter deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
);

export default router;
