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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const method_override_1 = __importDefault(require("method-override"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const http_1 = __importDefault(require("http")); // Import the HTTP module
// admin viewV2
const router_1 = __importDefault(require("./src/app/adminv2/admins/router"));
const router_2 = __importDefault(require("./src/app/adminv2/dashboard/router"));
const router_3 = __importDefault(require("./src/app/adminv2/user/router"));
const router_4 = __importDefault(require("./src/app/adminv2/agent/router"));
const router_5 = __importDefault(require("./src/app/adminv2/gift/router"));
const router_6 = __importDefault(require("./src/app/adminv2/voucher/router"));
const router_7 = __importDefault(require("./src/app/adminv2/transaction/router"));
const router_8 = __importDefault(require("./src/app/adminv2/auth/router"));
const router_9 = __importDefault(require("./src/app/adminv2/bank/router"));
const router_10 = __importDefault(require("./src/app/adminv2/withdraw/router"));
dotenv_1.default.config();
const port = process.env.PORT || 3307;
const app = (0, express_1.default)();
const URL = `/api/v1`;
// Create an HTTP server
const server = http_1.default.createServer(app);
// view engine setup
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "src/views"));
// Serve static files from the public directory
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/uploads", express_1.default.static("public/uploads"));
app.use("/adminlte", express_1.default.static(path_1.default.join(__dirname, "public/adminlte")));
app.use("/corona", express_1.default.static(path_1.default.join(__dirname, "public/corona")));
app.use((0, method_override_1.default)("_method"));
// Middleware
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: "lax", // Set to 'lax' or 'strict' for local development
        // secure: true, // Uncomment only when using HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
}));
app.use((0, connect_flash_1.default)());
app.use((0, cors_1.default)({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers if needed
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Route for default page (root page)
app.get("/", (req, res) => {
    res.redirect("/admin/dashboard");
});
// Route for the admin view
app.use("/admin/dashboard", router_2.default);
app.use("/admin/user", router_3.default);
app.use("/admin/agent", router_4.default);
app.use("/admin/gift", router_5.default);
app.use("/admin/voucher", router_6.default);
app.use("/admin/transaction", router_7.default);
app.use("/admin/auth", router_8.default);
app.use("/admins", router_1.default);
app.use("/admin/bank", router_9.default);
app.use("/admin/withdraw", router_10.default);
// Start the server
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
// database connection check
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield db_1.default.getConnection();
        console.log("Connected to the database");
        connection.release();
    }
    catch (err) {
        console.error("Error connecting to the database:", err);
    }
});
connectToDatabase();
