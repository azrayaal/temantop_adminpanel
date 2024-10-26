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
    const currentBalance = userBalance[0].balance;
    if (currentBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
        paid: false,
      });
    }

    // Jika saldo mencukupi, buat transaksi baru di tabel session_transaction
    const [result]: [ResultSetHeader, any] = await pool.query(
      "INSERT INTO session_transaction (userId, amount, stream_sessionId, paid) VALUES (?, ?, ?, ?)",
      [userId, amount, stream_sessionId, 1]
    );
    
    // update table transaction
    const resultId = result.insertId

    await pool.query(
      "INSERT INTO transaction (userId, transactionType, transactionId) VALUES (?, ?, ?, ?, ?)",
      [userId,"session_transaction", resultId]
    )

    // Jika tidak ada baris yang terpengaruh, artinya insert gagal
    if (result.affectedRows === 0) {
      return res.status(500).json({ success: false, message: "Failed to create transaction" });
    }

    // Kurangi saldo user setelah transaksi berhasil dibuat
    const newBalanceValue = currentBalance - amount;

    // Update saldo user di database
    await pool.query(
      "UPDATE user SET balance = ? WHERE id = ?",
      [newBalanceValue, userId]
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
