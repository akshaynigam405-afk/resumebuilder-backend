import personalparser from "./personalparser.js";
import experienceparser from "./experienceparser.js";
import educationparser from "./educationparser.js";
import skillsparser from "./skillsparser.js";
import projectparser from "./projectparser.js";
import certificationparser from "./certificationparser.js";

export default function parseresume(text) {

    return {

        personalInfo: personalparser(text),

        experience: experienceparser(text),

        education: educationparser(text),

        skills: skillsparser(text),

        projects: projectparser(text),

        certifications: certificationparser(text),

        resumeText: text

    };

}