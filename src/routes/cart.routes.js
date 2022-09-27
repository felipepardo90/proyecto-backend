const { Router } = require("express");
const router = Router();
const controller = require("../controllers/cart.controller");
const middlewares = require("../middlewares/middlewares");

//? CART

router.post("/");
router.delete("/:id");
router.get("/:id/products");
router.post("/:id/products");
router.delete("/:id/products/:id_prod");

module.exports = router;
