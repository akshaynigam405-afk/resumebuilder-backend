import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type : String, default :null
    },
    email : {
        type : String, default :null
    },
    password : {
        type : String, default :null
    },
})


const userModel = mongoose.model('userData', userSchema);

export default userModel;