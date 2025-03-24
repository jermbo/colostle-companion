import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";
import { CityAmenitiesService } from "../services/cityAmenities.service";
import { ApiError } from "../middlewares/error.middleware";

const router = Router();

// GET /api/city-amenities - Get all city amenities
router.get("/", async (req, res, next) => {
	try {
		const cityAmenities = await CityAmenitiesService.getAllCityAmenities();
		res.status(200).json({
			status: "success",
			data: cityAmenities,
		});
	} catch (error) {
		next(error);
	}
});

// GET /api/city-amenities/:id - Get a single city amenity by ID
router.get(
	"/:id",
	validate([
		param("id")
			.isString()
			.notEmpty()
			.withMessage("City Amenity ID is required"),
	]),
	async (req, res, next) => {
		try {
			const cityAmenity = await CityAmenitiesService.getCityAmenityById(
				req.params.id
			);
			res.status(200).json({
				status: "success",
				data: cityAmenity,
			});
		} catch (error) {
			next(error);
		}
	}
);

// POST /api/city-amenities - Create a new city amenity
router.post(
	"/",
	validate([
		body("id").isString().notEmpty().withMessage("City Amenity ID is required"),
		body("name")
			.isString()
			.notEmpty()
			.withMessage("City Amenity name is required"),
		body("description").optional().isString(),
	]),
	async (req, res, next) => {
		try {
			const newCityAmenity = await CityAmenitiesService.createCityAmenity(
				req.body
			);
			res.status(201).json({
				status: "success",
				data: newCityAmenity,
			});
		} catch (error) {
			next(error);
		}
	}
);

// PUT /api/city-amenities/:id - Update a city amenity
router.put(
	"/:id",
	validate([
		param("id")
			.isString()
			.notEmpty()
			.withMessage("City Amenity ID is required"),
		body("name").optional().isString(),
		body("description").optional().isString(),
	]),
	async (req, res, next) => {
		try {
			const updatedCityAmenity = await CityAmenitiesService.updateCityAmenity(
				req.params.id,
				req.body
			);
			res.status(200).json({
				status: "success",
				data: updatedCityAmenity,
			});
		} catch (error) {
			next(error);
		}
	}
);

// DELETE /api/city-amenities/:id - Delete a city amenity
router.delete(
	"/:id",
	validate([
		param("id")
			.isString()
			.notEmpty()
			.withMessage("City Amenity ID is required"),
	]),
	async (req, res, next) => {
		try {
			await CityAmenitiesService.deleteCityAmenity(req.params.id);
			res.status(200).json({
				status: "success",
				message: "City Amenity deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
);

export default router;
