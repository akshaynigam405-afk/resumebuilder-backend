import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const parseResumeWithGemini = async (resumeText) => {
  const prompt = `
Do not wrap the JSON in markdown.
Do not include any explanation.
Return only the JSON object.

Schema:

{
  "personalInfo": {
    "fullName": "",
    "jobTitle": "",
    "email": "",
    "phone": "",
    "address": "",
    "linkedin": "",
    "github": ""
  },
  "summary": "",
  "experience": [],
  "education": [],
  "skills": [],
  "projects": [],
  "certifications": []
}

Resume:

${resumeText}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    let text = response.text;

    // Remove markdown code fences
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();
    
    // Extract only the JSON object
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
    throw new Error("Gemini did not return valid JSON.");
}

// Parse the extracted JSON
const parsedResume = JSON.parse(jsonMatch[0]);

return parsedResume;

  } catch (error) {
    console.error("Gemini Parser Error:", error);
    throw new Error("Failed to parse resume using Gemini.");
  }
};