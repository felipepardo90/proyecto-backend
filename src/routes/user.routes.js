import { Router } from "express";
import controller from "../controllers/user.controller.js";
import { MW } from "../libs/middlewares.js";
const router = Router();

//! Register
router.get("/register", MW.isNotAuth, controller.renderRegistryView);
router.post("/register", controller.signUpUser);
//! Login
router.get("/login", controller.renderLoginView);
router.post("/login", controller.logInUser);
//! Logout
router.get("/logout", controller.logoutUser);
//! Profile
router.get("/profile", MW.isAuth, controller.renderProfileView);

export default router;
