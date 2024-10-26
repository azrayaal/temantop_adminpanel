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
exports.filterOutById = exports.filterOut = exports.filterInById = exports.filterIn = exports.filterByDatebyUserId = exports.filterByDate = exports.getUserTransactionsByUserId = exports.getUserTransactions = void 0;
const db_1 = __importDefault(require("../../../../db"));
// Mendapatkan semua transaksi hadiah dari pengguna yang sedang login
const getUserTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res
            .status(401)
            .json({ success: false, message: "User not authenticated" });
    }
    try {
        // Query untuk mendapatkan semua transaksi milik pengguna yang sedang login
        const [transactions] = yield db_1.default.query(`SELECT giftName, amount, description, createdAt, userId, receivedId
       FROM gift_transaction 
       WHERE userId = ? OR receivedId = ? 
       ORDER BY createdAt DESC`, [userId, userId]);
        // Jika tidak ada transaksi
        if (transactions.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No transactions found" });
        }
        // Looping transaksi untuk mendapatkan nama pengirim dan penerima
        const formattedTransactions = yield Promise.all(transactions.map((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            let senderName = null;
            let receiverName = null;
            // Ambil nama pengirim berdasarkan userId
            const [sender] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.userId]);
            senderName = sender.length > 0 ? sender[0].username : "Unknown";
            // Ambil nama penerima berdasarkan receivedId
            const [receiver] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.receivedId]);
            receiverName = receiver.length > 0 ? receiver[0].username : "Unknown";
            return {
                giftName: transaction.giftName,
                description: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100, // Membulatkan ke dua angka desimal
                transactionType: transaction.userId === userId ? "out" : "in",
                senderName, // Nama pengirim
                receiverName, // Nama penerima
            };
        })));
        res.json({ success: true, transactions: formattedTransactions });
    }
    catch (error) {
        console.error("Error fetching user transactions:", error); // Log error untuk debugging
        res.status(500).json({
            success: false,
            message: "Error fetching user transactions",
            error: error.message, // Mengembalikan pesan error yang jelas
        });
    }
});
exports.getUserTransactions = getUserTransactions;
const getUserTransactionsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Memeriksa apakah user dengan id tersebut ada
    const [user] = yield db_1.default.query("SELECT * FROM user WHERE id = ?", [id]);
    if (!user || user.length === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    const userId = user[0].id;
    if (!userId) {
        return res
            .status(401)
            .json({ success: false, message: "User not authenticated" });
    }
    try {
        // Query untuk mendapatkan semua transaksi milik pengguna yang sedang login
        const [transactions] = yield db_1.default.query(`SELECT giftName, amount, description, createdAt, userId, receivedId
       FROM gift_transaction 
       WHERE userId = ? OR receivedId = ? 
       ORDER BY createdAt DESC`, [userId, userId]);
        // Jika tidak ada transaksi
        if (transactions.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No transactions found" });
        }
        // Looping transaksi untuk mendapatkan nama pengirim dan penerima
        const formattedTransactions = yield Promise.all(transactions.map((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            let senderName = null;
            let receiverName = null;
            // Ambil nama pengirim berdasarkan userId
            const [sender] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.userId]);
            senderName = sender.length > 0 ? sender[0].username : "Unknown";
            // Ambil nama penerima berdasarkan receivedId
            const [receiver] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.receivedId]);
            receiverName = receiver.length > 0 ? receiver[0].username : "Unknown";
            return {
                giftName: transaction.giftName,
                description: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100, // Membulatkan ke dua angka desimal
                transactionType: transaction.userId === userId ? "out" : "in",
                senderName, // Nama pengirim
                receiverName, // Nama penerima
            };
        })));
        res.json({ success: true, transactions: formattedTransactions });
    }
    catch (error) {
        console.error("Error fetching user transactions:", error); // Log error untuk debugging
        res.status(500).json({
            success: false,
            message: "Error fetching user transactions",
            error: error.message, // Mengembalikan pesan error yang jelas
        });
    }
});
exports.getUserTransactionsByUserId = getUserTransactionsByUserId;
const setStartOfDay = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")} 00:00:00`;
};
const setEndOfDay = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")} 23:59:59`;
};
const filterByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { startDate, endDate } = req.query;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Mendapatkan userId dari req.user
    if (!userId) {
        return res
            .status(401)
            .json({ success: false, message: "User not authenticated" });
    }
    try {
        // Validasi jika endDate lebih awal dari startDate
        if (startDate &&
            endDate &&
            new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({
                success: false,
                message: "You can't set an end date earlier than the start date",
            });
        }
        let query = `SELECT giftName, amount, description, createdAt, userId, receivedId, 
    CASE 
      WHEN userId = ? THEN 'out' 
      WHEN receivedId = ? THEN 'in' 
      ELSE 'unknown' 
    END AS transactionType 
    FROM gift_transaction 
    WHERE (userId = ? OR receivedId = ?)`;
        const params = [userId, userId, userId, userId];
        // Filter berdasarkan startDate dan endDate
        if (startDate && endDate) {
            query += ` AND createdAt BETWEEN ? AND ?`;
            const start = setStartOfDay(startDate);
            const end = setEndOfDay(endDate);
            params.push(start, end);
        }
        else if (startDate) {
            query += ` AND createdAt >= ?`;
            const start = setStartOfDay(startDate);
            params.push(start);
        }
        else if (endDate) {
            query += ` AND createdAt <= ?`;
            const end = setEndOfDay(endDate);
            params.push(end);
        }
        // Query ke database
        const [transactions] = yield db_1.default.query(query, params);
        // Jika tidak ada transaksi, kembalikan 404
        if (transactions.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No transactions during this time" });
        }
        // Looping transaksi untuk mendapatkan nama pengirim dan penerima
        const formattedTransactions = yield Promise.all(transactions.map((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            let senderName = null;
            let receiverName = null;
            // Ambil nama pengirim berdasarkan userId
            const [sender] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.userId]);
            senderName = sender.length > 0 ? sender[0].username : "Unknown";
            // Ambil nama penerima berdasarkan receivedId
            const [receiver] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.receivedId]);
            receiverName = receiver.length > 0 ? receiver[0].username : "Unknown";
            return {
                giftName: transaction.giftName,
                description: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100, // Membulatkan ke dua angka desimal
                transactionType: transaction.userId === userId ? "out" : "in",
                senderName, // Nama pengirim
                receiverName, // Nama penerima
            };
        })));
        // Jika ada transaksi, kirimkan data ke response
        res.json({ success: true, transactions: formattedTransactions });
    }
    catch (error) {
        console.error("Error filtering transactions by date:", error);
        res.status(500).json({
            success: false,
            message: "Error filtering transactions by date",
            error: error.message,
        });
    }
});
exports.filterByDate = filterByDate;
const filterByDatebyUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.query;
    const { id } = req.params; // Mendapatkan userId dari URL params
    const [user] = yield db_1.default.query("SELECT * FROM user WHERE id = ?", [id]);
    if (user.length === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    const userId = user[0].id;
    if (!userId) {
        return res
            .status(401)
            .json({ success: false, message: "User ID not authenticated" });
    }
    if (!id) {
        return res
            .status(401)
            .json({ success: false, message: "User ID not provided" });
    }
    try {
        // Validasi jika endDate lebih awal dari startDate
        if (startDate &&
            endDate &&
            new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({
                success: false,
                message: "You can't set an end date earlier than the start date",
            });
        }
        let query = `SELECT giftName, amount, description, createdAt, userId, receivedId, 
    CASE 
      WHEN userId = ? THEN 'out' 
      WHEN receivedId = ? THEN 'in' 
      ELSE 'unknown' 
    END AS transactionType 
    FROM gift_transaction 
    WHERE (userId = ? OR receivedId = ?)`;
        const params = [userId, userId, userId, userId];
        // Filter berdasarkan startDate dan endDate
        if (startDate && endDate) {
            query += ` AND createdAt BETWEEN ? AND ?`;
            const start = setStartOfDay(startDate);
            const end = setEndOfDay(endDate);
            params.push(start, end);
        }
        else if (startDate) {
            query += ` AND createdAt >= ?`;
            const start = setStartOfDay(startDate);
            params.push(start);
        }
        else if (endDate) {
            query += ` AND createdAt <= ?`;
            const end = setEndOfDay(endDate);
            params.push(end);
        }
        // Query ke database
        const [transactions] = yield db_1.default.query(query, params);
        // Jika tidak ada transaksi, kembalikan 404
        if (transactions.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No transactions during this time" });
        }
        // Looping transaksi untuk mendapatkan nama pengirim dan penerima
        const formattedTransactions = yield Promise.all(transactions.map((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            let senderName = null;
            let receiverName = null;
            // Ambil nama pengirim berdasarkan userId
            const [sender] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.userId]);
            senderName = sender.length > 0 ? sender[0].username : "Unknown";
            // Ambil nama penerima berdasarkan receivedId
            const [receiver] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.receivedId]);
            receiverName = receiver.length > 0 ? receiver[0].username : "Unknown";
            return {
                giftName: transaction.giftName,
                description: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100, // Membulatkan ke dua angka desimal
                transactionType: transaction.userId === id ? "out" : "in",
                senderName, // Nama pengirim
                receiverName, // Nama penerima
            };
        })));
        // Jika ada transaksi, kirimkan data ke response
        res.json({ success: true, transactions: formattedTransactions });
    }
    catch (error) {
        console.error("Error filtering transactions by date:", error);
        res.status(500).json({
            success: false,
            message: "Error filtering transactions by date",
            error: error.message,
        });
    }
});
exports.filterByDatebyUserId = filterByDatebyUserId;
const filterIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res
            .status(401)
            .json({ success: false, message: "User not authenticated" });
    }
    try {
        // Query untuk mendapatkan transaksi berdasarkan receivedId
        const [transactions] = yield db_1.default.query(`SELECT giftName, amount, description, createdAt, userId
       FROM gift_transaction 
       WHERE receivedId = ? 
       ORDER BY createdAt DESC`, [userId]);
        // Jika tidak ada transaksi
        if (transactions.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No incoming transactions" });
        }
        // Format transaksi dengan menambahkan nama pengirim (senderName)
        const formattedTransactions = yield Promise.all(transactions.map((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            let senderName = null;
            // Cari nama pengirim berdasarkan userId
            const [sender] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.userId]);
            senderName = sender.length > 0 ? sender[0].username : "Unknown";
            return {
                giftName: transaction.giftName,
                description: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100, // Membulatkan ke dua angka desimal
                senderName, // Nama pengirim
            };
        })));
        // Jika ada transaksi, kirimkan data ke response
        res.json({ success: true, transactions: formattedTransactions });
    }
    catch (error) {
        console.error("Error filtering 'in' transactions:", error);
        res.status(500).json({
            success: false,
            message: "Error filtering 'in' transactions",
            error: error.message,
        });
    }
});
exports.filterIn = filterIn;
const filterInById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const [user] = yield db_1.default.query("SELECT id FROM user WHERE id = ?", [id]);
    const userId = user[0].id;
    if (!userId) {
        return res
            .status(401)
            .json({ success: false, message: "User not authenticated" });
    }
    try {
        // Query untuk mendapatkan transaksi berdasarkan receivedId
        const [transactions] = yield db_1.default.query(`SELECT giftName, amount, description, createdAt, userId
       FROM gift_transaction 
       WHERE receivedId = ? 
       ORDER BY createdAt DESC`, [userId]);
        // Jika tidak ada transaksi
        if (transactions.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No incoming transactions" });
        }
        // Format transaksi dengan menambahkan nama pengirim (senderName)
        const formattedTransactions = yield Promise.all(transactions.map((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            let senderName = null;
            // Cari nama pengirim berdasarkan userId
            const [sender] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.userId]);
            senderName = sender.length > 0 ? sender[0].username : "Unknown";
            return {
                giftName: transaction.giftName,
                description: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100, // Membulatkan ke dua angka desimal
                senderName, // Nama pengirim
            };
        })));
        // Jika ada transaksi, kirimkan data ke response
        res.json({ success: true, transactions: formattedTransactions });
    }
    catch (error) {
        console.error("Error filtering 'in' transactions:", error);
        res.status(500).json({
            success: false,
            message: "Error filtering 'in' transactions",
            error: error.message,
        });
    }
});
exports.filterInById = filterInById;
// Filter transaksi dengan tipe 'out' (pengirim)
const filterOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res
            .status(401)
            .json({ success: false, message: "User not authenticated" });
    }
    try {
        // Query untuk mendapatkan transaksi
        const [transactions] = yield db_1.default.query(`SELECT giftName, amount, description, createdAt, userId, receivedId
       FROM gift_transaction 
       WHERE userId = ? OR receivedId = ?
       ORDER BY createdAt DESC`, [userId, userId]);
        // Jika tidak ada transaksi
        if (transactions.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No transactions found" });
        }
        // Looping transaksi untuk mendapatkan nama pengguna yang terkait
        const formattedTransactions = yield Promise.all(transactions.map((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            let receiverName = null;
            // Jika transaksi keluar (out), cari nama penerima berdasarkan receivedId
            if (transaction.userId === userId) {
                const [receiver] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.receivedId]);
                receiverName = receiver.length > 0 ? receiver[0].username : "Unknown";
            }
            // Jika transaksi masuk (in), cari nama pengirim berdasarkan userId
            else if (transaction.receivedId === userId) {
                const [sender] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.userId]);
                receiverName = sender.length > 0 ? sender[0].username : "Unknown";
            }
            return {
                giftName: transaction.giftName,
                decription: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100, // Membulatkan ke dua angka desimal
                transactionType: transaction.userId === userId ? "out" : "in",
                receiverName,
            };
        })));
        res.json({ success: true, transactions: formattedTransactions });
    }
    catch (error) {
        console.error("Error filtering transactions:", error);
        res.status(500).json({
            success: false,
            message: "Error filtering transactions",
            error: error.message,
        });
    }
});
exports.filterOut = filterOut;
const filterOutById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const [user] = yield db_1.default.query("SELECT id FROM user WHERE id = ?", [id]);
    if (user.length === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    const userId = user[0].id;
    if (!userId) {
        return res
            .status(401)
            .json({ success: false, message: "User not authenticated" });
    }
    try {
        // Query untuk mendapatkan transaksi
        const [transactions] = yield db_1.default.query(`SELECT giftName, amount, description, createdAt, userId, receivedId
       FROM gift_transaction 
       WHERE userId = ? OR receivedId = ?
       ORDER BY createdAt DESC`, [userId, userId]);
        // Jika tidak ada transaksi
        if (transactions.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No transactions found" });
        }
        // Looping transaksi untuk mendapatkan nama pengguna yang terkait
        const formattedTransactions = yield Promise.all(transactions.map((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            let receiverName = null;
            // Jika transaksi keluar (out), cari nama penerima berdasarkan receivedId
            if (transaction.userId === userId) {
                const [receiver] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.receivedId]);
                receiverName = receiver.length > 0 ? receiver[0].username : "Unknown";
            }
            // Jika transaksi masuk (in), cari nama pengirim berdasarkan userId
            else if (transaction.receivedId === userId) {
                const [sender] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [transaction.userId]);
                receiverName = sender.length > 0 ? sender[0].username : "Unknown";
            }
            return {
                giftName: transaction.giftName,
                decription: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100, // Membulatkan ke dua angka desimal
                transactionType: transaction.userId === userId ? "out" : "in",
                receiverName,
            };
        })));
        res.json({ success: true, transactions: formattedTransactions });
    }
    catch (error) {
        console.error("Error filtering transactions:", error);
        res.status(500).json({
            success: false,
            message: "Error filtering transactions",
            error: error.message,
        });
    }
});
exports.filterOutById = filterOutById;
