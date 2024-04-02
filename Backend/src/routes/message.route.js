import { Router } from "express";
import { getMessages, userMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/send/:id").post(verifyJWT, userMessage);
router.route("/:id").get(verifyJWT, getMessages);

export default router;
