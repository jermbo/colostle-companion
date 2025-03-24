import { LocationsRepository } from "../repositories/locations.repository";
import { Location } from "../../types/gameData";
import { ApiError } from "../middlewares/error.middleware";

export const LocationsService = {
	// Get all locations
	async getAllLocations(): Promise<Location[]> {
		try {
			return await LocationsRepository.getAll();
		} catch (error: any) {
			throw new ApiError(error.message);
		}
	},

	// Get location by ID
	async getLocationById(id: string): Promise<Location> {
		try {
			const location = await LocationsRepository.getById(id);

			if (!location) {
				const error = new ApiError(`Location with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return location;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(error.message);
		}
	},

	// Create a new location
	async createLocation(locationData: Location): Promise<Location> {
		try {
			// Check if location with the same ID already exists
			const existingLocation = await LocationsRepository.getById(
				locationData.id
			);

			if (existingLocation) {
				const error = new ApiError(
					`Location with ID ${locationData.id} already exists`
				);
				error.statusCode = 409; // Conflict
				throw error;
			}

			return await LocationsRepository.create(locationData);
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to create location: ${error.message}`);
		}
	},

	// Update an existing location
	async updateLocation(
		id: string,
		locationData: Partial<Location>
	): Promise<Location> {
		try {
			const updatedLocation = await LocationsRepository.update(
				id,
				locationData
			);

			if (!updatedLocation) {
				const error = new ApiError(`Location with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return updatedLocation;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to update location: ${error.message}`);
		}
	},

	// Delete a location
	async deleteLocation(id: string): Promise<void> {
		try {
			const deleted = await LocationsRepository.delete(id);

			if (!deleted) {
				const error = new ApiError(`Location with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to delete location: ${error.message}`);
		}
	},

	// Batch import locations (used for initial data seeding)
	async importLocations(locations: Location[]): Promise<number> {
		try {
			return await LocationsRepository.batchInsert(locations);
		} catch (error: any) {
			throw new ApiError(`Failed to import locations: ${error.message}`);
		}
	},
};
