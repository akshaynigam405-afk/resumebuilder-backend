import {
    generateResumeSummary,
    generateAccomplishments,
} from "../services/geminiService.js";

// Resume Summary Controller
export const generateSummary = async(req, res) => {
    try {
        const resumeData = req.body;

        // Basic Validation
        if (!resumeData || Object.keys(resumeData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Resume data is required.",
            });
        }

        // Generate Summary
        const summary = await generateResumeSummary(resumeData);

        return res.status(200).json({
            success: true,
            summary,
        });
    } catch (error) {
        console.error("Generate Summary Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to generate summary.",
        });
    }
};

// Accomplishments Improvement Controller

export const improveAccomplishments = async(req, res) => {
    try {
        const { accomplishments } = req.body;

        if (!accomplishments) {
            return res.status(400).json({
                success: false,
                message: "Accomplishments are required.",
            });
        }

        const improvedText = await generateAccomplishments(accomplishments);

        return res.status(200).json({
            success: true,
            accomplishments: improvedText,
        });
    } catch (error) {
        console.error("Improve Accomplishments Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to improve accomplishments.",
        });
    }
};