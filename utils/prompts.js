/**
 * Generate a professional ATS-friendly resume summary prompt.
 *
 * @param {Object} data
 * @returns {string}
 */
export const resumeSummaryPrompt = (data) => {
    const {
        fullName = "Not provided",
            jobTitle = "Not provided",
            experience = "Not provided",
            skills = "Not provided",
            education = "Not provided",
            projects = "Not provided",
    } = data;

    return `
You are an expert Resume Writer and ATS Resume Optimization Specialist.

Your task is to generate a professional resume summary.

Follow these rules strictly:

1. Write between 80 and 120 words.
2. Make it ATS-friendly.
3. Use professional English.
4. Do not use markdown.
5. Do not use bullet points.
6. Do not include headings.
7. Do not invent fake experience.
8. Do not invent fake achievements or metrics.
9. Only use the information provided.
10. Highlight technical skills naturally.
11. Return ONLY the summary text.

Candidate Details

Name:
${fullName}

Target Role:
${jobTitle}

Experience:
${experience}

Skills:
${skills}

Education:
${education}

Projects:
${projects}
`;
};

/**
 * Generate ATS-friendly accomplishment improvement prompt.
 *
 * @param {string} role
 * @param {string} company
 * @param {string|Array} accomplishments
 * @returns {string}
 */
export const accomplishmentPrompt = (
    role = "full stack developer",
    company = "Kommon school",
    accomplishments = "improved the performance of the application by 30% and reduced the load time by 50%"
) => {
    const formattedAccomplishments = Array.isArray(accomplishments) ?
        accomplishments.map((item) => `- ${item}`).join("\n") :
        accomplishments;

    return `
You are an expert Resume Writer and ATS Resume Optimization Specialist.

Your task is to improve the accomplishments section of a resume.

Candidate Details

Role:
${role}

Company:
${company}

Current Accomplishments:
${formattedAccomplishments}

Instructions:

1. Rewrite each accomplishment professionally.
2. Use strong action verbs.
3. Improve grammar and readability.
4. Make every point ATS-friendly.
5. Keep the original meaning.
6. Do NOT invent fake achievements, percentages, or metrics.
7. Do NOT add new responsibilities that are not provided.
8. Keep each bullet concise (15-30 words).
9. Return ONLY bullet points.
10. Do not add headings or explanations.
`;
};