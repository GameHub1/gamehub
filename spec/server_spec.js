const request = require('supertest-as-promised');
const app = require('../server/server');
const bookshelf = require('../server/psqldb.js');

const User = bookshelf.Model.extend({
  tableName: 'users'
});

const Users = new bookshelf.Collection();
Users.model = User;

describe ('Server Loading', () => {
  describe ('GET /', () => {
    it ('returns status code 200', done => {
      request(app)
        .get('/')
        .then(res => {
          expect(res.statusCode).toEqual(200);
          done();
        })
        .catch(done.fail);
    });
  });
});

describe ('Sign Up', () => {
  beforeEach(() => {
    this.mockUser = {
      name: 'Tester1',
      email: 'hello@mks.com',
      pic_path: 'testimage.jpg',
      routeProp: 'val'
    };

    this.existingUser = {
      name: 'Gina Zhou',
      email: 'g1na1011@gmail.com',
      pic_path: 'https://scontent.xx.fbcdn.net/t31.0-1/12771953_10205948725971326_3059424567126164428_o.jpg',
      routeProp: 'val'
    };
  });

  afterEach(() => {
    new User({email: this.mockUser.email}).fetch()
      .then(found => {
        console.log('FOUND', found)
      })
  });

  describe ('POST /signup', () => {
    it ('Adds new user and returns new user object', done => {
      request(app)
        .post('/signup')
        .send(this.mockUser)
        .then(res => {
          expect(res.statusCode).toEqual(200);
          expect(res.body).toEqual({
            name: 'Tester1', 
            email: 'hello@mks.com', 
            routeProp: 'not found'
          })
          done();
        })
        .catch(done.fail);
    });

    it ('Finds existing user and returns existing user object', done => {
      request(app)
        .post('/signup')
        .send(this.existingUser)
        .then(res => {
          expect(res.statusCode).toEqual(200);
          expect(res.body).toEqual({
            name: 'Gina Zhou',
            email: 'g1na1011@gmail.com',
            routeProp: 'found'
          })
          done();
        })
        .catch(done.fail);
    });
  });
});

describe('Add Game', function()){

  describe('POST /games', function() {
    it("adds game information", function(done){
      request(app)
        .post('/games')
        .send([{gameTitle: "Super Smash Bros"}, "supermario@mks.com"])
        .expect(200)
        .then(function(res){
          done();
        });
    });
  });

}
