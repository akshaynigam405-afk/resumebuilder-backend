import express from "express"
import { createresume } from "../controller/usercontroller.js";

//this file contains the create-resume api 
const router=express.Router()
router.post("/createresume", createresume);

export default router