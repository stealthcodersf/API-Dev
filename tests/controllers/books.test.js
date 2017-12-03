/* jshint -W117 */
var should = require('should');
var sinon = require('sinon');
var bookControllerFn = require('./../../controllers/books');

describe('Book controller test', function() {
   describe('Create Book', function() {
      it('should not allow empty title on create', function() {
          var Book = function(book) {
            this.save = function() {};
          };

          var req = {
            body: {author: 'Naveen'}
          };

          var res = {
              status: sinon.spy(),
              send: sinon.spy()
          };
          var bookController = bookControllerFn(Book);
          bookController.createBook(req, res);
          res.status.calledWith(400).should.equal(true, 'Bad Status '+res.status);
          res.send.calledWith('Title is required').should.equal(true);
      });
   });
});