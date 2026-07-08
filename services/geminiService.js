import ai from "../config/gemini.js";
import {
    resumeSummaryPrompt,
    accomplishmentPrompt,
} from "../utils/prompts.js";

/**
 * Generate Resume Summary using Gemini AI
 */
export const generateResumeSummary = async(resumeData) => {
    try {
        const prompt = resumeSummaryPrompt(resumeData);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const summary = response.text;

        if (!summary) {
            throw new Error("No response generated from Gemini.");
        }

        return summary.trim();
    } catch (error) {
        console.error("Gemini Service Error:", error);

        throw new Error(
            error.message || "Failed to generate resume summary."
        );
    }
};

/**
 * Generate ATS-friendly Accomplishments
 */
export const generateAccomplishments = async({
    role,
    company,
    accomplishments,
}) => {
    try {
        const prompt = accomplishmentPrompt(
            role,
            company,
            accomplishments
        );

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const result = response.text;

        if (!result) {
            throw new Error("No response generated from Gemini.");
        }

        return result.trim();
    } catch (error) {
        console.error("Gemini Service Error:", error);

        throw new Error(
            error.message || "Failed to generate accomplishments."
        );
    }
};

/**
 * Generic AI Content Generator
 */
export const generateContent = async(prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const result = response.text;

        if (!result) {
            throw new Error("No response generated from Gemini.");
        }

        return result.trim();
    } catch (error) {
        console.error("Gemini Service Error:", error);

        throw new Error(error.message || "Failed to generate AI content.");
    }
};