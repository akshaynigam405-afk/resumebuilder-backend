import express from "express";
import {
    generateSummary,
    improveAccomplishments
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-summary", generateSummary);

router.post("/accomplishments", improveAccomplishments);

export default router;