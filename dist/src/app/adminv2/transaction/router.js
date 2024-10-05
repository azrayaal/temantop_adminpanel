"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
// Rute untuk menampilkan halaman agent
router.get("/", auth_1.isLoginAdmin, controller_1.getTransactions);
router.get("/summary", auth_1.isLoginAdmin, controller_1.getTransactionSummary);
router.get("/export", auth_1.isLoginAdmin, controller_1.exportTransactionsToExcel);
exports.default = router;
