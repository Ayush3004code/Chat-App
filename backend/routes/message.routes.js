import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controllers.js";
import protectRoute from "../middleware/protectRoute.middleware.js"

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;