import { query } from "../config/db";
import { CityAmenity } from "../../types/gameData";

export const CityAmenitiesRepository = {
	// Get all city amenities
	async getAll(): Promise<CityAmenity[]> {
		try {
			const result = await query(
				"SELECT id, name, description FROM city_amenities ORDER BY name"
			);

			return result.rows as CityAmenity[];
		} catch (error) {
			console.error("Error getting all city amenities:", error);
			return [];
		}
	},

	// Get city amenity by ID
	async getById(id: string): Promise<CityAmenity | null> {
		try {
			const result = await query(
				"SELECT id, name, description FROM city_amenities WHERE id = $1",
				[id]
			);

			return result.rows.length ? (result.rows[0] as CityAmenity) : null;
		} catch (error) {
			console.error(`Error getting city amenity by ID ${id}:`, error);
			return null;
		}
	},

	// Create new city amenity
	async create(amenity: CityAmenity): Promise<CityAmenity> {
		const result = await query(
			`INSERT INTO city_amenities (
				id, name, description
			) VALUES ($1, $2, $3)
			RETURNING id, name, description`,
			[amenity.id, amenity.name, amenity.description || null]
		);

		return result.rows[0] as CityAmenity;
	},

	// Update existing city amenity
	async update(
		id: string,
		data: Partial<CityAmenity>
	): Promise<CityAmenity | null> {
		// First check if city amenity exists
		const existsResult = await query(
			"SELECT 1 FROM city_amenities WHERE id = $1",
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

		if (updates.length === 0) {
			// No fields to update
			return this.getById(id);
		}

		updates.push("updated_at = CURRENT_TIMESTAMP");

		// Add ID as the last parameter
		values.push(id);

		const result = await query(
			`UPDATE city_amenities
			SET ${updates.join(", ")}
			WHERE id = $${paramIndex}
			RETURNING id, name, description`,
			values
		);

		return result.rows.length ? (result.rows[0] as CityAmenity) : null;
	},

	// Delete city amenity
	async delete(id: string): Promise<boolean> {
		const result = await query("DELETE FROM city_amenities WHERE id = $1", [
			id,
		]);
		return result.rowCount ? result.rowCount > 0 : false;
	},

	// Batch insert city amenities for initial data loading
	async batchInsert(amenities: CityAmenity[]): Promise<number> {
		if (!amenities.length) return 0;

		// For simplicity, let's do individual inserts in a transaction
		const client = await (await import("../config/db")).default.connect();

		try {
			await client.query("BEGIN");

			let insertedCount = 0;

			for (const amenity of amenities) {
				const result = await client.query(
					`INSERT INTO city_amenities (
						id, name, description
					)
					VALUES ($1, $2, $3)
					ON CONFLICT (id) DO UPDATE
					SET name = EXCLUDED.name,
						description = EXCLUDED.description,
						updated_at = CURRENT_TIMESTAMP
					`,
					[amenity.id, amenity.name, amenity.description || null]
				);

				insertedCount += result.rowCount || 0;
			}

			await client.query("COMMIT");
			return insertedCount;
		} catch (error) {
			await client.query("ROLLBACK");
			console.error("Error batch inserting city amenities:", error);
			throw error;
		} finally {
			client.release();
		}
	},
};
