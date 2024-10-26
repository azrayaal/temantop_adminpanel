"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
// Rute untuk menampilkan halaman agent
router.get("/", auth_1.isLoginAdmin, controller_1.getTransactions);
router.get("/:id", auth_1.isLoginAdmin, controller_1.getTransactionDetail);
exports.default = router;
