import { Router } from "express";
const router = Router();
import controller from "../controllers/products.controller.js";
import { completedFields, adminAuth } from "../libs/middlewares.js";

//? PRODUCTS

router.get("/", adminAuth(true), controller.getAll);
router.get("/:id", adminAuth(true), controller.getById);
router.post("/", adminAuth(true), completedFields, controller.post);
router.put("/:id", adminAuth(true), completedFields, controller.put);
router.delete("/:id", adminAuth(true), controller.delete);

export default router;
