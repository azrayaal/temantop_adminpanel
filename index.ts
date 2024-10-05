import express, { Request, Response } from "express";
import dotenv from "dotenv";
import pool from "./db";
import path from "path";
import session from "express-session";
import cors from "cors";
import methodOverride from "method-override";
import flash from "connect-flash";
import http from "http"; // Import the HTTP module

// admin viewV2
import adminv2Routes from "./src/app/adminv2/admins/router";
import dashboardv2Routes from "./src/app/adminv2/dashboard/router";
import userv2Routes from "./src/app/adminv2/user/router";
import agentv2Routes from "./src/app/adminv2/agent/router";
import giftv2Routes from "./src/app/adminv2/gift/router";
import gamev2Routes from "./src/app/adminv2/game/router";
import transactionv2Routes from "./src/app/adminv2/transaction/router";
import authv2Routes from "./src/app/adminv2/auth/router";

dotenv.config();

const port = process.env.PORT || 3307;
const app = express();
const URL = `/api/v1`;

// Create an HTTP server
const server = http.createServer(app);

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("public/uploads"));
app.use("/adminlte", express.static(path.join(__dirname, "public/adminlte")));
app.use("/corona", express.static(path.join(__dirname, "public/corona")));
app.use(methodOverride("_method"));

// Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, // Mencegah akses cookies melalui JavaScript
      sameSite: "none", // Memungkinkan cookies diakses dalam iframe lintas domain
      // secure: true, // Hanya mengizinkan cookie melalui HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Masa berlaku cookies (1 hari)
    },
  })
);

declare module "express-session" {
  interface SessionData {
    user: {
      id: number;
      username: string;
      email: string;
      status: string;
      picture: string;
      name: string;
    };
  }
}

app.use(flash());

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers if needed
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for default page (root page)
app.get("/", (req: Request, res: Response) => {
  res.redirect("/admin/dashboard");
});

// Route for the admin view
app.use("/admin/dashboard", dashboardv2Routes);
app.use("/admin/user", userv2Routes);
app.use("/admin/agent", agentv2Routes);
app.use("/admin/gift", giftv2Routes);
app.use("/admin/game", gamev2Routes);
app.use("/admin/transaction", transactionv2Routes);
app.use("/admin/auth", authv2Routes);
app.use("/admins", adminv2Routes);

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// database connection check
const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database");
    connection.release();
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

connectToDatabase();
