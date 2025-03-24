import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export class ApiError extends Error {
	statusCode: number;
	details?: any;

	constructor(message: string, statusCode = 500, details?: any) {
		super(message);
		this.name = "ApiError";
		this.statusCode = statusCode;
		this.details = details;

		// Capturing stack trace, excluding constructor call from it
		Error.captureStackTrace(this, this.constructor);
	}
}

export const errorHandler = (
	err: ApiError,
	req: Request,
	res: Response,
	_: NextFunction
) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	logger.error(`Error: ${message}`, {
		method: req.method,
		url: req.url,
		body: req.body,
		error: {
			message: err.message,
			stack: err.stack,
			details: err.details,
		},
	});

	res.status(statusCode).json({
		status: "error",
		statusCode,
		message,
		details: err.details,
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
	});
};
