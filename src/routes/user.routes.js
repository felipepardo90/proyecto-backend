import { Router } from "express";
import controller from "../controllers/user.controller.js";
const router = Router();

//* Register

router.get("/register", controller.renderRegistryView);
router.post("/register", controller.registerUser);

//* Login

router.get("/login", controller.renderLoginView);
router.post("/login", controller.loginUser);

//* Logout

//* Data

const authMW = (req, res, next) => {
  req.session.username
    ? next()
    : res.send({ error: true, msg: "Login failed" });
};

router.get("/profile", authMW, (req, res) => {
  const user = users.find(({ username }) => (username = req.session.username));
  res.send({ error: false, data: user });
});

export default router;
