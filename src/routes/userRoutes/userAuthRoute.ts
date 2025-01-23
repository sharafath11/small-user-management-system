import express from "express";
import UserAuth from "../../controllers/user/authCntrl.ts";
import verifyUser from "../../controllers/middleware/veryfyUser.ts";

const { Router } = express;
const userRoutes = Router();
const auth = new UserAuth();
const veryfy=new verifyUser()
userRoutes.get("/", auth.renderLoginPage.bind(auth));
userRoutes.post("/login", auth.login.bind(auth));
userRoutes.get("/home",veryfy.userverfy, auth.renderHomePage.bind(auth));
userRoutes.get("/register", auth.renderRegisterPage.bind(auth));
userRoutes.post("/register", auth.registerPost.bind(auth));
userRoutes.post("/logout",auth.logout.bind(auth))

export default userRoutes;
