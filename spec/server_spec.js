var request = require('supertest-as-promised');
var app = require('../server/server');

describe ('Server Loading', function() {
  describe ('GET /', function() {
    it ('returns status code 200', function(done) {
      request(app)
        .get('/')
        .then(function(res) {
          expect(res.statusCode).toEqual(200);
          done();
        })
        .catch(done.fail);
    });
  });
});

describe ('Sign Up', function() {
  beforeEach(function() {
    this.mockUser = {
      name: 'Tester1', 
      email: 'hello@mks.com', 
      pic_path: 'testimage.jpg', 
      routeProp: 'val'
    };
  });

  describe ('POST /signup', function() {
    it ('console logs "User is already in database."', function(done) {
      request(app)
        .post('/signup')
        .send(this.mockUser)
        .expect(200)
        .then(function(res) {
          done();
        });
    });
  });
});