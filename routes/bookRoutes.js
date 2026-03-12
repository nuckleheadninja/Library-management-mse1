const express = require('express');
const router = express.Router();
const {
  addBook,
  viewAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks
} = require('../controllers/bookController');

// Search route must come BEFORE /:id route
router.get('/search', searchBooks);

router.route('/')
  .post(addBook)
  .get(viewAllBooks);

router.route('/:id')
  .get(getBookById)
  .put(updateBook)
  .delete(deleteBook);

module.exports = router;
