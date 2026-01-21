import express from "express";
import { addSkill, deleteSkill, getAllSkills, updateSkill, activeSkills, getSkillsCount } from "../controllers/skill-controller.js";
import { checksecuritycode } from "../middlewares/auth-middleware.js";
const router = express.Router();

router.post("/add", checksecuritycode, addSkill);

router.get("/all/:user_id", getAllSkills);
router.get("/active", activeSkills);
router.get("/count", getSkillsCount);
router.put("/update", checksecuritycode, updateSkill);

router.delete("/delete/:id", checksecuritycode, deleteSkill);

export default router;
