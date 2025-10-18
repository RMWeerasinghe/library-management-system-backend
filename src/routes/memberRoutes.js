import express from "express";
import { createMember, getMemberslist , getMemberById, updateMemberById, deleteMemberById} from "../controllers/memberController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect this route
router.use(verifyToken);


router.post("/",  createMember);
router.get("/", getMemberslist );
router.get("/:id",  getMemberById);
router.put("/:id", updateMemberById);
router.delete("/:id", deleteMemberById);


export default router;
