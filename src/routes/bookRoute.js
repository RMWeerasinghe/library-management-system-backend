import express from "express";
import {createBook,getBooklist, getBookById, updatBookById, deleteBookById } from "../controllers/bookController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect this route
router.use(verifyToken);


router.post("/", createBook);
router.get("/", getBooklist);
router.get("/:id", getBookById);
router.put("/:id", updatBookById);
router.delete("/:id", deleteBookById);


export default router;
