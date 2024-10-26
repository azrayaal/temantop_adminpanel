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
exports.getDetailNotifications = exports.getAllNotifications = void 0;
const db_1 = __importDefault(require("../../../db"));
const getAllNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const [data] = yield db_1.default.query("SELECT * FROM notifications WHERE userId = ?", [userId]);
        res.json({ success: true, data });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching notifications", error });
    }
});
exports.getAllNotifications = getAllNotifications;
const getDetailNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [data] = yield db_1.default.query("SELECT * FROM notifications WHERE id = ?", [id]);
        yield db_1.default.query("UPDATE notifications SET is_read = TRUE WHERE id = ?", [
            id,
        ]);
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error });
    }
});
exports.getDetailNotifications = getDetailNotifications;
