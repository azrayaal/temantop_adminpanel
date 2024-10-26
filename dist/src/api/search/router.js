"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/stream", controller_1.searchStream);
router.get("/game", controller_1.searchGame);
router.get("/game/genre/:id", controller_1.searchGamebyGenre);
exports.default = router;
