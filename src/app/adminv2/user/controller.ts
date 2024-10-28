import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import https from "https";
import axios from "axios";
import { randomString } from "../agent/controller";
import { formatRupiah } from "../../../middleware/auth";

interface User extends RowDataPacket {
  id: number;
  playerId: number;
  username: string;
  balance: number;
  create_time: Date;
}

export const index = async (req: Request, res: Response) => {
  try {
    // Ambil data alert dari flash
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // Ambil semua user yang memiliki stream = 0
    const [users] = await pool.query<ResultSetHeader[]>(
      "SELECT * FROM user WHERE stream = 0"
    );

    // Membuat https agent untuk bypass SSL verification
    const agent = new https.Agent({
      rejectUnauthorized: false, // Abaikan verifikasi SSL (jika perlu)
    });

    const userFormatted = users.map((user: any) => {
      return {
        ...user,
        balance: formatRupiah(parseFloat(user.balance)),
      };
    });

    // Render halaman dengan user yang sudah di-update balance-nya
    res.render("adminv2/pages/user/index", {
      name: req.session.user?.username,
      email: req.session.user?.email,
      user: userFormatted, // Kirimkan data user dengan balance yang diperbarui
      alert,
      title: "User page - Yong",
    });
  } catch (err: any) {
    console.error("Error in index route:", err.message || err);
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/dashboard");
  }
};

export const indexCreate = async (req: Request, res: Response) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    // Render halaman dengan data user
    res.render("adminv2/pages/user/create", {
      name: req.session.user?.username,
      email: req.session.user?.email,
      alert,
      title: "User page - Yong",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman user
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/user");
  }
};

export const actionCreate = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const saltRounds = 10;
    const profilePicture =
      req.file?.filename ||
      "avatardefault1.jpeg" ||
      "avatardefault2.jpeg" ||
      "avatardefault3.jpeg" ||
      "avatardefault4.jpeg" ||
      "avatardefault5.jpeg" ||
      "avatardefault6.jpeg" ||
      "avatardefault7.jpeg" ||
      "avatardefault8.jpeg" ||
      "avatardefault9.jpeg";
    const player_id = randomString(8);
    const [checkEmail] = await pool.query<User[]>(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );
    if (checkEmail.length > 0) {
      req.flash("alertMessage", "Email already exists");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/admin/user/create");
    }
    const [checkUsername] = await pool.query<User[]>(
      "SELECT * FROM user WHERE username = ?",
      [username]
    );

    if (checkUsername.length > 0) {
      req.flash("alertMessage", "Username already exists");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/user/create");
    }
    // Hash the password
    const passwordBrcypted = await bcrypt.hash(password, saltRounds);
    await pool.query(
      "INSERT INTO user (email, username, password, profilePicture, player_id, channelName) VALUES (?, ?, ?, ?, ?, ?);",
      [email, username, passwordBrcypted, profilePicture, player_id, username]
    );

    res.redirect("/admin/user");
  } catch (err: any) {
    res.status(500).send(err.message);
    console.log(err);
  }
};

export const actionDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM user WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      req.flash("alertMessage", "user not found");
      req.flash("alertStatus", "danger");
    } else {
      req.flash("alertMessage", "Berhasil hapus user");
      req.flash("alertStatus", "success");
    }

    res.redirect("/admin/user");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/user");
  }
};

export const indexEdit = async (req: Request, res: Response) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    // Ambil ID dari parameter request
    const { id } = req.params;

    // Ambil data dari tabel user
    const [rows] = await pool.query<User[]>("SELECT * FROM user WHERE id = ?", [
      id,
    ]);

    // Periksa apakah agen ditemukan
    if (rows.length === 0) {
      req.flash("alertMessage", "user not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/admin/user");
    }

    const user = rows[0];

    // Render halaman dengan data user
    res.render("adminv2/pages/user/edit", {
      name: req.session.user?.username,
      email: req.session.user?.email,
      user,
      alert,
      title: "User page - Yong",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman user
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/admin/user");
  }
};

// Handler untuk menangani pembaruan data agen
export const actionEdit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, channelName } = req.body;
    const passwordBrcypted = await bcrypt.hash(password, 10);
    const profilePicture = req.file?.filename || "";

    const [checkUsername] = await pool.query<User[]>(
      "SELECT * FROM user WHERE username = ?",
      [username]
    );
    if (checkUsername.length > 0) {
      req.flash("alertMessage", "Username already exists");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/user/edit");
    }

    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE user SET  username = ?, profilePicture = ?, channelName = ?, password = ? WHERE id = ?",
      [username, profilePicture, channelName, passwordBrcypted, id]
    );

    if (result.affectedRows === 0) {
      req.flash("alertMessage", "user not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/user");
    }

    req.flash("alertMessage", "Berhasil mengedit user");
    req.flash("alertStatus", "success");
    res.redirect("/admin/user");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/user");
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE user SET status = !status WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      req.flash("alertMessage", "user not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/admin/user");
    }
    req.flash("alertMessage", "Berhasil mengubah status user");
    req.flash("alertStatus", "success");
    res.redirect("/admin/admin/user");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/admin/user");
  }
};

