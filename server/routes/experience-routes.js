import express from "express";
import { addExperience, getExperienceByUserId, getExperienceById, deleteExperience, updateExperience, getActiveExperiences } from "../controllers/experience-controller.js";
import { checksecuritycode } from "../middlewares/auth-middleware.js";
const router = express.Router();

router.post("/add", checksecuritycode, addExperience);
router.get("/all/:id", getExperienceByUserId);
router.get("/active", getActiveExperiences);
router.get("/:id", getExperienceById);
router.delete("/delete/:id", checksecuritycode, deleteExperience);
router.put("/update/:id", checksecuritycode, updateExperience);

export default router;