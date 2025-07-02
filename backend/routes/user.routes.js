import express from "express";
import protectRoute from "../middleware/protectRoute.middleware.js";
import { getUsersForSidebars } from "../controllers/user.controllers.js";
const router = express.Router();

router.get("/", protectRoute, getUsersForSidebars) // GET all users

export default router;