import { WeatherRepository } from "../repositories/weather.repository";
import { Weather } from "../../types/gameData";
import { ApiError } from "../middlewares/error.middleware";

export const WeatherService = {
	// Get all weather
	async getAllWeather(): Promise<Weather[]> {
		try {
			return await WeatherRepository.getAll();
		} catch (error: any) {
			throw new ApiError(error.message);
		}
	},

	// Get weather by ID
	async getWeatherById(id: string): Promise<Weather> {
		try {
			const weather = await WeatherRepository.getById(id);

			if (!weather) {
				const error = new ApiError(`Weather with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return weather;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(error.message);
		}
	},

	// Create a new weather
	async createWeather(weatherData: Weather): Promise<Weather> {
		try {
			// Check if weather with the same ID already exists
			const existingWeather = await WeatherRepository.getById(weatherData.id);

			if (existingWeather) {
				const error = new ApiError(
					`Weather with ID ${weatherData.id} already exists`
				);
				error.statusCode = 409; // Conflict
				throw error;
			}

			return await WeatherRepository.create(weatherData);
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to create weather: ${error.message}`);
		}
	},

	// Update an existing weather
	async updateWeather(
		id: string,
		weatherData: Partial<Weather>
	): Promise<Weather> {
		try {
			const updatedWeather = await WeatherRepository.update(id, weatherData);

			if (!updatedWeather) {
				const error = new ApiError(`Weather with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return updatedWeather;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to update weather: ${error.message}`);
		}
	},

	// Delete weather
	async deleteWeather(id: string): Promise<void> {
		try {
			const deleted = await WeatherRepository.delete(id);

			if (!deleted) {
				const error = new ApiError(`Weather with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to delete weather: ${error.message}`);
		}
	},

	// Batch import weather (used for initial data seeding)
	async importWeather(weatherItems: Weather[]): Promise<number> {
		try {
			return await WeatherRepository.batchInsert(weatherItems);
		} catch (error: any) {
			throw new ApiError(`Failed to import weather: ${error.message}`);
		}
	},
};
