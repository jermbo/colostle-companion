import { logger } from "./logger";
import { ItemsService } from "../services/items.service";
import { LocationsService } from "../services/locations.service";
import { EncountersService } from "../services/encounters.service";
import { EventsService } from "../services/events.service";
import { OceanEncountersService } from "../services/oceanEncounters.service";
import { WeatherService } from "../services/weather.service";
import { CityAmenitiesService } from "../services/cityAmenities.service";
import {
	Item,
	Location,
	Encounter,
	Event,
	OceanEncounter,
	Weather,
	CityAmenity,
} from "../../types/gameData";

// Seed items
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

// Seed locations
const seedLocations = async (locations: Location[]): Promise<void> => {
	try {
		logger.info("Seeding locations data...");
		const count = await LocationsService.importLocations(locations);
		logger.info(`Successfully seeded ${count} locations`);
	} catch (error: any) {
		logger.error(`Error seeding locations: ${error.message}`);
		throw error;
	}
};

// Seed encounters
const seedEncounters = async (encounters: Encounter[]): Promise<void> => {
	try {
		logger.info("Seeding encounters data...");
		const count = await EncountersService.importEncounters(encounters);
		logger.info(`Successfully seeded ${count} encounters`);
	} catch (error: any) {
		logger.error(`Error seeding encounters: ${error.message}`);
		throw error;
	}
};

// Seed events
const seedEvents = async (events: Event[]): Promise<void> => {
	try {
		logger.info("Seeding events data...");
		const count = await EventsService.importEvents(events);
		logger.info(`Successfully seeded ${count} events`);
	} catch (error: any) {
		logger.error(`Error seeding events: ${error.message}`);
		throw error;
	}
};

// Seed ocean encounters
const seedOceanEncounters = async (
	oceanEncounters: OceanEncounter[]
): Promise<void> => {
	try {
		logger.info("Seeding ocean encounters data...");
		const count =
			await OceanEncountersService.importOceanEncounters(oceanEncounters);
		logger.info(`Successfully seeded ${count} ocean encounters`);
	} catch (error: any) {
		logger.error(`Error seeding ocean encounters: ${error.message}`);
		throw error;
	}
};

// Seed weather
const seedWeather = async (weather: Weather[]): Promise<void> => {
	try {
		logger.info("Seeding weather data...");
		const count = await WeatherService.importWeather(weather);
		logger.info(`Successfully seeded ${count} weather items`);
	} catch (error: any) {
		logger.error(`Error seeding weather: ${error.message}`);
		throw error;
	}
};

// Seed city amenities
const seedCityAmenities = async (
	cityAmenities: CityAmenity[]
): Promise<void> => {
	try {
		logger.info("Seeding city amenities data...");
		const count = await CityAmenitiesService.importCityAmenities(cityAmenities);
		logger.info(`Successfully seeded ${count} city amenities`);
	} catch (error: any) {
		logger.error(`Error seeding city amenities: ${error.message}`);
		throw error;
	}
};

// Main function to seed all data
export const seedDatabase = async (data: {
	items: Item[];
	locations: Location[];
	encounters: Encounter[];
	events: Event[];
	oceanEncounters: OceanEncounter[];
	weather: Weather[];
	cityAmenities: CityAmenity[];
}): Promise<void> => {
	try {
		logger.info("Starting database seeding...");

		// Seed all data types
		await seedItems(data.items);
		await seedLocations(data.locations);
		await seedEncounters(data.encounters);
		await seedEvents(data.events);
		await seedOceanEncounters(data.oceanEncounters);
		await seedWeather(data.weather);
		await seedCityAmenities(data.cityAmenities);

		logger.info("Database seeding completed successfully");
	} catch (error: any) {
		logger.error(`Database seeding failed: ${error.message}`);
		throw error;
	}
};
