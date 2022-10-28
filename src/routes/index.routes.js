import { Router } from "express";
const router = Router();
import productsRoute from "./products.routes.js";
import cartRoute from "./cart.routes.js";
import controller from "../controllers/index.controller.js";

//? INDEX
router.get("/", controller.index);
router.use("/api/products", productsRoute);
router.use("/api/cart", cartRoute);

export default router;
