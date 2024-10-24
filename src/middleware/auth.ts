import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import session from "express-session";
import pool from "../../db";

interface CustomSession extends session.Session {
  user?: { id: number; email: string; status: string; name: string };
}

const JWT_SECRET = "your_secret_key_here";

export const isLoginAdmin = (
  req: Request & { session: CustomSession },
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user) {
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

// export const isLoginUser = async (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.headers.authorization?.replace("Bearer ", "") ?? null;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No token provided" });
//     }

//     // Cek apakah token ada di dalam blacklist di database
//     const [blacklistedToken]: any = await pool.query(
//       "SELECT * FROM token_blacklist WHERE token = ?",
//       [token]
//     );

//     if (blacklistedToken.length > 0) {
//       return res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }

//     jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
//       if (err) {
//         if (err.name === "TokenExpiredError") {
//           return res
//             .status(401)
//             .json({ message: "Unauthorized: Token has expired" });
//         } else {
//           return res
//             .status(401)
//             .json({ message: "Unauthorized: Invalid token" });
//         }
//       }

//       req.user = decoded.userData; // Ensure this contains valid token type
//       next();
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error processing authentication", error });
//   }
// };

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
        if (err.name === "TokenExpiredError") {
          // Jika token expired, logout user secara otomatis
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

      req.user = decoded.userData; // Assign token data ke request
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing authentication", error });
  }
};
