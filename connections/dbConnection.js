import mongoose from "mongoose";
import config from "../config/config.js";
import logger from "../config/logger.js";

const db = mongoose.createConnection(config.db.uri);

// Connected successfully
db.on('connected', () => {
	logger.info('connected to db')
})

// Connection error
db.on('error', (err) => {
	logger.debug(`connection failed: ${err}`)
})

// Connection disconnected
db.on('disconnected', () => {
	logger.debug('connection disconnected')
})

// Connection reconnected
db.on('reconnected', () => {
	logger.info('connection reconnected')
})

export default db;