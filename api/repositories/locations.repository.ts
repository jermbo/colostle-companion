import { query } from "../config/db";
import { Location } from "../../types/gameData";

export const LocationsRepository = {
	// Get all locations
	async getAll(): Promise<Location[]> {
		try {
			const result = await query(
				"SELECT id, name, description, conditions_spades, conditions_clubs FROM locations ORDER BY name"
			);

			return result.rows.map((row) => ({
				id: row.id,
				name: row.name,
				description: row.description,
				conditions: {
					spades: row.conditions_spades,
					clubs: row.conditions_clubs,
				},
			}));
		} catch (error) {
			console.error("Error getting all locations:", error);
			return [];
		}
	},

	// Get location by ID
	async getById(id: string): Promise<Location | null> {
		try {
			const result = await query(
				"SELECT id, name, description, conditions_spades, conditions_clubs FROM locations WHERE id = $1",
				[id]
			);

			if (!result.rows.length) return null;

			const row = result.rows[0];
			return {
				id: row.id,
				name: row.name,
				description: row.description,
				conditions: {
					spades: row.conditions_spades,
					clubs: row.conditions_clubs,
				},
			};
		} catch (error) {
			console.error(`Error getting location by ID ${id}:`, error);
			return null;
		}
	},

	// Create new location
	async create(location: Location): Promise<Location> {
		const result = await query(
			`INSERT INTO locations (
				id, name, description, conditions_spades, conditions_clubs
			) VALUES ($1, $2, $3, $4, $5)
			RETURNING id, name, description, conditions_spades, conditions_clubs`,
			[
				location.id,
				location.name,
				location.description || null,
				location.conditions?.spades || null,
				location.conditions?.clubs || null,
			]
		);

		const row = result.rows[0];
		return {
			id: row.id,
			name: row.name,
			description: row.description,
			conditions: {
				spades: row.conditions_spades,
				clubs: row.conditions_clubs,
			},
		};
	},

	// Update existing location
	async update(id: string, data: Partial<Location>): Promise<Location | null> {
		// First check if location exists
		const existsResult = await query("SELECT 1 FROM locations WHERE id = $1", [
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

		if (data.conditions?.spades !== undefined) {
			updates.push(`conditions_spades = $${paramIndex}`);
			values.push(data.conditions.spades);
			paramIndex++;
		}

		if (data.conditions?.clubs !== undefined) {
			updates.push(`conditions_clubs = $${paramIndex}`);
			values.push(data.conditions.clubs);
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
			`UPDATE locations
			SET ${updates.join(", ")}
			WHERE id = $${paramIndex}
			RETURNING id, name, description, conditions_spades, conditions_clubs`,
			values
		);

		if (!result.rows.length) return null;

		const row = result.rows[0];
		return {
			id: row.id,
			name: row.name,
			description: row.description,
			conditions: {
				spades: row.conditions_spades,
				clubs: row.conditions_clubs,
			},
		};
	},

	// Delete location
	async delete(id: string): Promise<boolean> {
		const result = await query("DELETE FROM locations WHERE id = $1", [id]);
		return result.rowCount ? result.rowCount > 0 : false;
	},

	// Batch insert locations for initial data loading
	async batchInsert(locations: Location[]): Promise<number> {
		if (!locations.length) return 0;

		// For simplicity, let's do individual inserts in a transaction
		const client = await (await import("../config/db")).default.connect();

		try {
			await client.query("BEGIN");

			let insertedCount = 0;

			for (const location of locations) {
				const result = await client.query(
					`INSERT INTO locations (
						id, name, description, conditions_spades, conditions_clubs
					)
					VALUES ($1, $2, $3, $4, $5)
					ON CONFLICT (id) DO UPDATE
					SET name = EXCLUDED.name,
						description = EXCLUDED.description,
						conditions_spades = EXCLUDED.conditions_spades,
						conditions_clubs = EXCLUDED.conditions_clubs,
						updated_at = CURRENT_TIMESTAMP
					`,
					[
						location.id,
						location.name,
						location.description || null,
						location.conditions?.spades || null,
						location.conditions?.clubs || null,
					]
				);

				insertedCount += result.rowCount || 0;
			}

			await client.query("COMMIT");
			return insertedCount;
		} catch (error) {
			await client.query("ROLLBACK");
			console.error("Error batch inserting locations:", error);
			throw error;
		} finally {
			client.release();
		}
	},
};
