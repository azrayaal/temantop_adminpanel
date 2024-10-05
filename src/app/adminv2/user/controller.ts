import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import https from "https";
import axios from "axios";
import { randomString } from "../agent/controller";

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

    // Membuat array user dengan balance yang diperbarui dari API
    const userBalances = await Promise.all(
      users.map(async (user: any) => {
        try {
          const { player_id } = user; // Ambil player_id dari user

          // Jika player_id ada, ambil balance dari API
          if (player_id) {
            const balanceResponse = await axios.post(
              "https://api.innovativetechnology.my.id/api/v1/str/balance",
              { player_id: player_id }, // Kirimkan player_id
              {
                headers: {
                  "Content-Type": "application/json",
                },
                httpsAgent: agent, // Menggunakan agent SSL
                timeout: 20000, // Timeout selama 20 detik
              }
            );

            // Ambil balance dari response API
            const balance = balanceResponse.data?.data?.data || 0; // Default balance 0 jika tidak ada data

            // Return user dengan balance yang diperbarui
            return {
              ...user,
              balance,
            };
          } else {
            // Jika tidak ada player_id, kembalikan balance 0
            return {
              ...user,
              balance: 0,
            };
          }
        } catch (error: any) {
          console.error(
            `Error fetching balance for player_id ${user.player_id}:`,
            error.message || error
          );

          // Jika ada error API, kembalikan balance 0
          return {
            ...user,
            balance: 0,
          };
        }
      })
    );

    // Render halaman dengan user yang sudah di-update balance-nya
    res.render("adminv2/pages/user/index", {
      name: req.session.user?.username,
      email: req.session.user?.email,
      user: userBalances, // Kirimkan data user dengan balance yang diperbarui
      alert,
      title: "User page - Teman Top",
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
      title: "User page - Teman Top",
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
      title: "User page - Teman Top",
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
    // Fetch user information (name)
    const [userRows] = await pool.query<RowDataPacket[]>(
      `SELECT username, player_id FROM user WHERE id = ?`,
      [id]
    );

    if (userRows.length === 0) {
      return res.status(404).send("User not found");
    }

    const username = userRows[0].username;
    const player_id = userRows[0].player_id;

    // Fetch total income and total spend
    const [totalIncomeRows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        SUM(amount) AS totalIncome 
      FROM gift_transaction 
      WHERE receivedId = ?`,
      [id]
    );

    const [totalSpendRows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        SUM(amount) AS totalSpend 
      FROM gift_transaction 
      WHERE userId = ?`,
      [id]
    );

    // Get transaction count for pagination
    const [countRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total FROM gift_transaction WHERE userId = ? OR receivedId = ?`,
      [id, id]
    );
    const totalTransactions = countRows[0].total;

    // Fetch 10 latest transactions based on page
    const [transactionRows] = await pool.query<RowDataPacket[]>(
      `SELECT 
      userId,
      receivedId,
        giftName, 
        amount, 
        bet_id, 
        description, 
        createdAt 
      FROM gift_transaction 
      WHERE userId = ? OR receivedId = ? 
      ORDER BY createdAt DESC 
      LIMIT ? OFFSET ?`,
      [id, id, limit, offset]
    );

    const totalIncome = totalIncomeRows[0].totalIncome || 0;
    const totalSpend = totalSpendRows[0].totalSpend || 0;
    const totalPages = Math.ceil(totalTransactions / limit);

    const transactionsWithAmounts = transactionRows.map((transaction) => {
      const amount = transaction.amount;
      // Inisialisasi amountSpend dan amountIncome
      let amountSpend = 0;
      let amountIncome = 0;

      if (transaction.userId === parseInt(id)) {
        // Jika userId sama dengan id, maka ini adalah pengeluaran
        amountSpend = amount || 0; // Jika amount tidak ada, set ke 0
      } else if (transaction.receivedId === parseInt(id)) {
        // Jika receivedId sama dengan id, maka ini adalah pendapatan
        amountIncome = amount || 0; // Jika amount tidak ada, set ke 0
      }

      return {
        ...transaction,
        amountSpend,
        amountIncome,
      };
    });
    // Log transactions with amounts for debugging
    console.log(id);
    console.log(transactionRows);
    console.log("Transactions With Amounts:", transactionsWithAmounts);

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
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
