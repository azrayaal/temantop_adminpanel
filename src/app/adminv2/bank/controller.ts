import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export const index = async (req: Request, res: Response) => {
 try {
  const [Bank] = await pool.query("SELECT * FROM bank");
  res.render("adminv2/pages/bank/index", {
   name: req.session.user?.name,
   email: req.session.user?.email,
   Bank,
   title: "Halaman Bank",
  });
 } catch (error) {
  req.flash("alertMessage", `${error}`);
  req.flash("alertStatus", "danger");
  res.redirect("/admin/dashboard");
 }
};


export const indexCreate = async (req: Request, res: Response) => {
  try {
    const [bank] = await pool.query("SELECT * FROM bank");
    // Render halaman dengan data bank
    res.render("adminv2/pages/bank/create", {
      name: req.session.user?.name,
      email: req.session.user?.email,
      bank,
      title: "Halaman create bank",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman bank
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/bank");
  }
};

export const actionCreate = async (req: Request, res: Response) => {
  try {
    const { name, bank_code } = req.body;
    console.log(req.body); 

    if (!name || !bank_code) {
      return res.status(400).send("Missing required fields");
    }

    const [rows] = await pool.query(
      "INSERT INTO bank (name, bank_code) VALUES ( ?, ?)",
      [name, bank_code]
    );
    res.redirect("/admin/bank");
  } catch (err) {
    res.status(500).send(err);
  }
};


export const actionDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM bank WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      req.flash("alertMessage", "bank not found");
      req.flash("alertStatus", "danger");
    } else {
      req.flash("alertMessage", "Berhasil hapus bank");
      req.flash("alertStatus", "success");
    }

    res.redirect("/admin/bank");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/bank");
  }
};

export const indexEdit = async (req: Request, res: Response) => {
  try {
    // Ambil ID dari parameter request
    const { id } = req.params;
    // Ambil data dari tabel bank
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM bank WHERE id = ?", [
      id,
    ]);

    // Periksa apakah agen ditemukan
    if (rows.length === 0) {
      req.flash("alertMessage", "bank not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/bank");
    }

    const bank = rows[0];

    // Render halaman dengan data bank
    res.render("adminv2/pages/bank/edit", {
      bank,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman Edit bank",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman bank
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/bank");
  }
};

// Handler untuk menangani pembaruan data agen
export const actionEdit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, bank_code } = req.body;

    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE bank SET name = ?, bank_code = ? WHERE id = ?",
      [name, bank_code, id]
    );

    if (result.affectedRows === 0) {
      req.flash("alertMessage", "bank not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/bank");
    }

    req.flash("alertMessage", "Berhasil mengedit bank");
    req.flash("alertStatus", "success");
    res.redirect("/admin/bank");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/bank");
  }
};
