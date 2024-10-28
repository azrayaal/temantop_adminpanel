import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { formatRupiah } from "../../../middleware/auth";


export const index = async (req: Request, res: Response) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // Pagination variables
    const page = parseInt(req.query.page as string) || 1; // Current page
    const limit = 15; // Number of records per page
    const offset = (page - 1) * limit; // Calculate offset

    // Fetch paginated data with JOIN to get bank names directly
    const [withdrawWithDetails] = await pool.query<RowDataPacket[]>(
      `SELECT w.*, b.name AS bank_name, u.username AS username, u.player_id AS player_id
       FROM withdraw w
       LEFT JOIN bank b ON w.bankId = b.id
       LEFT JOIN user u ON w.userId = u.id
       ORDER BY w.id DESC
       LIMIT ? OFFSET ?`, [limit, offset]
    );

    // Fetch total record count to calculate total pages
    const [totalResult] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS totalWithdrawals FROM withdraw`
    );
    const totalWithdrawals = totalResult[0]?.totalWithdrawals || 0;
    const totalPages = Math.ceil(totalWithdrawals / limit);
    // Format amounts
    const withdrawFormatted = withdrawWithDetails.map((withdraw: any) => {
      return {
        ...withdraw,
        amount: formatRupiah(parseFloat(withdraw.amount)),
      };
    });

    console.log(withdrawFormatted)
    // Render view with pagination data
    res.render("adminv2/pages/withdraw/index", {
      alert,
      withdraw: withdrawFormatted,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman withdraw",
      currentPage: page,
      totalPages,
    });
  } catch (err: any) {
    console.error("Error in index route:", err.message || err);
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

    const formattedWithdraw = withdrawWithDetails.map((withdraw: any) => {
      return {
        ...withdraw,
        formattedAmount: formatRupiah(parseFloat(withdraw.amount)),
      };
    });

    console.log(formattedWithdraw)
    
    res.render("adminv2/pages/withdraw/detail", {
      alert,
      withdraw: formattedWithdraw[0],
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
      // Insert a rejection notification
      await pool.query<ResultSetHeader>(
        "INSERT INTO notifications (userId, title, message, status) VALUES (?, ?, ?, ?)",
        [
          dataWithdraw[0].userId,
          "Withdrawal Request Rejected",
          `Your withdrawal request of ${formatRupiah(parseFloat(dataWithdraw[0].amount))} has been rejected.`,
          "failed",
        ]
      );

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

    await pool.query<ResultSetHeader>(
      "INSERT INTO withdraw_transaction (userId, amount, description, status) VALUES (?, ?, ?, ?)",
      [id, dataWithdraw[0].amount, "withdrawal approved for " + dataWithdraw[0].amount +"by admin", "approved"]
    )

    // Only proceed if the withdrawal status was successfully updated
    if (result.affectedRows === 1) {
      // Update the user's balance
      await pool.query<ResultSetHeader>(
        "UPDATE user SET balance = balance - ? WHERE id = ?",
        [dataWithdraw[0].amount, dataWithdraw[0].userId]
      );

      // Insert a success notification
      await pool.query<ResultSetHeader>(
        "INSERT INTO notifications (userId, title, message, status) VALUES (?, ?, ?, ?)",
        [
          dataWithdraw[0].userId,
          "Withdrawal Request Approved",
          `Your withdrawal of ${formatRupiah(parseFloat(dataWithdraw[0].amount))} has been successfully approved.`,
          "success",
        ]
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