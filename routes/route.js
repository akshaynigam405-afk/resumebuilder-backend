import express from "express"
import { createresume,experience,education,skills } from "../controllers/usercontroller.js";


//post apis 
const router=express.Router()
router.post("/createresume", createresume);
router.post("/experience/:id",experience)
router.post("/education/:id",education)
// router.post("/projects/:id",project)
// router.post("/certificates/:id",certificate)


//get api
router.get("/skills",skills)


export default router