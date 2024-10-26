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
exports.actionAccept = exports.actionReject = exports.indexDetail = exports.index = void 0;
const db_1 = __importDefault(require("../../../../db"));
const auth_1 = require("../../../middleware/auth");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        // Pagination variables
        const page = parseInt(req.query.page) || 1; // Current page
        const limit = 15; // Number of records per page
        const offset = (page - 1) * limit; // Calculate offset
        // Fetch paginated data with JOIN to get bank names directly
        const [withdrawWithDetails] = yield db_1.default.query(`SELECT w.*, b.name AS bank_name, u.username AS username, u.player_id AS player_id
       FROM withdraw w
       LEFT JOIN bank b ON w.bankId = b.id
       LEFT JOIN user u ON w.userId = u.id
       ORDER BY w.createdAt DESC
       LIMIT ? OFFSET ?`, [limit, offset]);
        // Fetch total record count to calculate total pages
        const [totalResult] = yield db_1.default.query(`SELECT COUNT(*) AS totalWithdrawals FROM withdraw`);
        const totalWithdrawals = ((_a = totalResult[0]) === null || _a === void 0 ? void 0 : _a.totalWithdrawals) || 0;
        const totalPages = Math.ceil(totalWithdrawals / limit);
        // Format amounts
        const withdrawFormatted = withdrawWithDetails.map((withdraw) => {
            return Object.assign(Object.assign({}, withdraw), { formattedAmount: (0, auth_1.formatRupiah)(withdraw.amount) });
        });
        // Render view with pagination data
        res.render("adminv2/pages/withdraw/index", {
            alert,
            withdraw: withdrawFormatted,
            name: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.name,
            email: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.email,
            title: "Halaman withdraw",
            currentPage: page,
            totalPages,
        });
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/withdraw");
    }
});
exports.index = index;
const indexDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        // Fetch data with JOIN to get bank names directly
        const [withdrawWithDetails] = yield db_1.default.query(`SELECT w.*, b.name AS bank_name, u.username AS username, u.player_id AS player_id
   FROM withdraw w
   LEFT JOIN bank b ON w.bankId = b.id
   LEFT JOIN user u ON w.userId = u.id
   WHERE w.id = ?`, [req.params.id]);
        const formattedWithdraw = withdrawWithDetails.map((withdraw) => {
            return Object.assign(Object.assign({}, withdraw), { formattedAmount: (0, auth_1.formatRupiah)(withdraw.amount) });
        });
        res.render("adminv2/pages/withdraw/detail", {
            alert,
            withdraw: formattedWithdraw,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Halaman withdraw",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman voucher
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/withdraw");
    }
});
exports.indexDetail = indexDetail;
const actionReject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [dataWithdraw] = yield db_1.default.query("SELECT * FROM withdraw WHERE id = ?", [id]);
        // Check if the withdrawal exists
        if (!dataWithdraw.length) {
            req.flash("alertMessage", "Withdrawal not found.");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/withdraw");
        }
        const [result] = yield db_1.default.query("UPDATE withdraw SET status = 'rejected' WHERE id = ?", [id]);
        if (result.affectedRows === 1) {
            // Insert a rejection notification
            yield db_1.default.query("INSERT INTO notification (userId, title, message, status) VALUES (?, ?, ?, ?)", [
                dataWithdraw[0].userId,
                "Withdrawal Rejected",
                `Your withdrawal request of Rp ${dataWithdraw[0].amount} has been rejected.`,
                "failed",
            ]);
            req.flash("alertMessage", "Withdrawal rejected successfully.");
            req.flash("alertStatus", "success");
        }
        else {
            req.flash("alertMessage", "Failed to reject withdrawal.");
            req.flash("alertStatus", "danger");
        }
        res.redirect("/admin/withdraw");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/withdraw");
    }
});
exports.actionReject = actionReject;
const actionAccept = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [dataWithdraw] = yield db_1.default.query("SELECT * FROM withdraw WHERE id = ?", [id]);
        // Check if the withdrawal exists
        if (!dataWithdraw.length) {
            req.flash("alertMessage", "Withdrawal not found.");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/withdraw");
        }
        // Approve the withdrawal
        const [result] = yield db_1.default.query("UPDATE withdraw SET status = 'approved' WHERE id = ?", [id]);
        // Only proceed if the withdrawal status was successfully updated
        if (result.affectedRows === 1) {
            // Update the user's balance
            yield db_1.default.query("UPDATE user SET balance = balance - ? WHERE id = ?", [dataWithdraw[0].amount, dataWithdraw[0].userId]);
            // Insert a success notification
            yield db_1.default.query("INSERT INTO notification (userId, title, message, status) VALUES (?, ?, ?, ?)", [
                dataWithdraw[0].userId,
                "Withdrawal Approved",
                `Your withdrawal of Rp ${dataWithdraw[0].amount} has been successfully approved.`,
                "success",
            ]);
            req.flash("alertMessage", "Withdrawal approved successfully.");
            req.flash("alertStatus", "success");
        }
        else {
            req.flash("alertMessage", "Failed to approve withdrawal.");
            req.flash("alertStatus", "danger");
        }
        res.redirect("/admin/withdraw");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/withdraw");
    }
});
exports.actionAccept = actionAccept;
