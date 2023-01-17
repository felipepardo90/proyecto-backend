import { Router } from "express";
const router = Router();
import controller from "../controllers/products.controller.js";
import { MW } from "../libs/middlewares.js";

//? PRODUCTS

router.get("/", MW.adminAuth(true), controller.getAll);
router.get("/:id", MW.adminAuth(true), controller.getById);
router.post("/", MW.adminAuth(true), MW.completedFields, controller.post);
router.put("/:id", MW.adminAuth(true), MW.completedFields, controller.put);
router.delete("/:id", MW.adminAuth(true), controller.delete);

export default router;
