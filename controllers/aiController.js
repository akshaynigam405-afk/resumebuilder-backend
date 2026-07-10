import {
    generateResumeSummary,
    generateAccomplishments,
    generateSkills,
    generateExperience,
    generateATSScore,
} from "../services/geminiService.js";

// ================= Resume Summary =================

export const generateSummary = async(req, res) => {
    try {
        const resumeData = req.body;

        if (!resumeData || Object.keys(resumeData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Resume data is required.",
            });
        }

        const summary = await generateResumeSummary(resumeData);

        return res.status(200).json({
            success: true,
            summary,
        });

    } catch (error) {

        console.error(error);

        if (error.status === 503) {
            return res.status(503).json({
                success: false,
                message: "Gemini AI is busy. Please try again."
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= Accomplishments =================

export const improveAccomplishments = async(req, res) => {

    try {

        const { role, company, accomplishments } = req.body;

        if (!accomplishments) {
            return res.status(400).json({
                success: false,
                message: "Accomplishments are required."
            });
        }

        const improvedText = await generateAccomplishments({
            role,
            company,
            accomplishments,
        });

        return res.status(200).json({
            success: true,
            accomplishments: improvedText,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ================= Skills =================

export const suggestSkills = async(req, res) => {

    try {

        const resumeData = req.body;

        if (!resumeData.role) {
            return res.status(400).json({
                success: false,
                message: "Role is required."
            });
        }

        const skills = await generateSkills(resumeData);

        return res.status(200).json({
            success: true,
            skills,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ================= Experience =================

export const generateExperienceSection = async(req, res) => {

    try {

        const resumeData = req.body;

        if (!resumeData.role) {
            return res.status(400).json({
                success: false,
                message: "Role is required."
            });
        }

        const experience = await generateExperience(resumeData);

        return res.status(200).json({
            success: true,
            experience,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ================= ATS Score =================

export const checkATSScore = async(req, res) => {

    try {

        const resumeData = req.body;

        if (!resumeData.jobTitle) {

            return res.status(400).json({
                success: false,
                message: "Job Title is required."
            });

        }

        const atsAnalysis = await generateATSScore(resumeData);

        return res.status(200).json({

            success: true,
            score: `${atsAnalysis.overallScore}/100`,
            data: atsAnalysis,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};