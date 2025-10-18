// src/controllers/loanController.js
import { createLoan, markAsReturned, getOverdueLoans, getActiveLoanCount, MAX_BOOKS_PER_MEMBER} from "../models/loanModel.js";

// POST /api/loans

export const lendBook = async (req, res) => {
  try {
    const { member_id, book_id} = req.body;

    // Check if member already has max books
    const activeLoansCount = await getActiveLoanCount(member_id);


    if (activeLoansCount >= MAX_BOOKS_PER_MEMBER) {
      return res.status(400).json({
        error: `Member has already borrowed ${MAX_BOOKS_PER_MEMBER} books`
      });
    }

    // Proceed to create loan
    const newLoan = await createLoan({
      member_id,
      book_id
    });

    res.status(201).json(newLoan);

  } catch (err) {
    console.error("Error lending book:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// PUT /api/loans/:id/return
export const returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await markAsReturned(id);

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.status(200).json({
      message: "Book returned successfully",
      fine: loan.fine,
      loan,
    });
  } catch (err) {
    console.error("Error returning book:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/loans/overdue
export const listOverdueLoans = async (req, res) => {
  try {
    const overdue = await getOverdueLoans();
    res.status(200).json(overdue);
  } catch (err) {
    console.error("Error fetching overdue loans:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
