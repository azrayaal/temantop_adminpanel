import { Request, Response } from "express";
import dotenv from "dotenv";
import pool from "../../../db";
import { RowDataPacket } from "mysql2";
import { formatRupiah } from "../../middleware/auth";

dotenv.config();

export const requestWithdraw = async (req: Request, res: Response) => {
  const connection = await pool.getConnection(); // Get a connection from the pool

  try {
    const { amount, account_number, account_name, bankId } = req.body;

    if (!amount || !account_number || !bankId || !account_name) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Check if the bank exists
    const [bank] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM bank WHERE id = ?",
      [bankId]
    );

    if (bank.length === 0) {
      return res.json({ success: false, message: "Bank not found" });
    }

    // Begin transaction
    await connection.beginTransaction();

    // Insert withdrawal request
    const [withdrawResult] = await connection.query<RowDataPacket[]>(
      "INSERT INTO withdraw (amount, account_number, bankId, account_name, userId) VALUES (?, ?, ?, ?, ?)",
      [amount, account_number, bankId, account_name, req.user?.id]
    );

    // Insert notification
    await connection.query<RowDataPacket[]>(
      "INSERT INTO notifications (title, message, userId, status) VALUES (?, ?, ?, ?)",
      [
        "Withdrawal Request Under Review",
        `Your withdrawal request of Rp ${formatRupiah(parseFloat(amount))} has been received and is currently under review. You will be notified once it has been processed.`,
        req.user?.id,
        "pending",
      ]
    );

    // Commit transaction
    await connection.commit();

    res.json({ 
      success: true, 
      message: "Withdraw request successful", 
      data: {
        // withdrawId: withdrawResult.insertId,
        amount,
        account_number,
        account_name,
        bankId,
      } 
    });

  } catch (error) {
    // Rollback transaction in case of an error
    if (connection) await connection.rollback();

    console.error("Withdraw request error:", error);
    res.json({ success: false, message: "Withdraw request failed" });
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
};

export const getRequestWithdraw = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM withdraw WHERE userId = ?",
      [req.user?.id]
    );

    const [bank] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM bank WHERE id = ?",
      [rows[0].bankId]  
    )

 
    const data = rows.map((row) => ({
      id: row.id,
      amount: row.amount,
      account_number: row.account_number,
      bankId: row.bankId,
      account_name: row.account_name,
      bankName: bank[0].name,
      status: row.status,
    }));

    res.json({ success: true, data: data });
  } catch (error) {
    res.json({ success: false, message: "Withdraw request failed" });
    console.log(error)
  }
};
