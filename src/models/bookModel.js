import db from '../config/postgresClient.js';

export const getAllbooks = async () => {

    try {

        const results = await db`

        SELECT * FROM library.books`
        
        return results;

    }catch (err) {
    console.error('Error fetching book information:', err);
    throw err;
  }

};


export const addBook = async (book) => {
    try{
        const result = await db `
            INSERT INTO library.books 
                (isbn,title,author,publisher, category)
            VALUES
                (${book.isbn}, ${book.title}, ${book.author},${book.publisher},${book.category})
            RETURNING *
        `
        return result[0];

    }catch (err) {
    console.error('Error inserting book information:', err);
    throw err;
  }
};


export const findBookbyId = async (id) => {

    try {

        const results = await db`

        SELECT * FROM library.books WHERE id = ${id}`
        
        return results[0];

    }catch (err) {
    console.error('Error fetching book information:', err);
    throw err;
  }

};


export const updateBook = async (id, fields) => {
  try {
    const data = {};
    if (fields.isbn) data.isbn = fields.isbn;
    if (fields.author) data.author = fields.author;
    if (fields.publisher) data.publisher = fields.publisher;
    if (fields.title) data.title = fields.title;


    const result = await db`
      UPDATE library.books SET ${db(data)} WHERE id = ${id} RETURNING *
    `;
    return result[0];
      
  }catch (err) {
    console.error('Error updating book information:', err);
    throw err;
  }
};


// Delete member
export const deleteBook = async (id) => {
  await db`DELETE FROM library.books WHERE id = ${id}`;
  return { message: "Member deleted successfully" };
};
