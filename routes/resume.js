import express from "express";
import multer from "multer";
import {
    uploadResume,
    getAllResumes,
    deleteResume,
    duplicateResume,
} from "../controllers/resumecontroller.js";

const router = express.Router();

const upload = multer({
    dest: "uploads/",
});

// Upload Resume
router.post(
    "/upload-resume",
    upload.single("resume"),
    uploadResume
);

// Get All Resumes
router.get("/resumes", getAllResumes);

//duplicate
router.post(
    "/:id/duplicate",
    duplicateResume
);

//delete
router.delete(
    "/:id",
    deleteResume
);

export default router;