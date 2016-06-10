const bookshelf = require('../server/psqldb.js');

var User = bookshelf.Model.extend({
  tableName: 'users'
});

var Users = new bookshelf.Collection();

Users.model = User;



new User({ username: 'Michael' }).fetch().then(function(found) {
    if (found) {
   		console.log(found);
    }
    else {
    	console.log("NOT FOUND! ADDED!");
		var testUser = new User({
			username: 'Michael',
			password: 'asdf',
			fullname: 'Michael Chen',
			email: 'chen.liu.michael@gmail.com'
		});

		testUser.save().then(function(newUser) {
			Users.add(newUser);
		});
    }
});


exports.module = {};