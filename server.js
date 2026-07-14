import dotenv from "dotenv"
import express from "express"
import DB from "./config/db.js"
import route from "./routes/route.js"
import resumeroute from "./routes/resume.js";
import cors from "cors"
import dns from "dns"


dns.setServers(["8.8.8.8","8.8.4.4"]);

dotenv.config();

const PORT = process.env.PORT ;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", route);
app.use("/api", resumeroute);


// Database connection
DB();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});