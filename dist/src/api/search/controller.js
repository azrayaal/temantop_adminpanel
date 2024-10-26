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
exports.searchGamebyGenre = exports.searchGame = exports.searchStream = void 0;
const db_1 = __importDefault(require("../../../db")); // Adjust the import according to your actual db configuration
const searchStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        const [search] = yield db_1.default.query(`
         SELECT ss.*, u.profilePicture,
    u.username,
    u.channelname
         FROM stream_session ss
         JOIN user u ON ss.userId = u.id
         WHERE ss.status = 1 AND u.username LIKE ?
        `, [`%${username}%`]); // Use wildcards for partial match
        res.json({
            success: true,
            data: search,
        });
    }
    catch (error) {
        console.error("Error searching stream:", error);
        res.status(500).json({ message: "Error searching stream", error });
    }
});
exports.searchStream = searchStream;
const searchGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameName } = req.query;
        const [search] = yield db_1.default.query(`
          SELECT * FROM game WHERE gameName LIKE ?
        `, [`%${gameName}%`]); // Use wildcards for partial match
        res.json({
            success: true,
            data: search,
        });
    }
    catch (error) {
        console.error("Error searching game:", error);
        res.status(500).json({ message: "Error searching game", error });
    }
});
exports.searchGame = searchGame;
const searchGamebyGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre } = req.body;
        const [search] = yield db_1.default.query(`
          SELECT * FROM game WHERE genre = ?
        `, [genre]);
        res.json({
            success: true,
            data: search,
        });
    }
    catch (error) {
        console.error("Error searching game:", error);
        res.status(500).json({ message: "Error searching game", error });
    }
});
exports.searchGamebyGenre = searchGamebyGenre;
