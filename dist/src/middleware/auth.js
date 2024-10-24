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
exports.isLoginUser = exports.isLoginAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../../db"));
const JWT_SECRET = "your_secret_key_here";
const isLoginAdmin = (req, res, next) => {
    if (!req.session.user) {
        req.flash("alertMessage", "Sorry you are not authorized to access this page");
        req.flash("alertStatus", "danger");
        return res.redirect("/admin/auth");
    }
    else {
        next();
    }
};
exports.isLoginAdmin = isLoginAdmin;
// export const isLoginUser = async (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.headers.authorization?.replace("Bearer ", "") ?? null;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No token provided" });
//     }
//     // Cek apakah token ada di dalam blacklist di database
//     const [blacklistedToken]: any = await pool.query(
//       "SELECT * FROM token_blacklist WHERE token = ?",
//       [token]
//     );
//     if (blacklistedToken.length > 0) {
//       return res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }
//     jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
//       if (err) {
//         if (err.name === "TokenExpiredError") {
//           return res
//             .status(401)
//             .json({ message: "Unauthorized: Token has expired" });
//         } else {
//           return res
//             .status(401)
//             .json({ message: "Unauthorized: Invalid token" });
//         }
//       }
//       req.user = decoded.userData; // Ensure this contains valid token type
//       next();
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error processing authentication", error });
//   }
// };
const isLoginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) !== null && _b !== void 0 ? _b : null;
        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized: No token provided" });
        }
        // Cek apakah token ada di dalam blacklist di database
        const [blacklistedToken] = yield db_1.default.query("SELECT * FROM token_blacklist WHERE token = ?", [token]);
        if (blacklistedToken.length > 0) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    // Jika token expired, logout user secara otomatis
                    yield db_1.default.query("UPDATE user SET online = 0, jwt_token = NULL, is_logged_in = false WHERE id = ?", [decoded.userId]);
                    return res.status(401).json({
                        message: "Unauthorized: Token has expired. Please log in again.",
                    });
                }
                else {
                    return res
                        .status(401)
                        .json({ message: "Unauthorized: Invalid token" });
                }
            }
            req.user = decoded.userData; // Assign token data ke request
            next();
        }));
    }
    catch (error) {
        res.status(500).json({ message: "Error processing authentication", error });
    }
});
exports.isLoginUser = isLoginUser;
