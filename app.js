import express, { json } from 'express';
import dotenv from 'dotenv';
import user_routes from './routes/user.js'
import connectDB from './connect/db.js';
import cors from "cors";



dotenv.config();


const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("HI, I am Live")
})

app.use("/api", user_routes);

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`${PORT} Server is Running`)
        })
        
    } catch (error) {
        console.log(error);
    }
}

start();