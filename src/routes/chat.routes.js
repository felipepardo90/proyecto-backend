import { Router } from "express";
const router = Router();
import controller from "../controllers/chat.controller.js";

//? CART

router.get("/", controller.renderChat);
router.post("/", controller.sendMessage);

export default router;
