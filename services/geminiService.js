import ai from "../config/gemini.js";

import {
    resumeSummaryPrompt,
    accomplishmentPrompt,
    skillsPrompt,
    experiencePrompt,
    atsScorePrompt,
    projectDescriptionPrompt,
    certificateDescriptionPrompt,
} from "../utils/prompts.js";

// ================= Resume Summary =================

export const generateResumeSummary = async (resumeData) => {
    try {
        const prompt = resumeSummaryPrompt(resumeData);

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        const summary = response.text;

        if (!summary) {
            throw new Error("No summary generated.");
        }

        return summary.trim();

    } catch (error) {
        console.error("Gemini Summary Error:", error);
        throw error;
    }
};

// ================= Accomplishments =================

export const generateAccomplishments = async ({
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
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        const result = response.text;

        if (!result) {
            throw new Error("No accomplishments generated.");
        }

        return result.trim();

    } catch (error) {
        console.error("Accomplishment Error:", error);
        throw error;
    }
};

// ================= Skills =================

export const generateSkills = async (resumeData) => {
    try {

        const prompt = skillsPrompt(
            resumeData.role,
            resumeData.skills,
            resumeData.projects
        );

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        const skills = response.text;

        if (!skills) {
            throw new Error("No skills generated.");
        }

        return skills.trim();

    } catch (error) {
        console.error("Skills Error:", error);
        throw error;
    }
};

// ================= Experience =================

export const generateExperience = async (resumeData) => {
    try {

        const prompt = experiencePrompt(resumeData);

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        const experience = response.text;

        if (!experience) {
            throw new Error("No experience generated.");
        }

        return experience.trim();

    } catch (error) {
        console.error("Experience Error:", error);
        throw error;
    }
};

// ================= ATS Score =================

export const generateATSScore = async (resumeData) => {
    try {

        const prompt = atsScorePrompt(resumeData);

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        let result = response.text;

        if (!result) {
            throw new Error("No ATS score generated.");
        }

        result = result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(result);

    } catch (error) {
        console.error("ATS Score Error:", error);
        throw error;
    }
};

// ================= Project Description =================

export const generateProjectDescription = async (projectData) => {
    try {

        const prompt = projectDescriptionPrompt(projectData);

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        const description = response.text;

        if (!description) {
            throw new Error("No project description generated.");
        }

        return description.trim();

    } catch (error) {
        console.error("Project Description Error:", error);
        throw error;
    }
};

// ================= Certificate Description =================


export const generateCertificateDescriptionAI = async (certificateData) => {
    try {

        const prompt = certificateDescriptionPrompt(certificateData);

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        const description = response.text;

        if (!description) {
            throw new Error("No certificate description generated.");
        }

        return description.trim();

    } catch (error) {
        console.error("Certificate Description Error:", error);
        throw error;
    }
};