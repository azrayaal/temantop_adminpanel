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
router.post("/create", (0, uploadImage_1.uploadSingle)("profilePicture"), controller_1.actionCreate);
router.delete("/delete/:id", auth_1.isLoginAdmin, controller_1.actionDelete);
router.get("/edit/:id", auth_1.isLoginAdmin, controller_1.indexEdit);
router.put("/edit/:id", (0, uploadImage_1.uploadSingle)("profilePicture"), controller_1.actionEdit);
router.post("/status/:id", auth_1.isLoginAdmin, controller_1.changeStatus);
router.post("/superadmin/:id", auth_1.isLoginAdmin, controller_1.changeStatusSuperAdmin);
exports.default = router;
