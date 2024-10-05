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
    var _a, _b;
    try {
        // Ambil data dari tabel game
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const [game] = yield db_1.default.query("SELECT * FROM game");
        // Render halaman dengan data game
        res.render("adminv2/pages/game/index", {
            game,
            alert,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Halaman game",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman game
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/game");
    }
});
exports.index = index;
const indexCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const [genre] = yield db_1.default.query("SELECT * FROM genre");
        // Render halaman dengan data game
        res.render("adminv2/pages/game/create", {
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            genre,
            title: "Halaman create game",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman game
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/game");
    }
});
exports.indexCreate = indexCreate;
const actionCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { gameCode, gameName, gameLink, genre } = req.body;
        const gameImg = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        const [rows] = yield db_1.default.query("INSERT INTO game (genre, gameCode, gameName, gameLink, gameImg) VALUES (?, ?, ?, ?, ?)", [genre, gameCode, gameName, gameLink, gameImg]);
        res.redirect("/admin/game");
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.actionCreate = actionCreate;
const actionDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("DELETE FROM game WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "game not found");
            req.flash("alertStatus", "danger");
        }
        else {
            req.flash("alertMessage", "Berhasil hapus game");
            req.flash("alertStatus", "success");
        }
        res.redirect("/admin/game");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/game");
    }
});
exports.actionDelete = actionDelete;
const indexEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Ambil ID dari parameter request
        const { id } = req.params;
        const [genre] = yield db_1.default.query("SELECT * FROM genre");
        // Ambil data dari tabel game
        const [rows] = yield db_1.default.query("SELECT * FROM game WHERE id = ?", [
            id,
        ]);
        // Periksa apakah agen ditemukan
        if (rows.length === 0) {
            req.flash("alertMessage", "game not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/game");
        }
        const game = rows[0];
        // Render halaman dengan data game
        res.render("adminv2/pages/game/edit", {
            game,
            genre,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Halaman Edit game",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman game
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/game");
    }
});
exports.indexEdit = indexEdit;
// Handler untuk menangani pembaruan data agen
const actionEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { genre, gameName, gameCode, gameLink } = req.body;
        const gameImg = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        const [result] = yield db_1.default.query("UPDATE game SET genre = ?, gameCode = ?, gameName = ?, gameLink = ?, gameImg = ? WHERE id = ?", [genre, gameCode, gameName, gameLink, gameImg, id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "game not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/game");
        }
        req.flash("alertMessage", "Berhasil mengedit game");
        req.flash("alertStatus", "success");
        res.redirect("/admin/game");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/game");
    }
});
exports.actionEdit = actionEdit;
