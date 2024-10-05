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
exports.changeStatusSuperAdmin = exports.changeStatus = exports.actionEdit = exports.indexEdit = exports.actionDelete = exports.actionCreate = exports.indexCreate = exports.index = void 0;
const db_1 = __importDefault(require("../../../../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs_1 = __importDefault(require("fs"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const [admin] = yield db_1.default.query("SELECT * FROM admin");
        res.render("adminv2/pages/admins/index", {
            admin,
            alert,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Admin Settings",
        });
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/dashboard");
    }
});
exports.index = index;
const indexCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    try {
        // Render halaman dengan data admin
        res.render("adminv2/pages/admins/create", {
            // admin,
            alert,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Create Admin",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman admin
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admins");
    }
});
exports.indexCreate = indexCreate;
const actionCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, password, email } = req.body;
        const saltRounds = 10;
        const profilePicture = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        // Cek apakah username sudah ada
        const [checkUsername] = yield db_1.default.query("SELECT * FROM admin WHERE username = ?", [username]);
        if (checkUsername.length > 0) {
            req.flash("alertMessage", "Username already exists");
            req.flash("alertStatus", "danger");
            return res.redirect("/admins/create");
        }
        // Cek apakah email sudah ada
        const [checkEmail] = yield db_1.default.query("SELECT * FROM admin WHERE email = ?", [email]);
        if (checkEmail.length > 0) {
            req.flash("alertMessage", "Email already exists");
            req.flash("alertStatus", "danger");
            return res.redirect("/admins/create");
        }
        // Hash the password
        const passwordBrcypted = yield bcryptjs_1.default.hash(password, saltRounds);
        // Insert admin ke database
        yield db_1.default.query("INSERT INTO admin (username, password, profilePicture, email) VALUES (?, ?, ?, ?)", [username, passwordBrcypted, profilePicture, email]);
        req.flash("alertMessage", "Admin created successfully");
        req.flash("alertStatus", "success");
        res.redirect("/admins");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admins");
    }
});
exports.actionCreate = actionCreate;
const actionDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("DELETE FROM admin WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "Admin not found");
            req.flash("alertStatus", "danger");
        }
        else {
            req.flash("alertMessage", "Admin deleted successfully");
            req.flash("alertStatus", "success");
        }
        res.redirect("/admins");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admins");
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
        // Ambil data dari tabel admin
        const [rows] = yield db_1.default.query("SELECT * FROM admin WHERE id = ?", [id]);
        // Periksa apakah agen ditemukan
        if (rows.length === 0) {
            req.flash("alertMessage", "admin not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admins");
        }
        const admin = rows[0];
        // Render halaman dengan data admin
        res.render("adminv2/pages/admins/edit", {
            admin,
            alert,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            // name: req.session.user.name,
            title: "Halaman Edit admin",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman admin
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admins");
    }
});
exports.indexEdit = indexEdit;
// Handler untuk menangani pembaruan data agen
const actionEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { username, password, previousProfilePicture } = req.body;
        let profilePicture = previousProfilePicture;
        // Jika pengguna mengunggah gambar baru, gunakan gambar baru
        if (req.file) {
            profilePicture = req.file.filename;
            // Hapus gambar lama dari server jika gambar baru diunggah
            if (previousProfilePicture) {
                fs_1.default.unlinkSync(`public/uploads/${previousProfilePicture}`);
            }
        }
        // Hashing password jika pengguna mengisi password baru
        let hashedPassword = password;
        if (password) {
            const saltRounds = 10;
            hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        }
        // Update data admin di database
        const [result] = yield db_1.default.query("UPDATE admin SET username = ?, password = ?, profilePicture = ? WHERE id = ?", [username, hashedPassword, profilePicture, id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "Admin not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admins");
        }
        req.flash("alertMessage", "Admin updated successfully");
        req.flash("alertStatus", "success");
        res.redirect("/admins");
    }
    catch (err) {
        req.flash("alertMessage", err.message);
        req.flash("alertStatus", "danger");
        res.redirect("/admins");
    }
});
exports.actionEdit = actionEdit;
// Mengubah status admin
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("UPDATE admin SET status = !status WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "user not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admins");
        }
        req.flash("alertMessage", "Berhasil mengubah status admin");
        req.flash("alertStatus", "success");
        res.redirect("/admins");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admins");
    }
});
exports.changeStatus = changeStatus;
const changeStatusSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("UPDATE admin SET isSuperAdmin = !isSuperAdmin WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "user not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admins");
        }
        req.flash("alertMessage", "Berhasil mengubah status admin");
        req.flash("alertStatus", "success");
        res.redirect("/admins");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admins");
    }
});
exports.changeStatusSuperAdmin = changeStatusSuperAdmin;
