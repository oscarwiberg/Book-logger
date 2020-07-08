const router = require('express').Router();
let Book = require('../models/book.model');

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

module.exports = router;
