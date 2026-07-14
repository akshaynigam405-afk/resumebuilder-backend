import express from "express";
import { createUser, getUser } from "../controllers/usercontroller.js";

const router = express.Router();

router.post("/create-user", createUser);
router.get("/user", getUser);

export default router