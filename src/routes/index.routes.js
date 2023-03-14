import { Router } from "express";
const router = Router();
import renderIndex from "../controllers/index.controller.js";
import usersRoute from "./user.routes.js";
import productsRoute from "./products.routes.js";
import cartRoute from "./cart.routes.js";
import chatRoute from "./chat.routes.js";
import { MW } from "../libs/middlewares.js";
import renderServerInfo from "../controllers/info.controller.js";

//? INDEX
router.get("/", MW.isAuth, renderIndex);
router.use("/", usersRoute);
router.use("/products", MW.isAuth, productsRoute);
router.use("/api/cart", MW.isAuth, cartRoute);
router.use("/chat", MW.isAuth, chatRoute);
router.use("/info", MW.isAuth, renderServerInfo);

export default router;
