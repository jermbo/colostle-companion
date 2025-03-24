import pg from "pg";
import { config } from "dotenv";
import { logger } from "../utils/logger";

// Load environment variables
config();

// Create a PostgreSQL Pool
const pool = new pg.Pool({
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || "5432"),
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	ssl: process.env.DB_SSL === "true",
});

// Log connection events
pool.on("connect", () => {
	logger.info("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
	logger.error("PostgreSQL pool error:", err);
});

// Function to test database connection
export const testConnection = async (): Promise<boolean> => {
	try {
		const client = await pool.connect();
		const result = await client.query("SELECT 1 as connection_test");
		client.release();

		if (result.rows[0].connection_test === 1) {
			logger.info("Database connection established successfully");
			return true;
		}

		return false;
	} catch (error: any) {
		logger.error(`Failed to connect to database: ${error.message}`);
		return false;
	}
};

// Helper function to execute parameterized queries securely
export const query = async (
	text: string,
	params: any[] = []
): Promise<pg.QueryResult> => {
	try {
		const client = await pool.connect();
		const start = Date.now();
		const result = await client.query(text, params);
		const duration = Date.now() - start;

		if (process.env.NODE_ENV === "development") {
			logger.debug(`Executed query: ${text}`, {
				rows: result.rowCount,
				duration,
			});
		}

		client.release();
		return result;
	} catch (error: any) {
		logger.error(`Query execution error: ${error.message}`, {
			text,
			params,
			error,
		});
		throw error;
	}
};

// Export the pool for direct access if needed
export default pool;
