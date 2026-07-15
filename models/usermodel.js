import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        maxlength: 18
    },

    jobTitle: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true
    },

    phone: {
        type: Number,
        match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]
    },

    location: {
        type: String,
        required: true
    },

    portfolio: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true,
    },

    // Fields for experience page below
    experience: [
        {
            company: String,
            role: String,
            start: Date,
            end: Date,
            accomplishments: String
        }
    ],

    // validation check if user has completed experience
    experienceCompleted: {
        type: Boolean,
        default: false
    },

    //education form schema
    education: [
        {
            school: String,
            degree: String,
            field: String,
            location: String,
            start: Date,
            end: Date,
            cgpa: String,
            Coursework: String
        }
    ],

    educationCompleted: {
        type: Boolean,
        default: false
    },

    //skills
    skills: {
        type: [String],
        default: [],
    }
});

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
});

const user = mongoose.model("userinfo", userschema);

export default user;

const userModel = mongoose.model("userData", userSchema);

export {user,userModel}