const { Router } = require("express");
const router = Router();
const productsRoute = require("./products.routes");
const cartRoute = require("./cart.routes");
const controller = require("../controllers/index.controller");

//? INDEX
router.get("/", controller.index);
router.use("/api/products", productsRoute);
router.use("/api/cart", cartRoute);

module.exports = router;
