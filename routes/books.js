var express = require('express');
var Book = require('./../models/books');
var bookController = require('./../controllers/books');
var router = express.Router();

/* GET books listing. */
router.get('/', function(req, res) {
    bookController(Book).getBooks(req, res);
});

/* GET book details */
router.get('/:id', function(req, res) {
    bookController(Book).getBook(req, res);
});

/* POST create book */
router.post('/', function(req, res){
    bookController(Book).createBook(req, res);
});

/* PUT update book */
router.put('/:id', function(req, res) {
    bookController(Book).updateBook(req, res);
});

/* DELETE book */
router.delete('/:id', function(req, res) {
    bookController(Book).deleteBook(req, res);
});
module.exports = router;
