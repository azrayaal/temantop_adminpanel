import { Request, Response } from "express";
import pool from "../../../../db";
import { RowDataPacket } from "mysql2";
import { formatRupiah } from "../../../middleware/auth";

// Controller for fetching paginated transactions
export const getTransactions = async (req: Request, res: Response) => {
  try {
    // Pagination variables
    const page = parseInt(req.query.page as string) || 1;
    const limit = 15;
    const offset = (page - 1) * limit;

    // Query to fetch transactions with user details and relevant amount, description based on transactionType
    const [transactions] = await pool.query<RowDataPacket[]>(
      `SELECT 
        t.id AS transactionId,
        t.userId,
        u.username AS userName,
        u.player_id AS player_id,
        t.transactionType,
        t.transactionId AS relatedTransactionId,
        COALESCE(gt.amount, st.amount, wt.amount, tt.amount) AS amount,
        COALESCE(gt.description, st.description, wt.description, tt.description) AS description,
        t.createdAt
      FROM transaction t
      LEFT JOIN user u ON t.userId = u.id
      LEFT JOIN gift_transaction gt ON t.transactionType = 'gift_transaction' AND t.transactionId = gt.id
      LEFT JOIN session_transaction st ON t.transactionType = 'session_transaction' AND t.transactionId = st.id
      LEFT JOIN withdraw_transaction wt ON t.transactionType = 'withdraw_transaction' AND t.transactionId = wt.id
      LEFT JOIN topup_transaction tt ON t.transactionType = 'topup_transaction' AND t.transactionId = tt.id
      ORDER BY t.createdAt DESC
      LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    // Calculate the total number of transactions
    const [totalResult] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS totalTransactions FROM transaction`
    );
    const totalTransactions = totalResult[0]?.totalTransactions || 0;


    // Calculate total pages
    const totalPages = Math.ceil(totalTransactions / limit);

    // Map over transactions to adjust the transactionType label
    const formattedTransactions = transactions.map((transaction) => {
      let transactionTypeLabel;

      switch (transaction.transactionType) {
        case 'gift_transaction':
          transactionTypeLabel = "Gift";
          break;
        case 'session_transaction':
          transactionTypeLabel = "Session";
          break;
        case 'withdraw_transaction':
          transactionTypeLabel = "Withdraw";
          break;
        case 'topup_transaction':
          transactionTypeLabel = "Topup";
          break;
        default:
          transactionTypeLabel = "Unknown";
      }
      
      return {
        ...transaction,
        transactionType: transactionTypeLabel,
        amount: formatRupiah(parseFloat(transaction.amount)),
      };
    });
console.log(transactions)
console.log(formattedTransactions)
    // Render the transactions page with retrieved data
    res.render("adminv2/pages/transaction/index", {
      name: req.session.user?.name || "Admin",
      email: req.session.user?.email || "admin@example.com",
      title: "Transactions",
      transactions: formattedTransactions,
      currentPage: page,
      totalPages,
    });
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const getTransactionDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Fetch the basic transaction details from the main transaction table
    const [transactionBase] = await pool.query<RowDataPacket[]>(
      `SELECT 
    t.id AS transactionId,
    t.userId,
    t.transactionId,
    t.transactionType,
    u.username AS userName,
    u.player_id AS userPlayerId,
    t.createdAt,
    CASE 
        WHEN t.transactionType = 'gift_transaction' THEN gt.amount
        WHEN t.transactionType = 'session_transaction' THEN st.amount
        WHEN t.transactionType = 'withdraw_transaction' THEN wt.amount
        WHEN t.transactionType = 'topup_transaction' THEN tt.amount
        ELSE NULL
    END AS amount
FROM transaction t
LEFT JOIN user u ON t.userId = u.id
LEFT JOIN gift_transaction gt ON t.transactionType = 'gift_transaction' AND t.transactionId = gt.id
LEFT JOIN session_transaction st ON t.transactionType = 'session_transaction' AND t.transactionId = st.id
LEFT JOIN withdraw_transaction wt ON t.transactionType = 'withdraw_transaction' AND t.transactionId = wt.id
LEFT JOIN topup_transaction tt ON t.transactionType = 'topup_transaction' AND t.transactionId = tt.id
WHERE t.id = ?;
`,
      [id]
    );


    // if (transactionBase.length === 0) {
    //   return res.status(404).render("adminv2/pages/transaction/notfound", {
    //     message: "Transaction not found",
    //   });
    // }

    const transaction = transactionBase[0];
    let transactionDetail;

    // Fetch additional details based on transactionType
    switch (transaction.transactionType) {
      case "gift_transaction":
        const [giftDetails] = await pool.query<RowDataPacket[]>(
          `SELECT giftName, amount, description FROM gift_transaction WHERE id = ?`,
          [transaction.relatedTransactionId]
        );
        transactionDetail = giftDetails[0];
        break;

      case "session_transaction":
        const [sessionDetails] = await pool.query<RowDataPacket[]>(
          `SELECT stream_sessionId, amount, description FROM session_transaction WHERE id = ?`,
          [transaction.relatedTransactionId]
        );
        transactionDetail = sessionDetails[0];
        break;

      case "withdraw_transaction":
        const [withdrawDetails] = await pool.query<RowDataPacket[]>(
          `SELECT amount, description FROM withdraw_transaction WHERE id = ?`,
          [transaction.relatedTransactionId]
        );
        transactionDetail = withdrawDetails[0];
        break;

      case "topup_transaction":
        const [topupDetails] = await pool.query<RowDataPacket[]>(
          `SELECT amount, description FROM topup_transaction WHERE id = ?`,
          [transaction.relatedTransactionId]
        );
        transactionDetail = topupDetails[0];
        break;

      default:
        return res.status(400).render("adminv2/pages/transaction/error", {
          message: "Unknown transaction type",
        });
    }

    // Render the details page with combined data
    res.render("adminv2/pages/transaction/detail", {
      name: req.session.user?.name || "Admin",
      email: req.session.user?.email || "admin@example.com",
      title: "Transaction Details",
      transaction: {
        ...transaction,
        ...transactionDetail,
        amount: formatRupiah(transaction.amount),
      },
    });
  } catch (error: any) {
    console.error("Error fetching transaction detail:", error);
    res.status(500).render("adminv2/pages/transaction/error", {
      message: "Internal Server Error",
    });
  }
};
