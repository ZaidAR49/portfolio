import express from "express";
import {
    activateUser, addUser, getAllUsers, getUserByPortfolioName, getActiveUser, updateUser,
    deleteUser, deactivateUser
} from "../controllers/user-controller.js";
import { checksecuritycode } from "../middlewares/auth-middleware.js";
const router = express.Router();

router.post("/add", checksecuritycode, addUser);
router.get("/all", getAllUsers);
router.post("/activate/:id", checksecuritycode, activateUser);
router.post("/deactivate/:id", checksecuritycode, deactivateUser);
router.get("/active", getActiveUser);
router.get("/:portfolioName", getUserByPortfolioName);
router.put("/update/:portfolioName", checksecuritycode, updateUser);
router.delete("/delete/:id", checksecuritycode, deleteUser);

//router.get("/:portfolioName", getUserByPortfolioName);

export default router;
