import { Router } from "express";
import { actionEdit, indexEdit, indexGift, indexSession, indexWithdraw } from "./controller";
import { isLoginAdmin } from "../../../middleware/auth";

const router = Router();

// Rute untuk menampilkan halaman agent
router.get("/withdraw", isLoginAdmin, indexWithdraw);
router.get("/session", isLoginAdmin, indexSession);
router.get("/gift", isLoginAdmin, indexGift);
router.get("/:id", isLoginAdmin, indexEdit);
router.put("/:id", isLoginAdmin, actionEdit);

export default router;
