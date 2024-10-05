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
exports.getUserLiveStreamReport = exports.changeStatusStream = exports.changeStatus = exports.actionEdit = exports.indexEdit = exports.actionDelete = exports.actionCreate = exports.randomString = exports.indexCreate = exports.index = void 0;
const db_1 = __importDefault(require("../../../../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Ambil data dari tabel agent
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const [agent] = yield db_1.default.query("SELECT * FROM user where stream = 1");
        // Render halaman dengan data agent
        res.render("adminv2/pages/agent/index", {
            agent,
            alert,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            // name: req.session.user.name,
            title: "Halaman Agent",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman agent
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/");
    }
});
exports.index = index;
const indexCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    try {
        // Render halaman dengan data agent
        res.render("adminv2/pages/agent/create", {
            // agent,
            alert,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            title: "Halaman create Agent",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman agent
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/agent");
    }
});
exports.indexCreate = indexCreate;
const randomString = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.randomString = randomString;
const actionCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, password, email } = req.body;
        const saltRounds = 10;
        const profilePicture = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) ||
            "avatardefault1.jpeg" ||
            "avatardefault2.jpeg" ||
            "avatardefault3.jpeg" ||
            "avatardefault4.jpeg" ||
            "avatardefault5.jpeg" ||
            "avatardefault6.jpeg" ||
            "avatardefault7.jpeg" ||
            "avatardefault8.jpeg" ||
            "avatardefault9.jpeg";
        const player_id = (0, exports.randomString)(8);
        const [checkEmail] = yield db_1.default.query("SELECT * FROM user WHERE email = ?", [email]);
        if (checkEmail.length > 0) {
            req.flash("alertMessage", "Email already exists");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/agent/create");
        }
        const [checkUsername] = yield db_1.default.query("SELECT * FROM user WHERE username = ?", [username]);
        if (checkUsername.length > 0) {
            req.flash("alertMessage", "Username already exists");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/agent/create");
        }
        // Hash the password
        const passwordBrcypted = yield bcryptjs_1.default.hash(password, saltRounds);
        const stream = 1;
        yield db_1.default.query("INSERT INTO user ( email, username, password, profilePicture, stream, channelName, player_id) VALUES (?, ?, ?, ?, ?, ?, ?);", [
            email,
            username,
            passwordBrcypted,
            profilePicture,
            stream,
            username,
            player_id,
        ]);
        res.redirect("/admin/agent");
    }
    catch (err) {
        res.status(500).send(err.message);
        console.log(err);
    }
});
exports.actionCreate = actionCreate;
const actionDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("DELETE FROM user WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "Agent not found");
            req.flash("alertStatus", "danger");
        }
        else {
            req.flash("alertMessage", "Berhasil hapus agent");
            req.flash("alertStatus", "success");
        }
        res.redirect("/admin/agent");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/agent");
    }
});
exports.actionDelete = actionDelete;
const indexEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        // Ambil ID dari parameter request
        const { id } = req.params;
        // Ambil data dari tabel agent
        const [rows] = yield db_1.default.query("SELECT * FROM user WHERE id = ?", [id]);
        // Periksa apakah agen ditemukan
        if (rows.length === 0) {
            req.flash("alertMessage", "Agent not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/agent");
        }
        const agent = rows[0];
        // Render halaman dengan data agent
        res.render("adminv2/pages/agent/edit", {
            agent,
            alert,
            name: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.email,
            // name: req.session.user.name,
            title: "Halaman Edit Agent",
        });
    }
    catch (err) {
        // Jika terjadi kesalahan, redirect ke halaman agent
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/agent");
    }
});
exports.indexEdit = indexEdit;
// Handler untuk menangani pembaruan data agen
const actionEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { username, password, channelName } = req.body;
        const passwordBrcypted = yield bcryptjs_1.default.hash(password, 10);
        const profilePicture = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        const [checkChannelName] = yield db_1.default.query("SELECT * FROM user WHERE channelName = ?", [channelName]);
        if (checkChannelName.length > 0) {
            req.flash("alertMessage", "Channel name already exists");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/agent/create");
        }
        const [checkUsername] = yield db_1.default.query("SELECT * FROM user WHERE username = ?", [username]);
        if (checkUsername.length > 0) {
            req.flash("alertMessage", "Username already exists");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/agent/create");
        }
        const [result] = yield db_1.default.query("UPDATE user SET  username = ?, profilePicture = ?, channelName = ?, password = ? WHERE id = ?", [username, profilePicture, channelName, passwordBrcypted, id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "Agent not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/agent");
        }
        req.flash("alertMessage", "Berhasil mengedit agent");
        req.flash("alertStatus", "success");
        res.redirect("/admin/agent");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/agent");
    }
});
exports.actionEdit = actionEdit;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("berhasil status");
        const { id } = req.params;
        const [result] = yield db_1.default.query("UPDATE user SET status = !status WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "Agent not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/agent");
        }
        req.flash("alertMessage", "Berhasil mengubah status agent");
        req.flash("alertStatus", "success");
        res.redirect("/admin/agent");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/agent");
    }
});
exports.changeStatus = changeStatus;
const changeStatusStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("berhasil stream");
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.query("UPDATE user SET stream = !stream WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            req.flash("alertMessage", "Agent not found");
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/agent");
        }
        req.flash("alertMessage", "Berhasil mengubah status agent");
        req.flash("alertStatus", "success");
        res.redirect("/admin/agent");
    }
    catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/agent");
    }
});
exports.changeStatusStream = changeStatusStream;
const getUserLiveStreamReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { id } = req.params; // ID dari user yang ingin diambil laporannya
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
        // Ambil informasi user
        const [userRows] = yield db_1.default.query(`SELECT username FROM user WHERE id = ?`, [id]);
        if (userRows.length === 0) {
            return res.status(404).send("User not found");
        }
        const username = userRows[0].username;
        // Ambil total durasi streaming dan total viewers langsung dari stream_result
        const [totalStreamData] = yield db_1.default.query(`SELECT 
        IFNULL(SUM(r.duration), 0) AS totalDuration, 
        IFNULL(SUM(r.total_view), 0) AS totalViewers 
      FROM stream_result r
      JOIN stream_session s ON r.stream_sessionId = s.id
      WHERE s.userId = ?`, [id]);
        const { totalDuration, totalViewers } = totalStreamData[0];
        // Fungsi untuk memformat durasi ke dalam menit dan detik
        const formatDuration = (seconds) => {
            if (seconds < 60) {
                return `${seconds} seconds`;
            }
            else {
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                return remainingSeconds === 0
                    ? `${minutes} minutes`
                    : `${minutes} minutes ${remainingSeconds} seconds`;
            }
        };
        // Format total durasi sebelum dikirim ke view
        const formattedTotalDuration = formatDuration(totalDuration);
        // Dapatkan total jumlah sesi untuk pagination
        const [countRows] = yield db_1.default.query(`SELECT COUNT(*) AS total 
       FROM stream_session 
       WHERE userId = ?`, [id]);
        const totalSessions = ((_a = countRows[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        // Ambil 10 sesi streaming terbaru berdasarkan pagination
        const [streamRows] = yield db_1.default.query(`SELECT 
        s.title, 
        s.thumbnail, 
        r.duration, 
        r.total_view, 
        s.createdAt 
      FROM stream_result r
      JOIN stream_session s ON r.stream_sessionId = s.id
      WHERE s.userId = ? 
      ORDER BY s.createdAt DESC 
      LIMIT ? OFFSET ?`, [id, limit, offset]);
        // Format durasi untuk setiap stream
        const formattedStreams = streamRows.map((stream) => (Object.assign(Object.assign({}, stream), { formattedDuration: formatDuration(stream.duration) })));
        const totalPages = Math.ceil(totalSessions / limit);
        // Kirimkan data laporan ke view
        res.render("adminv2/pages/agent/liveReport", {
            title: "Live Stream Report",
            name: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.username,
            email: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.email,
            username,
            totalDuration: formattedTotalDuration, // Durasi total sudah diformat
            totalViewers,
            streams: formattedStreams, // Streams dengan durasi yang sudah diformat
            currentPage: page,
            totalPages,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.getUserLiveStreamReport = getUserLiveStreamReport;
