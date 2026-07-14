import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log(
    "Gemini Key:",
    process.env.GEMINI_API_KEY ? "Loaded" : "Missing"
);

// Ensure API key exists
if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing in .env file");
}

// Create Gemini client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Export client
export default ai;