import { config } from "dotenv";
import { seedDatabase } from "../utils/seedData.js";
import { logger } from "../utils/logger.js";

// Import data
import items from "../../ui/src/data/items.js";

// Load environment variables
config();

// Run the seed function
async function runSeed() {
	try {
		logger.info("Starting database seeding process...");

		// Seed all data
		await seedDatabase(items);

		logger.info("Database seeding completed successfully");
		process.exit(0);
	} catch (error) {
		logger.error(`Seeding failed: ${error.message}`);
		process.exit(1);
	}
}

runSeed();
