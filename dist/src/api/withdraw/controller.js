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
exports.getRequestWithdraw = exports.requestWithdraw = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../../../db"));
dotenv_1.default.config();
const requestWithdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { amount, account_number, account_name, bankId } = req.body;
        if (!amount || !account_number || !bankId || !account_name) {
            return res.json({ success: false, message: "Missing required fields" });
        }
        const [bank] = yield db_1.default.query("SELECT * FROM bank WHERE id = ?", [bankId]);
        if (bank.length === 0) {
            return res.json({ success: false, message: "Bank not found" });
        }
        const [result] = yield db_1.default.query("INSERT INTO withdraw (amount, account_number, bankId, account_name, userId) VALUES (?, ?, ?, ?, ?)", [amount, account_number, bankId, account_name, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id]);
        res.json({ success: true, message: "Withdraw request successful", data: result[0] });
    }
    catch (error) {
        res.json({ success: false, message: "Withdraw request failed" });
    }
});
exports.requestWithdraw = requestWithdraw;
const getRequestWithdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM withdraw WHERE userId = ?", [(_a = req.user) === null || _a === void 0 ? void 0 : _a.id]);
        const [bank] = yield db_1.default.query("SELECT * FROM bank WHERE id = ?", [rows[0].bankId]);
        const data = rows.map((row) => ({
            id: row.id,
            amount: row.amount,
            account_number: row.account_number,
            bankId: row.bankId,
            account_name: row.account_name,
            bankName: bank[0].name,
            status: row.status,
        }));
        res.json({ success: true, data: data });
    }
    catch (error) {
        res.json({ success: false, message: "Withdraw request failed" });
        console.log(error);
    }
});
exports.getRequestWithdraw = getRequestWithdraw;
