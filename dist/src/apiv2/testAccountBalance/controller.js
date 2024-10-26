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
exports.addBalance = exports.fetchDeductBalanceGift = exports.fetchBalance = exports.updateBalance = exports.getAllUser = exports.login = exports.register = exports.deductBalance = exports.getBalanceWebhook = exports.getBalance = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../../../db")); // Sesuaikan dengan konfigurasi db Anda
require("dotenv").config();
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Setup Express dan HTTP Server
const app = (0, express_1.default)();
const httpServer = new http_1.Server(app);
// Setup Socket.IO
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
const getBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player_id = req.body.player_id;
        // Query to get the balance from the database
        const [result] = yield db_1.default.query(`SELECT balance FROM userTest WHERE player_id = ?`, [player_id]);
        if (result.length > 0) {
            // Get the balance and format it
            const balance = parseFloat(Number(result[0].balance).toFixed(6));
            // Return the formatted payload
            res.json({
                success: true,
                code: 200,
                data: balance,
                error: null,
            });
        }
        else {
            res.status(404).json({
                success: false,
                code: 404,
                data: null,
                error: "User not found",
            });
        }
    }
    catch (error) {
        console.error("Error getting user balance:", error);
        // Return the error payload
        res.status(500).json({
            success: false,
            code: 500,
            data: null,
            error: "Error getting user balance",
        });
    }
});
exports.getBalance = getBalance;
const getBalanceWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ambil player_id dari request body (dikirim oleh webhook)
        const { player_id } = req.body;
        if (!player_id) {
            return res
                .status(400)
                .json({ success: false, message: "player_id is required" });
        }
        // Query untuk mendapatkan balance berdasarkan player_id
        const [result] = yield db_1.default.query(`SELECT balance FROM userTest WHERE player_id = ?`, [player_id]);
        if (result.length > 0) {
            const balance = parseFloat(Number(result[0].balance).toFixed(6));
            // Kirim respons JSON dengan balance
            res.json({
                success: true,
                balance,
            });
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error getting user balance:", error);
        res
            .status(500)
            .json({ success: false, message: "Error getting user balance", error });
    }
});
exports.getBalanceWebhook = getBalanceWebhook;
const deductBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { player_id, amount, gift, streamer } = req.body;
        if (!player_id) {
            return res.status(400).json({ message: "player_id is required" });
        }
        if (typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }
        const [result] = yield db_1.default.query(`SELECT balance FROM userTest WHERE player_id = ?`, [player_id]);
        if (result.length > 0) {
            const currentBalance = parseFloat(result[0].balance);
            if (currentBalance < amount) {
                return res.status(400).json({ message: "Insufficient balance" });
            }
            const newBalance = currentBalance - amount;
            const [updateResult] = yield db_1.default.query(`UPDATE userTest SET balance = ? WHERE player_id = ?`, [newBalance.toFixed(6), player_id]);
            if (updateResult.affectedRows > 0) {
                const data = {
                    player_id,
                    credit_before: parseFloat(currentBalance.toFixed(2)),
                    credit_after: parseFloat(newBalance.toFixed(2)),
                    amount_deducted: parseFloat(amount.toFixed(2)),
                    gift,
                    streamer,
                };
                res.json({
                    success: true,
                    data: data,
                    message: "Balance deducted successfully",
                });
            }
            else {
                res.status(500).json({ message: "Failed to update balance" });
            }
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error deducting balance:", error);
        res.status(500).json({ message: "Error deducting balance", error });
    }
});
exports.deductBalance = deductBalance;
// Fungsi untuk membuat player_id
function generatePlayerId() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let player_id = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        player_id += characters[randomIndex];
    }
    return player_id;
}
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        // Validasi input
        if (!username || !password || !email) {
            return res.status(400).json({
                message: "All fields (username, password, email) are required",
            });
        }
        // Cek apakah email sudah terdaftar
        const [existingUser] = yield db_1.default.query(`SELECT id FROM userTest WHERE email = ?`, [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        // Hash password sebelum disimpan
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Generate player_id
        const player_id = generatePlayerId();
        // Simpan user ke database
        const [result] = yield db_1.default.query(`INSERT INTO userTest (username, player_id, password, email) VALUES (?, ?, ?, ?)`, [username, player_id, hashedPassword, email]);
        // Pastikan user berhasil disimpan
        if (result.affectedRows === 1) {
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                player_id,
            });
        }
        else {
            res.status(500).json({ message: "Failed to register user" });
        }
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error during registration", error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validasi input
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and Password are required" });
        }
        // Cek apakah email ada di database
        const [rows] = yield db_1.default.query(`SELECT * FROM userTest WHERE email = ?`, [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const user = rows[0];
        // Cek apakah password valid dengan bcrypt
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Generate JWT token setelah login berhasil
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            player_id: user.player_id,
        }, process.env.JWT_SECRET, // Pastikan JWT_SECRET diatur di environment variables
        {
            expiresIn: "1d", // Token berlaku selama 1 hari
        });
        // Return token dan pesan sukses
        res.json({
            success: true,
            message: "Logged in successfully",
            token,
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error during login", error });
    }
});
exports.login = login;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db_1.default.query("SELECT * FROM userTest");
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        res.status(500).json({ message: "error during get all user test" });
    }
});
exports.getAllUser = getAllUser;
const updateBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { player_id, balance } = req.body;
        const [result] = yield db_1.default.query(`UPDATE userTest SET balance = ? WHERE player_id = ?`, [balance, player_id]);
        res.status(200).json({ message: "success", data: result });
    }
    catch (error) {
        res.status(500).json({ message: "error during update user test" });
    }
});
exports.updateBalance = updateBalance;
// Fungsi untuk fetch balance dari API
const fetchBalance = (player_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const balanceResponse = yield axios_1.default.post("https://api.teman.top/api/v1/str/balance", { player_id: player_id }, {
            timeout: 20000, // Timeout for the API request
        });
        if (balanceResponse.status === 200) {
            return parseFloat(balanceResponse.data.data.toFixed(6));
        }
        else {
            throw new Error("Failed to fetch balance");
        }
    }
    catch (error) {
        console.error("Error fetching balance from API:", error);
        throw error;
    }
});
exports.fetchBalance = fetchBalance;
const fetchDeductBalanceGift = (player_id, amount, gift, streamer, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Deduct balance from external service
        const deductResponse = yield axios_1.default.post("https://api.teman.top/api/v1/str/deduct", { player_id, amount, gift, streamer }, {
            timeout: 20000, // Timeout for the API request
        });
        // Check if the deduction was successful
        if (deductResponse.data && deductResponse.data.status === "success") {
            // Get updated balance from external service
            const balanceResponse = yield axios_1.default.post("https://api.teman.top/api/v1/str/balance", { player_id: player_id }, {
                timeout: 20000, // Timeout for the API request
            });
            // Extract the balance from the response
            const updatedBalance = balanceResponse.data.balance;
            // Update the balance in the database
            const [result] = yield db_1.default.query(`UPDATE user SET balance = ? WHERE player_id = ?`, [updatedBalance, player_id]);
            // Send success response with updated data
            res
                .status(200)
                .json({ message: "Balance updated successfully", data: result });
        }
        else {
            // Handle the case where deduction failed
            res.status(400).json({ message: "Failed to deduct balance" });
        }
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Error during balance update process" });
    }
});
exports.fetchDeductBalanceGift = fetchDeductBalanceGift;
const addBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { player_id, amount } = req.body;
        const [result] = yield db_1.default.query(`UPDATE userTest SET balance = balance + ? WHERE player_id = ?`, [amount, player_id]);
        res.status(200).json({ message: "success", data: result });
    }
    catch (error) {
        res.status(500).json({ message: "error during update user test" });
    }
});
exports.addBalance = addBalance;
