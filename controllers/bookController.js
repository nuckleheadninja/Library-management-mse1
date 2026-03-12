const Book = require('../models/Book');

// @desc    Add a new book
// @route   POST /books
exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all book records
// @route   GET /books
exports.viewAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Search books by title or author
// @route   GET /books/search
exports.searchBooks = async (req, res) => {
  try {
    const { title, author } = req.query;
    let query = {};
    
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (author) {
      query.author = { $regex: author, $options: 'i' };
    }

    const books = await Book.find(query);
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get book by ID
// @route   GET /books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update book details
// @route   PUT /books/:id
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete book record
// @route   DELETE /books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
