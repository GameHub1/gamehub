"use strict";

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const auth = require('./utils/auth_utils.js')
const messaging = require('./utils/message_utils.js');

const server = require('http').Server(app);
const io = require('socket.io')(server);
//server.listen(80);

const bookshelf = require('./db/psqldb.js');

const User = require('./db/models/user.js');
const Users = require('./db/collections/users.js');
const Game = require('./db/models/game.js');
const Games = require('./db/collections/games.js');
const FavMedia = require('./db/models/favmedia.js');
const FavMedias = require('./db/collections/favmedias.js');
const Message = require('./db/models/message.js');
const Messages = require('./db/collections/messages.js');
const Namespace = require('./db/models/namespace.js');
const Namespaces = require('./db/collections/namespaces.js');
const Friend = require('./db/models/friend.js');
const Friends = require('./db/collections/friends.js');
const GameJoin = require('./db/models/gamejoin.js');
const GameJoins = require('./db/collections/gamejoins.js');

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../dist/')));

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

app.post('/get_messages', function(req, res) {

  let namespace = req.body.data
  console.log(namespace);
  let channel = io.of(`/${namespace}`);


  channel.on('connection', function (socket) {

     console.log('We are connected!');

      socket.on('message', function (msg) {

        //store msg to database

        socket.emit('updateState', 'update')
      });
  });


  let kylemike = io.of('/kyle');

  kylemike.on('connection', function (socket) {
    console.log("Houston, we have connected");
    socket.on('message', function (msg) {
      socket.emit('message', "Original msg:" + msg + "This is from the server");
    })
  });
});

app.post('/send_message', messageUtils.sendMessage);

app.post('/load_namespace', messaging.loadNamespace);

app.post('/create_namespace', messaging.createNamespace);

app.post('/signup', auth.authFunc);

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

app.post('/games', function(req, res) {
  let gameTitle = req.body[0].gameTitle;
  let email = req.body[1];
  let joinReq = {users_id_fk: 0, games_id_fk: 0};

  new Game({name: gameTitle}).fetch()
    .then(found => {
      return new Promise((resolve, reject) => {
        if (found) {
          console.log(`${gameTitle} already in database!`);
          resolve();
        } else {
          console.log(`${gameTitle} NOT FOUND! ADDED!`);
          let newGame = new Game({
            name: gameTitle
          });

          newGame.save().then(newGame2 => {
            Games.add(newGame2);
            resolve();
          })
        }
      })
    })
    .then(() => {
      new User({email: email}).fetch().then(model => {
        joinReq.users_id_fk  = model.get('id');
      });
    })
    .then(() => {
      new Game({name: gameTitle}).fetch().then(model => {
        joinReq.games_id_fk = model.get('id');
        addGameJoin(joinReq);
      });
    })
    .catch(err => {
      console.error(err);
    });
});


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

app.post('/get_games', function(req, res) {
  if (req.body.searchTerm === '') {
    res.send([]);
  } else {
    bookshelf.knex.raw("SELECT * FROM games WHERE LOWER(name) LIKE LOWER('%" + req.body.searchTerm + "%')")
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

app.post("/show_game_fans", function(req,res) {
  let game = req.body.game;
  bookshelf.knex.raw("SELECT * FROM users WHERE users.id IN (SELECT users_games.users_id_fk FROM games inner JOIN users_games ON users_games.games_id_fk = games.id WHERE games.name = '" + game + "');")
    .then(response => {
      let info = response.rows.reduce((acc, cur) => {
        acc.push({name: cur.fullname, email: cur.email, pic_path: cur.pic_path});
        return acc;
      }, []);
      console.log(info);
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
