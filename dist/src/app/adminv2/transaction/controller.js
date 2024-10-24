"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.exportTransactionsToExcel = exports.getTransactionSummary = exports.getTransactions = void 0;
const db_1 = __importDefault(require("../../../../db"));
const XLSX = __importStar(require("xlsx")); // Pustaka untuk membuat file Excel
// Fungsi untuk mendapatkan total pemasukan dari User A
const getTotalIncomeFromUserA = (userIdA) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const [rows] = yield db_1.default.query(`SELECT SUM(amount) AS totalIncome
     FROM gift_transaction
     WHERE receivedId = ?`, [userIdA]);
    return ((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.totalIncome) || 0;
});
// Fungsi untuk mendapatkan total pengeluaran dari User B
const getTotalExpensesFromUserB = (userIdB) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const [rows] = yield db_1.default.query(`SELECT SUM(amount) AS totalExpenses
     FROM gift_transaction
     WHERE userId = ?`, [userIdB]);
    return ((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.totalExpenses) || 0;
});
// Controller untuk mendapatkan transaksi
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const [rows] = yield db_1.default.query(`SELECT
        gt.id,
        gt.userId,
        sender.username AS senderName,
        sender.player_id AS senderPlayerId,
        gt.receivedId,
        receiver.username AS receiverName,
        receiver.player_id AS receiverPlayerId,
        gt.giftId,
        gt.giftName,
        gt.amount,
        gt.description,
        gt.createdAt
      FROM gift_transaction gt
      LEFT JOIN user sender ON gt.userId = sender.id
      LEFT JOIN user receiver ON gt.receivedId = receiver.id
      ORDER BY gt.createdAt DESC`);
        // Query untuk menghitung total dari semua transaksi
        const [totalResult] = yield db_1.default.query(`SELECT SUM(gt.amount) AS totalAmount FROM gift_transaction gt`);
        const totalAmount = ((_a = totalResult[0]) === null || _a === void 0 ? void 0 : _a.totalAmount) || 0;
        res.render("adminv2/pages/transaction/index", {
            name: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.name,
            email: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.email,
            title: "Transactions",
            transactions: rows,
            totalAmount: totalAmount,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getTransactions = getTransactions;
// Controller untuk mendapatkan summary transaksi
const getTransactionSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdA = parseInt(req.query.userIdA, 10); // Ambil ID user A dari query params
        const userIdB = parseInt(req.query.userIdB, 10); // Ambil ID user B dari query params
        // Menghitung total pemasukan dari User A dan total pengeluaran dari User B
        const totalIncomeFromUserA = yield getTotalIncomeFromUserA(userIdA);
        const totalExpensesFromUserB = yield getTotalExpensesFromUserB(userIdB);
        // Render halaman dengan data
        res.render("adminv2/pages/transaction/summary", {
            title: "Transaction Summary",
            totalIncomeFromUserA: totalIncomeFromUserA.toFixed(2),
            totalExpensesFromUserB: totalExpensesFromUserB.toFixed(2),
            userIdA,
            userIdB,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getTransactionSummary = getTransactionSummary;
// Controller untuk ekspor PDF menggunakan jsPDF
// Controller untuk menghasilkan laporan transaksi sebagai Excel
const exportTransactionsToExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query; // Mendapatkan parameter tanggal
        // Validasi apakah startDate dan endDate diberikan
        if (!startDate || !endDate) {
            return res.status(400).send("Please provide both startDate and endDate.");
        }
        // Query SQL untuk mendapatkan transaksi berdasarkan rentang tanggal
        const query = `
      SELECT
        gt.id,
        gt.userId,
        sender.username AS senderName,
        gt.receivedId,
        receiver.username AS receiverName,
        gt.giftId,
        gt.giftName,
        gt.amount,
        gt.createdAt
      FROM gift_transaction gt
      LEFT JOIN user sender ON gt.userId = sender.id
      LEFT JOIN user receiver ON gt.receivedId = receiver.id
      WHERE DATE(gt.createdAt) BETWEEN ? AND ?
      ORDER BY gt.createdAt DESC
    `;
        // Menjalankan query dengan parameter tanggal yang diterima
        const [rows] = yield db_1.default.query(query, [
            startDate,
            endDate,
        ]);
        // Konversi data transaksi ke dalam format array untuk dimasukkan ke Excel
        const data = rows.map((transaction) => ({
            ID: transaction.id,
            Sender: transaction.senderName,
            Receiver: transaction.receiverName,
            GiftName: transaction.giftName,
            Amount: transaction.amount,
            // Memformat createdAt ke dalam format tanggal Indonesia
            Date: new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }), // Misalnya "12 September 2024"
        }));
        // Membuat worksheet Excel dari data transaksi
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        // Menghasilkan buffer Excel
        const excelBuffer = XLSX.write(workbook, {
            type: "buffer",
            bookType: "xlsx",
        });
        // Mengirimkan file Excel sebagai respons
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=transactions_report_${startDate}_to_${endDate}.xlsx`);
        res.send(excelBuffer); // Mengirimkan file Excel ke klien
    }
    catch (err) {
        console.log("Error occurred during Excel generation:", err);
        res.status(500).send("Internal Server Error");
    }
});
exports.exportTransactionsToExcel = exportTransactionsToExcel;
