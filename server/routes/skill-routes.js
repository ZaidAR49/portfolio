import express from "express";
import { addSkill, deleteSkill, getAllSkills, updateSkill } from "../controllers/skill-controller.js";
const router = express.Router();

router.post("/add", addSkill);

router.get("/all/:user_id", getAllSkills);

router.put("/update", updateSkill);

router.delete("/delete/:id", deleteSkill);

export default router;
