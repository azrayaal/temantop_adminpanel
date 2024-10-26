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
exports.deleteGenre = exports.editGenre = exports.postGenre = exports.getDetailGenre = exports.getAllGenre = void 0;
const db_1 = __importDefault(require("../../../../db"));
const getAllGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data] = yield db_1.default.query("SELECT * FROM genre");
        res.json({ success: true, data });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching games", error });
    }
});
exports.getAllGenre = getAllGenre;
const getDetailGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [data] = yield db_1.default.query("SELECT * FROM genre where id = ?", [id]);
        res.json({ success: true, data });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching games", error });
    }
});
exports.getDetailGenre = getDetailGenre;
const postGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genreName = req.body.genreName;
    try {
        const [result] = yield db_1.default.query("INSERT INTO genre (genreName) VALUES (?)", [genreName]);
        res.json({
            success: true,
            id: result.insertId,
            genreName,
            message: "genre added successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding game", error });
    }
});
exports.postGenre = postGenre;
const editGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    console.log("updates", updates);
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    // Buat query dinamis
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    try {
        const [result] = yield db_1.default.query(`UPDATE genre SET ${setClause} WHERE id = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "genre not found" });
        }
        else {
            res.json(Object.assign({ id }, updates));
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating genre", error });
    }
});
exports.editGenre = editGenre;
const deleteGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db_1.default.query("DELETE FROM genre WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "genre not found" });
        }
        else {
            res.json({ message: "genre deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting genre", error });
    }
});
exports.deleteGenre = deleteGenre;
