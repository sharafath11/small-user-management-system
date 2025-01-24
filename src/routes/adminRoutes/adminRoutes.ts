import express from "express";
import adminHandler from "../../controllers/admin/adminHandler.ts";
import verifyUser from "../../controllers/middleware/veryfyUser.ts";

const { Router } = express;
const adminRoutes = Router();
const admin = new adminHandler();
const veryfy=new verifyUser()
adminRoutes.get("/",admin.loginPageRender);
adminRoutes.post("/login",admin.loginHandler.bind(admin));
adminRoutes.get("/dashboard",veryfy.adminVerify,admin.dashboardRender);
adminRoutes.post("/edit",veryfy.adminVerify,admin.editTheUser.bind(admin))
adminRoutes.post("/delete",veryfy.adminVerify,admin.delete.bind(admin))
adminRoutes.post("/logout",admin.logout.bind(admin))
export default adminRoutes;
