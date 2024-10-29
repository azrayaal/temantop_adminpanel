import express, { Request, Response } from "express";
import dotenv from "dotenv";
import pool from "./db";
import path from "path";
import session from "express-session";
import cors from "cors";
import methodOverride from "method-override";
import flash from "connect-flash";
import http from "http"; // Import the HTTP module
import { Server as SocketIOServer } from "socket.io"; // Import Socket.IO

// admin viewV2
import adminv2Routes from "./src/app/adminv2/admins/router";
import dashboardv2Routes from "./src/app/adminv2/dashboard/router";
import userv2Routes from "./src/app/adminv2/user/router";
import agentv2Routes from "./src/app/adminv2/agent/router";
import giftv2Routes from "./src/app/adminv2/gift/router";
import voucherv2Routes from "./src/app/adminv2/voucher/router";
import transactionv2Routes from "./src/app/adminv2/transaction/router";
import authv2Routes from "./src/app/adminv2/auth/router";
import bankRoutes from "./src/app/adminv2/bank/router";
import withdrawRoutes from "./src/app/adminv2/withdraw/router";
import privacryRoutes from "./src/app/adminv2/setup/privacy/router";
import deleteRoutes from "./src/app/adminv2/setup/delete/router";

//api v1
import merchantRouter from "./src/api/merchant/router";
import tokenouter from "./src/api/token/router";
import giftRouter from "./src/api/gift/router";
import gameRouter from "./src/api/games/game/router";
import genreRouter from "./src/api/games/genre/router";
import userAuth from "./src/api/profile/auth/router";
import profileRouter from "./src/api/profile/detail/router";
import streamSessionRouter from "./src/api/live/streamSession/router";
import streamResultRouter from "./src/api/live/streamResults/router";
import viewStreamRouter from "./src/api/live/viewStream/router";
import notificationRouter from "./src/api/notifications/router";
import searchRouter from "./src/api/search/router";
import activityRouter from "./src/api/activity/router";
import giftTransactionRouter from "./src/api/transaction/gift_transaction/router";
import transactionRouter from "./src/api/transaction/router";
import sessionTransctionRouter from "./src/api/transaction/session_transation/router";
import agentRouter from "./src/api/profile/agent/router";
import voucherRouter from "./src/api/voucher/router";
import adminrouter from "./src/api/admin/router";
import withdrawRouter from "./src/api/withdraw/router";
import bankRouter from "./src/api/bank/router";

import setupWebSocket from "./src/websocket/comment";

// apijoyo
import apiV2Routes from "./src/apiv2/token/router";

dotenv.config();

const port = process.env.PORT || 3307;
const app = express();
const URL = `/api/v1`;

// Create an HTTP server
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
  },
});

// Initialize WebSocket server
setupWebSocket(io);

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("public/uploads"));
app.use("/corona", express.static(path.join(__dirname, "public/corona")));
app.use(methodOverride("_method"));

// Middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 24 * 60 * 60 * 1000},
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
    admin: {
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

app.use("/", apiV2Routes);

// Route for the admin view
app.use("/admin/dashboard", dashboardv2Routes);
app.use("/admin/user", userv2Routes);
app.use("/admin/agent", agentv2Routes);
app.use("/admin/gift", giftv2Routes);
app.use("/admin/voucher", voucherv2Routes);
app.use("/admin/transaction", transactionv2Routes);
app.use("/admin/auth", authv2Routes);
app.use("/admins", adminv2Routes);
app.use("/admin/bank", bankRoutes);
app.use("/admin/withdraw", withdrawRoutes);
app.use("/privacy", privacryRoutes);
app.use("/delete_account", deleteRoutes);

// Route for the api
app.use(`${URL}/token`, tokenouter);
app.use(`${URL}/gift`, giftRouter);
app.use(`${URL}/merchant`, merchantRouter);
app.use(`${URL}/game`, gameRouter);
app.use(`${URL}/genre`, genreRouter);
app.use(`${URL}/auth`, userAuth);
app.use(`${URL}/stream_session`, streamSessionRouter);
app.use(`${URL}/view_stream`, viewStreamRouter);
app.use(`${URL}/stream_result`, streamResultRouter);
app.use(`${URL}/notifications`, notificationRouter);
app.use(`${URL}/profile`, profileRouter);
app.use(`${URL}/search`, searchRouter);
app.use(`${URL}/activity`, activityRouter);
app.use(`${URL}/gift_transaction`, giftTransactionRouter);
app.use(`${URL}/transaction`, transactionRouter);
app.use(`${URL}/session_transaction`, sessionTransctionRouter);
app.use(`${URL}/agent`, agentRouter);
app.use(`${URL}/redeem`, voucherRouter);
app.use(`${URL}/admin`, adminrouter);
app.use(`${URL}/withdraw`, withdrawRouter);
app.use(`${URL}/bank`, bankRouter);

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