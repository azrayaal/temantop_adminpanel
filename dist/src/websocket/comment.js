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
exports.default = setupWebSocket;
const db_1 = __importDefault(require("../../db"));
const controller_1 = require("../apiv2/testAccountBalance/controller");
function setupWebSocket(io) {
    // Object to track the number of users in each channel
    const channelViewCount = {};
    // Function to format viewer count (e.g., 1000 -> 1k)
    const formatViewCount = (count) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
        }
        return count.toString();
    };
    io.on("connection", (socket) => {
        console.log("A user connected");
        socket.on("join room", (channelName, username, userId, isOwner) => {
            socket.join(channelName);
            socket.on("babik", (data) => {
                console.log("Received test event from client:", data);
            });
            // Save userId in the socket (for disconnect handling)
            socket.userId = userId;
            socket.channelName = channelName;
            socket.isOwner = isOwner;
            // Also save the channelName
            // If channel doesn't exist, create a new Set to track viewers
            if (!channelViewCount[channelName]) {
                channelViewCount[channelName] = new Set();
            }
            // Add the userId to the room's viewer set
            if (!channelViewCount[channelName].has(userId)) {
                channelViewCount[channelName].add(userId);
            }
            // Emit the updated view count after adding the user (subtract 1 if owner is present)
            const totalViewCount = channelViewCount[channelName].size;
            // const actualViewCount = totalViewCount - 1;
            // Emit updated view count after adding the user
            io.to(channelName).emit("joinViewCount", 
            // formatViewCount(actualViewCount)
            formatViewCount(totalViewCount - 1));
            // Emit a message to everyone in the room that the user has joined
            io.to(channelName).emit("user joined", {
                message: `${username} has joined`,
            });
            console.log(`${username} has joined`);
        });
        // Listen for chat messages and broadcast to the specific room
        socket.on("chat message", ({ channelName, message, username }) => {
            // Broadcast the message to all clients in the same room
            io.to(channelName).emit("chat message", message, username);
        });
        // Handle sending of gifts
        socket.on("send gift", (_a) => __awaiter(this, [_a], void 0, function* ({ channelName, userId, giftId }) {
            try {
                // Retrieve user balance for the sender
                const [userRows] = yield db_1.default.query("SELECT balance, username, player_id FROM user WHERE id = ?", [userId]);
                if (userRows.length === 0) {
                    console.error(`User with ID ${userId} not found.`);
                    socket.emit("error", { message: "User not found." });
                    return;
                }
                const userBalance = parseInt(userRows[0].balance, 10); // Convert to integer
                const senderName = userRows[0].username;
                const player_id = userRows[0].player_id;
                // Retrieve gift details
                const [giftRows] = yield db_1.default.query("SELECT giftName, img, giftLink, price FROM gift WHERE id = ?", [giftId]);
                if (giftRows.length === 0) {
                    console.error(`Gift with ID ${giftId} not found.`);
                    socket.emit("error", { message: "Gift not found." });
                    return;
                }
                const giftDetails = giftRows[0];
                const giftPrice = parseInt(giftDetails.price, 10); // Convert to integer
                if (userBalance < giftPrice) {
                    console.error(`User with ID ${userId} has insufficient balance.`);
                    socket.emit("error", { message: "Insufficient balance." });
                    return;
                }
                // Deduct gift price from user balance
                const newBalance = userBalance - giftPrice;
                if (isNaN(newBalance)) {
                    console.error("Calculated balance is NaN, aborting update.");
                    socket.emit("error", { message: "Error calculating balance." });
                    return;
                }
                // Retrieve the recipient user who owns the channelName
                const [recipientRows] = yield db_1.default.query("SELECT id, balance, username FROM user WHERE channelName = ?", [channelName]);
                if (recipientRows.length === 0) {
                    console.error(`No user found with channelName ${channelName}.`);
                    socket.emit("error", { message: "Recipient not found." });
                    return;
                }
                const recipientUser = recipientRows[0];
                const recipientBalance = parseInt(recipientUser.balance, 10) + giftPrice;
                if (isNaN(recipientBalance)) {
                    console.error("Calculated recipient balance is NaN, aborting update.");
                    socket.emit("error", {
                        message: "Error calculating recipient balance.",
                    });
                    return;
                }
                const description = `payment for gift ${giftDetails.giftName} `;
                // Update balance in the recipient account
                yield db_1.default.query("UPDATE user SET balance = ? WHERE id = ?", [
                    recipientBalance,
                    recipientUser.id,
                ]);
                // update balance in sender account
                yield db_1.default.query("UPDATE user SET balance = ? WHERE id = ?", [
                    newBalance,
                    userId,
                ]);
                // Log the transaction
                const [giftResult] = yield db_1.default.query("INSERT INTO gift_transaction (userId, receivedId, giftId, giftName, amount, description) VALUES (?, ?, ?, ?, ?, ?)", [
                    userId,
                    recipientUser.id,
                    giftId,
                    giftDetails.giftName,
                    giftPrice,
                    description,
                ]);
                const giftTransactionId = giftResult.insertId;
                yield db_1.default.query("INSERT INTO transaction (userId, transactionType, transactionId) VALUES (?, ?, ?)", [
                    userId,
                    'gift_transaction',
                    giftTransactionId,
                ]);
                // Broadcast the gift details to all clients in the room
                io.to(channelName).emit("gift received", {
                    giftDetails: giftDetails,
                    giftName: giftDetails.giftName,
                    img: giftDetails.img,
                    giftLink: giftDetails.giftLink,
                    price: giftDetails.price,
                    senderId: userId,
                    senderName: senderName,
                    recipientId: recipientUser.id,
                    recipientName: recipientUser.username,
                });
            }
            catch (err) {
                console.error("Error processing gift transaction:", err);
                socket.emit("error", {
                    message: "An error occurred during the transaction.",
                });
            }
        }));
        ///////////////////////////////////
        const activeSockets = {}; // Tipe object dengan kunci dan nilai berupa string
        // udah gakepake ges apus aja tapi ganti player_id jadi user_id
        socket.on("startBalanceUpdates", (player_id) => __awaiter(this, void 0, void 0, function* () {
            console.log(`Starting balance updates for player_id: ${player_id}`);
            // Cek jika player_id sudah memiliki koneksi aktif
            if (activeSockets[player_id]) {
                const oldSocketId = activeSockets[player_id];
                // Menggunakan pengecekan eksplisit untuk memastikan oldSocket tidak undefined
                const oldSocket = io.sockets.sockets.get(oldSocketId);
                if (oldSocket) {
                    console.log(`Disconnecting previous socket for player_id: ${player_id}`);
                    oldSocket.disconnect(true);
                }
            }
            // Simpan socket.id untuk player yang baru
            activeSockets[player_id] = socket.id;
            let previousBalance = null;
            let isActive = true; // Flag untuk melacak apakah socket masih aktif
            const checkBalance = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const balance = yield (0, controller_1.fetchBalance)(player_id);
                    if (balance !== previousBalance) {
                        console.log(`Balance updated for player_id ${player_id}: ${balance}`);
                        previousBalance = balance;
                        socket.emit("balanceUpdate", { balance });
                    }
                    yield db_1.default.query(`UPDATE user SET balance = ? WHERE player_id = ?`, [
                        balance,
                        player_id,
                    ]);
                    console.log(`Balance updated in DB for player_id ${player_id}`);
                    // Lanjutkan pengecekan balance setiap 5 detik jika socket masih aktif
                    if (isActive) {
                        setTimeout(checkBalance, 5000);
                    }
                }
                catch (error) {
                    console.error("Error fetching balance:", error);
                    socket.emit("error", { message: "Error fetching balance" });
                }
            });
            // Mulai pengecekan balance
            checkBalance();
            // Hapus player dari activeSockets dan set isActive ke false saat socket terputus
            socket.on("disconnect", () => {
                if (activeSockets[player_id] === socket.id) {
                    delete activeSockets[player_id];
                }
                isActive = false; // Set flag menjadi false untuk menghentikan loop pembaruan saldo
            });
        }));
        ///////////////////////////////////////// NOTIF ////////////////////////////////////
        // Fungsi untuk memeriksa notifikasi yang belum dibaca dan mengirim notifikasi
        function checkUnreadNotifications(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // Ambil notifikasi yang belum dibaca (is_read = 0) dari tabel
                    const [notifications] = yield db_1.default.query("SELECT * FROM notifications WHERE userId = ? AND is_read = 0", [userId]);
                    // Jika ada notifikasi yang belum dibaca, kirim notifikasi melalui socket
                    if (notifications.length > 0 && activeSockets[userId]) {
                        const socketId = activeSockets[userId];
                        io.to(socketId).emit("newNotification", {
                            message: `You have ${notifications.length} unread notifications.`,
                            notifications: notifications,
                        });
                        console.log(`Notification sent to userId: ${userId}`);
                    }
                    else {
                        console.log(`No unread notifications found for userId: ${userId}`);
                    }
                }
                catch (error) {
                    console.error("Error checking unread notifications:", error);
                }
            });
        }
        // Saat pengguna mengirimkan permintaan untuk mulai menerima pembaruan
        socket.on("startNotificationUpdates", (userId) => __awaiter(this, void 0, void 0, function* () {
            console.log(`Starting notification updates for userId: ${userId}`);
            // Cek jika userId sudah memiliki koneksi aktif
            if (activeSockets[userId]) {
                const oldSocketId = activeSockets[userId];
                const oldSocket = io.sockets.sockets.get(oldSocketId);
                // Jika socket lama ada, putuskan koneksi
                if (oldSocket) {
                    console.log(`Disconnecting previous socket for userId: ${userId}`);
                    oldSocket.disconnect(true);
                }
            }
            // Simpan socket.id yang baru untuk userId
            activeSockets[userId] = socket.id;
            // Periksa notifikasi yang belum dibaca untuk pengguna ini
            yield checkUnreadNotifications(userId);
        }));
        //////////////////////////////////////////////////////////////////
        socket.on("disconnect", () => {
            console.log("A user disconnected");
            const userId = socket.userId;
            const channelName = socket.channelName;
            if (channelName && userId && channelViewCount[channelName]) {
                // Remove the userId from the room's viewer set
                if (channelViewCount[channelName].has(userId)) {
                    channelViewCount[channelName].delete(userId);
                    const totalViewCount = channelViewCount[channelName].size;
                    const actualViewCount = socket.isOwner
                        ? totalViewCount
                        : totalViewCount;
                    // Emit the updated viewer count to the room
                    io.to(channelName).emit("joinViewCount", formatViewCount(actualViewCount));
                    console.log(`Updated view count for room ${channelName}: ${actualViewCount}`);
                }
            }
        });
    });
}
