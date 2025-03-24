import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";
import { OceanEncountersService } from "../services/oceanEncounters.service";
import { ApiError } from "../middlewares/error.middleware";

const router = Router();

// GET /api/ocean-encounters - Get all ocean encounters
router.get("/", async (req, res, next) => {
	try {
		const oceanEncounters =
			await OceanEncountersService.getAllOceanEncounters();
		res.status(200).json({
			status: "success",
			data: oceanEncounters,
		});
	} catch (error) {
		next(error);
	}
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
	async (req, res, next) => {
		try {
			const oceanEncounter = await OceanEncountersService.getOceanEncounterById(
				req.params.id
			);
			res.status(200).json({
				status: "success",
				data: oceanEncounter,
			});
		} catch (error) {
			next(error);
		}
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
	async (req, res, next) => {
		try {
			const newOceanEncounter =
				await OceanEncountersService.createOceanEncounter(req.body);
			res.status(201).json({
				status: "success",
				data: newOceanEncounter,
			});
		} catch (error) {
			next(error);
		}
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
	async (req, res, next) => {
		try {
			const updatedOceanEncounter =
				await OceanEncountersService.updateOceanEncounter(
					req.params.id,
					req.body
				);
			res.status(200).json({
				status: "success",
				data: updatedOceanEncounter,
			});
		} catch (error) {
			next(error);
		}
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
	async (req, res, next) => {
		try {
			await OceanEncountersService.deleteOceanEncounter(req.params.id);
			res.status(200).json({
				status: "success",
				message: "Ocean Encounter deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
);

export default router;
