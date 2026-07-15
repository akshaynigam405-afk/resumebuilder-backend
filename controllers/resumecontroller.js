import fs from "fs";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

import Resume from "../models/resumemodel.js";
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
        resumeData.personalInfo?.address ||"",
        
        portfolio:
        resumeData.personalInfo?.portfolio ||
        resumeData.personalInfo?.linkedin ||
        resumeData.personalInfo?.github ||"",
        
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
        
       // Save in MongoDB

        console.log("========== Gemini Parsed Data ==========");
        console.log(JSON.stringify(resumeData, null, 2));
        
        const resume = await Resume.create(resumeData);
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