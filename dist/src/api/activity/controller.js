"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = exports.editActivity = exports.postActivity = exports.getDetailActivity = exports.getAllActivities = void 0;
const db_1 = __importDefault(require("../../../db"));
// Get all activities
const getAllActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [activities] = yield db_1.default.query("SELECT * FROM activity");
        res.json({ success: true, data: activities });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching activities", error });
    }
});
exports.getAllActivities = getAllActivities;
// Get activity detail by ID
const getDetailActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [data] = yield db_1.default.query("SELECT * FROM activity WHERE id = ?", [id]);
        if (data.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Activity not found" });
        }
        res.json({ success: true, data: data[0] });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching activity details",
            error,
        });
    }
});
exports.getDetailActivity = getDetailActivity;
// Add a new activity
const postActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const files = req.files;
    // Check if required fields are present
    if (!title || !files.poster || !files.banner) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
    }
    try {
        const [result] = yield db_1.default.query("INSERT INTO activity (poster, banner, title) VALUES (?, ?, ?)", [
            files.poster[0].filename, // Assuming single file upload
            files.banner[0].filename, // Assuming single file upload
            title,
        ]);
        res.json({
            success: true,
            id: result.insertId,
            poster: files.poster[0].filename,
            banner: files.banner[0].filename,
            title,
            message: "Activity added successfully",
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error adding activity", error });
    }
});
exports.postActivity = postActivity;
// Edit an existing activity
const editActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    if (fields.length === 0) {
        return res
            .status(400)
            .json({ success: false, message: "No fields to update" });
    }
    // Create dynamic query
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    try {
        const [result] = yield db_1.default.query(`UPDATE activity SET ${setClause} WHERE id = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Activity not found" });
        }
        res.json(Object.assign(Object.assign({ success: true, id }, updates), { message: "Activity updated successfully" }));
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error updating activity", error });
    }
});
exports.editActivity = editActivity;
// Delete an activity
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db_1.default.query("DELETE FROM activity WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Activity not found" });
        }
        res.json({ success: true, message: "Activity deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error deleting activity", error });
    }
});
exports.deleteActivity = deleteActivity;
