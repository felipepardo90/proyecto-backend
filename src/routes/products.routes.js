import { Router } from "express";
const router = Router();
import controller from "../controllers/products.controller.js";
import { MW } from "../libs/middlewares.js";

//? PRODUCTS

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", MW.completedFields, controller.post);
router.put("/:id", MW.completedFields, controller.put);
router.delete("/:id", controller.delete);

export default router;
