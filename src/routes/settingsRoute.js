import express from "express";
import {updateSettingParam } from "../controllers/settingsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect this route
router.use(verifyToken);


router.post("/", updateSettingParam);


export default router;
