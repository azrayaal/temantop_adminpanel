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
exports.actionEdit = exports.indexEdit = exports.actionDelete = exports.actionCreate = exports.indexCreate = exports.index = void 0;
const db_1 = __importDefault(require("../../../../db"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const [Bank] = yield db_1.default.query("SELECT * FROM bank");
        res.render("adminv2/pages/bank/index", {
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            Bank,
            title: "Halaman Bank",
        });
    }
    catch (error) {
        req.flash("alertMessage", `${error}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/dashboard");
    }
});
exports.index = index;
const indexCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const [bank] = yield db_1.default.query("SELECT * FROM bank");
        // Render halaman dengan data bank
        res.render("adminv2/pages/bank/create", {
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            bank,
            title: "Halaman create bank",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman bank
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/bank");
    }
});
exports.indexCreate = indexCreate;
const actionCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, bank_code } = req.body;
        console.log(req.body);
        if (!name || !bank_code) {
            return res.status(400).send("Missing required fields");
        }
        const [rows] = yield db_1.default.query("INSERT INTO bank (name, bank_code) VALUES ( ?, ?)", [name, bank_code]);
        res.redirect("/admin/bank");
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.actionCreate = actionCreate;
const actionDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("DELETE FROM bank WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "bank not found");
            req.flash("alertStatus", "danger");
        }
        else {
            req.flash("alertMessage", "Berhasil hapus bank");
            req.flash("alertStatus", "success");
        }
        res.redirect("/admin/bank");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/bank");
    }
});
exports.actionDelete = actionDelete;
const indexEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Ambil ID dari parameter request
        const { id } = req.params;
        // Ambil data dari tabel bank
        const [rows] = yield db_1.default.query("SELECT * FROM bank WHERE id = ?", [
            id,
        ]);
        // Periksa apakah agen ditemukan
        if (rows.length === 0) {
            req.flash("alertMessage", "bank not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/bank");
        }
        const bank = rows[0];
        // Render halaman dengan data bank
        res.render("adminv2/pages/bank/edit", {
            bank,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Halaman Edit bank",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman bank
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/bank");
    }
});
exports.indexEdit = indexEdit;
// Handler untuk menangani pembaruan data agen
const actionEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, bank_code } = req.body;
        const [result] = yield db_1.default.query("UPDATE bank SET name = ?, bank_code = ? WHERE id = ?", [name, bank_code, id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "bank not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/bank");
        }
        req.flash("alertMessage", "Berhasil mengedit bank");
        req.flash("alertStatus", "success");
        res.redirect("/admin/bank");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/bank");
    }
});
exports.actionEdit = actionEdit;
