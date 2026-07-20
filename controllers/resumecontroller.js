import fs from "fs";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import User from "../models/Usermodel.js";
import Resume from "../models/resumemodel.js";
import { generateATSScore } from "../services/geminiService.js";
import { parseResumeWithGemini } from "../utils/geminiparser.js";

export const uploadResume = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No resume uploaded"
            });
        }


        const filePath = req.file.path;
        const fileName = req.file.originalname.toLowerCase();

        let resumeText = "";

        // PDF Extraction

        if (fileName.endsWith(".pdf")) {

            console.log("Reading PDF...");

            const dataBuffer = fs.readFileSync(filePath);


            const parser = new PDFParse({
                data: dataBuffer
            });


            const pdfData = await parser.getText();


            resumeText = pdfData.text;


            await parser.destroy();


        }

        // DOCX Extraction

        else if (fileName.endsWith(".docx")) {


            const result = await mammoth.extractRawText({
                path: filePath
            });


            resumeText = result.value;

        }


        else {

            return res.status(400).json({

                success: false,

                message: "Only PDF and DOCX files are allowed"

            });

        }

        console.log("========== Resume Text ==========");
        console.log(resumeText);
        console.log("=================================");

        // Parse Resume using Gemini
        const resumeData = await parseResumeWithGemini(resumeText);
        console.log("========== RAW GEMINI RESPONSE ==========");
        console.log(JSON.stringify(resumeData, null, 2));

        // Normalize Personal Info
        resumeData.personalInfo = {
            fullName: resumeData.personalInfo?.fullName || "",
            jobTitle: resumeData.personalInfo?.jobTitle || "",
            email: resumeData.personalInfo?.email || "",
            phone: resumeData.personalInfo?.phone || "",
            location:
                resumeData.personalInfo?.location ||
                resumeData.personalInfo?.address || "",

            portfolio:
                resumeData.personalInfo?.portfolio ||
                resumeData.personalInfo?.linkedin ||
                resumeData.personalInfo?.github || "",

            professionalSummary:
                resumeData.personalInfo?.professionalSummary ||
                resumeData.summary ||
                ""
        };

        // Normalize Experience
        resumeData.experience = (resumeData.experience || []).map(exp => ({
            company: exp.company || "",
            role: exp.role || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            accomplishments: exp.accomplishments || "",
            currentlyWorking: exp.currentlyWorking || false
        }));

        // Normalize Education
        resumeData.education = (resumeData.education || []).map(edu => ({
            school: edu.school || "",
            degree: edu.degree || "",
            fieldOfStudy: edu.fieldOfStudy || "",
            location: edu.location || edu.address || "",
            description: edu.description || "",
            startDate: edu.startDate || "",
            endDate: edu.endDate || "",
            cgpa: edu.cgpa || "",
            highlights: edu.highlights || "",
            currentlyStudying: edu.currentlyStudying || false
        }));
        // Normalize Skills

        resumeData.skills = Array.isArray(resumeData.skills)
            ? resumeData.skills
            : [];

        // Normalize Projects

        resumeData.projects = (resumeData.projects || []).map(project => ({
            projectName: project.projectName || "",
            role: project.role || "",
            link: project.link || "",
            technologies: Array.isArray(project.technologies)
                ? project.technologies
                : [],
            startDate: project.startDate || "",
            endDate: project.endDate || "",
            description: project.description || ""
        }));

        // Normalize Certifications

        resumeData.certifications = (resumeData.certifications || []).map(cert => ({
            name: cert.name || cert.certificateName || "",
            organization: cert.organization || "",
            credentialId: cert.credentialId || "",
            issueDate: cert.issueDate || "",
            expiryDate: cert.expiryDate || cert.expirationDate || "",
            learned: cert.learned || cert.description || ""
        }));

        // Store original resume text
        resumeData.resumeText = resumeText;

        const atsResult = await generateATSScore({
            fullName: resumeData.personalInfo.fullName,
            jobTitle: resumeData.personalInfo.jobTitle,
            experience: resumeData.experience,
            education: resumeData.education,
            skills: resumeData.skills,
            projects: resumeData.projects,
            certificates: resumeData.certifications,
        });

        // Save in MongoDB

        console.log("========== Gemini Parsed Data ==========");
        console.log(JSON.stringify(resumeData, null, 2));

        const resume = await Resume.create({

            ...resumeData,

            title:
                resumeData.personalInfo?.fullName
                    ? resumeData.personalInfo.fullName
                    : "Uploaded Resume",

            status: "completed",

            resumeType: "uploaded",

            progress: 100,

            currentStep: 8,

            atsScore: atsResult.overallScore
        });
        console.log("========== Saved Document ==========");
        console.log(resume);

        // Delete uploaded file

        fs.unlinkSync(filePath);

        return res.status(201).json({

            success: true,

            message: "Resume uploaded and parsed successfully",

            data: resume

        });


    }

    catch (error) {


        console.error("Resume Upload Error:", error);


        return res.status(500).json({

            success: false,

            message: error.message

        });


    }

};

