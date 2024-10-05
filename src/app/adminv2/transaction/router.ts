import { Router } from "express";
import {
  exportTransactionsToExcel,
  getTransactionSummary,
  getTransactions,
} from "./controller";
import { isLoginAdmin } from "../../../middleware/auth";

const router = Router();

// Rute untuk menampilkan halaman agent
router.get("/", isLoginAdmin, getTransactions);
router.get("/summary", isLoginAdmin, getTransactionSummary);

router.get("/export", isLoginAdmin, exportTransactionsToExcel);

export default router;
