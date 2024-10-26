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
exports.addBalances = exports.checkToken = exports.requestStream = exports.changeStatusUser = exports.removeUser = exports.logout = exports.loginIntegrator = exports.login = exports.loginAgent = exports.editUser = exports.registerAgent = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../../../db")); // Adjust the import according to your actual db configuration
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const controller_1 = require("../../../app/adminv2/agent/controller");
// import { OAuth2Client } from "google-auth-library";
const JWT_SECRET = process.env.JWT_SECRET;
const addBalance = (player_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const balanceResponse = yield axios_1.default.post("https://api.teman.top/api/v1/str/balance", { player_id: player_id }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (balanceResponse.status !== 200) {
            throw new Error("Failed to fetch balance");
        }
        const balance = parseFloat(balanceResponse.data.data.toFixed(6));
        return balance;
    }
    catch (error) {
        console.error("Error during add balance:", error);
        throw error;
    }
});
const getBalance = (player_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBalance = yield addBalance(player_id);
        const [updateResult] = yield db_1.default.query("UPDATE user SET balance = ? WHERE player_id = ?", [newBalance, player_id]);
        if (updateResult.affectedRows === 0) {
            throw new Error("Failed to update balance in the database");
        }
        return newBalance;
    }
    catch (error) {
        console.error("Error during get balance:", error);
        throw error;
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, username, password } = req.body;
    const profilePictures = [
        "avatardefault1.png",
        "avatardefault2.png",
        "avatardefault3.png",
        "avatardefault4.png",
        "avatardefault5.png",
        "avatardefault6.png",
        "avatardefault7.png",
        "avatardefault8.png",
        "avatardefault9.png",
    ];
    const profilePictureShuffle = profilePictures[Math.floor(Math.random() * profilePictures.length)];
    const profilePicture = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || profilePictureShuffle;
    const saltRounds = 10;
    const bcryptedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
    try {
        // Check if the email already exists
        const [existingEmail] = yield db_1.default.query("SELECT * FROM user WHERE email = ? ", [email]);
        if (existingEmail.length > 0) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        // add player_id
        // Generate a unique player_id
        let player_id = (0, controller_1.randomString)(8);
        while (true) {
            const [checkPlayerId] = yield db_1.default.query("SELECT * FROM user WHERE player_id = ?", [player_id]);
            if (checkPlayerId.length === 0) {
                break; // Player ID is unique
            }
            // Generate a new player_id if it already exists
            player_id = (0, controller_1.randomString)(8);
        }
        // Check if the username  already exists
        const [existingUsername] = yield db_1.default.query("SELECT * FROM user WHERE username = ? ", [username]);
        const [existingChannelName] = yield db_1.default.query("SELECT * FROM user WHERE channelName = ? ", [username]);
        if (existingUsername.length > 0 || existingChannelName.length > 0) {
            return res.status(400).json({
                message: "Username already exists",
            });
        }
        // Insert the new user into the database
        yield db_1.default.query("INSERT INTO user (email, username, profilePicture, password, channelName, player_id) VALUES (?, ?, ?, ?, ?, ?)", [email, username, profilePicture, bcryptedPassword, username, player_id]);
        res.json({
            success: true,
            message: "Registered successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error during register", error });
    }
});
exports.register = register;
const registerAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, username, password } = req.body;
    const profilePictures = [
        "avatardefault1.png",
        "avatardefault2.png",
        "avatardefault3.png",
        "avatardefault4.png",
        "avatardefault5.png",
        "avatardefault6.png",
        "avatardefault7.png",
        "avatardefault8.png",
        "avatardefault9.png",
    ];
    const profilePictureShuffle = profilePictures[Math.floor(Math.random() * profilePictures.length)];
    const profilePicture = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || profilePictureShuffle;
    const saltRounds = 10;
    const bcryptedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
    try {
        // Check if the email already exists
        const [existingEmail] = yield db_1.default.query("SELECT * FROM user WHERE email = ? ", [email]);
        if (existingEmail.length > 0) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        // Check if the username  already exists
        const [existingUsername] = yield db_1.default.query("SELECT * FROM user WHERE username = ? ", [username]);
        const [existingChannelName] = yield db_1.default.query("SELECT * FROM user WHERE channelName = ? ", [username]);
        if (existingUsername.length > 0 || existingChannelName.length > 0) {
            return res.status(400).json({
                message: "Username already exists",
            });
        }
        const stream = 1;
        const channelName = username;
        // Generate a unique player_id
        let player_id = (0, controller_1.randomString)(8);
        while (true) {
            const [checkPlayerId] = yield db_1.default.query("SELECT * FROM user WHERE player_id = ?", [player_id]);
            if (checkPlayerId.length === 0) {
                break; // Player ID is unique
            }
            // Generate a new player_id if it already exists
            player_id = (0, controller_1.randomString)(8);
        }
        // Insert the new user into the database
        yield db_1.default.query("INSERT INTO user (email, username, profilePicture, password, stream, channelName, player_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [email, username, profilePicture, bcryptedPassword, stream, channelName, player_id]);
        res.json({
            success: true,
            message: "Registered successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error during register", error });
    }
});
exports.registerAgent = registerAgent;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }
    if (updates.password) {
        const saltRounds = 10;
        updates.password = yield bcryptjs_1.default.hash(updates.password, saltRounds);
    }
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    // Buat query dinamis
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    try {
        const [result] = yield db_1.default.query(`UPDATE user SET ${setClause} WHERE id = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            // Return the updated user data, excluding the hashed password
            const updatedUser = {}; // Menggunakan Record untuk tipe dinamis
            fields.forEach((field, index) => {
                if (field !== "password") {
                    updatedUser[field] = values[index];
                }
            });
            res.json({
                success: true,
                data: Object.assign({ id }, updatedUser),
                message: "User updated successfully",
            });
        }
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error });
    }
});
exports.editUser = editUser;
const loginAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Cari user berdasarkan email
        const [rows] = yield db_1.default.query("SELECT * FROM user WHERE email = ?", [
            email,
        ]);
        // Jika user tidak ditemukan
        if (rows.length === 0) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }
        const user = rows[0];
        // Periksa apakah user memiliki izin (stream === true atau 1)
        if (user.stream !== true && user.stream !== 1) {
            return res
                .status(401)
                .json({ success: false, message: "You don't have permission" });
        }
        // Cek apakah password sesuai
        const match = bcryptjs_1.default.compareSync(password, user.password);
        if (!match) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }
        // Jika user sudah login dan token masih valid, masukkan token lama ke dalam blacklist
        if (user.is_logged_in && user.jwt_token) {
            try {
                // Verifikasi token yang tersimpan di database
                jsonwebtoken_1.default.verify(user.jwt_token, JWT_SECRET);
                // Masukkan token lama ke dalam blacklist
                yield db_1.default.query("INSERT INTO token_blacklist (token, user_id) VALUES (?, ?)", [user.jwt_token, user.id]);
                console.log(`Token for user ${user.email} has been blacklisted.`);
            }
            catch (err) {
                console.log("Token expired or invalid, generating new token.");
            }
        }
        // Generate JWT token baru dengan userData
        const userData = {
            id: user.id,
            email: user.email,
            username: user.username,
            player_id: user.player_id,
            profilePicture: user.profilePicture,
        };
        const token = jsonwebtoken_1.default.sign({ userData: userData }, JWT_SECRET, {
            expiresIn: "1d", // Token berlaku selama 1 hari
        });
        // Simpan token baru dan update status login di database
        yield db_1.default.query("UPDATE user SET online = 1, jwt_token = ?, is_logged_in = true WHERE id = ?", [token, user.id]);
        // Response sukses dengan token baru
        res.json({
            success: true,
            token,
            message: "Logged in successfully",
        });
    }
    catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({ message: "Error during authentication", error });
    }
});
exports.loginAgent = loginAgent;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Cari user berdasarkan email
        const [rows] = yield db_1.default.query("SELECT * FROM user WHERE email = ?", [
            email,
        ]);
        // Jika user tidak ditemukan
        if (rows.length === 0) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }
        const user = rows[0];
        // Cek apakah password sesuai
        const match = bcryptjs_1.default.compareSync(password, user.password);
        if (!match) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }
        // Jika user sudah login dan token masih valid, keluarkan user dari sesi sebelumnya
        if (user.is_logged_in && user.jwt_token) {
            try {
                // Verifikasi token yang tersimpan di database
                jsonwebtoken_1.default.verify(user.jwt_token, JWT_SECRET);
                // Masukkan token lama ke dalam blacklist
                yield db_1.default.query("INSERT INTO token_blacklist (token, user_id) VALUES (?, ?)", [user.jwt_token, user.id]);
                // Update status untuk 'kick' user dari sesi sebelumnya
                yield db_1.default.query("UPDATE user SET online = 0, jwt_token = NULL, is_logged_in = false WHERE id = ?", [user.id]);
                console.log(user.username + " has been logged out from previous session.");
            }
            catch (err) {
                console.log("Token expired or invalid, generating new token.");
            }
        }
        const userData = {
            id: user.id,
            email: user.email,
            username: user.username,
            player_id: user.player_id,
            profilePicture: user.profilePicture,
        };
        // Generate JWT token baru
        const token = jsonwebtoken_1.default.sign({ userData: userData }, JWT_SECRET, {
            expiresIn: "1d", // Token berlaku selama 1 hari
        });
        // Simpan token baru dan update status login di database
        yield db_1.default.query("UPDATE user SET online = 1, jwt_token = ?, is_logged_in = true WHERE id = ?", [token, user.id]);
        // Response sukses dengan token baru
        res.json({
            success: true,
            token,
            userData,
            message: "Logged in successfully, previous session has been logged out.",
        });
    }
    catch (error) {
        console.error("Error during authentication:", error);
        res
            .status(500)
            .json({ success: false, message: "Error during authentication", error });
    }
});
exports.login = login;
const loginIntegrator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, player_id } = req.body;
    try {
        if (!username || !player_id) {
            return res.status(400).json({
                success: false,
                message: "Need username and player_id",
            });
        }
        try {
            const [userCheck] = yield db_1.default.query("SELECT * FROM user WHERE username = ? OR player_id = ?", [username, player_id]);
            if (userCheck.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "User not found",
                });
            }
            const user = userCheck[0];
            if (user.is_logged_in && user.jwt_token) {
                try {
                    jsonwebtoken_1.default.verify(user.jwt_token, JWT_SECRET);
                    return res.status(403).json({
                        success: false,
                        message: "User is already logged in on another device. Please log out first.",
                    });
                }
                catch (error) {
                    console.log("Token expired, generating new token.");
                }
            }
            const userData = {
                id: user.id,
                username: user.username,
                player_id: user.player_id,
                email: user.email,
                profilePicture: user.profilePicture,
                balance: user.balance,
            };
            // Ambil balance terbaru dari API integrator dan perbarui di database
            const updatedBalance = yield getBalance(user.player_id);
            userData.balance = updatedBalance;
            const token = jsonwebtoken_1.default.sign({ userData: userData }, JWT_SECRET, {
                expiresIn: "1d", // Token berlaku selama 1 hari
            });
            yield db_1.default.query("UPDATE user SET online = 1, jwt_token = ?, is_logged_in = true WHERE id = ?", [token, user.id]);
            res.json({
                success: true,
                token,
                message: "Logged in successfully",
            });
        }
        catch (error) {
            console.error("Error during authentication:", error);
            res.status(500).json({
                success: false,
                message: "Error during authentication",
                error,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
});
exports.loginIntegrator = loginIntegrator;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    // Cek jika userId tersedia
    try {
        if (!userId) {
            return res.status(400).json({ message: "User ID not found" });
        }
        const [rows] = yield db_1.default.query("SELECT * FROM user WHERE id = ?", [userId]);
        if (rows.length === 0) {
            throw new Error("User not found");
        }
        const user = rows[0];
        if (!user.jwt_token) {
            return res
                .status(401)
                .json({ success: false, message: "User is not logged in" });
        }
        // Blacklist token yang ada
        yield db_1.default.query("INSERT INTO token_blacklist (token, user_id) VALUES (?, ?)", [user.jwt_token, user.id]);
        // Set pengguna menjadi offline dan hapus token
        yield db_1.default.query("UPDATE user SET online = 0, jwt_token = NULL, is_logged_in = false WHERE id = ?", [user.id]);
        res.json({ success: true, message: "Logged out successfully" });
    }
    catch (error) {
        console.error("Error during logout:", error);
        res
            .status(500)
            .json({ success: false, message: "Error during logging out", error });
    }
});
exports.logout = logout;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db_1.default.query("DELETE FROM user WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "user not found" });
        }
        else {
            res.json({ message: "user deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});
exports.removeUser = removeUser;
const changeStatusUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // First, get the current status of the user
        const [rows] = yield db_1.default.query("SELECT status FROM user WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "user not found" });
        }
        const currentStatus = rows[0].status;
        const newStatus = currentStatus === 0 ? 1 : 0;
        // Update the status of the user
        const [result] = yield db_1.default.query("UPDATE user SET status = ? WHERE id = ?", [newStatus, id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "user not found" });
        }
        else {
            res.json({
                message: `user ${id} status updated successfully to ${newStatus}`,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user status", error });
    }
});
exports.changeStatusUser = changeStatusUser;
const requestStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID not found" });
        }
        // Cek apakah user sudah pernah melakukan request
        const [existingRequest] = yield db_1.default.query("SELECT * FROM request_stream WHERE userId = ?", [userId]);
        if (existingRequest.length > 0) {
            // Jika sudah ada request, kembalikan respons bahwa user tidak bisa request lagi
            return res.status(400).json({
                success: false,
                message: "Your request is being processed. Please wait for the confirmation.",
            });
        }
        yield db_1.default.query("INSERT INTO request_stream (userId) VALUES (?)", [userId]);
        res.json({
            success: true,
            message: "Your request has been sent",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error requesting stream", error });
    }
});
exports.requestStream = requestStream;
const checkToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        // Cek apakah token ada di dalam blacklist di database
        const [blacklistedToken] = yield db_1.default.query("SELECT * FROM token_blacklist WHERE token = ?", [token]);
        if (blacklistedToken.length > 0) {
            return res
                .status(401)
                .json({ success: false, message: "Token is blacklisted" });
        }
        // Verifikasi token
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Internet anda tidak stabil, harap coba lagi.",
                });
            }
            return res
                .status(200)
                .json({ success: true, message: "Token verified", decoded });
        });
    }
    catch (error) {
        console.error("Error during token verification:", error);
        res.status(500).json({ message: "Error during token verification" });
    }
});
exports.checkToken = checkToken;
const addBalances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { amount } = req.body;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (typeof amount !== "number" || amount <= 0) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid amount" });
        }
        // Update balance with IFNULL to ensure balance is not null
        const [updateResult] = yield db_1.default.query("UPDATE user SET balance = IFNULL(balance, 0) + ? WHERE id = ?", [amount, userId]);
        // Check if any row was affected (user exists and balance updated)
        if (updateResult.affectedRows === 0) {
            return res
                .status(404)
                .json({ success: false, message: "User not found or no changes made" });
        }
        const [rows] = yield db_1.default.query("SELECT balance FROM user WHERE id = ?", [userId]);
        if (rows.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        const balance = rows[0].balance;
        return res.status(200).json({
            success: true,
            message: "Balance added successfully",
            newBalance: balance,
        });
    }
    catch (error) {
        console.error("Error during balance update:", error);
        res.status(500).json({ message: "Error during balance update" });
    }
});
exports.addBalances = addBalances;
