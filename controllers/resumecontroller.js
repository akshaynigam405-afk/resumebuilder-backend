import fs from "fs";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

import Resume from "../models/resumemodel.js";
import { parseResumeWithGemini } from "../utils/geminiparser.js";

// UPLOAD RESUME
export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No resume uploaded",
            });
        }

        const filePath = req.file.path;
        const fileName = req.file.originalname.toLowerCase();

        let resumeText = "";

        // PDF
        if (fileName.endsWith(".pdf")) {
            console.log("Reading PDF...");

            const dataBuffer = fs.readFileSync(filePath);

            const parser = new PDFParse({
                data: dataBuffer,
            });

            const pdfData = await parser.getText();

            resumeText = pdfData.text;

            await parser.destroy();
        }

        // DOCX
        else if (fileName.endsWith(".docx")) {
            const result = await mammoth.extractRawText({
                path: filePath,
            });

            resumeText = result.value;
        }

        // Invalid file
        else {
            return res.status(400).json({
                success: false,
                message: "Only PDF and DOCX files are allowed",
            });
        }

        console.log("========== Resume Text ==========");
        console.log(resumeText);
        console.log("=================================");

        const resumeData = await parseResumeWithGemini(resumeText);

        console.log("========== RAW GEMINI RESPONSE ==========");
        console.log(JSON.stringify(resumeData, null, 2));

        // Personal
        resumeData.personalInfo = {
            fullName: resumeData.personalInfo?.fullName || "",
            jobTitle: resumeData.personalInfo?.jobTitle || "",
            email: resumeData.personalInfo?.email || "",
            phone: resumeData.personalInfo?.phone || "",
            location:
                resumeData.personalInfo?.location ||
                resumeData.personalInfo?.address ||
                "",
            portfolio:
                resumeData.personalInfo?.portfolio ||
                resumeData.personalInfo?.linkedin ||
                resumeData.personalInfo?.github ||
                "",
            professionalSummary:
                resumeData.personalInfo?.professionalSummary ||
                resumeData.summary ||
                "",
        };

        // Experience
        resumeData.experience = (resumeData.experience || []).map((exp) => ({
            company: exp.company || "",
            role: exp.role || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            accomplishments: exp.accomplishments || "",
            currentlyWorking: exp.currentlyWorking || false,
        }));

        // Education
        resumeData.education = (resumeData.education || []).map((edu) => ({
            school: edu.school || "",
            degree: edu.degree || "",
            fieldOfStudy: edu.fieldOfStudy || "",
            location: edu.location || edu.address || "",
            description: edu.description || "",
            startDate: edu.startDate || "",
            endDate: edu.endDate || "",
            cgpa: edu.cgpa || "",
            highlights: edu.highlights || "",
            currentlyStudying: edu.currentlyStudying || false,
        }));

        // Skills
        resumeData.skills = Array.isArray(resumeData.skills)
            ? resumeData.skills
            : [];

        // Projects
        resumeData.projects = (resumeData.projects || []).map((project) => ({
            projectName: project.projectName || "",
            role: project.role || "",
            link: project.link || "",
            technologies: Array.isArray(project.technologies)
                ? project.technologies
                : [],
            startDate: project.startDate || "",
            endDate: project.endDate || "",
            description: project.description || "",
        }));

        // Certifications
        resumeData.certifications = (resumeData.certifications || []).map(
            (cert) => ({
                name: cert.name || cert.certificateName || "",
                organization: cert.organization || "",
                credentialId: cert.credentialId || "",
                issueDate: cert.issueDate || "",
                expiryDate:
                    cert.expiryDate ||
                    cert.expirationDate ||
                    "",
                learned:
                    cert.learned ||
                    cert.description ||
                    "",
            })
        );

        resumeData.resumeText = resumeText;

        const resume = await Resume.create(resumeData);

        fs.unlinkSync(filePath);

        return res.status(201).json({
            success: true,
            message: "Resume uploaded and parsed successfully",
            data: resume,
        });
    } catch (error) {
        console.error("Resume Upload Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL RESUMES
export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Resumes fetched successfully",
            data: resumes,
        });
    } catch (error) {
        console.error("Get Resumes Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE RESUME
export const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedResume = await Resume.findByIdAndDelete(id);

        if (!deletedResume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully",
        });
    } catch (error) {
        console.error("Delete Resume Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DUPLICATE RESUME
export const duplicateResume = async (req, res) => {
    try {
        const { id } = req.params;

        const existingResume = await Resume.findById(id);

        if (!existingResume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        const resumeData = existingResume.toObject();

        delete resumeData._id;
        delete resumeData.__v;
        delete resumeData.createdAt;
        delete resumeData.updatedAt;

        if (resumeData.personalInfo?.fullName) {
            resumeData.personalInfo.fullName += " (Copy)";
        }

        const duplicatedResume = await Resume.create(resumeData);

        return res.status(201).json({
            success: true,
            message: "Resume duplicated successfully",
            data: duplicatedResume,
        });
    } catch (error) {
        console.error("Duplicate Resume Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};