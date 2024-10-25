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
        // Ambil data dari tabel gift
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const [gift] = yield db_1.default.query("SELECT * FROM gift");
        // Render halaman dengan data gift
        res.render("adminv2/pages/gift/index", {
            gift,
            alert,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Halaman gift",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman gift
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/gift");
    }
});
exports.index = index;
const indexCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        // Render halaman dengan data gift
        res.render("adminv2/pages/gift/create", {
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Halaman create gift",
            alert,
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman gift
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/gift");
    }
});
exports.indexCreate = indexCreate;
const actionCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { giftName, giftLink, price } = req.body;
        const img = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        // const createTime = formatDate(new Date());
        const [rows] = yield db_1.default.query("INSERT INTO gift ( img, giftName, giftLink, price) VALUES ( ?, ?, ?, ?)", [img, giftName, giftLink, price]);
        req.flash("alertMessage", "Berhasil tambah gift");
        req.flash("alertStatus", "success");
        res.redirect("/admin/gift");
    }
    catch (err) {
        res.send(err);
    }
});
exports.actionCreate = actionCreate;
const actionDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("DELETE FROM gift WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "gift not found");
            req.flash("alertStatus", "danger");
        }
        else {
            req.flash("alertMessage", "Berhasil hapus gift");
            req.flash("alertStatus", "success");
        }
        res.redirect("/admin/gift");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/gift");
    }
});
exports.actionDelete = actionDelete;
const indexEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Ambil ID dari parameter request
        const { id } = req.params;
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        // Ambil data dari tabel gift
        const [rows] = yield db_1.default.query("SELECT * FROM gift WHERE id = ?", [
            id,
        ]);
        // Periksa apakah agen ditemukan
        if (rows.length === 0) {
            req.flash("alertMessage", "gift not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/gift");
        }
        const gift = rows[0];
        // Render halaman dengan data gift
        res.render("adminv2/pages/gift/edit", {
            gift,
            alert,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Halaman Edit gift",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman gift
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/gift");
    }
});
exports.indexEdit = indexEdit;
const actionEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { giftName, giftLink, price } = req.body;
        const img = ((_a = res.req.file) === null || _a === void 0 ? void 0 : _a.filename) || ""; // Use Cloudinary URL if file was uploaded
        // Fetch the existing gift data
        const [existingGift] = yield db_1.default.query("SELECT * FROM gift WHERE id = ?", [id]);
        if (existingGift.length === 0) {
            req.flash("alertMessage", "Gift not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/gift");
        }
        const gift = existingGift[0];
        // Check for gift name duplication
        if (giftName && giftName !== gift.giftName) {
            const [duplicateGift] = yield db_1.default.query("SELECT * FROM gift WHERE giftName = ? AND id != ?", [giftName, id]);
            if (duplicateGift.length > 0) {
                req.flash("alertMessage", "Gift with this name already exists");
                req.flash("alertStatus", "danger");
                return res.redirect(`/admin/gift/edit/${id}`);
            }
        }
        // Prepare fields to update
        const updates = {};
        if (img)
            updates.img = img; // Update image only if there's a new one
        if (giftName && giftName !== gift.giftName)
            updates.giftName = giftName;
        if (giftLink && giftLink !== gift.giftLink)
            updates.giftLink = giftLink;
        if (price && price !== gift.price)
            updates.price = price;
        // Update the fields if there are changes
        if (Object.keys(updates).length > 0) {
            const fields = Object.keys(updates);
            const values = Object.values(updates);
            const setClause = fields.map((field) => `${field} = ?`).join(", ");
            // Update the database
            yield db_1.default.query(`UPDATE gift SET ${setClause} WHERE id = ?`, [...values, id]);
        }
        req.flash("alertMessage", "Successfully updated the gift");
        req.flash("alertStatus", "success");
        res.redirect("/admin/gift");
    }
    catch (err) {
        req.flash("alertMessage", `Error: ${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/gift");
    }
});
exports.actionEdit = actionEdit;
