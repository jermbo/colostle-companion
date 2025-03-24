import { query } from "../config/db";
import { OceanEncounter } from "../../types/gameData";

export const OceanEncountersRepository = {
	// Get all ocean encounters
	async getAll(): Promise<OceanEncounter[]> {
		try {
			const result = await query(
				"SELECT id, name, description, conditions_red, conditions_black FROM ocean_encounters ORDER BY name"
			);

			return result.rows.map((row) => ({
				id: row.id,
				name: row.name,
				description: row.description,
				conditions: {
					red: row.conditions_red,
					black: row.conditions_black,
				},
			}));
		} catch (error) {
			console.error("Error getting all ocean encounters:", error);
			return [];
		}
	},

	// Get ocean encounter by ID
	async getById(id: string): Promise<OceanEncounter | null> {
		try {
			const result = await query(
				"SELECT id, name, description, conditions_red, conditions_black FROM ocean_encounters WHERE id = $1",
				[id]
			);

			if (!result.rows.length) return null;

			const row = result.rows[0];
			return {
				id: row.id,
				name: row.name,
				description: row.description,
				conditions: {
					red: row.conditions_red,
					black: row.conditions_black,
				},
			};
		} catch (error) {
			console.error(`Error getting ocean encounter by ID ${id}:`, error);
			return null;
		}
	},

	// Create new ocean encounter
	async create(encounter: OceanEncounter): Promise<OceanEncounter> {
		const result = await query(
			`INSERT INTO ocean_encounters (
				id, name, description, conditions_red, conditions_black
			) VALUES ($1, $2, $3, $4, $5)
			RETURNING id, name, description, conditions_red, conditions_black`,
			[
				encounter.id,
				encounter.name,
				encounter.description || null,
				encounter.conditions?.red || null,
				encounter.conditions?.black || null,
			]
		);

		const row = result.rows[0];
		return {
			id: row.id,
			name: row.name,
			description: row.description,
			conditions: {
				red: row.conditions_red,
				black: row.conditions_black,
			},
		};
	},

	// Update existing ocean encounter
	async update(
		id: string,
		data: Partial<OceanEncounter>
	): Promise<OceanEncounter | null> {
		// First check if ocean encounter exists
		const existsResult = await query(
			"SELECT 1 FROM ocean_encounters WHERE id = $1",
			[id]
		);

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

		if (data.conditions?.red !== undefined) {
			updates.push(`conditions_red = $${paramIndex}`);
			values.push(data.conditions.red);
			paramIndex++;
		}

		if (data.conditions?.black !== undefined) {
			updates.push(`conditions_black = $${paramIndex}`);
			values.push(data.conditions.black);
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
			`UPDATE ocean_encounters
			SET ${updates.join(", ")}
			WHERE id = $${paramIndex}
			RETURNING id, name, description, conditions_red, conditions_black`,
			values
		);

		if (!result.rows.length) return null;

		const row = result.rows[0];
		return {
			id: row.id,
			name: row.name,
			description: row.description,
			conditions: {
				red: row.conditions_red,
				black: row.conditions_black,
			},
		};
	},

	// Delete ocean encounter
	async delete(id: string): Promise<boolean> {
		const result = await query("DELETE FROM ocean_encounters WHERE id = $1", [
			id,
		]);
		return result.rowCount ? result.rowCount > 0 : false;
	},

	// Batch insert ocean encounters for initial data loading
	async batchInsert(encounters: OceanEncounter[]): Promise<number> {
		if (!encounters.length) return 0;

		// For simplicity, let's do individual inserts in a transaction
		const client = await (await import("../config/db")).default.connect();

		try {
			await client.query("BEGIN");

			let insertedCount = 0;

			for (const encounter of encounters) {
				const result = await client.query(
					`INSERT INTO ocean_encounters (
						id, name, description, conditions_red, conditions_black
					)
					VALUES ($1, $2, $3, $4, $5)
					ON CONFLICT (id) DO UPDATE
					SET name = EXCLUDED.name,
						description = EXCLUDED.description,
						conditions_red = EXCLUDED.conditions_red,
						conditions_black = EXCLUDED.conditions_black,
						updated_at = CURRENT_TIMESTAMP
					`,
					[
						encounter.id,
						encounter.name,
						encounter.description || null,
						encounter.conditions?.red || null,
						encounter.conditions?.black || null,
					]
				);

				insertedCount += result.rowCount || 0;
			}

			await client.query("COMMIT");
			return insertedCount;
		} catch (error) {
			await client.query("ROLLBACK");
			console.error("Error batch inserting ocean encounters:", error);
			throw error;
		} finally {
			client.release();
		}
	},
};
