import { Router } from "express";
import {
    getUserFilterTransactions,
  getUserTransactions,
} from "./controller";
import { isLoginUser } from "../../middleware/auth";

const router = Router();

router.get("/", isLoginUser, getUserTransactions); //done
router.get("/filter", isLoginUser, getUserFilterTransactions); //done
// GET /api/v1/transactions?transactionType=gift_transaction //
// GET /api/v1/transactions?transactionType=session_transaction //
// GET /api/v1/transactions?transactionType=withdraw_transaction //


export default router;
