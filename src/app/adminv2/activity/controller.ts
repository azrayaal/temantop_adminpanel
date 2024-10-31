import pool from "../../../../db";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { formatRupiah } from "../../../middleware/auth";

interface activity extends RowDataPacket {
  id: number;
  tile: string;
  poster: string;
  demo: string;
}

export const index = async (req: Request, res: Response) => {
  try {
    // Ambil data dari tabel activity
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const [activity] = await pool.query<activity[]>("SELECT * FROM activity");
    // Render halaman dengan data activity
  
    res.render("adminv2/pages/activity/index", {
      activity,
      alert,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman activity",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman activity
    console.error("Error in index route:", err.message || err);
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/activity");
  }
};

export const indexCreate = async (req: Request, res: Response) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    // Render halaman dengan data activity
    res.render("adminv2/pages/activity/create", {
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman create activity",
      alert,
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman activity
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/activity");
  }
};

export const actionCreate = async (req: Request, res: Response) => {
  try {
    const title = req.body.title;

       // Type assertion untuk memastikan `req.files` memiliki properti `poster` dan `banner`
       const files = req.files as { [fieldname: string]: Express.Multer.File[] };
       const poster = files.poster ? files.poster[0].filename : "";
       const banner = files.banner ? files.banner[0].filename : "";

    // Cek apakah title sudah ada dalam database
    const [checkactivityName] = await pool.query<activity[]>(
      "SELECT * FROM activity WHERE title = ?",
      [title]
    );
    if (checkactivityName.length > 0) {
      req.flash("alertMessage", "Title name already exists");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/activity/create");
    }

    // Insert data baru ke database
    await pool.query(
      "INSERT INTO activity (title, poster, banner) VALUES (?, ?, ?)",
      [title, poster, banner]
    );

    req.flash("alertMessage", "Berhasil tambah activity");
    req.flash("alertStatus", "success");
    res.redirect("/admin/activity");
  } catch (err: any) {
    req.flash("alertMessage", `Error: ${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/activity/create");
  }
};

export const actionDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM activity WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      req.flash("alertMessage", "activity not found");
      req.flash("alertStatus", "danger");
    } else {
      req.flash("alertMessage", "Berhasil hapus activity");
      req.flash("alertStatus", "success");
    }

    res.redirect("/admin/activity");
  } catch (err: any) {
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/activity");
  }
};

export const indexEdit = async (req: Request, res: Response) => {
  try {
    
    // Ambil ID dari parameter request
    const { id } = req.params;
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // Ambil data dari tabel activity
    const [rows] = await pool.query<activity[]>("SELECT * FROM activity WHERE id = ?", [
      id,
    ]);

    // Periksa apakah agen ditemukan
    if (rows.length === 0) {
      req.flash("alertMessage", "activity not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/activity");
    }

    const activity = rows[0];

    // Render halaman dengan data activity
    res.render("adminv2/pages/activity/edit", {
      activity,
      alert,
      name: req.session.user?.name,
      email: req.session.user?.email,
      title: "Halaman Edit activity",
    });
  } catch (err: any) {
    // Jika terjadi kesalahan, redirect ke halaman activity
    req.flash("alertMessage", `${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/activity");
  }
};

export const actionEdit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // Type assertion untuk memastikan `req.files` memiliki properti `poster` dan `banner`
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const poster = files.poster ? files.poster[0].filename : "";
    const banner = files.banner ? files.banner[0].filename : "";

    // Cek duplikasi nama aktivitas
    const [checkactivityName] = await pool.query<activity[]>(
      "SELECT * FROM activity WHERE title = ? AND id != ?",
      [title, id]
    );

    if (checkactivityName.length > 0) {
      req.flash("alertMessage", "Activity name already exists");
      req.flash("alertStatus", "danger");
      return res.redirect(`/admin/activity/edit/${id}`);
    }

    // Ambil data aktivitas yang ada
    const [existingactivity] = await pool.query<activity[]>("SELECT * FROM activity WHERE id = ?", [id]);

    if (existingactivity.length === 0) {
      req.flash("alertMessage", "Activity not found");
      req.flash("alertStatus", "danger");
      return res.redirect("/admin/activity");
    }

    const activity = existingactivity[0];

    // Siapkan field yang akan diupdate
    const updates: any = {};
    if (poster) updates.poster = poster; // Update jika ada poster baru
    if (banner) updates.banner = banner; // Update jika ada banner baru
    if (title && title !== activity.title) updates.title = title;

    // Update jika ada perubahan
    if (Object.keys(updates).length > 0) {
      const fields = Object.keys(updates);
      const values = Object.values(updates);
      const setClause = fields.map((field) => `${field} = ?`).join(", ");

      await pool.query(`UPDATE activity SET ${setClause} WHERE id = ?`, [...values, id]);
    }

    req.flash("alertMessage", "Successfully updated the activity");
    req.flash("alertStatus", "success");
    res.redirect("/admin/activity");
  } catch (err: any) {
    req.flash("alertMessage", `Error: ${err.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/activity");
  }
};



