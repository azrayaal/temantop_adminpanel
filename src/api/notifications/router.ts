import { Router } from "express";
import { getAllNotifications, getDetailNotifications, removeNotifications } from "./controller";
import { isLoginUser } from "../../middleware/auth";

const router = Router();

router.get("/", isLoginUser, getAllNotifications);
router.get("/:id", isLoginUser, getDetailNotifications);
router.post("/remove/:id", isLoginUser, removeNotifications);

export default router;
