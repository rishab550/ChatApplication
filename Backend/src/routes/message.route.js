import { Router } from "express";
import { getMessages, userMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:id").get(verifyJWT, getMessages);
router.route("/send/:id").post(verifyJWT, userMessage);

export default router;
