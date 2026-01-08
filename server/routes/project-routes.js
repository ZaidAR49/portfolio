import express from "express";
import { addProject, getProjectByUserId, getProjectById, deleteProject, updateProject } from "../controllers/project-controller.js";
const router = express.Router();

router.post("/add", addProject);
router.get("/all/:id", getProjectByUserId);
router.get("/:id", getProjectById);
router.delete("/delete/:id", deleteProject);
router.put("/update/:id", updateProject);

export default router;