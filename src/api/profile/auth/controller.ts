import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import pool from "../../../../db"; // Adjust the import according to your actual db configuration
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
require("dotenv").config();
import axios from "axios";
import https from "https";
import { randomString } from "../../../app/adminv2/agent/controller";

// import { OAuth2Client } from "google-auth-library";
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

const addBalance = async (player_id: string) => {
  try {
    const balanceResponse = await axios.post(
      "https://api.teman.top/api/v1/str/balance",
      { player_id: player_id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (balanceResponse.status !== 200) {
      throw new Error("Failed to fetch balance");
    }
    const balance = parseFloat(balanceResponse.data.data.toFixed(6));
    return balance;
  } catch (error) {
    console.error("Error during add balance:", error);
    throw error;
  }
};

const getBalance = async (player_id: string) => {
  try {
    const newBalance = await addBalance(player_id);
    const [updateResult]: [ResultSetHeader, FieldPacket[]] = await pool.query(
      "UPDATE user SET balance = ? WHERE player_id = ?",
      [newBalance, player_id]
    );
    if (updateResult.affectedRows === 0) {
      throw new Error("Failed to update balance in the database");
    }
    return newBalance;
  } catch (error) {
    console.error("Error during get balance:", error);
    throw error;
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const profilePictures = [
    "avatardefault1.png",
    "avatardefault2.png",
    "avatardefault3.png",
    "avatardefault4.png",
    "avatardefault5.png",
    "avatardefault6.png",
    "avatardefault7.png",
    "avatardefault8.png",
    "avatardefault9.png",
  ];

  const profilePictureShuffle =
    profilePictures[Math.floor(Math.random() * profilePictures.length)];

  const profilePicture = req.file?.filename || profilePictureShuffle;

  const saltRounds = 10;
  const bcryptedPassword = await bcrypt.hash(password, saltRounds);

  try {
    // Check if the email already exists
    const [existingEmail]: any = await pool.query(
      "SELECT * FROM user WHERE email = ? ",
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // add player_id
      // Generate a unique player_id
      let player_id = randomString(8);

      while (true) {
        const [checkPlayerId]: any = await pool.query(
          "SELECT * FROM user WHERE player_id = ?",
          [player_id]
        );
  
        if (checkPlayerId.length === 0) {
          break; // Player ID is unique
        }
        
        // Generate a new player_id if it already exists
        player_id = randomString(8);
      }  

    // Check if the username  already exists
    const [existingUsername]: any = await pool.query(
      "SELECT * FROM user WHERE username = ? ",
      [username]
    );

    const [existingChannelName]: any = await pool.query(
      "SELECT * FROM user WHERE channelName = ? ",
      [username]
    );

    if (existingUsername.length > 0 || existingChannelName.length > 0) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Insert the new user into the database
    await pool.query<ResultSetHeader>(
      "INSERT INTO user (email, username, profilePicture, password, channelName, player_id) VALUES (?, ?, ?, ?, ?, ?)",
      [email, username, profilePicture, bcryptedPassword, username, player_id]
    );

    res.json({
      success: true,
      message: "Registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error during register", error });
  }
};

export const registerAgent = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const profilePictures = [
    "avatardefault1.png",
    "avatardefault2.png",
    "avatardefault3.png",
    "avatardefault4.png",
    "avatardefault5.png",
    "avatardefault6.png",
    "avatardefault7.png",
    "avatardefault8.png",
    "avatardefault9.png",
  ];

  const profilePictureShuffle =
    profilePictures[Math.floor(Math.random() * profilePictures.length)];

  const profilePicture = req.file?.filename || profilePictureShuffle;
  const saltRounds = 10;
  const bcryptedPassword = await bcrypt.hash(password, saltRounds);

  try {
    // Check if the email already exists
    const [existingEmail]: any = await pool.query(
      "SELECT * FROM user WHERE email = ? ",
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Check if the username  already exists
    const [existingUsername]: any = await pool.query(
      "SELECT * FROM user WHERE username = ? ",
      [username]
    );

    const [existingChannelName]: any = await pool.query(
      "SELECT * FROM user WHERE channelName = ? ",
      [username]
    );

    if (existingUsername.length > 0 || existingChannelName.length > 0) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const stream = 1;
    const channelName = username;

      // Generate a unique player_id
      let player_id = randomString(8);
      while (true) {
        const [checkPlayerId]: any = await pool.query(
          "SELECT * FROM user WHERE player_id = ?",
          [player_id]
        );
  
        if (checkPlayerId.length === 0) {
          break; // Player ID is unique
        }
        
        // Generate a new player_id if it already exists
        player_id = randomString(8);
      }
  

    // Insert the new user into the database
    await pool.query<ResultSetHeader>(
      "INSERT INTO user (email, username, profilePicture, password, stream, channelName, player_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [email, username, profilePicture, bcryptedPassword, stream, channelName, player_id]
    );

    res.json({
      success: true,
      message: "Registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error during register", error });
  }
};

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  if (updates.password) {
    const saltRounds = 10;
    updates.password = await bcrypt.hash(updates.password, saltRounds);
  }

  const fields = Object.keys(updates);
  const values = Object.values(updates);

  // Buat query dinamis
  const setClause = fields.map((field) => `${field} = ?`).join(", ");

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE user SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      // Return the updated user data, excluding the hashed password
      const updatedUser: Record<string, any> = {}; // Menggunakan Record untuk tipe dinamis
      fields.forEach((field, index) => {
        if (field !== "password") {
          updatedUser[field] = values[index];
        }
      });

      res.json({
        success: true,
        data: { id, ...updatedUser },
        message: "User updated successfully",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const loginAgent = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const [rows]: any = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    // Jika user tidak ditemukan
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const user = rows[0];

    // Periksa apakah user memiliki izin (stream === true atau 1)
    if (user.stream !== true && user.stream !== 1) {
      return res
        .status(401)
        .json({ success: false, message: "You don't have permission" });
    }

    // Cek apakah password sesuai
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Jika user sudah login dan token masih valid, masukkan token lama ke dalam blacklist
    if (user.is_logged_in && user.jwt_token) {
      try {
        // Verifikasi token yang tersimpan di database
        jwt.verify(user.jwt_token, JWT_SECRET!);

        // Masukkan token lama ke dalam blacklist
        await pool.query(
          "INSERT INTO token_blacklist (token, user_id) VALUES (?, ?)",
          [user.jwt_token, user.id]
        );

        console.log(`Token for user ${user.email} has been blacklisted.`);
      } catch (err) {
        console.log("Token expired or invalid, generating new token.");
      }
    }

    // Generate JWT token baru dengan userData
    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      player_id: user.player_id,
      profilePicture: user.profilePicture,
    };

    const token = jwt.sign({ userData: userData }, JWT_SECRET!, {
      expiresIn: "1d", // Token berlaku selama 1 hari
    });

    // Simpan token baru dan update status login di database
    await pool.query(
      "UPDATE user SET online = 1, jwt_token = ?, is_logged_in = true WHERE id = ?",
      [token, user.id]
    );

    // Response sukses dengan token baru
    res.json({
      success: true,
      token,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Error during authentication", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const [rows]: any = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    // Jika user tidak ditemukan
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const user = rows[0];

    // Cek apakah password sesuai
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Jika user sudah login dan token masih valid, keluarkan user dari sesi sebelumnya
    if (user.is_logged_in && user.jwt_token) {
      try {
        // Verifikasi token yang tersimpan di database
        jwt.verify(user.jwt_token, JWT_SECRET!);

        // Masukkan token lama ke dalam blacklist
        await pool.query(
          "INSERT INTO token_blacklist (token, user_id) VALUES (?, ?)",
          [user.jwt_token, user.id]
        );

        // Update status untuk 'kick' user dari sesi sebelumnya
        await pool.query(
          "UPDATE user SET online = 0, jwt_token = NULL, is_logged_in = false WHERE id = ?",
          [user.id]
        );

        console.log(
          user.username + " has been logged out from previous session."
        );
      } catch (err) {
        console.log("Token expired or invalid, generating new token.");
      }
    }

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      player_id: user.player_id,
      profilePicture: user.profilePicture,
    };

    // Generate JWT token baru
    const token = jwt.sign({ userData: userData }, JWT_SECRET!, {
      expiresIn: "1d", // Token berlaku selama 1 hari
    });

    // Simpan token baru dan update status login di database
    await pool.query(
      "UPDATE user SET online = 1, jwt_token = ?, is_logged_in = true WHERE id = ?",
      [token, user.id]
    );

    // Response sukses dengan token baru
    res.json({
      success: true,
      token,
      userData,
      message: "Logged in successfully, previous session has been logged out.",
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    res
      .status(500)
      .json({ success: false, message: "Error during authentication", error });
  }
};

export const loginIntegrator = async (req: Request, res: Response) => {
  const { username, player_id } = req.body;
  try {
    if (!username || !player_id) {
      return res.status(400).json({
        success: false,
        message: "Need username and player_id",
      });
    }

    try {
      const [userCheck]: [any[], FieldPacket[]] = await pool.query(
        "SELECT * FROM user WHERE username = ? OR player_id = ?",
        [username, player_id]
      );
      if (userCheck.length === 0) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      const user = userCheck[0];

      if (user.is_logged_in && user.jwt_token) {
        try {
          jwt.verify(user.jwt_token, JWT_SECRET!);
          return res.status(403).json({
            success: false,
            message:
              "User is already logged in on another device. Please log out first.",
          });
        } catch (error) {
          console.log("Token expired, generating new token.");
        }
      }
      const userData = {
        id: user.id,
        username: user.username,
        player_id: user.player_id,
        email: user.email,
        profilePicture: user.profilePicture,
        balance: user.balance,
      };
      // Ambil balance terbaru dari API integrator dan perbarui di database
      const updatedBalance = await getBalance(user.player_id);
      userData.balance = updatedBalance;

      const token = jwt.sign({ userData: userData }, JWT_SECRET!, {
        expiresIn: "1d", // Token berlaku selama 1 hari
      });

      await pool.query(
        "UPDATE user SET online = 1, jwt_token = ?, is_logged_in = true WHERE id = ?",
        [token, user.id]
      );

      res.json({
        success: true,
        token,
        message: "Logged in successfully",
      });
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({
        success: false,
        message: "Error during authentication",
        error,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
};

export const logout = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  // Cek jika userId tersedia

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM user WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      throw new Error("User not found");
    }

    const user = rows[0];

    if (!user.jwt_token) {
      return res
        .status(401)
        .json({ success: false, message: "User is not logged in" });
    }
    // Blacklist token yang ada
    await pool.query<ResultSetHeader>(
      "INSERT INTO token_blacklist (token, user_id) VALUES (?, ?)",
      [user.jwt_token, user.id]
    );

    // Set pengguna menjadi offline dan hapus token
    await pool.query(
      "UPDATE user SET online = 0, jwt_token = NULL, is_logged_in = false WHERE id = ?",
      [user.id]
    );

    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res
      .status(500)
      .json({ success: false, message: "Error during logging out", error });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM user WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "user not found" });
    } else {
      res.json({ message: "user deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const changeStatusUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // First, get the current status of the user
    const [rows]: [any[], any] = await pool.query(
      "SELECT status FROM user WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    const currentStatus = rows[0].status;
    const newStatus = currentStatus === 0 ? 1 : 0;

    // Update the status of the user
    const [result]: [ResultSetHeader, any] = await pool.query(
      "UPDATE user SET status = ? WHERE id = ?",
      [newStatus, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "user not found" });
    } else {
      res.json({
        message: `user ${id} status updated successfully to ${newStatus}`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user status", error });
  }
};

export const requestStream = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }

    // Cek apakah user sudah pernah melakukan request
    const [existingRequest] = await pool.query<ResultSetHeader[]>(
      "SELECT * FROM request_stream WHERE userId = ?",
      [userId]
    );

    if (existingRequest.length > 0) {
      // Jika sudah ada request, kembalikan respons bahwa user tidak bisa request lagi
      return res.status(400).json({
        success: false,
        message:
          "Your request is being processed. Please wait for the confirmation.",
      });
    }

    await pool.query<ResultSetHeader>(
      "INSERT INTO request_stream (userId) VALUES (?)",
      [userId]
    );
    res.json({
      success: true,
      message: "Your request has been sent",
    });
  } catch (error) {
    res.status(500).json({ message: "Error requesting stream", error });
  }
};

export const checkToken = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Cek apakah token ada di dalam blacklist di database
    const [blacklistedToken]: any = await pool.query(
      "SELECT * FROM token_blacklist WHERE token = ?",
      [token]
    );

    if (blacklistedToken.length > 0) {
      return res
        .status(401)
        .json({ success: false, message: "Token is blacklisted" });
    }

    // Verifikasi token
    jwt.verify(token, JWT_SECRET!, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Internet anda tidak stabil, harap coba lagi.",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Token verified", decoded });
    });
  } catch (error) {
    console.error("Error during token verification:", error);
    res.status(500).json({ message: "Error during token verification" });
  }
};

export const addBalances = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { amount } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }

    // Update balance with IFNULL to ensure balance is not null
    const [updateResult] = await pool.query<ResultSetHeader>(
      "UPDATE user SET balance = IFNULL(balance, 0) + ? WHERE id = ?",
      [amount, userId]
    );

    // Check if any row was affected (user exists and balance updated)
    if (updateResult.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found or no changes made" });
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT balance FROM user WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const balance = rows[0].balance;

    return res.status(200).json({
      success: true,
      message: "Balance added successfully",
      newBalance: balance,
    });
  } catch (error) {
    console.error("Error during balance update:", error);
    res.status(500).json({ message: "Error during balance update" });
  }
};
