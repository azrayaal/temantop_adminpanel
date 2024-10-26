import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { formatRupiah } from "../../../middleware/auth";

interface Gift extends RowDataPacket {
  id: number;
  img: string;
  giftName: string;
  giftLink: string;
  price: number;
  create_time: Date;
}

export const index = async (req: Request, res: Response) => {
  try {
    // Ambil data dari tabel gift
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const [gift] = await pool.query<Gift[]>("SELECT * FROM gift");
    // Render halaman dengan data gift
    const giftFormatted = gift.map((gift: any) => {
      return {
        ...gift,
        price: formatRupiah(parseFloat(gift.price)),
      };
    })

    console.log(giftFormatted);
    res.render("adminv2/pages/gift/index", {
      gift: giftFormatted,
      alert,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman gift",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman gift
    console.error("Error in index route:", err.message || err);
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gift");
  }
};

export const indexCreate = async (req: Request, res: Response) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    // Render halaman dengan data gift
    res.render("adminv2/pages/gift/create", {
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman create gift",
      alert,
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman gift
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gift");
  }
};

export const actionCreate = async (req: Request, res: Response) => {
  try {
    const { giftName, giftLink, price } = req.body;
    const img = req.file?.filename || "";
    // const createTime = formatDate(new Date());
    const [rows] = await pool.query(
      "INSERT INTO gift ( img, giftName, giftLink, price) VALUES ( ?, ?, ?, ?)",
      [img, giftName, giftLink, price]
    );

    req.flash("alertMessage", "Berhasil tambah gift");
    req.flash("alertStatus", "success");
    res.redirect("/admin/gift");
  } catch (err) {
    res.send(err);
  }
};

export const actionDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM gift WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      req.flash("alertMessage", "gift not found");
      req.flash("alertStatus", "danger");
    } else {
      req.flash("alertMessage", "Berhasil hapus gift");
      req.flash("alertStatus", "success");
    }

    res.redirect("/admin/gift");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gift");
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
    const [rows] = await pool.query<Gift[]>("SELECT * FROM gift WHERE id = ?", [
      id,
    ]);

    // Periksa apakah agen ditemukan
    if (rows.length === 0) {
      req.flash("alertMessage", "gift not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/gift");
    }

    const gift = rows[0];

    // Render halaman dengan data gift
    res.render("adminv2/pages/gift/edit", {
      gift,
      alert,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman Edit gift",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman gift
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gift");
  }
};

export const actionEdit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { giftName, giftLink, price } = req.body;
    const img = res.req.file?.filename || ""; // Use Cloudinary URL if file was uploaded

    // Fetch the existing gift data
    const [existingGift] = await pool.query<Gift[]>("SELECT * FROM gift WHERE id = ?", [id]);

    if (existingGift.length === 0) {
      req.flash("alertMessage", "Gift not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/gift");
    }

    const gift = existingGift[0];

    // Check for gift name duplication
    if (giftName && giftName !== gift.giftName) {
      const [duplicateGift] = await pool.query<Gift[]>(
        "SELECT * FROM gift WHERE giftName = ? AND id != ?",
        [giftName, id]
      );

      if (duplicateGift.length > 0) {
        req.flash("alertMessage", "Gift with this name already exists");
        req.flash("alertStatus", "danger");
        return res.redirect(`/admin/gift/edit/${id}`);
      }
    }

    // Prepare fields to update
    const updates: any = {};
    if (img) updates.img = img; // Update image only if there's a new one
    if (giftName && giftName !== gift.giftName) updates.giftName = giftName;
    if (giftLink && giftLink !== gift.giftLink) updates.giftLink = giftLink;
    if (price && price !== gift.price) updates.price = price;

    // Update the fields if there are changes
    if (Object.keys(updates).length > 0) {
      const fields = Object.keys(updates);
      const values = Object.values(updates);
      const setClause = fields.map((field) => `${field} = ?`).join(", ");

      // Update the database
      await pool.query(`UPDATE gift SET ${setClause} WHERE id = ?`, [...values, id]);
    }

    req.flash("alertMessage", "Successfully updated the gift");
    req.flash("alertStatus", "success");
    res.redirect("/admin/gift");
  } catch (err: any) {
    req.flash("alertMessage", `Error: ${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gift");
  }
};