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
exports.getAllAgent = void 0;
const db_1 = __importDefault(require("../../../../db")); // Adjust the import according to your actual db configuration
require("dotenv").config();
const getAllAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query untuk mendapatkan data user yang sedang stream dan online
        const [users] = yield db_1.default.query(`SELECT id, username, channelName, profilePicture, online FROM user WHERE stream = 1 AND online = 1 ORDER BY online DESC`);
        // Lakukan query kedua untuk mendapatkan stream session
        const [streams] = yield db_1.default.query(`SELECT id, userId, status, thumbnail, title, duration FROM stream_session WHERE status = 1`);
        // Gabungkan data berdasarkan userId
        const mergedData = users.map(user => {
            const stream = streams.find(s => s.userId === user.id);
            return Object.assign(Object.assign({}, user), { liveStatus: stream ? stream.status : 0, liveId: stream ? stream.id : 0 || null });
        });
        res.json({
            success: true,
            data: mergedData,
        });
    }
    catch (error) {
        console.error("Error get detail user:", error);
        res.status(500).json({ message: "Error get detail user", error });
    }
});
exports.getAllAgent = getAllAgent;
