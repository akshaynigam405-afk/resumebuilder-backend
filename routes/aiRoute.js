import express from "express";
import {
    generateSummary,
    improveAccomplishments,
    suggestSkills,
    generateExperienceSection,
    checkATSScore,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-summary", generateSummary);

router.post("/accomplishments", improveAccomplishments);

router.post("/skills", suggestSkills);
router.post("/experience", generateExperienceSection);
router.post("/ats-score", checkATSScore);

export default router;