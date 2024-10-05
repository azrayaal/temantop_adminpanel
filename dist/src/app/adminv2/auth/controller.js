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
exports.actionLogout = exports.index = exports.actionSignin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../../../db"));
const jwtSecretKey = "your_secret_key_here";
const actionSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const [result] = yield db_1.default.execute("SELECT * FROM admin WHERE username = ?", [username]);
        const rows = result;
        if (rows.length > 0) {
            const admin = rows[0];
            // Cek admin status
            if (admin.status === 1) {
                const checkPassword = yield bcryptjs_1.default.compare(password, admin.password);
                if (checkPassword) {
                    // if (password === admin.password) {
                    req.session.user = {
                        id: admin.id,
                        username: admin.username,
                        picture: admin.picture,
                        status: admin.status,
                        email: admin.email,
                        name: admin.name,
                    };
                    res.redirect("/admin/dashboard");
                }
                else {
                    req.flash("alertMessage", "Wrong password");
                    req.flash("alertStatus", "danger");
                    res.redirect("/admin/auth");
                }
            }
            else {
                req.flash("alertMessage", "Sorry your account is not active");
                req.flash("alertStatus", "danger");
                res.redirect("/admin/auth");
            }
        }
        else {
            req.flash("alertMessage", "Wrong username");
            req.flash("alertStatus", "danger");
            res.redirect("/admin/auth");
        }
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/auth");
    }
});
exports.actionSignin = actionSignin;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        res.render("adminv2/pages/auth/index", {
            alert,
            title: "Log In",
        });
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/auth");
    }
});
exports.index = index;
const actionLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Menghancurkan sesi
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Error logging out.");
        }
        res.clearCookie("connect.sid");
        res.redirect("/admin/auth");
    });
});
exports.actionLogout = actionLogout;
