import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { logger } from "./config/logger";

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
  });
});
