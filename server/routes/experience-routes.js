import express from "express";
import { addExperience, getExperienceByUserId, getExperienceById, deleteExperience, updateExperience } from "../controllers/experience-controller.js";
const router = express.Router();

router.post("/add", addExperience);
router.get("/all/:id", getExperienceByUserId);
router.get("/:id", getExperienceById);
router.delete("/delete/:id", deleteExperience);
router.put("/update/:id", updateExperience);

export default router;