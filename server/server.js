"use strict"; 

const path = require('path');
const express = require('express');
const bookshelf = require('./psqldb.js');
const db_test = require('../client/database_test.js');
const app = express();


app.use(express.static(path.join(__dirname, '../dist/')));

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 3000);

console.log("Listening on port 3000");

const User = bookshelf.Model.extend({
  tableName: 'users'
});
const Users = new bookshelf.Collection();
Users.model = User;

app.post('/signup', function (req,res) {
  var name = req.body.name;
  var email = req.body.email;


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


});
