import { Router } from "express";
const router = Router();
import controller from "../controllers/cart.controller.js";

//? CART

router.post("/", controller.newCart);
router.get("/:id", controller.getCartById);
router.delete("/:id", controller.deleteCart);
router.get("/:id/products", controller.getProductsInCart);
router.post("/:id/products", controller.saveProductInCart);
router.delete("/:id/products", controller.removeProductFromCart);
router.delete("/:id/products/:id_prod", controller.subtractProductFromCart);

export default router;
