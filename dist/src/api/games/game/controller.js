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
exports.deleteGame = exports.editGame = exports.postGame = exports.getDetailGame = exports.getAllGame = void 0;
const db_1 = __importDefault(require("../../../../db"));
const getAllGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data] = yield db_1.default.query("SELECT * FROM game");
        const [genreResult] = yield db_1.default.query("SELECT * FROM genre WHERE id = ?", [
            data.genre,
        ]);
        const dataGame = data.map((row) => ({
            id: row.id,
            genre: row.genre,
            // genreName: genre[0].genreName,
            gameCode: row.gameCode,
            gameName: row.gameName,
            gameLink: row.gameLink,
            gameImg: row.gameImg,
            createdAt: row.createdAt,
        }));
        res.json({ success: true, dataGame, genreResult });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching games", error });
    }
});
exports.getAllGame = getAllGame;
const getDetailGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [data] = yield db_1.default.query("SELECT * FROM game where id = ?", [id]);
        res.json({ success: true, data });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching games", error });
    }
});
exports.getDetailGame = getDetailGame;
const postGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genre, gameCode, gameName, gameLink } = req.body;
    // const gameImg = req.file?.filename || "";
    const gameImg = req.body.gameImg;
    try {
        const [result] = yield db_1.default.query("INSERT INTO game (genre, gameCode, gameName, gameLink, gameImg) VALUES (?, ?, ?, ?, ?)", [genre, gameCode, gameName, gameLink, gameImg]);
        res.json({
            success: true,
            id: result.insertId,
            gameCode,
            gameName,
            gameLink,
            gameImg,
            message: "game added successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding game", error });
    }
});
exports.postGame = postGame;
const editGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    console.log("updates", updates);
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    // Buat query dinamis
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    try {
        const [result] = yield db_1.default.query(`UPDATE game SET ${setClause} WHERE id = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "game not found" });
        }
        else {
            res.json(Object.assign({ id }, updates));
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating game", error });
    }
});
exports.editGame = editGame;
const deleteGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db_1.default.query("DELETE FROM game WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "game not found" });
        }
        else {
            res.json({ message: "game deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting game", error });
    }
});
exports.deleteGame = deleteGame;
