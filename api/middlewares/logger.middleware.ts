import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.info(`Request: ${req.method} ${req.url}`, {
		method: req.method,
		url: req.url,
		body: req.body,
		query: req.query,
		params: req.params,
		ip: req.ip,
		userAgent: req.headers["user-agent"],
	});

	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;

		if (res.statusCode >= 400) {
			logger.warn(`Response: ${res.statusCode} (${duration}ms)`, {
				statusCode: res.statusCode,
				duration,
			});
		} else {
			logger.info(`Response: ${res.statusCode} (${duration}ms)`, {
				statusCode: res.statusCode,
				duration,
			});
		}
	});

	next();
};
