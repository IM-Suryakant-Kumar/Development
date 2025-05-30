import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db";
import { authenticateUser, errorHandlerMiddleware, notFoundMiddleware } from "./middlewares";
import { authRouter, commentRouter, postRouter, userRouter } from "./routes";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("tiny"));

app.use("/api/auth", authRouter);
app.use("/api/user", authenticateUser, userRouter);
app.use("/api/post", authenticateUser, postRouter);
app.use("/api/comment", authenticateUser, commentRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
(async () => {
	try {
		await connectDB(process.env.MONGO_URL as string);
		app.listen(PORT, () => console.log(`App is running at http://localhost:${PORT}`));
	} catch (error) {
		console.error(error);
	}
})();
