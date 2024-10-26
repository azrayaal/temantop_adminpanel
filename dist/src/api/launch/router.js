"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.get("/stream/:id", auth_1.isLoginUser, controller_1.launchStream);
router.get("/lobby", auth_1.isLoginUser, controller_1.launchLobby);
exports.default = router;
