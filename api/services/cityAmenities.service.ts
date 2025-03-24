import { CityAmenitiesRepository } from "../repositories/cityAmenities.repository";
import { CityAmenity } from "../../types/gameData";
import { ApiError } from "../middlewares/error.middleware";

export const CityAmenitiesService = {
	// Get all city amenities
	async getAllCityAmenities(): Promise<CityAmenity[]> {
		try {
			return await CityAmenitiesRepository.getAll();
		} catch (error: any) {
			throw new ApiError(error.message);
		}
	},

	// Get city amenity by ID
	async getCityAmenityById(id: string): Promise<CityAmenity> {
		try {
			const amenity = await CityAmenitiesRepository.getById(id);

			if (!amenity) {
				const error = new ApiError(`City amenity with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return amenity;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(error.message);
		}
	},

	// Create a new city amenity
	async createCityAmenity(amenityData: CityAmenity): Promise<CityAmenity> {
		try {
			// Check if city amenity with the same ID already exists
			const existingAmenity = await CityAmenitiesRepository.getById(
				amenityData.id
			);

			if (existingAmenity) {
				const error = new ApiError(
					`City amenity with ID ${amenityData.id} already exists`
				);
				error.statusCode = 409; // Conflict
				throw error;
			}

			return await CityAmenitiesRepository.create(amenityData);
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to create city amenity: ${error.message}`);
		}
	},

	// Update an existing city amenity
	async updateCityAmenity(
		id: string,
		amenityData: Partial<CityAmenity>
	): Promise<CityAmenity> {
		try {
			const updatedAmenity = await CityAmenitiesRepository.update(
				id,
				amenityData
			);

			if (!updatedAmenity) {
				const error = new ApiError(`City amenity with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return updatedAmenity;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to update city amenity: ${error.message}`);
		}
	},

	// Delete a city amenity
	async deleteCityAmenity(id: string): Promise<void> {
		try {
			const deleted = await CityAmenitiesRepository.delete(id);

			if (!deleted) {
				const error = new ApiError(`City amenity with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to delete city amenity: ${error.message}`);
		}
	},

	// Batch import city amenities (used for initial data seeding)
	async importCityAmenities(amenities: CityAmenity[]): Promise<number> {
		try {
			return await CityAmenitiesRepository.batchInsert(amenities);
		} catch (error: any) {
			throw new ApiError(`Failed to import city amenities: ${error.message}`);
		}
	},
};
