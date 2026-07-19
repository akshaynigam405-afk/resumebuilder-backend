import express from "express";
import multer from "multer";

import {
    uploadResume,
    createResume,
    updateResume,
    getResume,
    getMyResumes,
    completeResume,
    deleteResume,
    renameResume,
    duplicateResume,
} from "../controllers/resumecontroller.js";

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/upload-resume",
    upload.single("resume"),
    uploadResume
);




// Changes makes by Alok

// Create Draft Resume

router.post(
    "/resume",
    createResume
);


// Get All Resume

router.get(
    "/resume",
    getMyResumes
);


// Get Resume By Id

router.get(
    "/resume/:id",
    getResume
);


// Update Resume

router.put(
    "/resume/:id",
    updateResume
);


// Complete Resume

router.patch(
    "/resume/:id/complete",
    completeResume
);

router.delete(
    "/resume/:id",
    deleteResume
);

router.patch(
    "/resume/:id/title",
    renameResume
);

router.post(
    "/resume/:id/duplicate",
    duplicateResume
);

export default router;