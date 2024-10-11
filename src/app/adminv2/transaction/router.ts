import { Router } from "express";
import {
  exportTransactionsToExcel,
  getTransactionSummary,
  getTransactions,
} from "./controller";
import { isLoginAdmin } from "../../../middleware/auth";

const router = Router();

// Rute untuk menampilkan halaman agent
router.get("/", getTransactions);
router.get("/summary", getTransactionSummary);

router.get("/export", exportTransactionsToExcel);

export default router;
