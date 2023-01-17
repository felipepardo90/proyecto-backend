import { Router } from "express";
const router = Router();
import { renderIndexView } from "../controllers/index.controller.js";
import usersRoute from "./user.routes.js";
import productsRoute from "./products.routes.js";
import cartRoute from "./cart.routes.js";

//? INDEX
router.get("/", renderIndexView);
router.use("/", usersRoute);
router.use("/api/products", productsRoute);
router.use("/api/cart", cartRoute);

export default router;
