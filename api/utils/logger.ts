import winston from "winston";
import { config } from "dotenv";

// Load environment variables
config();

const { combine, timestamp, printf, colorize } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, ...meta }) => {
	return `${timestamp} [${level}]: ${message} ${
		Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
	}`;
});

// Create logger instance
export const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || "info",
	format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
	transports: [
		// Console transport for all environments
		new winston.transports.Console({
			format: combine(
				colorize(),
				timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				logFormat
			),
		}),
		// File transport for production
		...(process.env.NODE_ENV === "production"
			? [
					new winston.transports.File({
						filename: "logs/error.log",
						level: "error",
					}),
					new winston.transports.File({
						filename: "logs/combined.log",
					}),
				]
			: []),
	],
});

// Export a stream object for Morgan integration
export const stream = {
	write: (message: string) => {
		logger.info(message.trim());
	},
};