export const getUserTransactions = async (req: Request, res: Response) => {
  const { id } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    // Fetch user information (name, player_id, and stream status)
    const [userRows] = await pool.query<RowDataPacket[]>(
      `SELECT username, player_id, stream FROM user WHERE id = ?`,
      [id]
    );

    if (userRows.length === 0) {
      return res.status(404).send("User not found");
    }

    const username = userRows[0].username;
    const player_id = userRows[0].player_id;
    const isStreamer = userRows[0].stream === 1;

    // Calculate total income from gift transactions, topups, and session transactions
    const [totalIncomeRows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        COALESCE(SUM(gt.amount), 0) AS giftIncome,
        COALESCE(SUM(tt.amount), 0) AS topupIncome
      FROM gift_transaction gt
      LEFT JOIN topup_transaction tt ON tt.userId = ?
      WHERE gt.receivedId = ?`,
      [id, id]
    );

    console.log('totalIncomeRows', totalIncomeRows);

    // Adjust session transaction query if the user is a streamer
    let sessionIncomeQuery;
    let sessionIncomeParams;

    if (isStreamer) {
      sessionIncomeQuery = `SELECT COALESCE(SUM(st.amount), 0) AS sessionIncome 
                            FROM session_transaction st
                            JOIN stream_session ss ON ss.id = st.stream_sessionId
                            WHERE ss.userId = ? AND st.paid = 1`;
      sessionIncomeParams = [id];
    } else {
      sessionIncomeQuery = `SELECT COALESCE(SUM(st.amount), 0) AS sessionIncome 
                            FROM session_transaction st 
                            WHERE st.userId = ? AND st.paid = 1`;
      sessionIncomeParams = [id];
    }

    const [sessionIncomeRows] = await pool.query<RowDataPacket[]>(sessionIncomeQuery, sessionIncomeParams);

    // Calculate total spend from gift transactions and withdraw transactions
    const [totalSpendRows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        COALESCE(SUM(gt.amount), 0) AS giftSpend,
        COALESCE(SUM(wt.amount), 0) AS withdrawSpend
      FROM gift_transaction gt
      LEFT JOIN withdraw_transaction wt ON wt.userId = ?
      WHERE gt.userId = ?`,
      [id, id]
    );

    // Sum all income and spend sources
    const totalIncome = formatRupiah(
      parseFloat(totalIncomeRows[0].giftIncome) +
      parseFloat(totalIncomeRows[0].topupIncome) +
      parseFloat(sessionIncomeRows[0].sessionIncome)
    );

    console.log('totalIncome', totalIncome);

    const totalSpend = formatRupiah(
      parseFloat(totalSpendRows[0].giftSpend) +
      parseFloat(totalSpendRows[0].withdrawSpend)
    );

    // Get transaction count for pagination
    const [countRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total FROM gift_transaction WHERE userId = ? OR receivedId = ?`,
      [id, id]
    );
    const totalTransactions = countRows[0].total;
    const totalPages = Math.ceil(totalTransactions / limit);

    // Fetch transactions across all relevant tables for detailed view
    const [transactionRows] = await pool.query<RowDataPacket[]>(
      `SELECT 
          'gift' AS transactionType, id AS transactionId, userId, receivedId, giftName AS description, amount, createdAt 
        FROM gift_transaction 
        WHERE userId = ? OR receivedId = ? 
        UNION ALL
        SELECT 
          'topup' AS transactionType, id AS transactionId, userId, NULL AS receivedId, description, amount, createdAt 
        FROM topup_transaction 
        WHERE userId = ? 
        UNION ALL
        SELECT 
          'withdraw' AS transactionType, id AS transactionId, userId, NULL AS receivedId, description, amount, createdAt 
        FROM withdraw_transaction 
        WHERE userId = ? 
        ${isStreamer ? `
        UNION ALL
        SELECT 
          'session' AS transactionType, st.id AS transactionId, ss.userId, NULL AS receivedId, CONCAT('Session payment: ', st.stream_sessionId) AS description, st.amount, st.createdAt 
        FROM session_transaction st
        JOIN stream_session ss ON ss.id = st.stream_sessionId
        WHERE ss.userId = ? AND st.paid = 1` : `
        UNION ALL
        SELECT 
          'session' AS transactionType, id AS transactionId, userId, NULL AS receivedId, CONCAT('Session payment: ', stream_sessionId) AS description, amount, createdAt 
        FROM session_transaction 
        WHERE userId = ? AND paid = 1`}
        ORDER BY createdAt DESC 
        LIMIT ? OFFSET ?`,
      isStreamer ? [id, id, id, id, id, limit, offset] : [id, id, id, id, id, limit, offset]
    );

    // Format transaction rows to include amountSpend and amountIncome fields
    const transactionsWithAmounts = transactionRows.map((transaction) => {
      const amount = parseFloat(transaction.amount) || 0;

      let amountSpend = 'Rp 0,00';
      let amountIncome = 'Rp 0,00';

      if (transaction.transactionType === 'gift' && transaction.userId === parseInt(id)) {
        amountSpend = formatRupiah(amount);
      } else if (transaction.transactionType === 'gift' && transaction.receivedId === parseInt(id)) {
        amountIncome = formatRupiah(amount);
      } else if (transaction.transactionType === 'topup') {
        amountIncome = formatRupiah(amount);
      } else if (transaction.transactionType === 'withdraw') {
        amountSpend = formatRupiah(amount);
      } else if (transaction.transactionType === 'session') {
        amountIncome = formatRupiah(amount);
      }

      return {
        ...transaction,
        amountSpend,
        amountIncome,
        amountFormatted: formatRupiah(amount),
      };
    });

    console.log('transactionsWithAmounts', transactionsWithAmounts);

    res.render("adminv2/pages/user/report", {
      title: "Transaction Report",
      name: req.session.user?.username,
      email: req.session.user?.email,
      username,
      player_id,
      totalIncome,
      totalSpend,
      transactions: transactionsWithAmounts,
      currentPage: page,
      totalPages,
      userId: id // Passing userId as a query parameter
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

