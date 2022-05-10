import bcrypt from "bcrypt";
import logger from "../../config/logger.js";
import User from "./userModel.js";

export const registerUserService = async (data) => {
    try {
        const userExist = await User.findOne({ email: data.email });

        if (userExist) {
            return { result: false, error: "user already exist", data: null }
        }

        const user = await User.create(data);
        return user;
    } catch (error) {
        logger.error(error);
        throw new Error(error);
    }
};

export const loginUserService = async (data) => {
    try {
        const { email, password } = data;
  
        const user = await User.findOne({ email });
        
        if (!user) {
            return false;
        }
        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            return false;
        }
        return user;
    } catch (error) {
        logger.error(error);
        throw new Error(error);
    }
};