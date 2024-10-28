import { Request, Response } from "express";
import pool from "../../../../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { generateRtcToken } from "../../token/controller";
import { RtcRole, RtcTokenBuilder } from "agora-access-token";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId?: any;
        channelName?: string;
        streamer?: string;
        id?: number;
        profilePicture?: string;
      };
    }
  }
}

export const startStreamSession = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const title = req.body.title ?? "";
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const [dataStreamer] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM user WHERE id = ?",
    [userId]
  );

  const channelName = req.user?.channelName ?? "";
  const uid = userId.toString();
  try {
    const [existingSessions] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM stream_session WHERE userId = ? AND status = 1",
      [userId]
    );

    if (existingSessions.length > 0) {
      return res
        .status(400)
        .json({ success: true, message: "You're on the live" });
    }

    const thumbnail = dataStreamer[0].profilePicture;

    // const token = generateRtcToken(channelName, uid);

    // generate agora token for views
    const APP_ID = process.env.APP_ID as string;
    const APP_CERTIFICATE = process.env.APP_CERTIFICATE as string;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      channelName,
      userId,
      RtcRole.SUBSCRIBER,
      privilegeExpiredTs
    );
    const status = 1;

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO stream_session (userId, thumbnail, title, status, token) VALUES (?, ?, ?, ?, ?)",
      [userId, thumbnail, title, status, token]
    );

    res.json({
      id: result.insertId,
      userId,
      channelName,
      thumbnail,
      title,
      token,
      status,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding stream session", error });
  }
};

export const endStreamSession = async (req: Request, res: Response) => {
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

export const getStreamSession = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Get the logged-in user's ID from the request object
  console.log(`Logged in user ID: ${userId}`);

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    // Execute the query to fetch stream sessions where status is 1 and userId matches
    const [rows]: any = await pool.query(
      `
      SELECT 
        id,
        userId,
        thumbnail,
        title,
        status,
        token,
        createdAt
      FROM stream_session
      WHERE status = 1 AND userId = ?
    `,
      [userId]
    ); // Use parameterized queries to prevent SQL injection
    const [userData]: any = await pool.query(
      "SELECT * FROM user WHERE id = ?",
      [userId]
    );

    // Map the results to the desired structure (if necessary)
    const data = rows.map((row: any) => ({
      id: row.id,
      userId: row.userId,
      userData: userData[0],
      thumbnail: row.thumbnail,
      title: row.title,
      status: row.status,
      token: row.token,
      createdAt: row.createdAt,
    }));

    // Return the formatted data in the response
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching stream_session:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching stream_session",
      error: error.message, // Send only the error message to the client
    });
  }
};

