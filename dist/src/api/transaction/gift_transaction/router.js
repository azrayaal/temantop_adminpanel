"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.isLoginUser, controller_1.getUserTransactions); //done
router.get("/date", auth_1.isLoginUser, controller_1.filterByDate); // done
router.get("/in", auth_1.isLoginUser, controller_1.filterIn); // done
router.get("/out", auth_1.isLoginUser, controller_1.filterOut); // done
// by id
router.get("/:id", controller_1.getUserTransactionsByUserId); // done
router.get("/date/:id", controller_1.filterByDatebyUserId); // done
router.get("/in/:id", controller_1.filterInById); // done
router.get("/out/:id", controller_1.filterOutById); // done
exports.default = router;
