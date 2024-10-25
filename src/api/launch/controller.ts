import { Request, Response } from "express";
import pool from "../../../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const launchLobby = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader==", authHeader);
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  // Pastikan user telah terautentikasi
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }

  const userId = req.user.id;

  try {
    // Query untuk memeriksa status online user
    const [rows]: any = await pool.query<ResultSetHeader>(
      "SELECT online FROM user WHERE id = ?",
      [userId]
    );

    // Pastikan data user ditemukan
    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const online = rows[0].online;

    // Cek apakah user sedang offline
    if (online === false || online === 0) {
      return res
        .status(400)
        .json({ success: false, message: "You're offline" });
    }

    // Buat URL iframe berdasarkan ID dan token yang sudah di-encode
    const iframeUrl = `https://lets-stream.innovativetechnology.my.id?token=${encodeURIComponent(
      token
    )}`;

    // Set header Content-Type ke text/html
    // res.setHeader("Content-Type", "text/html");

    res.status(200).json({
      success: true,
      message: "lobby launched successfully",
      url: iframeUrl,
    });
  } catch (error) {
    console.error("Error launching stream:", error);

    // Kirimkan pesan error
    return res.status(500).json({
      status: "error",
      message: "Failed to launch stream",
    });
  }
};

export const launchStream = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  // Pastikan user telah terautentikasi
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }

  const userId = req.user.id;

  try {
    // Query untuk memeriksa status online user
    const [rows]: any = await pool.query<ResultSetHeader>(
      "SELECT online FROM user WHERE id = ?",
      [userId]
    );

    // Pastikan data user ditemukan
    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const online = rows[0].online;

    // Cek apakah user sedang offline
    if (online === false || online === 0) {
      return res
        .status(400)
        .json({ success: false, message: "You're offline" });
    }

    const [frame] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM stream_session WHERE id = ? AND status = 1",
      [id]
    );

    if (frame.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Stream session not found" });
    }
    // Buat URL iframe berdasarkan ID dan token yang sudah di-encode
    const iframeUrl = `https://lets-stream.innovativetechnology.my.id/livesession/${id}?token=${encodeURIComponent(
      token
    )}`;

    // Set header Content-Type ke text/html
    // res.setHeader("Content-Type", "text/html");

    // Kirimkan HTML iframe sebagai respons
    res.status(200).json({
      success: true,
      message: "Stream session launched successfully",
      url: iframeUrl,
    });
  } catch (error) {
    console.error("Error launching stream:", error);

    // Kirimkan pesan error
    return res.status(500).json({
      status: "error",
      message: "Failed to launch stream",
    });
  }
};
