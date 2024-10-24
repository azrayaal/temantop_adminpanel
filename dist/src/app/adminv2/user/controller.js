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
exports.getUserTransactions = exports.changeStatus = exports.actionEdit = exports.indexEdit = exports.actionDelete = exports.actionCreate = exports.indexCreate = exports.index = void 0;
const db_1 = __importDefault(require("../../../../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const https_1 = __importDefault(require("https"));
const controller_1 = require("../agent/controller");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Ambil data alert dari flash
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        // Ambil semua user yang memiliki stream = 0
        const [users] = yield db_1.default.query("SELECT * FROM user WHERE stream = 0");
        // Membuat https agent untuk bypass SSL verification
        const agent = new https_1.default.Agent({
            rejectUnauthorized: false, // Abaikan verifikasi SSL (jika perlu)
        });
        // Render halaman dengan user yang sudah di-update balance-nya
        res.render("adminv2/pages/user/index", {
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            user: users, // Kirimkan data user dengan balance yang diperbarui
            alert,
            title: "User page - Yong",
        });
    }
    catch (err) {
        console.error("Error in index route:", err.message || err);
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/dashboard");
    }
});
exports.index = index;
const indexCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        // Render halaman dengan data user
        res.render("adminv2/pages/user/create", {
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            alert,
            title: "User page - Yong",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman user
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/user");
    }
});
exports.indexCreate = indexCreate;
const actionCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, password, email } = req.body;
        const saltRounds = 10;
        const profilePicture = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) ||
            "avatardefault1.jpeg" ||
            "avatardefault2.jpeg" ||
            "avatardefault3.jpeg" ||
            "avatardefault4.jpeg" ||
            "avatardefault5.jpeg" ||
            "avatardefault6.jpeg" ||
            "avatardefault7.jpeg" ||
            "avatardefault8.jpeg" ||
            "avatardefault9.jpeg";
        const player_id = (0, controller_1.randomString)(8);
        const [checkEmail] = yield db_1.default.query("SELECT * FROM user WHERE email = ?", [email]);
        if (checkEmail.length > 0) {
            req.flash("alertMessage", "Email already exists");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/admin/user/create");
        }
        const [checkUsername] = yield db_1.default.query("SELECT * FROM user WHERE username = ?", [username]);
        if (checkUsername.length > 0) {
            req.flash("alertMessage", "Username already exists");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/user/create");
        }
        // Hash the password
        const passwordBrcypted = yield bcryptjs_1.default.hash(password, saltRounds);
        yield db_1.default.query("INSERT INTO user (email, username, password, profilePicture, player_id, channelName) VALUES (?, ?, ?, ?, ?, ?);", [email, username, passwordBrcypted, profilePicture, player_id, username]);
        res.redirect("/admin/user");
    }
    catch (err) {
        res.status(500).send(err.message);
        console.log(err);
    }
});
exports.actionCreate = actionCreate;
const actionDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("DELETE FROM user WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "user not found");
            req.flash("alertStatus", "danger");
        }
        else {
            req.flash("alertMessage", "Berhasil hapus user");
            req.flash("alertStatus", "success");
        }
        res.redirect("/admin/user");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/user");
    }
});
exports.actionDelete = actionDelete;
const indexEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        // Ambil ID dari parameter request
        const { id } = req.params;
        // Ambil data dari tabel user
        const [rows] = yield db_1.default.query("SELECT * FROM user WHERE id = ?", [
            id,
        ]);
        // Periksa apakah agen ditemukan
        if (rows.length === 0) {
            req.flash("alertMessage", "user not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/admin/user");
        }
        const user = rows[0];
        // Render halaman dengan data user
        res.render("adminv2/pages/user/edit", {
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            user,
            alert,
            title: "User page - Yong",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman user
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/admin/user");
    }
});
exports.indexEdit = indexEdit;
// Handler untuk menangani pembaruan data agen
const actionEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { username, password, channelName } = req.body;
        const passwordBrcypted = yield bcryptjs_1.default.hash(password, 10);
        const profilePicture = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        const [checkUsername] = yield db_1.default.query("SELECT * FROM user WHERE username = ?", [username]);
        if (checkUsername.length > 0) {
            req.flash("alertMessage", "Username already exists");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/user/edit");
        }
        const [result] = yield db_1.default.query("UPDATE user SET  username = ?, profilePicture = ?, channelName = ?, password = ? WHERE id = ?", [username, profilePicture, channelName, passwordBrcypted, id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "user not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/user");
        }
        req.flash("alertMessage", "Berhasil mengedit user");
        req.flash("alertStatus", "success");
        res.redirect("/admin/user");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/user");
    }
});
exports.actionEdit = actionEdit;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("UPDATE user SET status = !status WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "user not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/admin/user");
        }
        req.flash("alertMessage", "Berhasil mengubah status user");
        req.flash("alertStatus", "success");
        res.redirect("/admin/admin/user");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/admin/user");
    }
});
exports.changeStatus = changeStatus;
const getUserTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
        // Fetch user information (name)
        const [userRows] = yield db_1.default.query(`SELECT username, player_id FROM user WHERE id = ?`, [id]);
        if (userRows.length === 0) {
            return res.status(404).send("User not found");
        }
        const username = userRows[0].username;
        const player_id = userRows[0].player_id;
        // Fetch total income and total spend
        const [totalIncomeRows] = yield db_1.default.query(`SELECT 
        SUM(amount) AS totalIncome 
      FROM gift_transaction 
      WHERE receivedId = ?`, [id]);
        const [totalSpendRows] = yield db_1.default.query(`SELECT 
        SUM(amount) AS totalSpend 
      FROM gift_transaction 
      WHERE userId = ?`, [id]);
        // Get transaction count for pagination
        const [countRows] = yield db_1.default.query(`SELECT COUNT(*) AS total FROM gift_transaction WHERE userId = ? OR receivedId = ?`, [id, id]);
        const totalTransactions = countRows[0].total;
        // Fetch 10 latest transactions based on page
        const [transactionRows] = yield db_1.default.query(`SELECT 
      userId,
      receivedId,
        giftName, 
        amount, 
        bet_id, 
        description, 
        createdAt 
      FROM gift_transaction 
      WHERE userId = ? OR receivedId = ? 
      ORDER BY createdAt DESC 
      LIMIT ? OFFSET ?`, [id, id, limit, offset]);
        const totalIncome = totalIncomeRows[0].totalIncome || 0;
        const totalSpend = totalSpendRows[0].totalSpend || 0;
        const totalPages = Math.ceil(totalTransactions / limit);
        const transactionsWithAmounts = transactionRows.map((transaction) => {
            const amount = transaction.amount;
            // Inisialisasi amountSpend dan amountIncome
            let amountSpend = 0;
            let amountIncome = 0;
            if (transaction.userId === parseInt(id)) {
                // Jika userId sama dengan id, maka ini adalah pengeluaran
                amountSpend = amount || 0; // Jika amount tidak ada, set ke 0
            }
            else if (transaction.receivedId === parseInt(id)) {
                // Jika receivedId sama dengan id, maka ini adalah pendapatan
                amountIncome = amount || 0; // Jika amount tidak ada, set ke 0
            }
            return Object.assign(Object.assign({}, transaction), { amountSpend,
                amountIncome });
        });
        // Log transactions with amounts for debugging
        res.render("adminv2/pages/user/report", {
            title: "Transaction Report",
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            username,
            player_id,
            totalIncome,
            totalSpend,
            transactions: transactionsWithAmounts,
            currentPage: page,
            totalPages,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getUserTransactions = getUserTransactions;
