import dotenv from "dotenv"
dotenv.config({
    path: './.env'
});

import path from "path"
import express from "express";
import cookieParser from "cookie-parser";
import connectMongo from "./db/connectDb.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors"
import { app, server } from "./socket/socket.js"

const port = process.env.PORT || 3000;
const __dirname = path.resolve()
app.use(cors())
app.use(express.json()); //  Middleware for parsing JSON bodies
app.use(cookieParser()) // Adds middleware that parses cookies and exposes them on req.cookies


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

server.listen(port, () => {
    connectMongo();
    console.log(`Server is running on port ${port}`);
});