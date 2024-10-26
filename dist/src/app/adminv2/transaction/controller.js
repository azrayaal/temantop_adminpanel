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
exports.getTransactionDetail = exports.getTransactions = void 0;
const db_1 = __importDefault(require("../../../../db"));
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
// Controller for fetching paginated transactions
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        // Pagination variables
        const page = parseInt(req.query.page) || 1;
        const limit = 15;
        const offset = (page - 1) * limit;
        // Query to fetch transactions with user and gift details, ordered by latest
        const [transactions] = yield db_1.default.query(`SELECT 
        t.id AS transactionId,
        t.userId,
        u.username AS userName,
        u.player_id AS player_id,
        t.transactionType,
        t.transactionId AS relatedTransactionId,
        gt.giftName,
        gt.amount,
        gt.description,
        t.createdAt
      FROM transaction t
      LEFT JOIN user u ON t.userId = u.id
      LEFT JOIN gift_transaction gt ON t.transactionType = 'gift_transaction' AND t.transactionId = gt.id
      ORDER BY t.createdAt DESC
      LIMIT ? OFFSET ?`, [limit, offset]);
        // Calculate the total number of transactions
        const [totalResult] = yield db_1.default.query(`SELECT COUNT(*) AS totalTransactions FROM transaction`);
        const totalTransactions = ((_a = totalResult[0]) === null || _a === void 0 ? void 0 : _a.totalTransactions) || 0;
        // Calculate the total amount from gift transactions
        const [totalAmountResult] = yield db_1.default.query(`SELECT SUM(gt.amount) AS totalAmount 
       FROM transaction t
       LEFT JOIN gift_transaction gt ON t.transactionType = 'gift_transaction' AND t.transactionId = gt.id`);
        const totalAmount = ((_b = totalAmountResult[0]) === null || _b === void 0 ? void 0 : _b.totalAmount) || 0;
        // Calculate total pages
        const totalPages = Math.ceil(totalTransactions / limit);
        // Map over transactions to adjust the transactionType
        const formattedTransactions = transactions.map((transaction) => {
            let transactionTypeLabel;
            switch (transaction.transactionType) {
                case 'gift_transaction':
                    transactionTypeLabel = "Gift";
                    break;
                case 'session_transaction':
                    transactionTypeLabel = "Session";
                    break;
                case 'withdraw_transaction':
                    transactionTypeLabel = "Withdraw";
                    break;
                case 'topup_transaction':
                    transactionTypeLabel = "Topup";
                    break;
                default:
                    transactionTypeLabel = "Unknown";
            }
            return Object.assign(Object.assign({}, transaction), { transactionType: transactionTypeLabel });
        });
        // Render the transactions page with retrieved data
        res.render("adminv2/pages/transaction/index", {
            name: ((_c = req.session.user) === null || _c === void 0 ? void 0 : _c.name) || "Admin",
            email: ((_d = req.session.user) === null || _d === void 0 ? void 0 : _d.email) || "admin@example.com",
            title: "Transactions",
            transactions: formattedTransactions,
            totalAmount,
            currentPage: page,
            totalPages,
        });
    }
    catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.getTransactions = getTransactions;
const getTransactionDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    try {
        // Fetch the basic transaction details from the main transaction table
        const [transactionBase] = yield db_1.default.query(`SELECT 
    t.id AS transactionId,
    t.userId,
    t.transactionId,
    t.transactionType,
    u.username AS userName,
    u.player_id AS userPlayerId,
    t.createdAt,
    CASE 
        WHEN t.transactionType = 'gift_transaction' THEN gt.amount
        WHEN t.transactionType = 'session_transaction' THEN st.amount
        WHEN t.transactionType = 'withdraw_transaction' THEN wt.amount
        WHEN t.transactionType = 'topup_transaction' THEN tt.amount
        ELSE NULL
    END AS amount
FROM transaction t
LEFT JOIN user u ON t.userId = u.id
LEFT JOIN gift_transaction gt ON t.transactionType = 'gift_transaction' AND t.transactionId = gt.id
LEFT JOIN session_transaction st ON t.transactionType = 'session_transaction' AND t.transactionId = st.id
LEFT JOIN withdraw_transaction wt ON t.transactionType = 'withdraw_transaction' AND t.transactionId = wt.id
LEFT JOIN topup_transaction tt ON t.transactionType = 'topup_transaction' AND t.transactionId = tt.id
WHERE t.id = ?;
`, [id]);
        const formatRupiah = (angka) => {
            return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        };
        // if (transactionBase.length === 0) {
        //   return res.status(404).render("adminv2/pages/transaction/notfound", {
        //     message: "Transaction not found",
        //   });
        // }
        const transaction = transactionBase[0];
        let transactionDetail;
        // Fetch additional details based on transactionType
        switch (transaction.transactionType) {
            case "gift_transaction":
                const [giftDetails] = yield db_1.default.query(`SELECT giftName, amount, description FROM gift_transaction WHERE id = ?`, [transaction.relatedTransactionId]);
                transactionDetail = giftDetails[0];
                break;
            case "session_transaction":
                const [sessionDetails] = yield db_1.default.query(`SELECT stream_sessionId, amount, description FROM session_transaction WHERE id = ?`, [transaction.relatedTransactionId]);
                transactionDetail = sessionDetails[0];
                break;
            case "withdraw_transaction":
                const [withdrawDetails] = yield db_1.default.query(`SELECT amount, description FROM withdraw_transaction WHERE id = ?`, [transaction.relatedTransactionId]);
                transactionDetail = withdrawDetails[0];
                break;
            case "topup_transaction":
                const [topupDetails] = yield db_1.default.query(`SELECT amount, description FROM topup_transaction WHERE id = ?`, [transaction.relatedTransactionId]);
                transactionDetail = topupDetails[0];
                break;
            default:
                return res.status(400).render("adminv2/pages/transaction/error", {
                    message: "Unknown transaction type",
                });
        }
        // Render the details page with combined data
        res.render("adminv2/pages/transaction/detail", {
            name: ((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name) || "Admin",
            email: ((_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email) || "admin@example.com",
            title: "Transaction Details",
            transaction: Object.assign(Object.assign(Object.assign({}, transaction), transactionDetail), { amount: formatRupiah(transaction.amount) }),
        });
    }
    catch (error) {
        console.error("Error fetching transaction detail:", error);
        res.status(500).render("adminv2/pages/transaction/error", {
            message: "Internal Server Error",
        });
    }
});
exports.getTransactionDetail = getTransactionDetail;
