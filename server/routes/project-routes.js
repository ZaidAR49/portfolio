import express from "express";
import { updateProjectSortOrder, swapProjectSortOrder, addManyProjects, addProject, getProjectByUserId, getProjectById, deleteProject, updateProject, activeProjects, getProjectsCount } from "../controllers/project-controller.js";
import { checksecuritycode } from "../middlewares/auth-middleware.js";
const router = express.Router();
router.patch("/swapSortOrder", checksecuritycode, swapProjectSortOrder);
router.patch("/sortOrder/:id", checksecuritycode, updateProjectSortOrder);
router.post("/add", checksecuritycode, addProject);
router.get("/all/:id", getProjectByUserId);
router.get("/active", activeProjects);
router.get("/count", getProjectsCount);
router.get("/:id", checksecuritycode, getProjectById);
router.delete("/delete/:id", checksecuritycode, deleteProject);
router.put("/update/:id", checksecuritycode, updateProject);
router.post("/addMany/:id", checksecuritycode, addManyProjects);

export default router;