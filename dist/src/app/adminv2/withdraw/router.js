"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
// Rute untuk menampilkan halaman agent
router.get("/", auth_1.isLoginAdmin, controller_1.index);
router.post("/reject/:id", auth_1.isLoginAdmin, controller_1.actionReject);
router.post("/accept/:id", auth_1.isLoginAdmin, controller_1.actionAccept);
router.get("/detail/:id", auth_1.isLoginAdmin, controller_1.indexDetail);
exports.default = router;
