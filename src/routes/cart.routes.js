import { Router } from "express";
const router = Router();
import controller from "../controllers/cart.controller.js";
import getOrder from "../controllers/order.controller.js";

//? CART

router.post("/", controller.newCart);
router.get("/prueba", (req, res)=>{
  res.render("prueba")
});
router.get("/:id", controller.getCartById);
router.delete("/:id", controller.deleteCart);
router.post("/:id/order", getOrder);
router.get("/:id/products", controller.getProductsInCart);
router.post("/:id/products", controller.saveProductInCart);
router.delete("/:id/products", controller.removeProductFromCart);
router.delete("/:id/products/:id_prod", controller.subtractProductFromCart);

export default router;
