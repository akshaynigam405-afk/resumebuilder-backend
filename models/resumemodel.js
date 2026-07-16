import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
{
    personalInfo: {
        fullName: {
            type: String,
            default: ""
        },
        jobTitle: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        portfolio: {
            type: String,
            default: ""
        },
        professionalSummary: {
            type: String,
            default: ""
        }
    },

    experience: [
        {
            company: String,
            role: String,
            startDate: String,
            endDate: String,
            accomplishments: String,
            currentlyWorking: {
                type: Boolean,
                default: false
            }
        }
    ],

    education: [
        {
            school: String,
            degree: String,
            fieldOfStudy: String,
            description: String,
            startDate: String,
            endDate: String,
            location: String,
            cgpa: String,
            highlights: String,
            currentlyStudying: {
                type: Boolean,
                default: false
            }
        }
    ],

    skills: [String],

    projects: [
        {
            projectName: String,
            role: String,
            link: String,
            technologies: [String],
            startDate: String,
            endDate: String,
            description: String
        }
    ],

    certifications: [
        {
            name: String,
            organization: String,
            credentialId: String,
            issueDate: String,
            expiryDate: String,
            learned: String
        }
    ],

    resumeText: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
}
);

export default mongoose.model("Resume", resumeSchema);