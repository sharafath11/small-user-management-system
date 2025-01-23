import express from "express";
import UserAuth from "../../controllers/user/authCntrl.ts";

const { Router } = express;
const userRoutes = Router();
const auth = new UserAuth();

userRoutes.get("/", auth.renderLoginPage.bind(auth));
userRoutes.post("/login", auth.login.bind(auth));
userRoutes.get("/home", auth.renderHomePage.bind(auth));
userRoutes.get("/register", auth.renderRegisterPage.bind(auth));
userRoutes.post("/register", auth.registerPost.bind(auth));

export default userRoutes;
