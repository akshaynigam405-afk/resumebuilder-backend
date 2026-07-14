import express from "express";
import multer from "multer";
import { uploadResume } from "../controllers/resumecontroller.js";

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/upload-resume",
    upload.single("resume"),
    uploadResume
);

export default router;