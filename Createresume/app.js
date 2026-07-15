import dotenv from "dotenv"
import express from "express"
import DB from "./connect/db.js"
import route from "./route/route.js"

dotenv.config();
const app=express();

app.use(express.json());

app.use("/api/createresume",route);


//connection using port saved in .env file
DB();
const PORT= process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`server is running on ${PORT}`);
});