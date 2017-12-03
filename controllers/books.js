var bookController = function(Book) {

  var getBooks = function(req, res) {
      var query = req.query;
      Book.find(query, function(err, books) {
          if(err) {
              res.status(500);
              res.send(err);
          } else {
              res.send(books);
          }
      });
  };

  var getBook = function(req, res) {
      var id = req.params.id;
      if(id) {
          Book.findById(id, function (err, book) {
              if (err) {
                  res.status(500);
                  res.send(err);
              } else {
                  res.send(book);
              }
          });
      }
  };

  var createBook = function(req,  res) {
      if(!req.body.title) {
        res.status(400);
        res.send('Title is required');
      }
      var book = new Book(req.body);
      book.save(function(err) {
          if(err) {
              res.status(500);
              res.send(err);
          } else {
              res.status(201);
              res.send(book);
          }
      });
  };

  var updateBook = function(req, res) {
      var promise = Book.findById(req.params.id).exec();
      promise.then(function(book) {
          book.title = req.body.title;
          book.author = req.body.author;
          book.genre = req.body.genre;
          book.read = req.body.read;
          return book.save();
      }).then(function(book) {
          res.status(200);
          res.send(book);
      }).catch(function(err) {
          res.status(500);
          res.send(err);
      });
  };

  var deleteBook = function(req, res) {
      var promise = Book.findById(req.params.id).exec();
      promise.then(function(book) {
          book.remove();
      }).then(function() {
          res.status(204);
          res.send('');
      }).catch(function(err) {
          res.status(500);
          res.send(err);
      });
  };

  return {
    getBooks: getBooks,
    getBook: getBook,
    createBook: createBook,
    updateBook: updateBook,
    deleteBook: deleteBook
  };
};

module.exports = bookController;
