import "dotenv/config";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import notFoundMiddleware from "./middlewares/notFound";
import routes from "./routes";
const app = express();

app.use(helmet(), morgan("dev"), json(), urlencoded({ extended: true }));

app.get("/", (_, res) => res.json({ msg: "Connected" }));
app.use("/api/v1", routes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
