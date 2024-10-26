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
exports.getDetailStreamResult = exports.getTotalStream = exports.getAllStreamResults = void 0;
const db_1 = __importDefault(require("../../../../db"));
// export const getAllStreamResults = async (req: Request, res: Response) => {
//   const userId = req.user?.id;
//   console.log("userId", userId);
//   if (!userId) {
//     return res.status(401).json({ message: "Error: No userId found" });
//   }
//   try {
//     const [data] = await pool.query(
//       `
//         SELECT * FROM stream_result where stream_sessionId IN (SELECT id FROM stream_session where userId = ?)
//           `,
//       [userId]
//     );
//     res.json({ success: true, data });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching stream results", error });
//   }
// };
const getAllStreamResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    // console.log("userId", userId);
    if (!userId) {
        return res.status(401).json({ message: "Error: No userId found" });
    }
    try {
        const [data] = yield db_1.default.query(`
      SELECT * 
FROM stream_result 
WHERE stream_sessionId IN (
    SELECT id 
    FROM stream_session 
    WHERE userId = ?
) 
ORDER BY stream_sessionId DESC 
LIMIT 1;
    `, [userId]);
        // if (data.length > 0) {
        //   const result = data[0];
        //   const { hours, minutes, seconds } = convertDurationToTime(
        //     result.duration
        //   );
        //   result.formatted_duration = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        //   res.json({ success: true, data: data });
        // } else {
        //   res.status(404).json({ message: "No stream results found" });
        // }
        res.json({ success: true, data: data });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching stream results", error });
    }
});
exports.getAllStreamResults = getAllStreamResults;
// function convertDurationToTime(duration: number): {
//   hours: number;
//   minutes: number;
//   seconds: number;
// } {
//   const hours = Math.floor(duration / 3600);
//   const minutes = Math.floor((duration % 3600) / 60);
//   const seconds = duration % 60;
//   return {
//     hours,
//     minutes,
//     seconds,
//   };
// }
const getTotalStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    // console.log("userId", userId);
    // const userId = req.params.id;
    if (!userId) {
        return res.status(401).json({ message: "Error: No userId found" });
    }
    try {
        // Execute the SQL query to calculate the total duration for the user
        const [rows, fields] = yield db_1.default.query(` SELECT * 
    FROM stream_result 
    WHERE stream_sessionId IN (
        SELECT id 
        FROM stream_session 
        WHERE userId = ?
    ) 
    ORDER BY stream_sessionId DESC 
    LIMIT 1`, [userId]);
        // Access the total duration from the first row
        const totalDuration = (_b = rows[0]) === null || _b === void 0 ? void 0 : _b.duration;
        // console.log("totalDuration", totalDuration);
        // Return the total duration as part of the JSON response
        res.json({ success: true, data: { totalDuration } });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching stream results", error });
    }
});
exports.getTotalStream = getTotalStream;
const getDetailStreamResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stream_sessionId = req.params.id;
    // console.log("streamId", stream_sessionId);
    if (!stream_sessionId) {
        return res
            .status(401)
            .json({ success: false, message: "Error: no stream_sessionId found" });
    }
    const [data] = yield db_1.default.query(`
      SELECT * FROM stream_result 
      WHERE id = ?
    `, [stream_sessionId]);
    res.json({ success: true, data });
});
exports.getDetailStreamResult = getDetailStreamResult;
