import { Request, Response } from "express";
import pool from "../../../../db";
import { RowDataPacket } from "mysql2";

import * as XLSX from "xlsx"; // Pustaka untuk membuat file Excel

// Fungsi untuk mendapatkan total pemasukan dari User A
const getTotalIncomeFromUserA = async (userIdA: number): Promise<number> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT SUM(amount) AS totalIncome
     FROM gift_transaction
     WHERE receivedId = ?`,
    [userIdA]
  );

  return rows[0]?.totalIncome || 0;
};

// Fungsi untuk mendapatkan total pengeluaran dari User B
const getTotalExpensesFromUserB = async (userIdB: number): Promise<number> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT SUM(amount) AS totalExpenses
     FROM gift_transaction
     WHERE userId = ?`,
    [userIdB]
  );

  return rows[0]?.totalExpenses || 0;
};

// Controller untuk mendapatkan transaksi
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
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
      ORDER BY gt.createdAt DESC`
    );

    // Query untuk menghitung total dari semua transaksi
    const [totalResult] = await pool.query<RowDataPacket[]>(
      `SELECT SUM(gt.amount) AS totalAmount FROM gift_transaction gt`
    );
    const totalAmount = totalResult[0]?.totalAmount || 0;

    res.render("adminv2/pages/transaction/index", {
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Transactions",
      transactions: rows,
      totalAmount: totalAmount,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Controller untuk mendapatkan summary transaksi
export const getTransactionSummary = async (req: Request, res: Response) => {
  try {
    const userIdA = parseInt(req.query.userIdA as string, 10); // Ambil ID user A dari query params
    const userIdB = parseInt(req.query.userIdB as string, 10); // Ambil ID user B dari query params

    // Menghitung total pemasukan dari User A dan total pengeluaran dari User B
    const totalIncomeFromUserA = await getTotalIncomeFromUserA(userIdA);
    const totalExpensesFromUserB = await getTotalExpensesFromUserB(userIdB);

    // Render halaman dengan data
    res.render("adminv2/pages/transaction/summary", {
      title: "Transaction Summary",
      totalIncomeFromUserA: totalIncomeFromUserA.toFixed(2),
      totalExpensesFromUserB: totalExpensesFromUserB.toFixed(2),
      userIdA,
      userIdB,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Controller untuk ekspor PDF menggunakan jsPDF

// Controller untuk menghasilkan laporan transaksi sebagai Excel

export const exportTransactionsToExcel = async (
  req: Request,
  res: Response
) => {
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
    const [rows] = await pool.query<RowDataPacket[]>(query, [
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
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=transactions_report_${startDate}_to_${endDate}.xlsx`
    );

    res.send(excelBuffer); // Mengirimkan file Excel ke klien
  } catch (err: any) {
    console.log("Error occurred during Excel generation:", err);
    res.status(500).send("Internal Server Error");
  }
};
