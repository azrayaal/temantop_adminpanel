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
exports.launchStream = exports.launchLobby = void 0;
const db_1 = __importDefault(require("../../../db"));
const launchLobby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    console.log("authHeader==", authHeader);
    if (!authHeader) {
        return res
            .status(401)
            .json({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    // Pastikan user telah terautentikasi
    if (!req.user) {
        return res
            .status(401)
            .json({ success: false, message: "User not authenticated" });
    }
    const userId = req.user.id;
    try {
        // Query untuk memeriksa status online user
        const [rows] = yield db_1.default.query("SELECT online FROM user WHERE id = ?", [userId]);
        // Pastikan data user ditemukan
        if (!rows || rows.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        const online = rows[0].online;
        // Cek apakah user sedang offline
        if (online === false || online === 0) {
            return res
                .status(400)
                .json({ success: false, message: "You're offline" });
        }
        // Buat URL iframe berdasarkan ID dan token yang sudah di-encode
        const iframeUrl = `https://lets-stream.innovativetechnology.my.id?token=${encodeURIComponent(token)}`;
        // Set header Content-Type ke text/html
        // res.setHeader("Content-Type", "text/html");
        res.status(200).json({
            success: true,
            message: "lobby launched successfully",
            url: iframeUrl,
        });
    }
    catch (error) {
        console.error("Error launching stream:", error);
        // Kirimkan pesan error
        return res.status(500).json({
            status: "error",
            message: "Failed to launch stream",
        });
    }
});
exports.launchLobby = launchLobby;
const launchStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res
            .status(401)
            .json({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    // Pastikan user telah terautentikasi
    if (!req.user) {
        return res
            .status(401)
            .json({ success: false, message: "User not authenticated" });
    }
    const userId = req.user.id;
    try {
        // Query untuk memeriksa status online user
        const [rows] = yield db_1.default.query("SELECT online FROM user WHERE id = ?", [userId]);
        // Pastikan data user ditemukan
        if (!rows || rows.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        const online = rows[0].online;
        // Cek apakah user sedang offline
        if (online === false || online === 0) {
            return res
                .status(400)
                .json({ success: false, message: "You're offline" });
        }
        const [frame] = yield db_1.default.query("SELECT * FROM stream_session WHERE id = ? AND status = 1", [id]);
        if (frame.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Stream session not found" });
        }
        // Buat URL iframe berdasarkan ID dan token yang sudah di-encode
        const iframeUrl = `https://lets-stream.innovativetechnology.my.id/livesession/${id}?token=${encodeURIComponent(token)}`;
        // Set header Content-Type ke text/html
        // res.setHeader("Content-Type", "text/html");
        // Kirimkan HTML iframe sebagai respons
        res.status(200).json({
            success: true,
            message: "Stream session launched successfully",
            url: iframeUrl,
        });
    }
    catch (error) {
        console.error("Error launching stream:", error);
        // Kirimkan pesan error
        return res.status(500).json({
            status: "error",
            message: "Failed to launch stream",
        });
    }
});
exports.launchStream = launchStream;
