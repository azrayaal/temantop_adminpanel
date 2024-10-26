"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.isLoginUser, controller_1.getUserTransactions); //done
router.get("/filter", auth_1.isLoginUser, controller_1.getUserFilterTransactions); //done
// GET /api/v1/transactions?transactionType=gift_transaction //
// GET /api/v1/transactions?transactionType=session_transaction //
// GET /api/v1/transactions?transactionType=withdraw_transaction //
exports.default = router;
