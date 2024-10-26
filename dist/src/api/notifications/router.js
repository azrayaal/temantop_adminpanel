"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.isLoginUser, controller_1.getAllNotifications);
router.get("/:id", controller_1.getDetailNotifications);
exports.default = router;
