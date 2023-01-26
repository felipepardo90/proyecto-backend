import { Router } from "express";
const router = Router();
import { renderIndexView } from "../controllers/index.controller.js";
import usersRoute from "./user.routes.js";
import productsRoute from "./products.routes.js";
import cartRoute from "./cart.routes.js";
import { MW } from "../libs/middlewares.js";

//? INDEX
router.get("/", MW.isAuth, renderIndexView);
router.use("/", usersRoute);
router.use("/api/products", MW.isAuth, productsRoute);
router.use("/api/cart", MW.isAuth, cartRoute);

export default router;
