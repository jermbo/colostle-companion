import { EncountersRepository } from "../repositories/encounters.repository";
import { Encounter } from "../../types/gameData";
import { ApiError } from "../middlewares/error.middleware";

export const EncountersService = {
	// Get all encounters
	async getAllEncounters(): Promise<Encounter[]> {
		try {
			return await EncountersRepository.getAll();
		} catch (error: any) {
			throw new ApiError(error.message);
		}
	},

	// Get encounter by ID
	async getEncounterById(id: string): Promise<Encounter> {
		try {
			const encounter = await EncountersRepository.getById(id);

			if (!encounter) {
				const error = new ApiError(`Encounter with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return encounter;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(error.message);
		}
	},

	// Create a new encounter
	async createEncounter(encounterData: Encounter): Promise<Encounter> {
		try {
			// Check if encounter with the same ID already exists
			const existingEncounter = await EncountersRepository.getById(
				encounterData.id
			);

			if (existingEncounter) {
				const error = new ApiError(
					`Encounter with ID ${encounterData.id} already exists`
				);
				error.statusCode = 409; // Conflict
				throw error;
			}

			return await EncountersRepository.create(encounterData);
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to create encounter: ${error.message}`);
		}
	},

	// Update an existing encounter
	async updateEncounter(
		id: string,
		encounterData: Partial<Encounter>
	): Promise<Encounter> {
		try {
			const updatedEncounter = await EncountersRepository.update(
				id,
				encounterData
			);

			if (!updatedEncounter) {
				const error = new ApiError(`Encounter with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return updatedEncounter;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to update encounter: ${error.message}`);
		}
	},

	// Delete an encounter
	async deleteEncounter(id: string): Promise<void> {
		try {
			const deleted = await EncountersRepository.delete(id);

			if (!deleted) {
				const error = new ApiError(`Encounter with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to delete encounter: ${error.message}`);
		}
	},

	// Batch import encounters (used for initial data seeding)
	async importEncounters(encounters: Encounter[]): Promise<number> {
		try {
			return await EncountersRepository.batchInsert(encounters);
		} catch (error: any) {
			throw new ApiError(`Failed to import encounters: ${error.message}`);
		}
	},
};
