import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const parseResumeWithGemini = async (resumeText) => {

    const prompt = `
You are an expert ATS Resume Parser.

Your task is to extract information from the resume and return ONLY valid JSON.

Rules:
- Return ONLY JSON.
- Do NOT use markdown.
- Do NOT add explanations.
- Do NOT invent information.
- If a field is missing, return "" for strings, [] for arrays and false for booleans.

Return this exact schema:

{
  "personalInfo": {
    "fullName": "",
    "jobTitle": "",
    "email": "",
    "phone": "",
    "address": "",
    "linkedin": "",
    "github": "",
    "portfolio": "",
    "professionalSummary": ""
  },

  "experience": [
    {
      "company": "",
      "role": "",
      "startDate": "",
      "endDate": "",
      "currentlyWorking": false,
      "accomplishments": ""
    }
  ],

  "education": [
    {
      "school": "",
      "degree": "",
      "fieldOfStudy": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "cgpa": "",
      "highlights": "",
      "currentlyStudying": false
    }
  ],

  "skills": [],

  "projects": [
    {
      "projectName": "",
      "role": "",
      "link": "",
      "technologies": [],
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],

  "certifications": [
    {
      "name": "",
      "organization": "",
      "credentialId": "",
      "issueDate": "",
      "expiryDate": "",
      "learned": ""
    }
  ]
}

IMPORTANT:

PERSONAL INFO
Extract:
- Name
- Job Title
- Email
- Phone
- Address
- LinkedIn
- GitHub
- Portfolio
- Professional Summary

EXPERIENCE
For EVERY experience extract:
- company
- role
- startDate
- endDate
- currentlyWorking
- accomplishments

EDUCATION
For EVERY education entry extract:
- school
- degree
- fieldOfStudy
- location
- startDate
- endDate
- cgpa
- highlights
- currentlyStudying

VERY IMPORTANT FOR EDUCATION:
If the college location appears on the same line or nearby lines as the college name, include it in "location".

If dates such as "2019-2023", "2019 – Present", "June 2022", etc. appear near the education section, they MUST be extracted into startDate and endDate.

SKILLS
Merge ALL of these into ONE skills array:
- Technical Skills
- Soft Skills
- Core Skills
- Key Skills
- Professional Skills
- Competencies

Remove duplicate skills.

PROJECTS
Extract:
- projectName
- role
- technologies
- startDate
- endDate
- description
- link

CERTIFICATIONS
Extract:
- name
- organization
- credentialId
- issueDate
- expiryDate
- learned

Return empty values if information does not exist.

Resume:

${resumeText}
`;

    try {

        let response = null;

        for (let attempt = 1; attempt <= 3; attempt++) {

            try {

                response = await ai.models.generateContent({
                    model: "gemini-3.5-flash",
                    contents: prompt,
                });

                break;

            } catch (error) {

                if (error.status === 503 && attempt < 3) {

                    console.log(`Gemini busy... Retry ${attempt}/3`);

                    await new Promise(resolve =>
                        setTimeout(resolve, 2000 * attempt)
                    );

                    continue;
                }

                if (error.status === 429 && attempt < 3) {

                    console.log("Gemini quota exceeded. Waiting 60 seconds...");

                    await new Promise(resolve =>
                        setTimeout(resolve, 60000)
                    );

                    continue;
                }

                throw error;
            }
        }

        if (!response) {
            throw new Error("No response received from Gemini.");
        }

        let text = response.text;

        text = text.replace(/```json/gi, "");
        text = text.replace(/```/g, "");
        text = text.trim();

        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("Gemini did not return valid JSON.");
        }

        const parsedResume = JSON.parse(jsonMatch[0]);

        return parsedResume;

    } catch (error) {

        console.error("Gemini Parser Error:", error);

        if (error.status === 429) {
            throw new Error(
                "Gemini API quota exceeded. Please wait or use another API key."
            );
        }

        if (error.status === 503) {
            throw new Error(
                "Gemini service is temporarily unavailable. Please try again."
            );
        }

        throw new Error(error.message || "Failed to parse resume using Gemini.");
    }
};