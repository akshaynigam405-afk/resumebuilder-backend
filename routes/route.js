import express from "express"
import { createresume,experience,education,skills, skillw } from "../controllers/usercontroller.js";


//post apis 
const router=express.Router()
router.post("/createresume", createresume);
router.post("/experience/:id",experience)
router.post("/education/:id",education)
// router.post("/projects/:id",project)
// router.post("/certificates/:id",certificate)


//get api
router.get("/skills",skills)
router.post("/skills/:id",skillw)


export default router