const { Router } = require("express");
const router = Router();
const controller = require("../controllers/cart.controller");
const middlewares = require("../middlewares/middlewares");

//? CART

router.post("/", controller.newCart); 
router.delete("/:id", controller.deleteCart); 
router.get("/:id/products", controller.getProductsInCart); 
router.post("/:id/products", controller.saveProductInCart);
router.delete("/:id/products/:id_prod", controller.deleteProductInCart);

module.exports = router;
