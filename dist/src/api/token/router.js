"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/rtc/:channelName/:role/:tokentype/:uid", controller_1.getRtcToken);
// router.get("/rtm/:uid", getRtmToken);
// router.get("/rte/:channelName/:role/:tokentype/:uid", getBothTokens);
// router.get("/rte/:channelName/:role/:tokentype/:uid", getBothTokens);
// router.get("/", testRoutes);
exports.default = router;
