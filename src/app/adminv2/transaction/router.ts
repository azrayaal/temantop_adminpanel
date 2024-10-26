import { Router } from "express";
import {
  getTransactionDetail,
  getTransactions,
} from "./controller";
import { isLoginAdmin } from "../../../middleware/auth";

const router = Router();

// Rute untuk menampilkan halaman agent
router.get("/", isLoginAdmin, getTransactions);
router.get("/:id", isLoginAdmin, getTransactionDetail);

export default router;
