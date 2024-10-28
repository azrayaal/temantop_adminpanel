import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export const index = async (req: Request, res: Response) => {
 try {
  const [Bank] = await pool.query("SELECT * FROM bank");
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };
  res.render("adminv2/pages/bank/index", {
    alert,
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
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    const [bank] = await pool.query("SELECT * FROM bank");
    // Render halaman dengan data bank
    res.render("adminv2/pages/bank/create", {
      name: req.session.user?.name,
      email: req.session.user?.email,
      bank,
      title: "Halaman create bank",
      alert,
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

    // Check if required fields are filled
    if (!name || !bank_code) {
      req.flash("alertMessage", "Please fill in all fields");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/bank/create");
    }

    // Check if bank name already exists
    const [checkBank] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM bank WHERE name = ?",
      [name]  
    );

    if (checkBank.length > 0) {
      req.flash("alertMessage", "Bank already exists");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/bank/create");
    }

    // Check if bank code already exists
    const [checkBankCode] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM bank WHERE bank_code = ?",
      [bank_code]
    );

    if (checkBankCode.length > 0) {
      req.flash("alertMessage", "Bank code already exists");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/bank/create");
    }

    // Insert new bank into the database
    await pool.query(
      "INSERT INTO bank (name, bank_code) VALUES (?, ?)",
      [name, bank_code]
    );

    req.flash("alertMessage", "Bank successfully added");
    req.flash("alertStatus", "success");
    res.redirect("/admin/bank");

  } catch (err) {
    req.flash("alertMessage", "An error occurred while adding the bank");
    req.flash("alertStatus", "danger");
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
      req.flash("alertMessage", "Bank successfully deleted");
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
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
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
      alert,
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

    const [checkName] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM bank WHERE name = ? AND id != ?",
      [name, id]
    );

    const [checkBankCode] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM bank WHERE bank_code = ? AND id != ?",
      [bank_code, id]
    )

    if (checkName.length > 0) {
      req.flash("alertMessage", "Bank name already exists");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/bank/edit/" + id);
    }

    if (checkBankCode.length > 0) {
      req.flash("alertMessage", "Bank code already exists");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/bank/edit/" + id);
    }

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
