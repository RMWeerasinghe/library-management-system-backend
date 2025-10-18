// src/routes/loanRoutes.js
import express from "express";
import {
  lendBook,
  returnBook,
  listOverdueLoans,
} from "../controllers/loanController.js";

const router = express.Router();

router.post("/", lendBook);            // POST /api/loans
router.put("/:id/return", returnBook); // PUT /api/loans/:id/return
router.get("/overdue", listOverdueLoans); // GET /api/loans/overdue

export default router;
