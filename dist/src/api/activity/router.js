"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const uploadImage_1 = require("../../middleware/uploadImage");
const fields = {
    poster: 1,
    banner: 1,
};
const router = (0, express_1.Router)();
router.get("/", controller_1.getAllActivities);
router.get("/:id", controller_1.getDetailActivity);
// router.post("/", uploadSingle("banner"), postActivity);
router.post("/", (0, uploadImage_1.uploadMultiple)(fields), controller_1.postActivity);
router.put("/edit/:id", controller_1.editActivity);
router.delete("/delete/:id", controller_1.deleteActivity);
exports.default = router;
