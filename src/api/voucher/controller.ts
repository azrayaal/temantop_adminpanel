import { Request, Response } from "express";
import dotenv from "dotenv";
import pool from "../../../db";
import { RowDataPacket } from "mysql2";

dotenv.config();

export const redeemVoucher = async (req: Request, res: Response) => {
  const { voucher } = req.body;
  const user = req.user;

  const [vouchers] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM voucher WHERE unique_code = ?",
    [voucher]
  );

  if (vouchers.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "Voucher not found" });
  }

  const voucherData = vouchers[0];
  if (voucherData.is_used === 1) {
    return res
      .status(400)
      .json({ success: false, message: "Voucher already redeemed" });
  }

  if(voucherData){
    await pool.query<RowDataPacket[]>(
      "UPDATE voucher SET is_used = 1, redeem_by = ? WHERE unique_code = ?",
      [user?.id, voucher]
    );
  
    await pool.query<RowDataPacket[]>(
      "UPDATE user SET balance = balance + ? WHERE id = ?",
      [voucherData.price, user?.id]
    );
  
    await pool.query<RowDataPacket[]>(
      "INSERT INTO topup_transaction (userId, amount, description) VALUES (?, ?, ?)",
      [user?.id, voucherData.price, `Redeemed voucher ${voucherData.name}(${voucher})`]
    )
  
    res.json({ success: true, message: `Success redeem voucher ${voucher}` });
  }
};