import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const signToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: "24h",
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};