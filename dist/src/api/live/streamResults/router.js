"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
// router.get("/taol", isLoginUser, getAllStreamResults);
router.get("/total", auth_1.isLoginUser, controller_1.getTotalStream);
router.get("/:id", auth_1.isLoginUser, controller_1.getDetailStreamResult);
exports.default = router;