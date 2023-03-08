import { Router } from "express";
const router = Router();
import renderIndex from "../controllers/index.controller.js";
import usersRoute from "./user.routes.js";
import productsRoute from "./products.routes.js";
import cartRoute from "./cart.routes.js";
import { MW } from "../libs/middlewares.js";
import renderChat from "../controllers/chat.controller.js";

//? INDEX
router.get("/", MW.isAuth, renderIndex);
router.use("/", usersRoute);
router.use("/products", MW.isAuth, productsRoute);
router.use("/api/cart", MW.isAuth, cartRoute);
router.use("/chat", MW.isAuth, renderChat);

export default router;
