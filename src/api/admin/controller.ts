import { Request, Response } from "express";
import pool from "../../../db";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const saltRounds = 10;
        const bcryptedPassword = await bcrypt.hash(password, saltRounds);

        console.log(username, email, bcryptedPassword);

        await pool.query("INSERT INTO admin (username, email, password, status) VALUES (?, ?, ?, ?)", [username, email, bcryptedPassword, 1]);

        return res.status(201).json({ message: "Admin created", username, email });
    } catch (error: any) {
        console.error("Error creating admin: ", error.message); // Logging error
        return res.status(500).json({ error: error.message });
    }
};
