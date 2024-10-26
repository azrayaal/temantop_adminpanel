"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../../middleware/auth");
const uploadImage_1 = require("../../../middleware/uploadImage");
const router = (0, express_1.Router)();
router.get("/", auth_1.isLoginUser, controller_1.getStreamSession);
router.post("/start", auth_1.isLoginUser, (0, uploadImage_1.uploadSingle)("thumbnail"), controller_1.startStreamSession);
router.post("/end", auth_1.isLoginUser, controller_1.endStreamSession);
// router.get("/launchlobby", isLoginUser, launchLobby);
exports.default = router;
