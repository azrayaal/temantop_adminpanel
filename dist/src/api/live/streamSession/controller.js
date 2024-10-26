"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStreamSession = exports.endStreamSession = exports.startStreamSession = void 0;
const db_1 = __importDefault(require("../../../../db"));
const agora_access_token_1 = require("agora-access-token");
const startStreamSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const title = (_b = req.body.title) !== null && _b !== void 0 ? _b : "";
    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const [dataStreamer] = yield db_1.default.query("SELECT * FROM user WHERE id = ?", [userId]);
    const channelName = (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.channelName) !== null && _d !== void 0 ? _d : "";
    const uid = userId.toString();
    try {
        const [existingSessions] = yield db_1.default.query("SELECT * FROM stream_session WHERE userId = ? AND status = 1", [userId]);
        if (existingSessions.length > 0) {
            return res
                .status(400)
                .json({ success: true, message: "You're on the live" });
        }
        const thumbnail = dataStreamer[0].profilePicture;
        // const token = generateRtcToken(channelName, uid);
        // generate agora token for views
        const APP_ID = process.env.APP_ID;
        const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
        const expirationTimeInSeconds = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, userId, agora_access_token_1.RtcRole.SUBSCRIBER, privilegeExpiredTs);
        const status = 1;
        const [result] = yield db_1.default.query("INSERT INTO stream_session (userId, thumbnail, title, status, token) VALUES (?, ?, ?, ?, ?)", [userId, thumbnail, title, status, token]);
        res.json({
            id: result.insertId,
            userId,
            channelName,
            thumbnail,
            title,
            token,
            status,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error adding stream session", error });
    }
});
exports.startStreamSession = startStreamSession;
const endStreamSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Get the logged-in user's ID
    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const [sessionRows] = yield db_1.default.query(`
      SELECT * FROM stream_session 
      WHERE userId = ? AND status = 1
    `, [userId]);
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
        const [viewRows] = yield db_1.default.query(`SELECT COUNT(*) AS total_view FROM view_session WHERE stream_sessionId = ?`, [streamId]);
        const total_view = viewRows[0].total_view;
        // Insert into stream_result
        yield db_1.default.query(`INSERT INTO stream_result (stream_sessionId, duration, total_view) VALUES (?, ?, ?)`, [streamId, duration, total_view]);
        // Update the stream session status to ended
        const [result] = yield db_1.default.query("UPDATE stream_session SET status = '0' WHERE id = ?", [streamId]);
        // remove token from stream session
        const [removeToken] = yield db_1.default.query("UPDATE stream_session SET token = ' ' WHERE id = ?", [streamId]);
        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Stream session not found" });
        }
        res.json({ success: true, message: "Stream session ended successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error ending stream session", error });
    }
});
exports.endStreamSession = endStreamSession;
const getStreamSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Get the logged-in user's ID from the request object
    console.log(`Logged in user ID: ${userId}`);
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }
    try {
        // Execute the query to fetch stream sessions where status is 1 and userId matches
        const [rows] = yield db_1.default.query(`
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
    `, [userId]); // Use parameterized queries to prevent SQL injection
        const [userData] = yield db_1.default.query("SELECT * FROM user WHERE id = ?", [userId]);
        // Map the results to the desired structure (if necessary)
        const data = rows.map((row) => ({
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
    }
    catch (error) {
        console.error("Error fetching stream_session:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching stream_session",
            error: error.message, // Send only the error message to the client
        });
    }
});
exports.getStreamSession = getStreamSession;
// export const launchLobby = async (req: Request, res: Response) => {
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
//   try {
//     // Encode token dengan base64 menggunakan Buffer (pengganti btoa di Node.js)
//     const encodedToken = Buffer.from(token).toString("base64");
//     // Buat URL iframe berdasarkan token yang sudah di-encode
//     const iframeUrl = `https://innovativetechnology.my.id?token=${encodeURIComponent(
//       encodedToken
//     )}`;
//     // HTML iframe yang akan dikirimkan
//     const iframeHtml = `<iframe src="${iframeUrl}" width="800" height="600" frameborder="0" allow="fullscreen"></iframe>`;
//     // Set header Content-Type ke text/html dan tambahkan header yang memperbolehkan iframe
//     res.setHeader("Content-Type", "text/html");
//     // Menambahkan header untuk mengizinkan pemuatan iframe
//     // res.setHeader("X-Frame-Options", "ALLOWALL");
//     // res.setHeader("Access-Control-Allow-Origin", "*");
//     // Kirimkan HTML iframe sebagai respons
//     return res.send(iframeHtml);
//   } catch (error) {
//     console.error("Error launching lobby:", error);
//     // Kirimkan pesan error
//     return res.status(500).json({
//       status: "error",
//       message: "Failed to launch lobby",
//     });
//   }
// };
