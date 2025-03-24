import { query } from "../config/db";
import { Item } from "../../types/gameData";

export const ItemsRepository = {
	// Get all items
	async getAll(): Promise<Item[]> {
		try {
			const result = await query(
				"SELECT id, name, description FROM items ORDER BY name"
			);
			return result.rows as Item[];
		} catch (error) {
			console.error("Error getting all items:", error);
			return [];
		}
	},

	// Get item by ID
	async getById(id: string): Promise<Item | null> {
		try {
			const result = await query(
				"SELECT id, name, description FROM items WHERE id = $1",
				[id]
			);
			return result.rows.length ? (result.rows[0] as Item) : null;
		} catch (error) {
			console.error(`Error getting item by ID ${id}:`, error);
			return null;
		}
	},

	// Create new item
	async create(item: Item): Promise<Item> {
		const result = await query(
			"INSERT INTO items (id, name, description) VALUES ($1, $2, $3) RETURNING id, name, description",
			[item.id, item.name, item.description || null]
		);

		return result.rows[0] as Item;
	},

	// Update existing item
	async update(id: string, data: Partial<Item>): Promise<Item | null> {
		// First check if item exists
		const existsResult = await query("SELECT 1 FROM items WHERE id = $1", [id]);

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
			`UPDATE items SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING id, name, description`,
			values
		);

		return result.rows[0] as Item;
	},

	// Delete item
	async delete(id: string): Promise<boolean> {
		const result = await query("DELETE FROM items WHERE id = $1", [id]);
		return result.rowCount ? result.rowCount > 0 : false;
	},

	// Batch insert items for initial data loading
	async batchInsert(items: Item[]): Promise<number> {
		if (!items.length) return 0;

		// For simplicity, let's do individual inserts in a transaction
		const client = await (await import("../config/db")).default.connect();

		try {
			await client.query("BEGIN");

			let insertedCount = 0;

			for (const item of items) {
				const result = await client.query(
					`INSERT INTO items (id, name, description)
					VALUES ($1, $2, $3)
					ON CONFLICT (id) DO UPDATE
					SET name = EXCLUDED.name,
						description = EXCLUDED.description,
						updated_at = CURRENT_TIMESTAMP
					`,
					[item.id, item.name, item.description || null]
				);

				insertedCount += result.rowCount || 0;
			}

			await client.query("COMMIT");
			return insertedCount;
		} catch (error) {
			await client.query("ROLLBACK");
			console.error("Error batch inserting items:", error);
			throw error;
		} finally {
			client.release();
		}
	},
};
