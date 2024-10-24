import { Router } from "express";
import {
  actionReject,
  actionAccept,
  index,
  indexDetail,
} from "./controller";
import { isLoginAdmin } from "../../../middleware/auth";

const router = Router();

// Rute untuk menampilkan halaman agent
router.get("/", isLoginAdmin, index);
router.post("/reject/:id", isLoginAdmin, actionReject);
router.post("/accept/:id", isLoginAdmin, actionAccept);
router.get("/detail/:id", isLoginAdmin, indexDetail);

export default router;
