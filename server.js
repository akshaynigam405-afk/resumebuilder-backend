import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import user_routes from "./routes/user.js";
import aiRoutes from "./routes/aiRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Resume Builder Backend is Running..."
    });
});

// API Routes
app.use("/api", user_routes);
app.use("/api/ai", aiRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err.message);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// Start Server
const start = async() => {
    try {
        await connectDB();

        console.log("✅ Database Connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Database Connection Error:", error.message);
    }
};

start();