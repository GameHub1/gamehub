var request = require('request');

var base_url = 'http://localhost:8000/';

describe ('Server Loading', function() {
  describe ('GET /', function() {
    it ('returns status code 200', function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

  });
});