import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);


const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)

        console.log("DB IS CONNECTED");
    } catch (error) {
        console.log(error);

    }
}


export default connectDB;