import { Router } from "express";
import controller from "../controllers/order.controller.js";
const router = Router();

//! Register
router.get("/", controller.getOrders);
router.get("/:id", controller.getOrderById);
router.post("/", controller.newOrder);


export default router;