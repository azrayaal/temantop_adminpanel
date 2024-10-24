import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export const index = async (req: Request, res: Response) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // Fetch data with JOIN to get bank names directly
    const [withdrawWithDetails] = await pool.query<RowDataPacket[]>(
      `SELECT w.*, b.name AS bank_name, u.username AS username, u.player_id AS player_id
   FROM withdraw w
   LEFT JOIN bank b ON w.bankId = b.id
   LEFT JOIN user u ON w.userId = u.id`
    );
    
    res.render("adminv2/pages/withdraw/index", {
      alert,
      withdraw: withdrawWithDetails,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman withdraw",
    });
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/withdraw");
  }
};

export const indexDetail = async (req: Request, res: Response) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // Fetch data with JOIN to get bank names directly
    const [withdrawWithDetails] = await pool.query<RowDataPacket[]>(
      `SELECT w.*, b.name AS bank_name, u.username AS username, u.player_id AS player_id
   FROM withdraw w
   LEFT JOIN bank b ON w.bankId = b.id
   LEFT JOIN user u ON w.userId = u.id
   WHERE w.id = ?`,
      [req.params.id]
    );

    console.log(withdrawWithDetails); // Check output for debugging
    
    res.render("adminv2/pages/withdraw/detail", {
      alert,
      withdraw: withdrawWithDetails[0],
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman withdraw",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman voucher
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/withdraw");
  }
};


export const actionReject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [dataWithdraw] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM withdraw WHERE id = ?",
      [id]
    );

    // Check if the withdrawal exists
    if (!dataWithdraw.length) {
      req.flash("alertMessage", "Withdrawal not found.");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/withdraw");
    }

    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE withdraw SET status = 'rejected' WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 1) {
      req.flash("alertMessage", "Withdrawal rejected successfully.");
      req.flash("alertStatus", "success");
    } else {
      req.flash("alertMessage", "Failed to reject withdrawal.");
      req.flash("alertStatus", "danger");
    }

    res.redirect("/admin/withdraw");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/withdraw");
  }
};


export const actionAccept = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [dataWithdraw] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM withdraw WHERE id = ?",
      [id]
    );

    // Check if the withdrawal exists
    if (!dataWithdraw.length) {
      req.flash("alertMessage", "Withdrawal not found.");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/withdraw");
    }

    // Approve the withdrawal
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE withdraw SET status = 'approved' WHERE id = ?",
      [id]
    );

    // Update the user's balance
    if (result.affectedRows === 1) {
      await pool.query<ResultSetHeader>(
        "UPDATE user SET balance = balance - ? WHERE id = ?",
        [dataWithdraw[0].amount, dataWithdraw[0].userId]
      );

      req.flash("alertMessage", "Withdrawal approved successfully.");
      req.flash("alertStatus", "success");
    } else {
      req.flash("alertMessage", "Failed to approve withdrawal.");
      req.flash("alertStatus", "danger");
    }

    res.redirect("/admin/withdraw");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/withdraw");
  }
};
