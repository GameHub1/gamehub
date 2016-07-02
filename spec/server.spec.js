const request = require('supertest-as-promised');
const app = require('../server/server');
const bookshelf = require('../server/db/psqldb');
const db = require('../server/db/psqldb');

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

  this.fakeProfile = {
    name: "Fakester",
    location: "MKS SF",
    bio: "I love coding",
    email: "hello@mks.com"
  };

});

afterEach(() => {
  db.knex('users')
    .where('email', '=', `${this.mockUser.email}`)
    .del()
    .catch(function(error) {
      // uncomment when writing authentication tests
      // throw {
      //   type: 'DatabaseError',
      //   message: 'Failed to create test setup data'
      // };
    });
    //  db.knex('users')
    // .where('email', '=', `${this.fakeProfile.email}`)
    // .del()
    // .catch(function(error) {
    //   // uncomment when writing authentication tests
    //   // throw {
    //   //   type: 'DatabaseError',
    //   //   message: 'Failed to create test setup data'
    //   // };
    // });
});

describe ('Server Loading', () => {
  describe ('GET /', () => {

    it ('Returns status code 200', done => {
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

// describe('Add Game', () => {
//   describe('POST /games', () => {
//     it("adds game information", done => {
//       request(app)
//         .post('/games')
//         .send([{gameTitle: "Super Smash Bros"}, "supermario@mks.com"])
//         .expect(200)
//         .then(res => {
//           done();
//         })
//         .catch(done.fail);
//     });
//   });
// });

describe ('POST /favmedia', () => {
  it ('Returns an array of data with existing user who posted videos', done => {
    request(app)
      .post('/favmedia')
      .send([null, 'g1na1011@gmail.com'])
      .then(res => {
        expect(res.body.length >= 1);
        done();
      })
      .catch(done.fail);
  });

//   it ('Returns an empty array with non-existing user', done => {
//     request(app)
//       .post('/favmedia')
//       .send([null, 'testingpurposes@test.com'])
//       .then(res => {
//         expect(res.statusCode).toEqual(200);
//       })
//       .delay(1000)
//       .then(res => {
//         expect(res.body.length === 0); 
//       })
//       .catch(done.fail);
//   });
});

describe ('POST /get_users', () => {
  it ('Returns users related to a search term of a name', (done) => {
    request(app)
      .post('/get_users')
      .send({searchTerm: 'Sam'})
      .then(res => {
        expect(res.body.length).toEqual(2);
        done();
      });
  });

  it ('Returns an empty array if search term is empty', (done) => {
    request(app)
      .post('/get_users')
      .send({searchTerm: ''})
      .then(res => {
        expect(res.body).toEqual([]);
        done();
      });
  });
})

describe ('POST /post_profile', () => {
  it("Returns a error response when an unknown profile attempts to update", (done) => {
      request(app)
        .post('/post_profile')
        .send(this.fakeProfile)
        .then(res => {
          expect(res.body.status).toEqual("EMAIL ADDRESS NOT FOUND!");
          done();
        });
  });

  it("Returns a confirmation response when a profile is updated", done => {
     request(app)
      .post('/post_profile')
      .send(this.existingUser)
      .then(res => {
        expect(res.body.status).toEqual("POST SUCCESSFULL!")
        done();
      });
  });
});

describe ('POST /get-games', () => {
  it("Should return an array of games greater than one", done => {
    request(app)
    .post('/fetch_games')
    .send({email: 'kyle@mks.com'})
    .then(res => {
      expect(res.body.data.length > 1).toEqual(true);
      done();
    });
  })
});

describe('POST /show_friends', () => {
  it("Should return an array of friends for an existing user", done => {
    request(app)
      .post('/show_friends')
      .send({email: 'kyle@mks.com'})
      .then(res => {
        expect(res.body.data.length >1).toEqual(true);
        done();
      });
  });
});

describe('POST /show_followers', () => {
  it("Should return an array of people who are following this user", done=> {
    request(app)
      .post('/show_followers').
      send({email: 'kyle@mks.com'})
      .then(res => {
        expect(res.body.data.length >1).toEqual(true);
        done();
      });
  });
});