import express from "express";
import { registerUser, loginUser } from "./userController.js";

const userRouter = express.Router();


userRouter.post('/register',registerUser).get('/register', function (req, res) {
    res.render('register');
});
userRouter.post('/login',loginUser).get('/login', function (req, res) {
    res.render('login')
});

export default userRouter