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
exports.getDetail = exports.editUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../../../db")); // Sesuaikan dengan konfigurasi db Anda
require("dotenv").config();
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const updates = req.body;
    console.log(req.body);
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    if (Object.keys(updates).length === 0 && !req.file) {
        return res.status(400).json({ message: "No fields to update" });
    }
    try {
        // Jika ingin mengubah username, pastikan username baru tidak ada di database
        if (updates.username) {
            const [userRows] = yield db_1.default.query("SELECT id FROM user WHERE username = ?", [updates.username]);
            if (userRows.length > 0) {
                return res.status(400).json({ message: "Username already exists" });
            }
            // Jika valid, set channelName sama dengan username
            updates.channelName = updates.username;
        }
        if (updates.password) {
            const saltRounds = 10;
            updates.password = yield bcryptjs_1.default.hash(updates.password, saltRounds);
        }
        // Jika ada file yang diunggah, tambahkan ke updates
        if (req.file) {
            updates.profilePicture = req.file.filename;
        }
        const fields = Object.keys(updates);
        const values = Object.values(updates);
        // Buat query dinamis
        const setClause = fields.map((field) => `${field} = ?`).join(", ");
        // Pastikan setClause tidak kosong
        if (!setClause) {
            return res.status(400).json({ message: "No valid fields to update" });
        }
        const [result] = yield db_1.default.query(`UPDATE user SET ${setClause} WHERE id = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        else {
            // Kembalikan data pengguna yang diperbarui, kecuali password yang di-hash
            const updatedUser = {};
            fields.forEach((field, index) => {
                if (field !== "password") {
                    updatedUser[field] = values[index];
                }
            });
            return res.json({
                success: true,
                data: Object.assign({ id }, updatedUser),
                message: "User updated successfully",
            });
        }
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Error updating user", error });
    }
});
exports.editUser = editUser;
const getDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const [result] = yield db_1.default.query(`SELECT id, email, username, player_id, profilePicture, channelName, balance FROM user WHERE id = ?`, [userId]);
        if (result.length > 0) {
            const user = result[0];
            // Konversi balance menjadi angka float dengan 2 angka di belakang koma
            user.balance = parseFloat(Number(user.balance).toFixed(2));
            console.log("user", user);
            res.json({
                success: true,
                data: user,
            });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error get detail user:", error);
        res.status(500).json({ message: "Error get detail user", error });
    }
});
exports.getDetail = getDetail;
