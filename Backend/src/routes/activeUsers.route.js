import { Router } from "express";
import { activeUsers } from "../controllers/activeUsers.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, activeUsers);

export default router;
