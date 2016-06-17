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
  tableName: 'users2'
});
const Users = new bookshelf.Collection();
Users.model = User;

const Game = bookshelf.Model.extend({
  tableName: 'favgames'
});
const Games = new bookshelf.Collection();
Games.model = Game;

const FavMedia = bookshelf.Model.extend({
  tableName: 'favmedia'
});
const FavMedias = new bookshelf.Collection();
FavMedias.model = FavMedia;

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
    bookshelf.knex.raw("SELECT * FROM USERS2 WHERE LOWER(fullname) LIKE LOWER('%" + req.body.searchTerm + "%') OR LOWER(email) LIKE LOWER('%" + req.body.searchTerm + "%')")
    .then(response => {
      console.log(response.rows);
      res.send(response.rows);
    });
  }
  
});

app.get('/get_friends', function(req, res){
  console.log(req.body);
  bookshelf.knex.raw("SELECT fullname FROM users2 WHERE users2.id IN (SELECT friends.friend2_fk FROM users2 inner JOIN friends ON users2.id = friends.friend1_fk WHERE users2.email = 'chen.liu.michael@gmail.com');")
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

app.post('/add_friend', function(req, res) {
  console.log(req.body);
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
      });
    }
    else {
      console.log("EMAIL ADDRESS NOT FOUND!");
    }
  });
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 8000);

console.log("Listening on port 8000");
