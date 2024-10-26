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
exports.deleteGift = exports.editGift = exports.postGift = exports.getDetailGift = exports.getAllGifts = exports.testDeductBalance = void 0;
const db_1 = __importDefault(require("../../../db"));
const https_1 = __importDefault(require("https"));
const axios_1 = __importDefault(require("axios"));
const testDeductBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agent = new https_1.default.Agent({
            rejectUnauthorized: false, // Ignore SSL certificate errors
        });
        const data = {
            play_id: "8dxw86xw6u027",
            bet_id: "asasdsdafsddcsadd",
            amount: 100,
            gift: "giftDetails.giftName", // Make sure this is a valid string
            streamer: "recipientUser.username", // Make sure this is a valid string
            bet_time: "2024-09-02 11:57:21",
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hyaXMifQ.JBvFJ1OPCkb4l69zUJTwNzpbFjQeZ0FEmaSBn6VLb00`,
            },
            httpsAgent: agent,
        };
        try {
            const response = yield axios_1.default.post(`https://str-stg.mixcdn.link/str/deduct`, data, config);
            res.status(200).json({
                success: true,
                message: "Balance deducted successfully",
                data: response.data,
            });
        }
        catch (error) {
            console.error("Error during axios request:", error.message || error);
            res.status(500).json({
                success: false,
                message: "Failed to deduct balance",
                error: error.message || error,
            });
        }
    }
    catch (error) {
        console.error("Unexpected error:", error.message || error);
        res.status(500).json({
            success: false,
            message: "Unexpected error occurred",
            error: error.message || error,
        });
    }
});
exports.testDeductBalance = testDeductBalance;
const getAllGifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data] = yield db_1.default.query("SELECT * FROM gift");
        res.json({ success: true, data });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching gifts", error });
    }
});
exports.getAllGifts = getAllGifts;
const getDetailGift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [data] = yield db_1.default.query("SELECT * FROM gift where id = ?", [id]);
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching gifts", error });
    }
});
exports.getDetailGift = getDetailGift;
const postGift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { giftName, giftLink, price } = req.body;
    const img = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
    try {
        const [result] = yield db_1.default.query("INSERT INTO gift (img, giftName, giftLink, price) VALUES (?, ?, ?, ?)", [img, giftName, giftLink, price]);
        res.json({
            success: true,
            id: result.insertId,
            img,
            giftName,
            giftLink,
            price,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding gift", error });
    }
});
exports.postGift = postGift;
const editGift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    // Buat query dinamis
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    try {
        const [result] = yield db_1.default.query(`UPDATE gift SET ${setClause} WHERE id = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Gift not found" });
        }
        else {
            res.json(Object.assign({ id }, updates));
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating gift", error });
    }
});
exports.editGift = editGift;
const deleteGift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db_1.default.query("DELETE FROM gift WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Gift not found" });
        }
        else {
            res.json({ message: "Gift deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting gift", error });
    }
});
exports.deleteGift = deleteGift;
