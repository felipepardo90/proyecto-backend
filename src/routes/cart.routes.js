const { Router } = require("express");
const router = Router();
const controller = require("../controllers/cart.controller");
const middlewares = require("../middlewares/middlewares");

//? CART

router.post("/", controller.newCart); // TODO Agregar carro finalizado
router.delete("/:id", controller.delete); // TODO ELiminar carro - finalizado
// router.get("/:id/products", controller.productsInCart); //TODO Ver los productos guardados en el carrito
router.post("/:id/products"); // TODO Agregar un producto al carro por su ID
router.delete("/:id/products/:id_prod"); // TODO Eliminar un producto de un carrito por su id de producto y de carrito

module.exports = router;
