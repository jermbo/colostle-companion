import { query } from "../config/db";
import { Event } from "../../types/gameData";

export const EventsRepository = {
	// Get all events
	async getAll(): Promise<Event[]> {
		try {
			const result = await query(
				"SELECT id, name, description FROM events ORDER BY name"
			);

			return result.rows as Event[];
		} catch (error) {
			console.error("Error getting all events:", error);
			return [];
		}
	},

	// Get event by ID
	async getById(id: string): Promise<Event | null> {
		try {
			const result = await query(
				"SELECT id, name, description FROM events WHERE id = $1",
				[id]
			);

			return result.rows.length ? (result.rows[0] as Event) : null;
		} catch (error) {
			console.error(`Error getting event by ID ${id}:`, error);
			return null;
		}
	},

	// Create new event
	async create(event: Event): Promise<Event> {
		const result = await query(
			`INSERT INTO events (
				id, name, description
			) VALUES ($1, $2, $3)
			RETURNING id, name, description`,
			[event.id, event.name, event.description || null]
		);

		return result.rows[0] as Event;
	},

	// Update existing event
	async update(id: string, data: Partial<Event>): Promise<Event | null> {
		// First check if event exists
		const existsResult = await query("SELECT 1 FROM events WHERE id = $1", [
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
			`UPDATE events
			SET ${updates.join(", ")}
			WHERE id = $${paramIndex}
			RETURNING id, name, description`,
			values
		);

		return result.rows.length ? (result.rows[0] as Event) : null;
	},

	// Delete event
	async delete(id: string): Promise<boolean> {
		const result = await query("DELETE FROM events WHERE id = $1", [id]);
		return result.rowCount ? result.rowCount > 0 : false;
	},

	// Batch insert events for initial data loading
	async batchInsert(events: Event[]): Promise<number> {
		if (!events.length) return 0;

		// For simplicity, let's do individual inserts in a transaction
		const client = await (await import("../config/db")).default.connect();

		try {
			await client.query("BEGIN");

			let insertedCount = 0;

			for (const event of events) {
				const result = await client.query(
					`INSERT INTO events (
						id, name, description
					)
					VALUES ($1, $2, $3)
					ON CONFLICT (id) DO UPDATE
					SET name = EXCLUDED.name,
						description = EXCLUDED.description,
						updated_at = CURRENT_TIMESTAMP
					`,
					[event.id, event.name, event.description || null]
				);

				insertedCount += result.rowCount || 0;
			}

			await client.query("COMMIT");
			return insertedCount;
		} catch (error) {
			await client.query("ROLLBACK");
			console.error("Error batch inserting events:", error);
			throw error;
		} finally {
			client.release();
		}
	},
};
