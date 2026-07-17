// Resume Summary Prompt
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

// Accomplishments Improvement Prompt
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

// Skills Suggestion Prompt
export const skillsPrompt = (
    role = "Full Stack Developer",
    currentSkills = ["React", "Node.js"],
    projects = ["AI Resume Builder"]
) => {

    const formattedSkills = Array.isArray(currentSkills) ?
        currentSkills.join(", ") :
        currentSkills;

    const formattedProjects = Array.isArray(projects) ?
        projects.map((project) => `- ${project}`).join("\n") :
        projects;

    return `
You are an expert Resume Writer and ATS Resume Optimization Specialist.

Your task is to suggest relevant technical skills for the candidate based on the provided role, existing skills, and projects.

Candidate Details

Role:
${role}

Current Skills:
${formattedSkills}

Projects:
${formattedProjects}

Instructions:

1. Suggest only technical skills relevant to the candidate's role.
2. Include programming languages, frameworks, databases, tools, cloud platforms, and version control technologies where appropriate.
3. Do NOT repeat skills already listed.
4. Do NOT suggest unrelated technologies.
5. Prioritize ATS-friendly and industry-standard keywords.
6. Suggest between 8 and 12 skills.
7. Return ONLY a comma-separated list of skills.
8. Do not add headings, numbering, explanations, or markdown.
`;
};

//  Generate ATS Friendly Experience


export const experiencePrompt = (resumeData) => {

    return `

You are an Expert ATS Resume Writer, Technical Recruiter, and Hiring Manager.

Your task is to generate a highly professional, ATS-friendly Experience section for a modern one-page resume.

=========================
Candidate Information
=========================

Role:
${resumeData.role || ""}

Skills:
${Array.isArray(resumeData.skills)
? resumeData.skills.join(", ")
: resumeData.skills || ""}

Education:
${resumeData.education || ""}

Projects:
${resumeData.projects || ""}

Experience:
${resumeData.experience || ""}

Summary:
${resumeData.summary || ""}

Achievements:
${resumeData.achievements || ""}

=========================
Instructions
=========================

Analyze the complete resume before writing.

Understand the candidate's

• Role
• Skills
• Projects
• Education
• Technologies
• Responsibilities
• Achievements

Generate professional resume experience.

Each experience should contain only 3-4 bullet points.

Each bullet must be ONLY 2-3 lines long on an A4 resume.

Each bullet should

• Start with a strong action verb.

• Mention technologies naturally.

• Explain responsibility.

• Mention measurable impact whenever possible.

• Show business value.

• Be ATS friendly.

Use action verbs like

Developed

Designed

Implemented

Integrated

Optimized

Engineered

Built

Created

Collaborated

Automated

Improved

Configured

Validated

Maintained

Avoid

Worked on

Responsible for

Helped

Participated in

Did

Never generate fake companies.

Never generate fake achievements.

Never generate fake experience.

If professional experience is missing,

convert projects into internship-style professional experience using only the provided information.

=========================
Writing Style
=========================

Write exactly like resumes shortlisted at

Google

Microsoft

Amazon

Adobe

Meta

Apple

Keep the language concise.

Every bullet should have around 22-30 words.

Avoid lengthy paragraphs.

Avoid unnecessary adjectives.

Focus on technical contribution and impact.

=========================
Example Style
=========================

• Developed scalable MERN applications using React.js, Node.js, Express.js, and MongoDB, improving application performance and delivering responsive user experiences.

• Integrated secure REST APIs with JWT authentication and optimized backend services, reducing response time while ensuring reliable communication between frontend and backend.

• Collaborated with cross-functional teams using Git and GitHub to deliver production-ready features while maintaining clean, reusable, and well-documented code.

Return ONLY bullet points.

Do not return JSON.

Do not return explanation.

Do not return headings.

`;

};
export const atsScorePrompt = (resumeData) => {
return `

You are an Expert ATS Resume Analyzer and Technical Recruiter.

Analyze the following resume according to modern ATS standards.

Resume

Job Title:
${resumeData.jobTitle || ""}

Summary:
${resumeData.summary || ""}

Skills:
${Array.isArray(resumeData.skills)
    ? resumeData.skills.join(", ")
    : resumeData.skills || ""}

Experience:
${Array.isArray(resumeData.experience)
    ? resumeData.experience.join("\n")
    : resumeData.experience || ""}

Projects:
${Array.isArray(resumeData.projects)
    ? resumeData.projects.join("\n")
    : resumeData.projects || ""}

Education:
${resumeData.education || ""}

Job Description:
${resumeData.jobDescription || ""}

Analyze the resume and return ONLY valid JSON.

{
  "overallScore": 91,
  "matchLevel": "Great Match",

  "keywordDensity": "Good",

  "formatting": "Excellent",

  "impactMetrics": "Needs Improvement",

  "summaryScore":88,
  "skillsScore":90,
  "experienceScore":92,
  "projectsScore":94,
  "educationScore":95,

  "strengths":[
      "Strong technical skills",
      "Relevant projects"
  ],

  "weaknesses":[
      "Experience lacks measurable achievements",
      "Missing cloud technologies"
  ],

  "missingKeywords":[
      "Docker",
      "AWS",
      "CI/CD"
  ],

  "quickFixes":[
      "Add measurable achievements in Experience.",
      "Mention Docker and AWS skills.",
      "Include GitHub project links.",
      "Improve project descriptions using action verbs."
  ]
}

Rules

overallScore must be integer between 0-100.

keywordDensity must be one of:
Excellent
Good
Average
Poor

formatting must be one of:
Excellent
Good
Average
Poor

impactMetrics must be one of:
Excellent
Good
Average
Needs Improvement

matchLevel must be one of:
Excellent Match
Great Match
Good Match
Fair Match
Requires Attention

Return ONLY JSON.
`;
};

//  <-------Project Description Prompt ---------->

export const projectDescriptionPrompt = (data) => {

    return `

You are an expert Resume Writer and ATS Resume Optimization Specialist.

Generate ATS-friendly project description.

Project Name:
${data.projectName || ""}

Role:
${data.role || ""}

Technologies:
${data.techStack || ""}

Current Description:
${data.description || ""}

Instructions:

1. Improve the description.
2. Use strong action verbs.
3. Keep original meaning.
4. Do not invent fake features.
5. Write 3-5 bullet points.
6. Mention technologies naturally.
7. Keep ATS friendly.
8. Return ONLY bullet points.

`;

};
//  <-------Certificate Description Prompt ---------->
export const certificateDescriptionPrompt = (data) => {

    return `
You are an expert Resume Writer and ATS Resume Optimization Specialist.

Generate an ATS-friendly certificate description.

Certification Name:
${data.certificationName || ""}

Issuing Organization:
${data.organization || ""}

Issue Date:
${data.issueDate || ""}

Expiration Date:
${data.expiryDate || ""}

Instructions:

- Write exactly 3 professional bullet points.
- Use strong action verbs.
- Mention the knowledge and skills gained.
- Do not invent fake achievements.
- Keep each bullet between 15-25 words.
- ATS friendly.
- Return ONLY bullet points.

Example:

• Gained strong understanding of cloud computing concepts and AWS core services.
• Completed practical labs covering IAM, EC2, S3, networking, and security best practices.
• Demonstrated foundational cloud knowledge through industry-recognized AWS certification.
`;
};