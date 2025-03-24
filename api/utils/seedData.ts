import { logger } from "./logger";
import { ItemsService } from "../services/items.service";
import { Item } from "../../types/gameData";

// Import seed data
const seedItems = async (items: Item[]): Promise<void> => {
	try {
		logger.info("Seeding items data...");
		const count = await ItemsService.importItems(items);
		logger.info(`Successfully seeded ${count} items`);
	} catch (error: any) {
		logger.error(`Error seeding items: ${error.message}`);
		throw error;
	}
};

// Main function to seed all data
export const seedDatabase = async (items: Item[]): Promise<void> => {
	try {
		logger.info("Starting database seeding...");

		// Seed items
		await seedItems(items);

		// Add other seed functions as needed
		// await seedLocations();
		// await seedEncounters();
		// etc.

		logger.info("Database seeding completed successfully");
	} catch (error: any) {
		logger.error(`Database seeding failed: ${error.message}`);
		throw error;
	}
};
