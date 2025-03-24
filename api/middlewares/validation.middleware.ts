import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { ApiError } from "./error.middleware";

export const validate = (validations: ValidationChain[]) => {
	return async (req: Request, _: Response, next: NextFunction) => {
		// Run all validations
		await Promise.all(validations.map((validation) => validation.run(req)));

		// Check for validation errors
		const errors = validationResult(req);

		if (errors.isEmpty()) {
			return next();
		}

		// Create an error with validation details
		const validationErrors = errors.array().map((error) => ({
			field: error.type === "field" ? error.path : "",
			message: error.msg,
		}));

		const error = new ApiError("Validation error", 400, validationErrors);
		next(error);
	};
};
