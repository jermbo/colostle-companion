import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";
import { WeatherService } from "../services/weather.service";
import { ApiError } from "../middlewares/error.middleware";

const router = Router();

// GET /api/weather - Get all weather entries
router.get("/", async (req, res, next) => {
	try {
		const weather = await WeatherService.getAllWeather();
		res.status(200).json({
			status: "success",
			data: weather,
		});
	} catch (error) {
		next(error);
	}
});

// GET /api/weather/:id - Get a single weather entry by ID
router.get(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Weather ID is required"),
	]),
	async (req, res, next) => {
		try {
			const weather = await WeatherService.getWeatherById(req.params.id);
			res.status(200).json({
				status: "success",
				data: weather,
			});
		} catch (error) {
			next(error);
		}
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
	async (req, res, next) => {
		try {
			const newWeather = await WeatherService.createWeather(req.body);
			res.status(201).json({
				status: "success",
				data: newWeather,
			});
		} catch (error) {
			next(error);
		}
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
	async (req, res, next) => {
		try {
			const updatedWeather = await WeatherService.updateWeather(
				req.params.id,
				req.body
			);
			res.status(200).json({
				status: "success",
				data: updatedWeather,
			});
		} catch (error) {
			next(error);
		}
	}
);

// DELETE /api/weather/:id - Delete a weather entry
router.delete(
	"/:id",
	validate([
		param("id").isString().notEmpty().withMessage("Weather ID is required"),
	]),
	async (req, res, next) => {
		try {
			await WeatherService.deleteWeather(req.params.id);
			res.status(200).json({
				status: "success",
				message: "Weather entry deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
);

export default router;
