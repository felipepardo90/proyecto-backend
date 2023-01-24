import { Router } from "express";
import passport from "passport";
import controller from "../controllers/user.controller.js";
const router = Router();

//! Register

router.get("/register", controller.renderRegistryView);
router.post(
  "/register",
  passport.authenticate(
    "signup",
    {
      failureRedirect: "/error",
      passReqToCallback: true,
    },
    (req, res) => {
      res.send({ error: false });
    }
  )
);

//! Login

router.get("/login", controller.renderLoginView);
router.post(
  "/login",
  passport.authenticate(
    "login",
    {
      failureRedirect: "/error",
    },
    (req, res) => {
      res.send({ error: false });
    }
  )
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
