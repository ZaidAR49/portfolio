import express from "express";
import {
    activateUser, addUser, getAllUsers, getUserByPortfolioName, getActiveUser, updateUser,
    deleteUser, deactivateUser
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/all", getAllUsers);
router.post("/activate/:id", activateUser);
router.post("/deactivate/:id", deactivateUser);
router.get("/active", getActiveUser);
router.get("/:portfolioName", getUserByPortfolioName);
router.put("/update/:portfolioName", updateUser);
router.delete("/delete/:id", deleteUser);

//router.get("/:portfolioName", getUserByPortfolioName);

export default router;
