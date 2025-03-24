import { OceanEncountersRepository } from "../repositories/oceanEncounters.repository";
import { OceanEncounter } from "../../types/gameData";
import { ApiError } from "../middlewares/error.middleware";

export const OceanEncountersService = {
	// Get all ocean encounters
	async getAllOceanEncounters(): Promise<OceanEncounter[]> {
		try {
			return await OceanEncountersRepository.getAll();
		} catch (error: any) {
			throw new ApiError(error.message);
		}
	},

	// Get ocean encounter by ID
	async getOceanEncounterById(id: string): Promise<OceanEncounter> {
		try {
			const encounter = await OceanEncountersRepository.getById(id);

			if (!encounter) {
				const error = new ApiError(`Ocean encounter with ID ${id} not found`);
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

	// Create a new ocean encounter
	async createOceanEncounter(
		encounterData: OceanEncounter
	): Promise<OceanEncounter> {
		try {
			// Check if ocean encounter with the same ID already exists
			const existingEncounter = await OceanEncountersRepository.getById(
				encounterData.id
			);

			if (existingEncounter) {
				const error = new ApiError(
					`Ocean encounter with ID ${encounterData.id} already exists`
				);
				error.statusCode = 409; // Conflict
				throw error;
			}

			return await OceanEncountersRepository.create(encounterData);
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to create ocean encounter: ${error.message}`);
		}
	},

	// Update an existing ocean encounter
	async updateOceanEncounter(
		id: string,
		encounterData: Partial<OceanEncounter>
	): Promise<OceanEncounter> {
		try {
			const updatedEncounter = await OceanEncountersRepository.update(
				id,
				encounterData
			);

			if (!updatedEncounter) {
				const error = new ApiError(`Ocean encounter with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return updatedEncounter;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to update ocean encounter: ${error.message}`);
		}
	},

	// Delete an ocean encounter
	async deleteOceanEncounter(id: string): Promise<void> {
		try {
			const deleted = await OceanEncountersRepository.delete(id);

			if (!deleted) {
				const error = new ApiError(`Ocean encounter with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to delete ocean encounter: ${error.message}`);
		}
	},

	// Batch import ocean encounters (used for initial data seeding)
	async importOceanEncounters(encounters: OceanEncounter[]): Promise<number> {
		try {
			return await OceanEncountersRepository.batchInsert(encounters);
		} catch (error: any) {
			throw new ApiError(`Failed to import ocean encounters: ${error.message}`);
		}
	},
};
