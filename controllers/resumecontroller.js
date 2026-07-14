import fs from "fs";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

import Resume from "../models/resumemodel.js";
import parseresume from "../utils/parseresume.js";


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
       
        // Parse Resume
    
        const resumeData = parseresume(resumeText);

        // Store original resume text

        resumeData.resumeText = resumeText;
       
        // Save in MongoDB

        const resume = await Resume.create(resumeData);

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