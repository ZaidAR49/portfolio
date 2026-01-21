import express from "express";
import { getExperiencesCount, addExperience, getExperienceByUserId, getExperienceById, deleteExperience, updateExperience, getActiveExperiences, addManyExperiences } from "../controllers/experience-controller.js";
import { checksecuritycode } from "../middlewares/auth-middleware.js";
const router = express.Router();
router.get("/all/:id", getExperienceByUserId);
router.get("/active", getActiveExperiences);
router.get("/count", getExperiencesCount);
router.get("/:id", getExperienceById);
router.delete("/delete/:id", checksecuritycode, deleteExperience);
router.put("/update/:id", checksecuritycode, updateExperience);
router.post("/add", checksecuritycode, addExperience);
router.post("/addMany/:id", checksecuritycode, addManyExperiences);

export default router;