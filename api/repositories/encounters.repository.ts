import { query } from "../config/db";
import { Encounter } from "../../types/gameData";

export const EncountersRepository = {
	// Get all encounters
	async getAll(): Promise<Encounter[]> {
		try {
			const result = await query(
				"SELECT id, name, description, conditions_hearts, conditions_diamonds FROM encounters ORDER BY name"
			);

			return result.rows.map((row) => ({
				id: row.id,
				name: row.name,
				description: row.description,
				conditions: {
					hearts: row.conditions_hearts,
					diamonds: row.conditions_diamonds,
				},
			}));
		} catch (error) {
			console.error("Error getting all encounters:", error);
			return [];
		}
	},

	// Get encounter by ID
	async getById(id: string): Promise<Encounter | null> {
		try {
			const result = await query(
				"SELECT id, name, description, conditions_hearts, conditions_diamonds FROM encounters WHERE id = $1",
				[id]
			);

			if (!result.rows.length) return null;

			const row = result.rows[0];
			return {
				id: row.id,
				name: row.name,
				description: row.description,
				conditions: {
					hearts: row.conditions_hearts,
					diamonds: row.conditions_diamonds,
				},
			};
		} catch (error) {
			console.error(`Error getting encounter by ID ${id}:`, error);
			return null;
		}
	},

	// Create new encounter
	async create(encounter: Encounter): Promise<Encounter> {
		const result = await query(
			`INSERT INTO encounters (
				id, name, description, conditions_hearts, conditions_diamonds
			) VALUES ($1, $2, $3, $4, $5)
			RETURNING id, name, description, conditions_hearts, conditions_diamonds`,
			[
				encounter.id,
				encounter.name,
				encounter.description || null,
				encounter.conditions?.hearts || null,
				encounter.conditions?.diamonds || null,
			]
		);

		const row = result.rows[0];
		return {
			id: row.id,
			name: row.name,
			description: row.description,
			conditions: {
				hearts: row.conditions_hearts,
				diamonds: row.conditions_diamonds,
			},
		};
	},

	// Update existing encounter
	async update(
		id: string,
		data: Partial<Encounter>
	): Promise<Encounter | null> {
		// First check if encounter exists
		const existsResult = await query("SELECT 1 FROM encounters WHERE id = $1", [
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

		if (data.conditions?.hearts !== undefined) {
			updates.push(`conditions_hearts = $${paramIndex}`);
			values.push(data.conditions.hearts);
			paramIndex++;
		}

		if (data.conditions?.diamonds !== undefined) {
			updates.push(`conditions_diamonds = $${paramIndex}`);
			values.push(data.conditions.diamonds);
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
			`UPDATE encounters
			SET ${updates.join(", ")}
			WHERE id = $${paramIndex}
			RETURNING id, name, description, conditions_hearts, conditions_diamonds`,
			values
		);

		if (!result.rows.length) return null;

		const row = result.rows[0];
		return {
			id: row.id,
			name: row.name,
			description: row.description,
			conditions: {
				hearts: row.conditions_hearts,
				diamonds: row.conditions_diamonds,
			},
		};
	},

	// Delete encounter
	async delete(id: string): Promise<boolean> {
		const result = await query("DELETE FROM encounters WHERE id = $1", [id]);
		return result.rowCount ? result.rowCount > 0 : false;
	},

	// Batch insert encounters for initial data loading
	async batchInsert(encounters: Encounter[]): Promise<number> {
		if (!encounters.length) return 0;

		// For simplicity, let's do individual inserts in a transaction
		const client = await (await import("../config/db")).default.connect();

		try {
			await client.query("BEGIN");

			let insertedCount = 0;

			for (const encounter of encounters) {
				const result = await client.query(
					`INSERT INTO encounters (
						id, name, description, conditions_hearts, conditions_diamonds
					)
					VALUES ($1, $2, $3, $4, $5)
					ON CONFLICT (id) DO UPDATE
					SET name = EXCLUDED.name,
						description = EXCLUDED.description,
						conditions_hearts = EXCLUDED.conditions_hearts,
						conditions_diamonds = EXCLUDED.conditions_diamonds,
						updated_at = CURRENT_TIMESTAMP
					`,
					[
						encounter.id,
						encounter.name,
						encounter.description || null,
						encounter.conditions?.hearts || null,
						encounter.conditions?.diamonds || null,
					]
				);

				insertedCount += result.rowCount || 0;
			}

			await client.query("COMMIT");
			return insertedCount;
		} catch (error) {
			await client.query("ROLLBACK");
			console.error("Error batch inserting encounters:", error);
			throw error;
		} finally {
			client.release();
		}
	},
};
