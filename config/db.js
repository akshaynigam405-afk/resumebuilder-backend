import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8","8.8.4.4"])

const DB = async () => {
    try {
        console.log(process.env.MONGODB_URI);

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("DB Connected Successfully");
        console.log("Database Name:", mongoose.connection.name);

    } catch (err) {
        console.error("DB connection failed", err);
        process.exit(1);
    }
};

export default DB;