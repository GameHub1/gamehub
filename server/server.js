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
  console.log(gameTitle, email);
  new Game({ game: gameTitle, email: email }).fetch().then(found => {
    if (found) {
      console.log("already in database!");
    }
    else {
      console.log("NOT FOUND! ADDED!");
      let newGame = new Game({
        game: gameTitle,
        email: email
      });

      newGame.save().then(newGame2 => {
        Games.add(newGame2);
      });
    }
  });
});

app.post('/favmedia', function(req, res) {
  let favMediaURL = req.body[0].favMediaURL;
  let userID = req.body[1];

  new FavMedia({ url: favMediaURL, users_id_fk: userID }).fetch().then(found => {
    if (found) {
      console.log("URL already exists.");
    }
    else {
      let newFavMedia = new FavMedia({
        url: favMediaURL,
        users_id_fk: userID
      });

      newFavMedia.save().then(newFavMedia2 => {
        FavMedias.add(newFavMedia2);
      });
    }
  });
});

app.post('/get_users', function(req, res) {
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
  bookshelf.knex.raw("SELECT fullname FROM users WHERE users.id IN (SELECT friends.friend2_fk FROM users inner JOIN friends ON users.id = friends.friend1_fk WHERE users.email = 'chen.liu.michael@gmail.com');")
    .then(response => {
      let info = response.rows.reduce((acc, cur) => {
        acc.push({name: cur.fullname});
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
