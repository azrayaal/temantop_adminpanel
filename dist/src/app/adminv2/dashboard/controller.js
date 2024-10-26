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
exports.index = void 0;
const db_1 = __importDefault(require("../../../../db"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const [agentRows] = yield db_1.default.query("SELECT COUNT(*) AS count FROM user where stream = 1");
        const [userRows] = yield db_1.default.query("SELECT COUNT(*) AS count FROM user where stream = 0");
        const [giftRows] = yield db_1.default.query("SELECT COUNT(*) AS count FROM gift");
        const [voucherRows] = yield db_1.default.query("SELECT COUNT(*) AS count FROM voucher");
        const [bankRows] = yield db_1.default.query("SELECT COUNT(*) AS count FROM bank");
        const [transactionRows] = yield db_1.default.query("SELECT COUNT(*) AS count FROM transaction");
        res.render("adminv2/index", {
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Dashboard - Yong",
            count: {
                agent: agentRows[0].count,
                user: userRows[0].count,
                gift: giftRows[0].count,
                voucher: voucherRows[0].count,
                bank: bankRows[0].count,
                transaction: transactionRows[0].count,
            },
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.index = index;
