import express from "express";
import userRouter from "./user/userRoute.js";
import stcokRouter from "./stock/stockRoute.js";
const router = express.Router();

router.use("/user", userRouter);
router.use("/search", stcokRouter);

export default router;