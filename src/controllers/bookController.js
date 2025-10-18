import { getAllbooks, addBook, findBookbyId, updateBook, deleteBook} from '../models/bookModel.js';

export const createBook = async (req, res) => {
  try {
    const {
      isbn,
      title,
      author = null,
      publisher = null,
      category = null

    } = req.body;

    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'Missing required information' });
    }

    const book = {
        isbn : isbn,
        title : title,
        author : author,
        publisher : publisher, 
        category : category
    }
    const result = await addBook(book);
    res.status(201).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add book' });
  }
};

export const getBooklist = async (req, res) => {
  try {
    const result = await getAllbooks();
    res.status(200).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch book information' });
  }
};



export const getBookById = async (req, res) => {

 
  try {
    
    const { id } = req.params;

    // Basic validation
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'No id present or invalid id' });
    }

    const member = await findBookbyId(id);

    if (!member) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(member);

  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update member
export const updatBookById = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ error: "Book ID required" });

    const updatedBook = await updateBook(id, req.body);
    if (!updatedBook) return res.status(404).json({ error: "Book not found" });

    res.status(200).json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete member
export const deleteBookById = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ error: "Book ID required" });

    await deleteBook(id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};