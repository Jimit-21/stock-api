import logger from "./config/logger.js";
import config from "./config/config.js";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.listen(config.server.port, () => {
    logger.info(`server is running on ${config.server.port}`);
});