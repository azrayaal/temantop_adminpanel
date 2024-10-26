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
const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months start at 0!
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const formatRupiah = (angka) => 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const page = parseInt(req.query.page) || 1;
        const limit = 15;
        const offset = (page - 1) * limit;
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const [voucher] = yield db_1.default.query(`SELECT * FROM voucher ORDER BY createdAt DESC LIMIT ? OFFSET ?`, [limit, offset]);
        const formattedVouchers = voucher.map((v) => (Object.assign(Object.assign({}, v), { formattedPrice: formatRupiah(v.price) })));
        const [totalResult] = yield db_1.default.query(`SELECT COUNT(*) AS totalVouchers FROM voucher`);
        const totalVouchers = ((_a = totalResult[0]) === null || _a === void 0 ? void 0 : _a.totalVouchers) || 0;
        const totalPages = Math.ceil(totalVouchers / limit);
        res.render("adminv2/pages/voucher/index", {
            voucher: formattedVouchers,
            alert,
            name: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.name,
            email: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.email,
            title: "Halaman voucher",
            currentPage: page,
            totalPages,
        });
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/voucher");
    }
});
exports.index = index;
const indexCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const [genre] = yield db_1.default.query("SELECT * FROM genre");
        // Render halaman dengan data voucher
        res.render("adminv2/pages/voucher/create", {
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            genre,
            title: "Halaman create voucher",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman voucher
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/voucher");
    }
});
exports.indexCreate = indexCreate;
const actionCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, unique_code, price } = req.body;
        const [rows] = yield db_1.default.query("INSERT INTO voucher (name, unique_code, price) VALUES ( ?, ?, ?)", [name, unique_code, price]);
        res.redirect("/admin/voucher");
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.actionCreate = actionCreate;
const actionDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("DELETE FROM voucher WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "voucher not found");
            req.flash("alertStatus", "danger");
        }
        else {
            req.flash("alertMessage", "Berhasil hapus voucher");
            req.flash("alertStatus", "success");
        }
        res.redirect("/admin/voucher");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/voucher");
    }
});
exports.actionDelete = actionDelete;
const indexEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Ambil ID dari parameter request
        const { id } = req.params;
        const [genre] = yield db_1.default.query("SELECT * FROM genre");
        // Ambil data dari tabel voucher
        const [rows] = yield db_1.default.query("SELECT * FROM voucher WHERE id = ?", [
            id,
        ]);
        // Periksa apakah agen ditemukan
        if (rows.length === 0) {
            req.flash("alertMessage", "voucher not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/voucher");
        }
        const voucher = rows[0];
        // Render halaman dengan data voucher
        res.render("adminv2/pages/voucher/edit", {
            voucher,
            genre,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Halaman Edit voucher",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman voucher
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/voucher");
    }
});
exports.indexEdit = indexEdit;
// Handler untuk menangani pembaruan data agen
const actionEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { genre, voucherName, voucherCode, voucherLink } = req.body;
        const voucherImg = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        const [result] = yield db_1.default.query("UPDATE voucher SET genre = ?, voucherCode = ?, voucherName = ?, voucherLink = ?, voucherImg = ? WHERE id = ?", [genre, voucherCode, voucherName, voucherLink, voucherImg, id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "voucher not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/voucher");
        }
        req.flash("alertMessage", "Berhasil mengedit voucher");
        req.flash("alertStatus", "success");
        res.redirect("/admin/voucher");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/voucher");
    }
});
exports.actionEdit = actionEdit;
