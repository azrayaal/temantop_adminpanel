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
exports.filterByDatebyUserId = exports.filterByDate = exports.getUserTransactionsByUserId = exports.getUserTransactions = exports.getUserFilterTransactions = void 0;
const db_1 = __importDefault(require("../../../db"));
// Mendapatkan semua transaksi hadiah dari pengguna yang sedang login
const getUserFilterTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { transactionType } = req.query; // Mengambil tipe transaksi dari query parameter
    if (!userId) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    try {
        let transactions = [];
        if (transactionType === 'gift_transaction') {
            // Query untuk mendapatkan semua transaksi gift
            const [giftTransactions] = yield db_1.default.query(`SELECT gt.giftName, gt.amount, gt.description, gt.createdAt, gt.userId, gt.receivedId, 
                  sender.username AS senderName, receiver.username AS receiverName
           FROM gift_transaction gt
           LEFT JOIN user sender ON gt.userId = sender.id
           LEFT JOIN user receiver ON gt.receivedId = receiver.id
           WHERE gt.userId = ? OR gt.receivedId = ?
           ORDER BY gt.createdAt DESC`, [userId, userId]);
            // Format transaksi gift
            transactions = giftTransactions.map((transaction) => ({
                giftName: transaction.giftName,
                description: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100,
                transactionType: transaction.userId === userId ? 'out' : 'in',
                senderName: transaction.senderName || 'Unknown',
                receiverName: transaction.receiverName || 'Unknown',
            }));
        }
        else if (transactionType === 'session_transaction') {
            // Query untuk mendapatkan transaksi sesi stream
            const [sessionTransactions] = yield db_1.default.query(`SELECT st.amount, st.createdAt, st.description, st.userId, st.stream_sessionId, 
                  user.username AS senderName, agent.username AS receiverName
           FROM session_transaction st
           LEFT JOIN user ON st.userId = user.id
           LEFT JOIN user agent ON st.stream_sessionId = agent.id
           WHERE st.userId = ?
           ORDER BY st.createdAt DESC`, [userId]);
            // Format transaksi sesi stream
            transactions = sessionTransactions.map((transaction) => ({
                giftName: "Paid Stream",
                description: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100,
                transactionType: 'out',
                senderName: transaction.senderName || 'User',
                receiverName: transaction.receiverName || 'Streamer/Agent',
            }));
        }
        else if (transactionType === 'withdraw_transaction') {
            // Query untuk mendapatkan transaksi withdraw
            const [withdrawTransactions] = yield db_1.default.query(`SELECT wt.amount, wt.createdAt, wt.description,wt.userId, user.username AS senderName
           FROM withdraw wt
           LEFT JOIN user ON wt.userId = user.id
           WHERE wt.userId = ?
           ORDER BY wt.createdAt DESC`, [userId]);
            // Format transaksi withdraw
            transactions = withdrawTransactions.map((transaction) => ({
                giftName: "Withdraw",
                description: transaction.description,
                createdAt: transaction.createdAt,
                amount: Math.round(transaction.amount * 100) / 100,
                transactionType: 'out',
                senderName: transaction.senderName || 'User',
                receiverName: "Yong",
            }));
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid transaction type. Please use 'gift_transaction', 'session_transaction', or 'withdraw_transaction'.",
            });
        }
        // Jika tidak ada transaksi ditemukan
        if (transactions.length === 0) {
            return res.status(404).json({ success: true, message: "No transactions found" });
        }
        // Mengembalikan respons sukses dengan daftar transaksi yang diformat
        res.json({ success: true, transactions });
    }
    catch (error) {
        console.error("Error fetching user transactions:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user transactions",
            error: error.message,
        });
    }
});
exports.getUserFilterTransactions = getUserFilterTransactions;
const getUserTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    try {
        const [dataUser] = yield db_1.default.query("select * from user where id = ?", [userId]);
        console.log(dataUser);
        // Query untuk mendapatkan semua transaksi dari tabel `transaction`
        const [userTransactions] = yield db_1.default.query(`SELECT t.transactionType, t.transactionId, t.createdAt
         FROM transaction t
         WHERE t.userId = ?
         ORDER BY t.createdAt DESC`, [userId]);
        // Jika tidak ada transaksi ditemukan
        if (userTransactions.length === 0) {
            return res.status(404).json({ success: true, message: "No transactions found" });
        }
        // Looping untuk mendapatkan detail transaksi berdasarkan tipe
        const transactions = yield Promise.all(userTransactions.map((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            let transactionDetails = null;
            if (transaction.transactionType === 'gift_transaction') {
                const [giftTransactions] = yield db_1.default.query(`SELECT gt.giftName, gt.amount, gt.description, gt.createdAt, gt.userId, gt.receivedId, 
                      sender.username AS senderName, receiver.username AS receiverName
               FROM gift_transaction gt
               LEFT JOIN user sender ON gt.userId = sender.id
               LEFT JOIN user receiver ON gt.receivedId = receiver.id
               WHERE gt.id = ?`, [transaction.transactionId]);
                if (giftTransactions.length > 0) {
                    const giftTransaction = giftTransactions[0];
                    transactionDetails = {
                        giftName: giftTransaction.giftName,
                        description: giftTransaction.description,
                        createdAt: giftTransaction.createdAt,
                        amount: Math.round(giftTransaction.amount * 100) / 100,
                        transactionType: giftTransaction.userId === userId ? 'out' : 'in',
                        senderName: giftTransaction.senderName || 'Unknown',
                        receiverName: giftTransaction.receiverName || 'Unknown',
                    };
                }
            }
            else if (transaction.transactionType === 'session_transaction') {
                const [sessionTransactions] = yield db_1.default.query(`SELECT st.amount, st.createdAt, st.description, st.userId, st.stream_sessionId, 
                  sender.username AS senderName, receiver.username AS receiverName
            FROM session_transaction st
            LEFT JOIN user sender ON st.userId = sender.id
            LEFT JOIN user receiver ON st.stream_sessionId = receiver.id
            WHERE st.id = ?`, [transaction.transactionId]);
                if (sessionTransactions.length > 0) {
                    const sessionTransaction = sessionTransactions[0];
                    transactionDetails = {
                        giftName: "Paid Stream",
                        description: sessionTransaction.description || "Paid for watching stream",
                        createdAt: sessionTransaction.createdAt,
                        amount: Math.round(sessionTransaction.amount * 100) / 100,
                        transactionType: 'out',
                        senderName: dataUser[0].username || '',
                        receiverName: sessionTransaction.receiverName || '',
                    };
                }
            }
            else if (transaction.transactionType === 'withdraw_transaction') {
                const [withdrawTransactions] = yield db_1.default.query(`SELECT wt.amount, wt.createdAt, wt.description, wt.userId, user.username AS senderName
               FROM withdraw_transaction wt
               LEFT JOIN user ON wt.userId = user.id
               WHERE wt.id = ?`, [transaction.transactionId]);
                if (withdrawTransactions.length > 0) {
                    const withdrawTransaction = withdrawTransactions[0];
                    transactionDetails = {
                        giftName: "Withdraw",
                        description: withdrawTransaction.description || `Withdraw of Rp ${Math.round(withdrawTransaction.amount * 100) / 100}`,
                        createdAt: withdrawTransaction.createdAt,
                        amount: Math.round(withdrawTransaction.amount * 100) / 100,
                        transactionType: 'out',
                        senderName: withdrawTransaction.senderName || 'User',
                        receiverName: "Yong",
                    };
                }
            }
            return transactionDetails;
        })));
        // Filter out null values (in case some transactions did not match any detail)
        const filteredTransactions = transactions.filter(Boolean);
        // Mengembalikan respons sukses dengan daftar transaksi yang diformat
        res.json({ success: true, transactions: filteredTransactions });
    }
    catch (error) {
        console.error("Error fetching user transactions:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user transactions",
            error: error.message,
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
