import logger from "../../config/logger.js";
import { signToken } from "../../utils/jwt.js";
import { loginUserService, registerUserService } from "./userService.js";

export const registerUser = async (req, res, next) => {
    try {
        logger.info("inside Register user");
        const { name, email, password, confirmPassword } = req.body;
  
        const data = {
            name,
            email,
            password,
            confirmPassword
        };

        const user = await registerUserService(data);
        
        if (!user.result && user.error) {
            return res.status(401).json({ result: 0, staus: "registration failed", message: user.error });
        }

        return res.status(201).json({ result: 1, staus: "registration successful", data: user });
    } catch (error) {
        logger.error(error);
        next(new Error(error));
    }
};

export const loginUser = async (req, res, next) => {
    try {
        logger.info("inside userController loginUser");
        const { email, password } = req.body;
        const user = await loginUserService({ email, password });
        if (!user) {
            return res.status(401).json({ result: 0, message: "invalid credential" });
        }
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        const token = signToken(payload);

        res.cookie("jwt", token);
  
        return res.redirect('/api/v1/search/stockapi');
    } catch (error) {
        logger.error(error);
        next(new Error(error));
    }
};