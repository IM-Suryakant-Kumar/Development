import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";

export const errorHandlerMiddleware = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const customError = {
		statusCode: err.statusCode || 500,
		message: err.message || "Something went wrong",
	};

	if (err instanceof Error.ValidationError) {
		customError.message = Object.values(err.errors)
			.map((item) => item.message)
			.join(",");
		customError.statusCode = 400;
	}

	if (err instanceof Error.CastError) {
		customError.message = "Invalid Id Format.";
		customError.statusCode = 400;
	}

	if (err.name === "MongoServerError" && err.code === 11000) {
		customError.message = `${Object.keys(err.keyValue)} is already exists.`;
		customError.statusCode = 409;
	}

	res.status(customError.statusCode).json({ success: false, message: customError.message });
};
