import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { format } from "path";

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
    const formatRupiah = (angka: number) => 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

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
      formattedPrice: formatRupiah(v.price),
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
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/voucher");
  }
};



export const indexCreate = async (req: Request, res: Response) => {
  try {
    const [genre] = await pool.query("SELECT * FROM genre");
    // Render halaman dengan data voucher
    res.render("adminv2/pages/voucher/create", {
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
    const { name, unique_code, price } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO voucher (name, unique_code, price) VALUES ( ?, ?, ?)",
      [name, unique_code, price]
    );
    res.redirect("/admin/voucher");
  } catch (err) {
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
    const { genre, voucherName, voucherCode, voucherLink } = req.body;
    const voucherImg = req.file?.filename || "";

    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE voucher SET genre = ?, voucherCode = ?, voucherName = ?, voucherLink = ?, voucherImg = ? WHERE id = ?",
      [genre, voucherCode, voucherName, voucherLink, voucherImg, id]
    );

    if (result.affectedRows === 0) {
      req.flash("alertMessage", "voucher not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/voucher");
    }

    req.flash("alertMessage", "Berhasil mengedit voucher");
    req.flash("alertStatus", "success");
    res.redirect("/admin/voucher");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/voucher");
  }
};
