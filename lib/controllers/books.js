const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      if (req.body.authorIds) {
        await Promise.all(req.body.authorIds.map((authorId) => book.addAuthorById(authorId)));
      }
      // this is where authorid is unsuccessfully passed.
      res.json(book);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.getById(req.params.id);
      res.json(book);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  });
