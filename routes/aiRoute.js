import express from "express";
import {
    generateSummary,
    improveAccomplishments,
    suggestSkills,
    generateExperienceSection,
    checkATSScore,
    improveProjectDescription,
    generateCertificateDescription,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-summary", generateSummary);

router.post("/accomplishments", improveAccomplishments);

router.post("/skills", suggestSkills);
router.post("/experience", generateExperienceSection);
router.post("/project-description", improveProjectDescription);
router.post("/ats-score", checkATSScore);
router.post("/certificate-description", generateCertificateDescription);

export default router;