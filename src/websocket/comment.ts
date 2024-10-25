import { Server as SocketIOServer } from "socket.io";
import pool from "../../db";
import { RowDataPacket } from "mysql2";
import { fetchBalance } from "../apiv2/testAccountBalance/controller";

export default function setupWebSocket(io: SocketIOServer) {
  // Object to track the number of users in each channel
  const channelViewCount: Record<string, Set<string>> = {};

  // Function to format viewer count (e.g., 1000 -> 1k)
  const formatViewCount = (count: number): string => {
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
      (socket as any).userId = userId;
      (socket as any).channelName = channelName;
      (socket as any).isOwner = isOwner;
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
      io.to(channelName).emit(
        "joinViewCount",
        // formatViewCount(actualViewCount)
        formatViewCount(totalViewCount)
      );

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
    socket.on("send gift", async ({ channelName, userId, giftId }) => {
      try {
        // Retrieve user balance for the sender
        const [userRows] = await pool.query<RowDataPacket[]>(
          "SELECT balance, username, player_id FROM user WHERE id = ?",
          [userId]
        );

        if (userRows.length === 0) {
          console.error(`User with ID ${userId} not found.`);
          socket.emit("error", { message: "User not found." });
          return;
        }

        const userBalance = parseInt(userRows[0].balance, 10); // Convert to integer
        const senderName = userRows[0].username;
        const player_id = userRows[0].player_id;

        // Retrieve gift details
        const [giftRows] = await pool.query<RowDataPacket[]>(
          "SELECT giftName, img, giftLink, price FROM gift WHERE id = ?",
          [giftId]
        );

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
        const [recipientRows] = await pool.query<RowDataPacket[]>(
          "SELECT id, balance, username FROM user WHERE channelName = ?",
          [channelName]
        );

        if (recipientRows.length === 0) {
          console.error(`No user found with channelName ${channelName}.`);
          socket.emit("error", { message: "Recipient not found." });
          return;
        }

        const recipientUser = recipientRows[0];
        const recipientBalance =
          parseInt(recipientUser.balance, 10) + giftPrice;

        if (isNaN(recipientBalance)) {
          console.error(
            "Calculated recipient balance is NaN, aborting update."
          );
          socket.emit("error", {
            message: "Error calculating recipient balance.",
          });
          return;
        }

        const description = `payment for gift ${giftDetails.giftName} `;

        // Update balance in the recipient account
        await pool.query("UPDATE user SET balance = ? WHERE id = ?", [
          recipientBalance,
          recipientUser.id,
        ]);

        // update balance in sender account
        await pool.query("UPDATE user SET balance = ? WHERE id = ?", [
          newBalance,
          userId,
        ]);

        // Log the transaction
        await pool.query(
          "INSERT INTO gift_transaction (userId, receivedId, giftId, giftName, amount, description) VALUES (?, ?, ?, ?, ?, ?)",
          [
            userId,
            recipientUser.id,
            giftId,
            giftDetails.giftName,
            giftPrice,
            description,
          ]
        );

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
      } catch (err) {
        console.error("Error processing gift transaction:", err);
        socket.emit("error", {
          message: "An error occurred during the transaction.",
        });
      }
    });

    ///////////////////////////////////

    const activeSockets: Record<string, string> = {}; // Tipe object dengan kunci dan nilai berupa string
    // udah gakepake ges apus aja tapi ganti player_id jadi user_id
    socket.on("startBalanceUpdates", async (player_id: string) => {
      console.log(`Starting balance updates for player_id: ${player_id}`);

      // Cek jika player_id sudah memiliki koneksi aktif
      if (activeSockets[player_id]) {
        const oldSocketId = activeSockets[player_id];

        // Menggunakan pengecekan eksplisit untuk memastikan oldSocket tidak undefined
        const oldSocket = io.sockets.sockets.get(oldSocketId);

        if (oldSocket) {
          console.log(
            `Disconnecting previous socket for player_id: ${player_id}`
          );
          oldSocket.disconnect(true);
        }
      }

      // Simpan socket.id untuk player yang baru
      activeSockets[player_id] = socket.id;

      let previousBalance: any = null;
      let isActive = true; // Flag untuk melacak apakah socket masih aktif

      const checkBalance = async () => {
        try {
          const balance = await fetchBalance(player_id);

          if (balance !== previousBalance) {
            console.log(
              `Balance updated for player_id ${player_id}: ${balance}`
            );
            previousBalance = balance;
            socket.emit("balanceUpdate", { balance });
          }

          await pool.query(`UPDATE user SET balance = ? WHERE player_id = ?`, [
            balance,
            player_id,
          ]);
          console.log(`Balance updated in DB for player_id ${player_id}`);

          // Lanjutkan pengecekan balance setiap 5 detik jika socket masih aktif
          if (isActive) {
            setTimeout(checkBalance, 5000);
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
          socket.emit("error", { message: "Error fetching balance" });
        }
      };

      // Mulai pengecekan balance
      checkBalance();

      // Hapus player dari activeSockets dan set isActive ke false saat socket terputus
      socket.on("disconnect", () => {
        if (activeSockets[player_id] === socket.id) {
          delete activeSockets[player_id];
        }
        isActive = false; // Set flag menjadi false untuk menghentikan loop pembaruan saldo
      });
    });

    // socket.on("disconnect", () => {
    //   console.log("A user disconnected");

    //   // Get the userId and channelName from the socket
    //   const userId = (socket as any).userId;
    //   const channelName = (socket as any).channelName;

    //   if (channelName && userId && channelViewCount[channelName]) {
    //     // Remove the userId from the room's viewer set
    //     if (channelViewCount[channelName].has(userId)) {
    //       channelViewCount[channelName].delete(userId);

    //       const newViewersCount = channelViewCount[channelName].size; // Get updated viewer count

    //       // Emit the updated viewer count to the room
    //       io.to(channelName).emit(
    //         "joinViewCount",
    //         formatViewCount(newViewersCount)
    //       );

    //       console.log(
    //         `Updated view count for room ${channelName}: ${newViewersCount}`
    //       );
    //     }
    //   }
    // });

    socket.on("disconnect", () => {
      console.log("A user disconnected");

      const userId = (socket as any).userId;
      const channelName = (socket as any).channelName;

      if (channelName && userId && channelViewCount[channelName]) {
        // Remove the userId from the room's viewer set
        if (channelViewCount[channelName].has(userId)) {
          channelViewCount[channelName].delete(userId);

          const totalViewCount = channelViewCount[channelName].size;
          const actualViewCount = (socket as any).isOwner
            ? totalViewCount - 1
            : totalViewCount;

          // Emit the updated viewer count to the room
          io.to(channelName).emit(
            "joinViewCount",
            formatViewCount(actualViewCount)
          );

          console.log(
            `Updated view count for room ${channelName}: ${actualViewCount}`
          );
        }
      }
    });
  });
}
