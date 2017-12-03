/* jshint -W117 */
var should = require('should');
var request = require('supertest');
var app = require('./../../app');
var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var agent = request(app);

describe('Book CRUD test', function() {
   it('Should allow a book to be posted and return a read and _id', function(done) {
       var book = {title:'Adultery', author:'Paulo Cohelo', genre:'Fiction'};
       agent.post('/books')
           .send(book)
           .expect(200)
           .end(function(err, results){
              results.body.read.should.equal(false);
              results.body._id.should.be.not.null();
              done();
           });
   });

   afterEach(function(done) {
       Book.remove().exec();
       done();
   });
});