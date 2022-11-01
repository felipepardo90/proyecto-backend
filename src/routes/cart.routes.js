import { Router } from "express";
const router = Router();
import controller from "../controllers/cart.controller.js";
import { adminAuth } from "../libs/middlewares.js";

//? CART

router.post("/", adminAuth(true), controller.newCart);
router.delete("/:id", adminAuth(true), controller.deleteCart);
router.get("/:id/products", adminAuth(true), controller.getProductsInCart);
router.post("/:id/products", adminAuth(true), controller.saveProductInCart);
router.delete(
  "/:id/products/:id_prod",
  adminAuth(true),
  controller.deleteProductInCart
);

export default router;
