"use strict";

const path = require('path');
const express = require('express');
const bookshelf = require('./psqldb.js');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../dist/')));

const User = bookshelf.Model.extend({
  tableName: 'users'
});
const Users = new bookshelf.Collection();
Users.model = User;

const Game = bookshelf.Model.extend({
  tableName: 'games'
});
const Games = new bookshelf.Collection();
Games.model = Game;

const FavMedia = bookshelf.Model.extend({
  tableName: 'favmedias'
});
const FavMedias = new bookshelf.Collection();
FavMedias.model = FavMedia;

const Friend = bookshelf.Model.extend({
  tableName: 'friends'
});
const Friends = new bookshelf.Collection();
Friends.model = Friend;

const GameJoin = bookshelf.Model.extend({
  tableName: 'users_games'
});

const GameJoins = new bookshelf.Collection();
GameJoins.model = GameJoin;

const addGameJoin = function(joinReq){
  new GameJoin({
    users_id_fk: joinReq.users_id_fk, games_id_fk: joinReq.games_id_fk
  }).fetch().then(found => {
    if (found) {
      console.log("join already in database!");
    }
    else {
      console.log("JOIN NOT FOUND! ADDED!");
      let newGameJoin = new GameJoin({
        users_id_fk:joinReq.users_id_fk, games_id_fk: joinReq.games_id_fk
      });
      newGameJoin.save().then(newGameJoin2 => {
        GameJoins.add(newGameJoin2);
      });
    }
  });
};

const deleteGameJoin = function(joinReq) {
  new GameJoin({
    users_id_fk: joinReq.users_id_fk, games_id_fk: joinReq.games_id_fk
  }).fetch().then(found => {
    if (found) {
      console.log("join in database");
      let newGameJoin = new GameJoin({
        users_id_fk:joinReq.users_id_fk, games_id_fk: joinReq.games_id_fk
      });
      GameJoins.remove(newGameJoin).then(newGameJoin2 => {
        newGameJoin2.delete();
      });
    }
    else {
      console.log("JOIN NOT FOUND!");
    }
  });
};

app.post('/signup', function(req,res) {
  let name = req.body.name;
  let email = req.body.email;
  let pic_path = req.body.pic_path;
  let routeProp = 'val';

	new User({email: email}).fetch().then(found => {
    if (found) {
   		console.log('User is already in database.');
      routeProp = 'found';
      res.send({name: name, email: email, routeProp: routeProp});
    } else {
      console.log('User not found, added user.');
      routeProp = 'not found';
		  let testUser = new User({
			  fullname: name,
			  email: email,
        pic_path: pic_path
		  });

			testUser.save()
        .then(newUser => {
				  Users.add(newUser);
			   })
        .catch(err => {
          console.error(err);
        });

      res.send({name: name, email: email, routeProp: routeProp});
    }
	})
  .catch(err => {
    console.error(err);
  });
});

app.post('/delete_game', function(req, res){
  let gameTitle = req.body[0].gameTitle;
  let email = req.body[1];
  let joinReq = {users_id_fk: 0, games_id_fk: 0};
  console.log(gameTitle, email);

  setTimeout(function(){
    new Game({name: gameTitle}).fetch().then(model => {
      joinReq.games_id_fk = model.get('id');
      console.log("gameID: ", joinReq.games_id_fk);
      console.log("setTimeout join req:", joinReq);
      deleteGameJoin(joinReq);
    })
    .catch(err => {
      console.error(err);
    });
  }, 500);

  new User({email: email}).fetch().then(model => {
    joinReq.users_id_fk  = model.get('id');
    console.log("User ID: ", joinReq.users_id_fk);
  })
  .catch(err => {
    console.error(err);
  });
});

// app.post('/games', function(req, res) {
//   let gameTitle = req.body[0].gameTitle;
//   let email = req.body[1];
//   let joinReq = {users_id_fk: 0, games_id_fk: 0};

