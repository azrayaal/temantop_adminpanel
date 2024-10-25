import { Request, Response } from "express";
import dotenv from "dotenv";
import pool from "../../../db";
import { RowDataPacket } from "mysql2";

dotenv.config();

export const getBank = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM bank"
    );
 
    res.json({ success: true, data: rows });
  } catch (error) {
    res.json({ success: false, message: "Bank request failed" });
    console.log(error)
  }
};