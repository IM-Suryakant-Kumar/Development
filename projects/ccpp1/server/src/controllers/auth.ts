import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { User } from "../models";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { sendToken } from "../utils";

export const signup = asyncWrapper(async (req: Request, res: Response) => {
	const user = await User.create(req.body);
	sendToken(res, 201, "Signed up successfully", user);
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!(email && password)) throw new BadRequestError("Please provide email and password");

	const user = await User.findOne({ email })
	if (!user) throw new UnauthenticatedError("Invalid credentials");

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");

	sendToken(res, 200, "Logged in successfully", user);
});

export const guestLogin = asyncWrapper(async (req: Request, res: Response) => {
	const user = await User.findOne({ email: "ccpp@gmail.com" })
	if (!user) throw new UnauthenticatedError("Invalid credentials");

	const isPasswordCorrect = await user.comparePassword("secret");
	if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");

	sendToken(res, 200, "Logged in successfully", user);
});

export const logout = asyncWrapper(async (req: Request, res: Response) => {
	res
		.status(200)
		.json({ success: true, message: "Logged  out successfully", token: null });
});