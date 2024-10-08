"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
// router.use(isLoginAdmin);
router.get("/", auth_1.isLoginAdmin, controller_1.index);
// router.get("/", index);
exports.default = router;
