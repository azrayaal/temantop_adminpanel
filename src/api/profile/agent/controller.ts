import { Request, Response } from "express";
import pool from "../../../../db"; // Adjust the import according to your actual db configuration
import { ResultSetHeader } from "mysql2";
require("dotenv").config();

// export const getAllAgent = async (req: Request, res: Response) => {
//   try {
//     const [result] = await pool.query<ResultSetHeader>(
//       `SELECT username, channelName, profilePicture, online FROM user WHERE stream = 1 and online = 1 ORDER BY online DESC`
//     );
  
//     res.json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error get detail user:", error);
//     res.status(500).json({ message: "Error get detail user", error });
//   }
// };
import { RowDataPacket } from "mysql2"; // Pastikan kamu import tipe ini dari mysql2

export const getAllAgent = async (req: Request, res: Response) => {
  try {
    // Query untuk mendapatkan data user yang sedang stream dan online
    const [users] = await pool.query<RowDataPacket[]>(
      `SELECT id, username, channelName, profilePicture, online FROM user WHERE stream = 1 AND online = 1 ORDER BY online DESC`
    );

    // Lakukan query kedua untuk mendapatkan stream session
    const [streams] = await pool.query<RowDataPacket[]>(
      `SELECT id, userId, status, thumbnail, title, duration FROM stream_session WHERE status = 1`
    );

    // Gabungkan data berdasarkan userId
    const mergedData = users.map(user => {
      const stream = streams.find(s => s.userId === user.id);

      return {
        ...user,
        liveStatus: stream ? stream.status : 0,
        liveId: stream ? stream.id : 0 || null,
      };
    });

    res.json({
      success: true,
      data: mergedData,
    });
  } catch (error) {
    console.error("Error get detail user:", error);
    res.status(500).json({ message: "Error get detail user", error });
  }
};

