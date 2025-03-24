import { query } from "../config/db";
import { Weather } from "../../types/gameData";

export const WeatherRepository = {
	// Get all weather
	async getAll(): Promise<Weather[]> {
		try {
			const result = await query(
				"SELECT id, name, description FROM weather ORDER BY name"
			);

			return result.rows as Weather[];
		} catch (error) {
			console.error("Error getting all weather:", error);
			return [];
		}
	},

	// Get weather by ID
	async getById(id: string): Promise<Weather | null> {
		try {
			const result = await query(
				"SELECT id, name, description FROM weather WHERE id = $1",
				[id]
			);

			return result.rows.length ? (result.rows[0] as Weather) : null;
		} catch (error) {
			console.error(`Error getting weather by ID ${id}:`, error);
			return null;
		}
	},

	// Create new weather
	async create(weather: Weather): Promise<Weather> {
		const result = await query(
			`INSERT INTO weather (
				id, name, description
			) VALUES ($1, $2, $3)
			RETURNING id, name, description`,
			[weather.id, weather.name, weather.description || null]
		);

		return result.rows[0] as Weather;
	},

	// Update existing weather
	async update(id: string, data: Partial<Weather>): Promise<Weather | null> {
		// First check if weather exists
		const existsResult = await query("SELECT 1 FROM weather WHERE id = $1", [
			id,
		]);

		if (!existsResult.rows.length) {
			return null;
		}

		// Collect fields to update and their values
		const updates: string[] = [];
		const values: any[] = [];
		let paramIndex = 1;

		if (data.name !== undefined) {
			updates.push(`name = $${paramIndex}`);
			values.push(data.name);
			paramIndex++;
		}

		if (data.description !== undefined) {
			updates.push(`description = $${paramIndex}`);
			values.push(data.description);
			paramIndex++;
		}

		if (updates.length === 0) {
			// No fields to update
			return this.getById(id);
		}

		updates.push("updated_at = CURRENT_TIMESTAMP");

		// Add ID as the last parameter
		values.push(id);

		const result = await query(
			`UPDATE weather
			SET ${updates.join(", ")}
			WHERE id = $${paramIndex}
			RETURNING id, name, description`,
			values
		);

		return result.rows.length ? (result.rows[0] as Weather) : null;
	},

	// Delete weather
	async delete(id: string): Promise<boolean> {
		const result = await query("DELETE FROM weather WHERE id = $1", [id]);
		return result.rowCount ? result.rowCount > 0 : false;
	},

	// Batch insert weather for initial data loading
	async batchInsert(weatherItems: Weather[]): Promise<number> {
		if (!weatherItems.length) return 0;

		// For simplicity, let's do individual inserts in a transaction
		const client = await (await import("../config/db")).default.connect();

		try {
			await client.query("BEGIN");

			let insertedCount = 0;

			for (const weather of weatherItems) {
				const result = await client.query(
					`INSERT INTO weather (
						id, name, description
					)
					VALUES ($1, $2, $3)
					ON CONFLICT (id) DO UPDATE
					SET name = EXCLUDED.name,
						description = EXCLUDED.description,
						updated_at = CURRENT_TIMESTAMP
					`,
					[weather.id, weather.name, weather.description || null]
				);

				insertedCount += result.rowCount || 0;
			}

			await client.query("COMMIT");
			return insertedCount;
		} catch (error) {
			await client.query("ROLLBACK");
			console.error("Error batch inserting weather:", error);
			throw error;
		} finally {
			client.release();
		}
	},
};
