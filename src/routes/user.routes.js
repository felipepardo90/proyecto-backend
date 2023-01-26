import { Router } from "express";
import passport from "passport";
import controller from "../controllers/user.controller.js";
const router = Router();

//! Register

router.get("/register", controller.renderRegistryView);
router.post(
  "/register",
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/login",
    passReqToCallback: true,
  })
);

//! Login

router.get("/login", controller.renderLoginView);
router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    passReqToCallback: true,
  })
);

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
