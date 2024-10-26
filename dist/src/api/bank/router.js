"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/", auth_1.isLoginUser, controller_1.getBank);
exports.default = router;
