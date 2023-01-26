import { Router } from "express";
import passport from "passport";
import controller from "../controllers/user.controller.js";
import { MW } from "../libs/middlewares.js";
const router = Router();

//! Register

router.get("/register", MW.isNotAuth, controller.renderRegistryView);
router.post(
  "/register",
  passport.authenticate("signup", {
    successRedirect: "/login",
    failureRedirect: "/register",
    passReqToCallback: true,
  })
);

//! Login

router.get("/login", controller.renderLoginView);
router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    passReqToCallback: true,
  })
);

//! Logout

router.get("/logout", controller.logoutUser);

//! Profile

router.get("/profile", MW.isAuth, controller.renderProfileView);

export default router;
