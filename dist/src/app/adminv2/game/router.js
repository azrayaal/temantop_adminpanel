"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const uploadImage_1 = require("../../../middleware/uploadImage");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
// Rute untuk menampilkan halaman agent
router.get("/", auth_1.isLoginAdmin, controller_1.index);
router.get("/create", auth_1.isLoginAdmin, controller_1.indexCreate);
router.post("/create", auth_1.isLoginAdmin, (0, uploadImage_1.uploadSingle)("gameImg"), controller_1.actionCreate);
router.delete("/delete/:id", auth_1.isLoginAdmin, controller_1.actionDelete);
router.get("/edit/:id", auth_1.isLoginAdmin, controller_1.indexEdit);
router.put("/edit/:id", auth_1.isLoginAdmin, (0, uploadImage_1.uploadSingle)("gameImg"), controller_1.actionEdit);
exports.default = router;
