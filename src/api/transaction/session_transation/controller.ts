import { Request, Response } from "express";
import pool from "../../../../db";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";

// Mendapatkan semua transaksi hadiah dari pengguna yang sedang login


export const getSessionTransactions = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { stream_sessionId } = req.body;

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }

  try {
    // Query untuk mendapatkan semua transaksi milik pengguna yang sedang login
    const [transactions]: [RowDataPacket[], any] = await pool.query(
      `SELECT *
       FROM session_transaction 
       WHERE userId = ? AND stream_sessionId = ?
       ORDER BY createdAt DESC`,
      [userId, stream_sessionId]
    );

    // Jika tidak ada transaksi
    if (transactions.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No transactions found",
        paid: false,
      });
    }

    // Ambil transaksi terbaru (karena diurutkan DESC)
    const latestTransaction = transactions[0];

    // Jika transaksi sudah dibayar, kirimkan paid: true, jika belum, paid: false
    const isPaid = latestTransaction.paid === 1;

    res.json({
      success: true,
      transactions: latestTransaction,
      paid: isPaid,
    });
  } catch (error: any) {
    console.error("Error fetching user transactions:", error); // Log error untuk debugging
    res.status(500).json({
      success: false,
      message: "Error fetching user transactions",
      error: error.message, // Mengembalikan pesan error yang jelas
    });
  }
};

export const createSessionTransaction = async (req: Request, res: Response) => {
  try {
    const { amount, stream_sessionId } = req.body;
    const userId = req.user?.id;

    // Pastikan userId tersedia
    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    // Periksa apakah user sudah melakukan pembayaran untuk stream_sessionId yang sama
    const [existingTransaction]: [RowDataPacket[], any] = await pool.query(
      "SELECT * FROM session_transaction WHERE userId = ? AND stream_sessionId = ? AND paid = 1",
      [userId, stream_sessionId]
    );

    // Jika ada transaksi yang ditemukan, artinya sudah dibayar
    if (existingTransaction.length > 0) {
      return res.status(400).json({
        success: false,
        paid: true,
        message: "You have already paid for this session.",
      });
    }

    // Ambil saldo terbaru dari user sebelum melakukan transaksi
    const [userBalance]: [RowDataPacket[], any] = await pool.query(
      "SELECT balance FROM user WHERE id = ?",
      [userId]
    );

    // Pastikan user ditemukan
    if (userBalance.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Periksa apakah saldo cukup
    const currentBalance = parseFloat(userBalance[0].balance);
    const amountToDeduct = parseFloat(amount);
    if (currentBalance < amountToDeduct) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
        paid: false,
      });
    }

    // Jika saldo mencukupi, buat transaksi baru di tabel session_transaction
    const [result]: [ResultSetHeader, any] = await pool.query(
      "INSERT INTO session_transaction (userId, amount, stream_sessionId, paid, description) VALUES (?, ?, ?, ?, ?)",
      [userId, amountToDeduct, stream_sessionId, 1, "Paid for stream session"]
    );

    // Ambil `insertId` dari transaksi yang baru saja dibuat
    const resultId = result.insertId;

    // Masukkan ke dalam tabel `transaction`
    await pool.query(
      "INSERT INTO transaction (userId, transactionType, transactionId) VALUES (?, ?, ?)",
      [userId, "session_transaction", resultId]
    );

    // Jika tidak ada baris yang terpengaruh, artinya insert gagal
    if (result.affectedRows === 0) {
      return res.status(500).json({ success: false, message: "Failed to create transaction" });
    }

    // Kurangi saldo user setelah transaksi berhasil dibuat
    const newBalanceValue = parseFloat((currentBalance - amountToDeduct).toFixed(2));

    // Update saldo user(viewer) di database
    await pool.query(
      "UPDATE user SET balance = ? WHERE id = ?",
      [newBalanceValue, userId]
    );

    // update saldo user (streamer) di database
    const [streamerId] = await pool.query<RowDataPacket[]>(
      "SELECT * from stream_session WHERE id = ?",
      [stream_sessionId]
    );

    console.log('streamerId:', streamerId);

    const [dataStreamer]: [RowDataPacket[], any] = await pool.query(
      "SELECT * FROM user WHERE id = ?",
      [streamerId[0].userId]
    );
console.log('dataStremer', dataStreamer[0]);
    const currentBalanceStreamer = parseFloat(dataStreamer[0].balance);
const amountToAdd = parseFloat(amount);
const newBalanceValueStreamer = parseFloat((currentBalanceStreamer + amountToAdd * (50 / 100)).toFixed(2));

// Log untuk validasi data sebelum operasi update
console.log("Updating balance for streamer userId:", dataStreamer[0].id);
console.log("Expected new balance:", newBalanceValueStreamer);

await pool.query<ResultSetHeader[]>(
  "UPDATE user SET balance = ? WHERE id = ?",
  [newBalanceValueStreamer, dataStreamer[0].id]
);

    // Kembalikan respon sukses jika transaksi berhasil dan saldo diperbarui
    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      paid: true,
    });
  } catch (error: any) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating transaction",
      error: error.message,
    });
  }
};


