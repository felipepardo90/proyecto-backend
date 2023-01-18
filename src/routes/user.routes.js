import { Router } from "express";
import controller from "../controllers/user.controller.js";
const router = Router();


//! Register

router.get("/register", controller.renderRegistryView);
router.post("/register", controller.registerUser);

//! Login

router.get("/login", controller.renderLoginView);
router.post("/login", controller.loginUser);

//! Logout

router.get("/logout", controller.logoutUser);

//! Profile

const sessionAuth = (req, res, next) => {
  req.session.username
    ? next()
    : res.send({ error: true, msg: "Login failed" });
};

router.get("/profile", sessionAuth, controller.renderProfileView);

export default router;
