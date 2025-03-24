import { config } from "dotenv";
import { seedDatabase } from "../utils/seedData";
import { logger } from "../utils/logger";

// Import data
import items from "../../ui/src/data/items";
import locations from "../../ui/src/data/locations";
import encounters from "../../ui/src/data/encounters";
import events from "../../ui/src/data/events";
import oceanEncounters from "../../ui/src/data/ocean-encounters";
import weather from "../../ui/src/data/weather";
import cityAmenities from "../../ui/src/data/city-amenities";

// Load environment variables
config();

// Run the seed function
async function runSeed() {
	try {
		logger.info("Starting database seeding process...");

		// Seed all data
		await seedDatabase({
			items,
			locations,
			encounters,
			events,
			oceanEncounters,
			weather,
			cityAmenities,
		});

		logger.info("Database seeding completed successfully");
		process.exit(0);
	} catch (error) {
		logger.error(`Seeding failed: ${error.message}`);
		process.exit(1);
	}
}

runSeed();
