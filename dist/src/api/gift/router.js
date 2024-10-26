"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../middleware/auth");
const uploadImage_1 = require("../../middleware/uploadImage");
const router = (0, express_1.Router)();
router.get("/", auth_1.isLoginUser, controller_1.getAllGifts);
router.get("/:id", auth_1.isLoginUser, controller_1.getDetailGift);
router.post("/", (0, uploadImage_1.uploadSingle)("img"), auth_1.isLoginUser, controller_1.postGift);
router.post("/deduct", controller_1.testDeductBalance);
router.put("/edit/:id", (0, uploadImage_1.uploadSingle)("img"), auth_1.isLoginUser, controller_1.editGift);
router.delete("/delete/:id", auth_1.isLoginUser, controller_1.deleteGift);
exports.default = router;