//   new Game({name: gameTitle}).fetch().then(found => {
//     if (found) {
//       console.log(gameTitle + " already in database!");
//     }
//     else {
//       console.log(gameTitle + " NOT FOUND! ADDED!");
//       let newGame = new Game({
//         name: gameTitle
//       });
//       newGame.save().then(newGame2 => {
//         Games.add(newGame2);
//       });
//     }
//   })
//   .then(() => {
//     setTimeout(function(){
//       new Game({name: gameTitle}).fetch().then(model => {
//         joinReq.games_id_fk = model.get('id');
//         console.log("gameID: ", joinReq.games_id_fk);
//         console.log("setTimeout join req:", joinReq);
//         addGameJoin(joinReq);
//       }) ;
//     }, 500);
//   })
//   .then(() => {
//     new User({email: email}).fetch().then(model => {
//       joinReq.users_id_fk  = model.get('id');
//       console.log("User ID: ", joinReq.users_id_fk);
//     });
//   })
//   .catch(err => {
//     console.error(err);
//   });
// });

app.post('/games', function(req, res) {
  let gameTitle = req.body[0].gameTitle;
  let email = req.body[1];
  let joinReq = {users_id_fk: 0, games_id_fk: 0};

  new Game({name: gameTitle}).fetch()
    .then(found => {
      return new Promise((resolve, reject) => {
        if (found) {
          console.log(`${gameTitle} already in database!`);
        } else {
          console.log(`${gameTitle} NOT FOUND! ADDED!`);
          let newGame = new Game({
            name: gameTitle
          });

          newGame.save().then(newGame2 => {
            Games.add(newGame2);
          })
          .catch(err => {
            console.error(err);
          });
        }
      })
    })
    .then(() => {
        new Game({name: gameTitle}).fetch().then(model => {
          joinReq.games_id_fk = model.get('id');
          addGameJoin(joinReq);
        });
      })


    //   if (found) {
    //     console.log(`${gameTitle} already in database!`);
    //   } else {
    //     console.log(`${gameTitle} NOT FOUND! ADDED!`);
    //     let newGame = new Game({
    //       name: gameTitle
    //     });
    //     newGame.save().then(newGame2 => {
    //       Games.add(newGame2);
    //     });
    //   }
    // })
    // .then(() => {
    //   new User({email: email}).fetch().then(model => {
    //     joinReq.users_id_fk  = model.get('id');
    //     console.log("User ID: ", joinReq.users_id_fk);
    //   });
    // })
    // .then(() => {
    //   setTimeout(function(){
    //     new Game({name: gameTitle}).fetch().then(model => {
    //       joinReq.games_id_fk = model.get('id');
    //       console.log("gameID: ", joinReq.games_id_fk);
    //       console.log("setTimeout join req:", joinReq);
    //       addGameJoin(joinReq);
    //     }) ;
    //   }, 500);
    // })
    // .catch(err => {
    //   console.error(err);
    // });
});

app.post('/favmedia', function(req, res) {
  if (req.body[0] === null) {
    var favMediaURL = null;
  } else {
    var favMediaURL = req.body[0].favMediaURL;
  }

  let userEmail = req.body[1];
  let userID;

  new User({email: userEmail}).fetch()
    .then(found => {
      return new Promise((resolve, reject) => {
        if (found) {
          userID = found.attributes.id;
          if (favMediaURL !== null) {
            new FavMedia({url: favMediaURL, users_id_fk: userID}).fetch()
              .then(found => {
                  if (found) {
                    resolve(userID);
                  } else {
                    let newFavMedia = new FavMedia({
                      url: favMediaURL,
                      users_id_fk: userID
                    });

                    newFavMedia.save().then(newFavMedia2 => {
                      FavMedias.add(newFavMedia2);
                      resolve(userID)
                    })
                    .catch(err => {
                      console.error(err);
                    });
                  }
              })
          } else {
            resolve(userID);
          }
        }
      });
    })
    .then(userID => {
      bookshelf.knex.raw(`SELECT * FROM favmedias WHERE users_id_fk = ${userID}`)
        .then(data => {
          res.send(data.rows);
        });
    })
    .catch(err => {
      console.error(err);
    });
});

