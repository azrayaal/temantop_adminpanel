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
exports.deletemerchant = exports.editmerchant = exports.postmerchant = exports.getDetailmerchant = exports.getAllMerchant = void 0;
const db_1 = __importDefault(require("../../../db"));
const getAllMerchant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data] = yield db_1.default.query("SELECT * FROM merchant");
        res.json({ success: true, data });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching merchants", error });
    }
});
exports.getAllMerchant = getAllMerchant;
const getDetailmerchant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [data] = yield db_1.default.query("SELECT * FROM merchant where id = ?", [
            id,
        ]);
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching merchants", error });
    }
});
exports.getDetailmerchant = getDetailmerchant;
const postmerchant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { merchantCode, merchantName, useBranchLogo } = req.body;
    const merchantLogo = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
    try {
        const [result] = yield db_1.default.query("INSERT INTO merchant (merchantCode, merchantName, merchantLogo, useBranchLogo) VALUES (?, ?, ?, ?)", [merchantCode, merchantName, merchantLogo, useBranchLogo]);
        res.json({
            id: result.insertId,
            merchantCode,
            merchantName,
            merchantLogo,
            useBranchLogo,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding merchant", error });
    }
});
exports.postmerchant = postmerchant;
const editmerchant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    console.log("updates", updates);
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    // Buat query dinamis
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    try {
        const [result] = yield db_1.default.query(`UPDATE merchant SET ${setClause} WHERE id = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "merchant not found" });
        }
        else {
            res.json(Object.assign({ id }, updates));
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating merchant", error });
    }
});
exports.editmerchant = editmerchant;
const deletemerchant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db_1.default.query("DELETE FROM merchant WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "merchant not found" });
        }
        else {
            res.json({ message: "merchant deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting merchant", error });
    }
});
exports.deletemerchant = deletemerchant;
