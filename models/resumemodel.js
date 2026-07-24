import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            default: "Untitled"
        },

        status: {
            type: String,
            enum: ["draft", "completed"],
            default: "draft"
        },

        resumeType: {
            type: String,
            enum: ["draft", "created", "uploaded"],
            default: "draft"
        },

        progress: {
            type: Number,
            default: 0
        },

        currentStep: {
            type: Number,
            default: 1
        },

        atsScore: {
            type: Number,
            default: null
        },

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

            linkedin: {
                type: String,
                default: "",
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
                certificateName: String,
                organization: String,
                credentialId: String,
                credentialUrl: String,
                issueDate: String,
                expirationDate: String,
                doesNotExpire: {
                    type: Boolean,
                    default: false
                },
                description: String
            }
        ],

        languages: [
            {
                type: String
            }
        ],

        interests: [
            {
                type: String
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

export default mongoose.model(
    "Resume",
    resumeSchema,
    "userinfos"
);