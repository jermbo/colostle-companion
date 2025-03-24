import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validation.middleware";

const router = Router();

// GET /api/city-amenities - Get all city amenities
router.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		data: [],
	});
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
	(req, res) => {
		res.status(200).json({
			status: "success",
			data: {
				id: req.params.id,
				name: "Sample City Amenity",
				description: "Sample description",
			},
		});
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
	(req, res) => {
		res.status(201).json({
			status: "success",
			data: req.body,
		});
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
	(req, res) => {
		res.status(200).json({
			status: "success",
			data: { ...req.body, id: req.params.id },
		});
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
	(req, res) => {
		res.status(200).json({
			status: "success",
			message: "City Amenity deleted successfully",
		});
	}
);

export default router;
