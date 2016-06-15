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

app.post('/signup', function(req,res) {
  let name = req.body.name;
  let email = req.body.email;

	new User({ email: email }).fetch().then(found => {
    if (found) {
   		console.log("already in database!");
    }
    else {
    	console.log("NOT FOUND! ADDED!");
		  let testUser = new User({
			  fullname: name,
			  email: email
		  });

			testUser.save().then(newUser => {
				Users.add(newUser);
			});
    }
	});

  res.send('SERVER POST: ', name, email);
});

app.post('/games', function(req, res) {
  console.log(req.body);
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
  console.log(req.body);
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 8000);

console.log("Listening on port 8000");
