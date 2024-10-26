import { Request, Response } from "express";
import pool from "../../../../db";
import { RowDataPacket } from "mysql2";

export const index = async (req: Request, res: Response) => {
  try {
    const [agentRows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS count FROM user where stream = 1"
    );
    const [userRows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS count FROM user where stream = 0"
    );
    const [giftRows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS count FROM gift"
    );
    const [voucherRows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS count FROM voucher"
    );
    const [bankRows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS count FROM bank"
    );
    const [transactionRows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS count FROM transaction"
    );

    res.render("adminv2/index", {
      name: req.session.user?.username,
      email: req.session.user?.email,
      title: "Dashboard - Yong",
      count: {
        agent: agentRows[0].count,
        user: userRows[0].count,
        gift: giftRows[0].count,
        voucher: voucherRows[0].count,
        bank: bankRows[0].count,
        transaction: transactionRows[0].count,
      },
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
