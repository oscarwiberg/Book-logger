const router = require('express').Router();
const Book = require('../models/book.model');

router.route('/').get((req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const pages = Number(req.body.pages);
  const date = Date.parse(req.body.date);

  const newBook = new Book({ username, title, pages, date });
  newBook
    .save()
    .then(() => res.json('Book added :)'))
    .catch((err) => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json(err));
});

router.route('/:id').delete((req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted :)'))
    .catch((err) => res.status(400).json(err));
});

router.route('/update/:id').post((req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      book.username = req.body.username;
      book.title = req.body.title;
      book.pages = Number(req.body.pages);
      book.date = Date.parse(req.body.date);

      book
        .save()
        .then(() => res.json('Book saved :)'))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
