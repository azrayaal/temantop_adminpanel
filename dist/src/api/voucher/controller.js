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
exports.redeemVoucher = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../../../db"));
dotenv_1.default.config();
const redeemVoucher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { voucher } = req.body;
    const user = req.user;
    const [vouchers] = yield db_1.default.query("SELECT * FROM voucher WHERE unique_code = ?", [voucher]);
    if (vouchers.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "Voucher not found" });
    }
    const voucherData = vouchers[0];
    if (voucherData.is_used === 1) {
        return res
            .status(400)
            .json({ success: false, message: "Voucher already redeemed" });
    }
    if (voucherData) {
        yield db_1.default.query("UPDATE voucher SET is_used = 1, redeem_by = ? WHERE unique_code = ?", [user === null || user === void 0 ? void 0 : user.id, voucher]);
        yield db_1.default.query("UPDATE user SET balance = balance + ? WHERE id = ?", [voucherData.price, user === null || user === void 0 ? void 0 : user.id]);
        yield db_1.default.query("INSERT INTO topup_transaction (userId, amount, description) VALUES (?, ?, ?)", [user === null || user === void 0 ? void 0 : user.id, voucherData.price, `Redeemed voucher ${voucherData.name}(${voucher})`]);
        res.json({ success: true, message: `Success redeem voucher ${voucher}` });
    }
});
exports.redeemVoucher = redeemVoucher;