export const createResume = async (req, res) => {

    try {

        const fullName = req.body?.fullName || "";

        const resume = await Resume.create({

            title: fullName || "Resume",

            status: "draft",
            resumeType: "draft",
            progress: 0,

            personalInfo: {
                fullName: fullName
            }
        });

        res.status(201).json({

            success: true,

            data: resume

        });

    } catch (error) {

        console.log("CREATE RESUME ERROR:", error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const updateResume = async (req, res) => {

    try {

        const resume = await Resume.findById(req.params.id);

        if (!resume) {

            return res.status(404).json({

                success: false,

                message: "Resume not found"

            });

        }

        Object.keys(req.body).forEach((key) => {

            resume[key] = req.body[key];

        });

        await resume.save();

        res.json({

            success: true,

            data: resume

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getMyResumes = async (req, res) => {

    try {

        const resumes = await Resume.find()

            .sort({

                updatedAt: -1

            });

        res.json({

            success: true,

            data: resumes

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getResume = async (req, res) => {

    try {

        const resume = await Resume.findById(

            req.params.id

        );

        if (!resume) {

            return res.status(404).json({

                success: false,

                message: "Resume not found"

            });

        }

        res.json({

            success: true,

            data: resume

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const completeResume = async (req, res) => {

    try {

        const resume = await Resume.findById(

            req.params.id

        );

        if (!resume) {

            return res.status(404).json({

                success: false,

                message: "Resume not found"

            });

        }

        resume.status = "completed";

        resume.progress = 100;

        resume.resumeType = "created";

        resume.currentStep = 8;

        resume.atsScore = req.body.atsScore || 0;

        await resume.save();

        res.json({

            success: true,

            data: resume

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const deleteResume = async (req, res) => {
    try {

        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        await Resume.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Resume deleted successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

export const renameResume = async (req, res) => {

    try {

        const { title } = req.body;

        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        resume.title = title;

        await resume.save();

        res.json({
            success: true,
            data: resume,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const duplicateResume = async (req, res) => {

    try {

        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        const duplicate = resume.toObject();

        delete duplicate._id;
        delete duplicate.createdAt;
        delete duplicate.updatedAt;
        delete duplicate.__v;
        delete duplicate.email;

        duplicate.title = `${resume.title} Copy`;
        duplicate.status = "completed";
        duplicate.resumeType = "uploaded";
        duplicate.progress = 100;     // 7th step tak completed
        duplicate.currentStep = 8;   // ATS Analysis se continue hoga
        duplicate.atsScore = resume.atsScore;      // Naya ATS score generate hoga
        duplicate.email = `${Date.now()}@temp.com`;

        const newResume = await Resume.create(duplicate);

        res.status(201).json({
            success: true,
            data: newResume,
        });

    } catch (error) {
        console.error("Duplicate Resume Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};