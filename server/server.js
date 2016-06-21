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
  tableName: 'favmedia'
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

app.post('/signup', function(req,res) {
  let name = req.body.name;
  let email = req.body.email;
  let pic_path = req.body.pic_path;

  console.log(req.body);
  let routeProp = 'val';

	new User({ email: email }).fetch().then(found => {
    if (found) {
   		console.log("already in database!");
      routeProp = 'found';
      res.send({name: name, email: email, routeProp: routeProp});
    }
    else {
      routeProp = 'not found'
    	console.log("NOT FOUND! ADDED!");
		  let testUser = new User({
			  fullname: name,
			  email: email,
        pic_path: pic_path
		  });

			testUser.save().then(newUser => {
				Users.add(newUser);
			});

      res.send({name: name,email: email,routeProp: routeProp});
    }
	});
});

app.post('/games', function(req, res) {
  let gameTitle = req.body[0].gameTitle;
  let email = req.body[1];
  let joinReq = {users_id_fk: 0, games_id_fk: 0};
  console.log(gameTitle, email);

  new Game({name: gameTitle}).fetch().then(found => {
    if (found) {
      console.log(gameTitle + " already in database!");
    }
    else {
      console.log(gameTitle + " NOT FOUND! ADDED!");
      let newGame = new Game({
        name: gameTitle
      });
      newGame.save().then(newGame2 => {
        Games.add(newGame2);
      });
    }
  }).then(
    new User({email: email}).fetch().then(model => {
      let userId = model.get('id');
      console.log("User ID: ", userId);
      joinReq.users_id_fk = userId;
    })).then(
      new Game({name: gameTitle}).fetch().then(model => {
        let gameId = model.get('id');
        console.log("gameID: ", gameId);
        joinReq.games_id_fk = gameId;
        console.log("join request:", joinReq);
      })).then(
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
              Games.add(newGameJoin2);
            });
          }
        }));;
});

//I hard-coded in what we add to the users_games table for debugging reasons.

//The code below is  close to what the full post request should
//look like. I'm making sure that it successfully adds something
//to the games table before running the join query, though.

/*
app.post('/games', function(req, res) {
  let gameTitle = req.body[0].gameTitle;
  let email = req.body[1];
  let joinReq = {users_id_fk: 0, games_id_fk: 0};
  console.log(gameTitle, email);

  new Game({name: gameTitle}).fetch().then(found => {
    if (found) {
      console.log("already in database!");
    }
    else {
      console.log("NOT FOUND! ADDED!");
      let newGame = new Game({
        game: gameTitle
      });
      newGame.save().then(newGame2 => {
        Games.add(newGame2);
      });
    }
  }).then(
    new User({email: email}).fetch().then(model => {
      let userId = model.get('id');
      console.log("User ID: ", userId);
      joinReq.users_id_fk = userId;
    })).then(
      new Game({name: gameTitle}).fetch().then(model => {
        let gameId = model.get('id');
        console.log("gameID: ", gameId);
        joinReq.games_id_fk = gameId;
        console.log("join request:", joinReq);
      })).then(
        new GameJoin(joinReq).fetch().then(found => {
          if (found) {
            console.log("join already in database!");
          }
          else {
            console.log("NOT FOUND! ADDED!");
            let newGameJoin = new GameJoin({
              joinReq
            });
            newGameJoin.save().then(newGameJoin2 => {
              Games.add(newGameJoin2);
            });
          }
        }));
});
*/

app.post('/favmedia', function(req, res) {
  let favMediaURL = req.body[0].favMediaURL;
  let email = req.body[1];
  console.log(favMediaURL, email);
  new FavMedia({ url: favMediaURL, email: email }).fetch().then(found => {
    if (found) {
      console.log("already in database!");
    }
    else {
      console.log("NOT FOUND! ADDED!");
      let newFavMedia = new FavMedia({
        url: favMediaURL,
        email: email
      });

      newFavMedia.save().then(newFavMedia2 => {
        FavMedias.add(newFavMedia2);
      });
    }
  });
});

app.post('/get_users', function(req, res) {
  console.log(req.body);
  if (req.body.searchTerm === '') {
    res.send([]);
  } else {
    bookshelf.knex.raw("SELECT * FROM users WHERE LOWER(fullname) LIKE LOWER('%" + req.body.searchTerm + "%') OR LOWER(email) LIKE LOWER('%" + req.body.searchTerm + "%')")
    .then(response => {
      console.log(response.rows);
      res.send(response.rows);
    });
  }

});

app.post('/get_all_favmedia', function(req, res) {
  new User({email: req.body.email}).fetch()
    .then(found => {
      if (found) {
        new FavMedia()
        .query({where: {users_id_fk: found.attributes.id}})
        .fetchAll()
        .then(found => {
          res.send(found);
        });
      } else {
        console.log("User not found, no media!");
      }
    });
});

app.post("/show_friends", function(req,res) {

});

app.get('/get_friends', function(req, res){
  let email = req.body.email;
  bookshelf.knex.raw("SELECT * FROM users WHERE users.id IN (SELECT friends.friend2_fk FROM users inner JOIN friends ON users.id = friends.friend1_fk WHERE users.email = '" + email + "');")
    .then(response => {
      let info = response.rows.reduce((acc, cur) => {
        acc.push({name: cur.fullname, email: cur.email, pic_path: cur.pic_path});
        return acc;
      }, []);
      console.log(info);
      res.send({data: info});
    });
});

app.post('/get_user_info', function(req, res){
  let email = req.body.email;
  new User({ email: email }).fetch().then(found => {
    if (found) {
      res.send({found});
    }
  });
});

app.post('/get_friend_info', function(req, res){
  console.log(req.body);
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
              res.send({found});
            }
          });
        }
      });
    }
  });
});

app.post('/add_friend', function(req, res) {
  console.log(req.body);
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
  });
});

app.post('/post_profile', function(req, res) {
  let fullname = req.body.name;
  let location = req.body.location;
  let bio = req.body.bio;
  let email = req.body.email;

  new User({ email: email }).fetch().then(found => {
    if (found) {
      var fullname_change = found.attributes.fullname
      if(found.attributes.fullname === found.attributes.email) {
        fullname_change = fullname;
      }
      console.log(found.attributes);
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
    }
    else {
      console.log("EMAIL ADDRESS NOT FOUND!");
      res.send("EMAIL ADDRESS NOT FOUND!");
    }
  });
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 8000);

console.log("Listening on port 8000");
