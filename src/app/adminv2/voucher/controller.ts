import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { format, parse } from "path";
import { formatRupiah } from "../../../middleware/auth";

const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months start at 0!
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};

interface voucher extends RowDataPacket {
  id: number;
  voucherCode: string;
  voucherName: string;
  create_time: Date;
}

export const index = async (req: Request, res: Response) => {
  try {

    const page = parseInt(req.query.page as string) || 1;
    const limit = 15;
    const offset = (page - 1) * limit;

    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    const [voucher] = await pool.query<voucher[]>(
      `SELECT * FROM voucher ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const formattedVouchers = voucher.map((v: any) => ({
      ...v,
      formattedPrice: formatRupiah(parseFloat(v.price)),
    }));

    const [totalResult] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) AS totalVouchers FROM voucher`);
    const totalVouchers = totalResult[0]?.totalVouchers || 0;
    const totalPages = Math.ceil(totalVouchers / limit);

    res.render("adminv2/pages/voucher/index", {
      voucher: formattedVouchers,
      alert,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman voucher",
      currentPage: page,
      totalPages,
    });
  } catch (err: any) {
    console.error("Error in index route:", err.message || err);
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/voucher");
  }
};

export const indexCreate = async (req: Request, res: Response) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    const [genre] = await pool.query("SELECT * FROM genre");
    // Render halaman dengan data voucher
    res.render("adminv2/pages/voucher/create", {
      alert,
      name: req.session.user?.name,
      email: req.session.user?.email,
      genre,
      title: "Halaman create voucher",
    });

  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman voucher
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/voucher");
  }
};


export const actionCreate = async (req: Request, res: Response) => {
  try {
    const { name, price, unique_code } = req.body;

    // Check if the unique_code already exists in the database
    const [existingCode]: any = await pool.query(
      "SELECT unique_code FROM voucher WHERE unique_code = ?",
      [unique_code]
    );
    
    const [existingName]: any = await pool.query(
      "SELECT name FROM voucher WHERE name = ?",
      [name]
    );

    if (existingName.length > 0) {
      // Unique code already exists, show an error message
      req.flash("alertMessage", "This name already exists. Please choose a different name.");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/voucher");
    }

    if (existingCode.length > 0) {
      // Unique code already exists, show an error message
      req.flash("alertMessage", "This unique code already exists. Please choose a different code.");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/voucher");
    }

    // Insert the new voucher since the unique_code is indeed unique
    await pool.query(
      "INSERT INTO voucher (name, unique_code, price) VALUES (?, ?, ?)",
      [name, unique_code, price]
    );

    req.flash("alertMessage", "Voucher created successfully.");
    req.flash("alertStatus", "success");
    res.redirect("/admin/voucher");

  } catch (err) {
    req.flash("alertMessage", "An error occurred while creating the voucher.");
    req.flash("alertStatus", "danger");
    res.status(500).send(err);
  }
};

export const actionDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM voucher WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      req.flash("alertMessage", "voucher not found");
      req.flash("alertStatus", "danger");
    } else {
      req.flash("alertMessage", "Berhasil hapus voucher");
      req.flash("alertStatus", "success");
    }

    res.redirect("/admin/voucher");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/voucher");
  }
};

export const indexEdit = async (req: Request, res: Response) => {
  try {
    // Ambil ID dari parameter request
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    const { id } = req.params;
    const [genre] = await pool.query("SELECT * FROM genre");
    // Ambil data dari tabel voucher
    const [rows] = await pool.query<voucher[]>("SELECT * FROM voucher WHERE id = ?", [
      id,
    ]);

    // Periksa apakah agen ditemukan
    if (rows.length === 0) {
      req.flash("alertMessage", "voucher not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/voucher");
    }

    const voucher = rows[0];

    // Render halaman dengan data voucher
    res.render("adminv2/pages/voucher/edit", {
      voucher,
      genre,
      alert,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman Edit voucher",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman voucher
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/voucher");
  }
};

// Handler untuk menangani pembaruan data agen

export const actionEdit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, unique_code } = req.body;

    // Fetch existing data for the voucher
    const [existingVoucher] = await pool.query<RowDataPacket[]>(
      "SELECT name, unique_code FROM voucher WHERE id = ?",
      [id]
    );

    if (existingVoucher.length === 0) {
      req.flash("alertMessage", "Voucher not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/voucher");
    }

    const { name: existingName, unique_code: existingCode } = existingVoucher[0];

    // Check if the new name is different and already exists in another voucher
    if (name && name !== existingName) {
      const [checkName] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM voucher WHERE name = ? AND id != ?",
        [name, id]
      );

      if (checkName.length > 0) {
        req.flash("alertMessage", "This name already exists. Please choose a different name.");
        req.flash("alertStatus", "danger");
        return res.redirect("/admin/voucher/edit/" + id);
      }
    }

    // Check if the new unique_code is different and already exists in another voucher
    if (unique_code && unique_code !== existingCode) {
      const [voucherCodeExist] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM voucher WHERE unique_code = ? AND id != ?",
        [unique_code, id]
      );

      if (voucherCodeExist.length > 0) {
        req.flash("alertMessage", "This code already exists. Please choose a different code.");
        req.flash("alertStatus", "danger");
        return res.redirect("/admin/voucher/edit/" + id);
      }
    }

    // Construct the query dynamically
    const fieldsToUpdate: string[] = [];
    const values: (string | number)[] = [];

    if (name) {
      fieldsToUpdate.push("name = ?");
      values.push(name);
    }
    if (price) {
      fieldsToUpdate.push("price = ?");
      values.push(price);
    }
    if (unique_code) {
      fieldsToUpdate.push("unique_code = ?");
      values.push(unique_code);
    }

    if (fieldsToUpdate.length === 0) {
      req.flash("alertMessage", "No fields to update");
      req.flash("alertStatus", "warning");
      return res.redirect("/admin/voucher/edit/" + id);
    }

    // Add the id as the last parameter
    values.push(id);

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE voucher SET ${fieldsToUpdate.join(", ")} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      req.flash("alertMessage", "Voucher not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/voucher");
    }

    req.flash("alertMessage", "Successfully updated voucher");
    req.flash("alertStatus", "success");
    res.redirect("/admin/voucher");

  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/voucher");
  }
};