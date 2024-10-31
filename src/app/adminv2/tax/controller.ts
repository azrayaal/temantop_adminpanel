import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { formatRupiah } from "../../../middleware/auth";

interface Tax extends RowDataPacket {
  id: number;
  type: string;
  tax: number;
}

export const indexWithdraw = async (req: Request, res: Response) => {
  try {
    // Ambil data dari tabel gift
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const [tax] = await pool.query<Tax[]>("SELECT * FROM tax where type = ?", ["withdraw"]);
    // Render halaman dengan data gift

    res.render("adminv2/pages/tax/indexWithdraw", {
      alert,
      tax,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Tax Withdraw Page",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman gift
    console.error("Error in index route:", err.message || err);
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/dashboard");
  }
};
export const indexSession = async (req: Request, res: Response) => {
  try {
    // Ambil data dari tabel gift
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const [tax] = await pool.query<Tax[]>("SELECT * FROM tax where type = ?", ["session"]);
    // Render halaman dengan data gift

    res.render("adminv2/pages/tax/indexSession", {
      alert,
      tax,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Tax Session Page",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman gift
    console.error("Error in index route:", err.message || err);
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/dashboard");
  }
};
export const indexGift = async (req: Request, res: Response) => {
  try {
    // Ambil data dari tabel gift
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const [tax] = await pool.query<Tax[]>("SELECT * FROM tax where type = ?", ["gift"]);
    // Render halaman dengan data gift

    res.render("adminv2/pages/tax/indexGift", {
      alert,
      tax,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Tax Gift Page",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman gift
    console.error("Error in index route:", err.message || err);
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/dashboard");
  }
};

export const indexEdit = async (req: Request, res: Response) => {
  try {
    
    // Ambil ID dari parameter request
    const { id } = req.params;
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // Ambil data dari tabel gift
    const [rows] = await pool.query<Tax[]>("SELECT * FROM gift WHERE id = ?", [
      id,
    ]);

    // Periksa apakah agen ditemukan
    if (rows.length === 0) {
      req.flash("alertMessage", "gift not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/dashboard");
    }

    const gift = rows[0];

    // Render halaman dengan data gift
    res.render("adminv2/pages/tax/edit", {
      gift,
      alert,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman Edit tax",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman gift
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/dashboard");
  }
};

export const actionEdit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tax } = req.body; // Mengambil nilai tax dari body request

    // Memeriksa data tax yang sudah ada berdasarkan ID
    const [existingTax] = await pool.query<Tax[]>("SELECT * FROM tax WHERE id = ?", [id]);

    if (existingTax.length === 0) {
      req.flash("alertMessage", "Tax not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/dashboard");
    }

    // Ambil data tax yang ada
    const currentTax = existingTax[0];

    // Periksa apakah nilai tax perlu diperbarui
    if (tax && parseFloat(tax) !== currentTax.tax) {
      // Lakukan pembaruan pada tabel tax jika ada perubahan nilai
      await pool.query("UPDATE tax SET tax = ? WHERE id = ?", [tax, id]);

      req.flash("alertMessage", "Successfully updated the tax");
      req.flash("alertStatus", "success");
    } else {
      req.flash("alertMessage", "No changes detected in tax");
      req.flash("alertStatus", "info");
    }

    // Redirect kembali ke halaman tax
    res.redirect("/admin/dashboard");
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman dashboard
    console.error("Error in actionEdit route:", err.message || err);
    req.flash("alertMessage", `Error: ${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/dashboard");
  }
};
