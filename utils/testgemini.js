import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


async function test() {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: "Explain resume parsing in one sentence"
        });

        console.log(response.text);

    } catch(error) {
        console.log(error);
    }
}

test();