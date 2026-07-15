import express from "express"
import { createresume,experience,education,skills, skillw,projects,certificates } from "../controllers/usercontroller.js";


//post apis 
const router=express.Router()
router.post("/createresume", createresume);
router.post("/experience/:id",experience)
router.post("/education/:id",education)
router.post("/projects/:id",projects)
router.post("/certificates/:id",certificates)


//get api
router.get("/skills",skills)
router.post("/skills/:id",skillw)


export default router