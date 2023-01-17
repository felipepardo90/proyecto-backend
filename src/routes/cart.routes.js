import { Router } from "express";
const router = Router();
import controller from "../controllers/cart.controller.js";
import { MW } from "../libs/middlewares.js";

//? CART

router.post("/", MW.adminAuth(true), controller.newCart);
router.delete("/:id", MW.adminAuth(true), controller.deleteCart);
router.get("/:id/products", MW.adminAuth(true), controller.getProductsInCart);
router.post("/:id/products", MW.adminAuth(true), controller.saveProductInCart);
router.delete(
  "/:id/products/:id_prod",
  MW.adminAuth(true),
  controller.deleteProductInCart
);

export default router;
