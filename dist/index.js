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
const socket_io_1 = require("socket.io"); // Import Socket.IO
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
//api v1
const router_11 = __importDefault(require("./src/api/merchant/router"));
const router_12 = __importDefault(require("./src/api/token/router"));
const router_13 = __importDefault(require("./src/api/gift/router"));
const router_14 = __importDefault(require("./src/api/games/game/router"));
const router_15 = __importDefault(require("./src/api/games/genre/router"));
const router_16 = __importDefault(require("./src/api/profile/auth/router"));
const router_17 = __importDefault(require("./src/api/profile/detail/router"));
const router_18 = __importDefault(require("./src/api/live/streamSession/router"));
const router_19 = __importDefault(require("./src/api/live/streamResults/router"));
const router_20 = __importDefault(require("./src/api/live/viewStream/router"));
const router_21 = __importDefault(require("./src/api/notifications/router"));
const router_22 = __importDefault(require("./src/api/search/router"));
const router_23 = __importDefault(require("./src/api/activity/router"));
const router_24 = __importDefault(require("./src/api/transaction/gift_transaction/router"));
const router_25 = __importDefault(require("./src/api/transaction/router"));
const router_26 = __importDefault(require("./src/api/transaction/session_transation/router"));
const router_27 = __importDefault(require("./src/api/profile/agent/router"));
const router_28 = __importDefault(require("./src/api/launch/router"));
const router_29 = __importDefault(require("./src/api/voucher/router"));
const router_30 = __importDefault(require("./src/api/admin/router"));
const router_31 = __importDefault(require("./src/api/withdraw/router"));
const router_32 = __importDefault(require("./src/api/bank/router"));
const comment_1 = __importDefault(require("./src/websocket/comment"));
// apijoyo
const router_33 = __importDefault(require("./src/apiv2/token/router"));
dotenv_1.default.config();
const port = process.env.PORT || 3307;
const app = (0, express_1.default)();
const URL = `/api/v1`;
// Create an HTTP server
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Allow all origins for testing
        methods: ["GET", "POST"],
    },
});
// Initialize WebSocket server
(0, comment_1.default)(io);
// view engine setup
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "src/views"));
// Serve static files from the public directory
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/uploads", express_1.default.static("public/uploads"));
app.use("/corona", express_1.default.static(path_1.default.join(__dirname, "public/corona")));
app.use((0, method_override_1.default)("_method"));
// Middleware
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
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
app.use("/", router_33.default);
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
// Route for the api
app.use(`${URL}/token`, router_12.default);
app.use(`${URL}/gift`, router_13.default);
app.use(`${URL}/merchant`, router_11.default);
app.use(`${URL}/game`, router_14.default);
app.use(`${URL}/genre`, router_15.default);
app.use(`${URL}/auth`, router_16.default);
app.use(`${URL}/stream_session`, router_18.default);
app.use(`${URL}/view_stream`, router_20.default);
app.use(`${URL}/stream_result`, router_19.default);
app.use(`${URL}/notifications`, router_21.default);
app.use(`${URL}/profile`, router_17.default);
app.use(`${URL}/search`, router_22.default);
app.use(`${URL}/activity`, router_23.default);
app.use(`${URL}/gift_transaction`, router_24.default);
app.use(`${URL}/transaction`, router_25.default);
app.use(`${URL}/session_transaction`, router_26.default);
app.use(`${URL}/agent`, router_27.default);
app.use(`${URL}/launch`, router_28.default);
app.use(`${URL}/redeem`, router_29.default);
app.use(`${URL}/admin`, router_30.default);
app.use(`${URL}/withdraw`, router_31.default);
app.use(`${URL}/bank`, router_32.default);
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
