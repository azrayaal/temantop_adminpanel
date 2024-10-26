"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", controller_1.getAllStreams);
// router.get("/all", getAllStreamSession);
router.get("/:id", auth_1.isLoginUser, controller_1.getDetailStreamSession);
// router.get("/launchstream/:id", isLoginUser, launchStream);
router.post("/startview", auth_1.isLoginUser, controller_1.startViewStream);
exports.default = router;
