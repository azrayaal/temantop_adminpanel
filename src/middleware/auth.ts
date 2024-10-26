import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import session from "express-session";
import pool from "../../db";

interface CustomSession extends session.Session {
  user?: { id: number; email: string; status: string; name: string };
  admin?: { id: number; email: string; status: string; name: string };
}

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

export const isLoginAdmin = (
  req: Request & { session: CustomSession },
  res: Response,
  next: NextFunction
) => {
  if (!req.session.admin) {
    req.flash(
      "alertMessage",
      "Sorry you are not authorized to access this page"
    );
    req.flash("alertStatus", "danger");
    return res.redirect("/admin/auth");
  } else {
    next();
  }
};

interface CustomRequest extends Request {
  agent?: { agentId?: any };
  user?: { userId?: any };
}


export const isLoginUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "") ?? null;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Cek apakah token ada di dalam blacklist di database
    const [blacklistedToken]: any = await pool.query(
      "SELECT * FROM token_blacklist WHERE token = ?",
      [token]
    );

    if (blacklistedToken.length > 0) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded: any) => {
      if (err) {
        console.log("JWT verification error:", err); // Tambahkan ini untuk melihat error
        if (err.name === "TokenExpiredError") {
          await pool.query(
            "UPDATE user SET online = 0, jwt_token = NULL, is_logged_in = false WHERE id = ?",
            [decoded.userId]
          );
          return res.status(401).json({
            message: "Unauthorized: Token has expired. Please log in again.",
          });
        } else {
          return res
            .status(401)
            .json({ message: "Unauthorized: Invalid token" });
        }
      }
      req.user = decoded.userData;
      next();
    });
    
  } catch (error) {
    res.status(500).json({ message: "Error processing authentication", error });
  }
};

// export const formatRupiah = (angka: number) => {
//   return 'Rp ' + angka.toLocaleString('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).replace('Rp', '').trim();
// };
export const formatRupiah = (angka: number) => {
  return 'Rp ' + angka.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.', ',');
};


