import mongoose from "mongoose";


const userschema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        maxlength: 18
    },

    jobtitle: {
        type: String,
        required: true,
        maxlength: 20
    },

    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique:true
    },
    phone: {
        type: Number,
        required: true,
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
    professionalsummary: {
        type: String,
        required: true,
        maxlength: 150
    },

})
const user = mongoose.model("userinfo", userschema);

export default user;