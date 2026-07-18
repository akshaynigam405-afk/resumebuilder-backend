import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resume.js";

dotenv.config();

const app = express();

// Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
//app.use("/", resumeRoutes);
app.use("/api/resume", resumeRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Resume Builder Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`${PORT} Server is Running`);
});