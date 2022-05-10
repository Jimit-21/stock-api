import User from "../components/user/userModel.js";
import { verifyToken } from "../utils/jwt.js";

export const auth = async function (req, res, next) {
    try {
        const cookie = req.headers.cookie;
        if (!cookie) {
            return res.status(401).json({ message: "you are not authenticated user" });
        }

        const token = cookie.split("=")[1];
        const verifyUser = verifyToken(token);
        
        const user = await User.findOne({ _id: verifyUser.id });

        if (!user) {
            return res.status(401).json({ message: "you are not authenticated user" });
        }

        req.user = verifyUser;
        next();
    } catch (error) {
        next(new Error(error));
    }
};