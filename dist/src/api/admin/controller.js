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
exports.createAdmin = void 0;
const db_1 = __importDefault(require("../../../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const saltRounds = 10;
        const bcryptedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        console.log(username, email, bcryptedPassword);
        yield db_1.default.query("INSERT INTO admin (username, email, password, status) VALUES (?, ?, ?, ?)", [username, email, bcryptedPassword, 1]);
        return res.status(201).json({ message: "Admin created", username, email });
    }
    catch (error) {
        console.error("Error creating admin: ", error.message); // Logging error
        return res.status(500).json({ error: error.message });
    }
});
exports.createAdmin = createAdmin;