app.post('/get_users', function(req, res) {
  if (req.body.searchTerm === '') {
    res.send([]);
  } else {
    bookshelf.knex.raw("SELECT * FROM users WHERE LOWER(fullname) LIKE LOWER('%" + req.body.searchTerm + "%') OR LOWER(email) LIKE LOWER('%" + req.body.searchTerm + "%')")
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.error(err);
    });
  }
});

app.post('/fetch_games', function(req, res){
  let reqEmail = req.body.email;
  bookshelf.knex.raw("SELECT name FROM games WHERE games.id IN (SELECT users_games.games_id_fk FROM users INNER JOIN users_games ON users.id = users_games.users_id_fk WHERE users.email='"+ reqEmail +"'); ")
    .then(response => {
      let gameInfo = response.rows.reduce((acc, cur) => {
        acc.push(cur.name);
        return acc;
      }, []);
      res.send({data: gameInfo});
    })
    .catch(err => {
      console.error(err);
    });
});

app.post("/show_friends", function(req,res) {
  let email = req.body.email;
  bookshelf.knex.raw("SELECT * FROM users WHERE users.id IN (SELECT friends.friend2_fk FROM users inner JOIN friends ON users.id = friends.friend1_fk WHERE users.email = '" + email + "');")
    .then(response => {
      let info = response.rows.reduce((acc, cur) => {
        acc.push({name: cur.fullname, email: cur.email, pic_path: cur.pic_path});
        return acc;
      }, []);
      res.send({data: info});
    })
    .catch(err => {
      console.error(err);
    });
});

app.post('/get_user_info', function(req, res){
  let email = req.body.email;
  new User({ email: email }).fetch().then(found => {
    if (found) {
      res.send({found});
    }
    else {
      res.send({status: "Not Found"});
    }
  })
  .catch(err => {
      console.error(err);
    });
});

app.post('/get_friend_info', function(req, res){
  new User({ email: req.body.friend1 }).fetch().then(found => {
    if (found) {
      new User({ email: req.body.friend2 }).fetch().then(found2 => {
        if (found2) {
          new Friend({
            friend1_fk: found.attributes.id,
            friend2_fk: found2.attributes.id
          })
          .fetch().then(found3 => {
            if (found3) {
              res.send({status: "Found"});
            }
            else {
              res.send({status: "Not Found"});
            }
          });
        }
      });
    }
  })
  .catch(err => {
    console.error(err);
  });
});

app.post('/add_friend', function(req, res) {
  new User({ email: req.body.friend1 }).fetch().then(found => {
    if (found) {
      new User({ email: req.body.friend2 }).fetch().then(found2 => {
        if (found2) {
          let friendship = new Friend({
            friend1_fk: found.attributes.id,
            friend2_fk: found2.attributes.id
          });
          friendship.fetch().then(found3 => {
            if (!found3){
              friendship.save().then(newFriendship => {
                Friends.add(newFriendship);
                res.send({action: "added"});
              });
            }
            else {
              bookshelf.knex.raw("DELETE FROM friends WHERE friend1_fk = " + found.attributes.id + " AND friend2_fk = " + found2.attributes.id + ";")
                .then(response => {
                  res.send({action: "removed"});
                });
            }
          });
        }
      });
    }
  })
  .catch(err => {
    console.error(err);
  });
});

app.post('/post_profile', function(req, res) {
  let fullname = req.body.name;
  let location = req.body.location;
  let bio = req.body.bio;
  let email = req.body.email;

  new User({ email: email }).fetch().then(found => {
    if (found) {
      var fullname_change = found.attributes.fullname;

      if (found.attributes.fullname === found.attributes.email) {
        fullname_change = fullname;
      }

      let updateUser = new User({
        id: found.attributes.id,
        fullname: fullname_change,
        email: email,
        location: location,
        bio: bio
      });

      updateUser.save({email: email}, {method: "update"}).then(newUser => {
        Users.add(newUser);
        res.send("POST SUCCESSFULL!");
      });
    } else {
      console.log("EMAIL ADDRESS NOT FOUND!");
      res.send("EMAIL ADDRESS NOT FOUND!");
    }
  })
  .catch(err => {
    console.error(err);
  });
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});

module.exports = app;
