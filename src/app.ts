import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware";
import { logger } from "./config/logger";
import createError from "http-errors";
import path from "path";

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../frontend/out")));

// All remaining requests return the React app, so it can handle routing.
// Only apply this to non-api routes
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/out/index.html"));
});

// 404 handler for API routes
app.use("/api", (req, res, next) => {
  next(createError(404, "Not Found"));
});

// Error handler
app.use(errorHandler);

export default app;
