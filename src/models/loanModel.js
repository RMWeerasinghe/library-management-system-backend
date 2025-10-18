// src/models/loanModel.js
import db from "../config/postgresClient.js";

const settings = await db`
    SELECT * FROM library.settings
`;


const LOAN_DAYS = Number(settings.find(s => s.key === 'loan_days')?.value);
export const MAX_BOOKS_PER_MEMBER = Number(settings.find(s => s.key === 'max_books_per_member')?.value);
const FINE_PER_DAY = Number(settings.find(s => s.key === 'fine_per_day')?.value);



// Create a new loan record
export const createLoan = async (loan) => {
    try {
      const loan_date = new Date();
      const due_date = new Date();
      due_date.setDate(loan_date.getDate() + LOAN_DAYS);


      const result = await db`
        INSERT INTO library.loans (member_id, book_id, loan_date, due_date, status)
        VALUES (${loan.member_id}, ${loan.book_id}, ${loan_date}, ${due_date}, 'borrowed')
        RETURNING *;
      `;
      return result[0];
    }catch (err) {
    console.error('Error creating loan:', err);
    throw err;
  }
};

// Mark a loan as returned and record return_date
export const markAsReturned = async (loan_id) => {
  try {
    const now = new Date();

    // fetch the loan
    const loan = await db`
      SELECT * FROM library.loans WHERE id = ${loan_id};
    `;
    if (!loan.length) return null;

    const due_date = new Date(loan[0].due_date);
    const daysLate = Math.max(0, Math.ceil((now - due_date) / (1000 * 60 * 60 * 24)));
    const fine = daysLate * FINE_PER_DAY;

    const updated = await db`
      UPDATE library.loans
      SET status = 'returned', return_date = ${now}, fine_amount = ${fine}
      WHERE id = ${loan_id}
      RETURNING *;
    `;

    return updated[0];
  } catch (err) {
    console.error('Error updating loan status:', err);
    throw err;}
};

// Get overdue loans
export const getOverdueLoans = async () => {
  try{
    const today = new Date();
    const results = await db`
      SELECT *
      FROM library.loans
      WHERE status = 'borrowed' AND due_date < ${today};
    `;
    return results;
  }catch (err) {
    console.error('Error fetching overdue loans:', err);
    throw err;}
};


export const getActiveLoanCount = async(member_id) => {
    const result = await db`
    SELECT COUNT(id) as activeLoanCount FROM library.loans WHERE member_id = ${member_id} AND return_date = ${null}
    `
    
    return result[0];
}