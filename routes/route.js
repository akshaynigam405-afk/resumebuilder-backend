import express from "express"
import { createresume,experience,education,skills, skillw,projects,certificates } from "../controllers/usercontroller.js";


//post apis 
const router=express.Router()
router.post("/createresume", createresume);
router.put("/experience/:id",experience)
router.put("/education/:id",education)
router.put("/projects/:id",projects)
router.put("/certificates/:id",certificates)


//get api
router.get("/skills",skills)
router.put("/skills/:id",skillw)


//fetch API for resume preview
// router.get("/my-resume")


export default router