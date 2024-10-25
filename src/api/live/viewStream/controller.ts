import { Request, Response } from "express";
import pool from "../../../../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { generateRtcToken, generateRtcTokenView } from "../../token/controller";
import { access_tokenview } from "../../../apiv2/token/controller";
import { RtcRole, RtcTokenBuilder } from "agora-access-token";

export const getAllStreams = async (req: Request, res: Response) => {
  try {
    const [data] = await pool.query<RowDataPacket[]>(
      "SELECT stream_session.id, stream_session.thumbnail,stream_session.title,stream_session.status,stream_session.createdAt,user.username,user.channelName, user.profilePicture FROM stream_session INNER JOIN user ON stream_session.userId = user.id WHERE stream_session.status = 1"
    );

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "No stream sessions found" });
    }
    res.json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching stream sessions" });
  }
};

export const getDetailStreamSession = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const role = "audience";
    let roleNumber: number;

    // Validate and assign role
    if (role === "audience") {
      roleNumber = RtcRole.SUBSCRIBER;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role provided" });
    }

    // Query the stream session from the database
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM stream_session WHERE id = ? AND status = 1",
      [id]
    );

    if (rows.length > 0) {
      const uid = rows[0].userId; // Use userId as uid for token generation
      const userId = rows[0].userId;

      if (userId === null || userId === undefined) {
        return res
          .status(404)
          .json({ success: false, message: "streamer not found" });
      }

      // Query the streamer (user) data from the database
      const [dataStreamer] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM user WHERE id = ?",
        [userId]
      );
      console.log(dataStreamer[0]);
      const username = dataStreamer[0].username;
      const profilePicture = dataStreamer[0].profilePicture;

      if (dataStreamer.length > 0) {
        const channelName = dataStreamer[0].channelName;

        // Generate Agora token
        const APP_ID = process.env.APP_ID as string;
        const APP_CERTIFICATE = process.env.APP_CERTIFICATE as string;
        const expirationTimeInSeconds = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

        const token = RtcTokenBuilder.buildTokenWithUid(
          APP_ID,
          APP_CERTIFICATE,
          channelName,
          uid,
          roleNumber,
          privilegeExpiredTs
        );

        // Respond with the session details and token
        return res.json({
          success: true,
          data: rows,
          channelName,
          username,
          profilePicture,
          // tokenView: token,
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Stream session not found" });
    }
  } catch (error) {
    console.error("Error fetching stream session:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching stream session" });
  }
};

export const startViewStream = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const stream_sessionId = req.body.stream_sessionId;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    // Pastikan stream session valid
    const [stream_session] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM stream_session WHERE id = ?",
      [stream_sessionId]
    );

    if (stream_session.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Stream session not found" });
    }

    // Cek apakah user sudah pernah menonton stream ini
    const [viewSession] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM view_session WHERE userId = ? AND stream_sessionId = ?",
      [userId, stream_sessionId]
    );

    if (viewSession.length > 0) {
      // Jika sudah menonton, kirim respon tanpa detail stream
      return res.json({
        success: true,
        message: "You have already watched this stream",
      });
    }

    // Mendapatkan nama channel pemilik stream
    const [channel] = await pool.query<RowDataPacket[]>(
      "SELECT channelName FROM user WHERE id = ?",
      [stream_session[0].userId]
    );

    if (channel.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Channel not found" });
    }

    // Tambahkan entri ke view_session
    await pool.query<ResultSetHeader>(
      "INSERT INTO view_session (userId, stream_sessionId) VALUES (?, ?)",
      [userId, stream_sessionId]
    );

    // Kirim data stream detail hanya jika pengguna baru menonton
    res.json({
      success: true,
      message: "You just entered the stream",
      channelName: channel[0].channelName, // Mengirimkan nama channel
      stream_session: stream_session[0], // Mengirimkan informasi stream session
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error starting view session", error });
  }
};

export const endViewStream = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id; // Get the logged-in user's ID

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const [sessionRows]: any = await pool.query(
      `
      SELECT * FROM stream_session 
      WHERE userId = ? AND status = 1
    `,
      [userId]
    );
    const streamId = sessionRows[0].id;

    if (sessionRows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Stream session not found" });
    }

    const session = sessionRows[0];

    // Check if the session is already ended or the user is not authorized
    if (session.status === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Stream session is already ended" });
    }

    if (parseInt(session.userId) !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to end this stream session",
      });
    }

    // Calculate the duration from createdAt to now
    const createdAt = new Date(session.createdAt);
    const now = new Date();
    const duration = Math.floor((now.getTime() - createdAt.getTime()) / 1000); // Duration in seconds

    const [viewRows]: any = await pool.query(
      `SELECT COUNT(*) AS total_view FROM view_session WHERE stream_sessionId = ?`,
      [streamId]
    );
    const total_view = viewRows[0].total_view;

    // Insert into stream_result
    await pool.query(
      `INSERT INTO stream_result (stream_sessionId, duration, total_view) VALUES (?, ?, ?)`,
      [streamId, duration, total_view]
    );

    // Update the stream session status to ended
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE stream_session SET status = '0' WHERE id = ?",
      [streamId]
    );

    // remove token from stream session
    const [removeToken] = await pool.query<ResultSetHeader>(
      "UPDATE stream_session SET token = ' ' WHERE id = ?",
      [streamId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Stream session not found" });
    }

    res.json({ success: true, message: "Stream session ended successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error ending stream session", error });
  }
};

// export const launchStream = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     return res
//       .status(401)
//       .json({ success: false, message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   // Pastikan user telah terautentikasi
//   if (!req.user) {
//     return res
//       .status(401)
//       .json({ success: false, message: "User not authenticated" });
//   }

//   const userId = req.user.id;

//   try {
//     // Query untuk memeriksa status online user
//     const [rows]: any = await pool.query<ResultSetHeader>(
//       "SELECT online FROM user WHERE id = ?",
//       [userId]
//     );

//     // Pastikan data user ditemukan
//     if (!rows || rows.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     const online = rows[0].online;

//     // Cek apakah user sedang offline
//     if (online === false || online === 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "You're offline" });
//     }

//     const [frame] = await pool.query<RowDataPacket[]>(
//       "SELECT * FROM stream_session WHERE id = ? AND status = 1",
//       [id]
//     );

//     if (frame.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Stream session not found" });
//     }
//     // Buat URL iframe berdasarkan ID dan token yang sudah di-encode
//     const iframeUrl = `https://lets-stream.innovativetechnology.my.id/livesession/${id}?token=${encodeURIComponent(
//       token
//     )}`;

//     // Set header Content-Type ke text/html
//     res.setHeader("Content-Type", "text/html");

//     // Kirimkan HTML iframe sebagai respons
//     return res.status(200).json({
//       success: true,
//       message: "Stream session launched successfully",
//       url: iframeUrl,
//     });
//   } catch (error) {
//     console.error("Error launching stream:", error);

//     // Kirimkan pesan error
//     return res.status(500).json({
//       status: "error",
//       message: "Failed to launch stream",
//     });
//   }
// };
