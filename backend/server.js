import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import connectMongo from "./db/connectDb.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
// Import only io and server, create your own app
// import { io, server } from "./socket/socket.js";

import { io, server, app } from "./socket/socket.js";
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware (order matters!)
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API Routes MUST come before static files and catch-all routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

// Test route for debugging
app.get("/test", (req, res) => {
    res.json({ message: "Server is working" });
});

// Static files for production (only in production)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    
    // Catch-all handler for React Router (MUST be last)
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
} else {
    // Development route
    app.get("/", (req, res) => {
        res.json({ message: "Server running in development mode" });
    });
}

server.listen(port, () => {
    connectMongo();
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});