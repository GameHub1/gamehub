const bookshelf = require('../server/psqldb.js');

const User = bookshelf.Model.extend({
  tableName: 'users'
});

const Users = new bookshelf.Collection();

Users.model = User;



new User({ username: 'Michael' }).fetch().then(function(found) {
    if (found) {
   		console.log(found);
    }
    else {
    	console.log("NOT FOUND! ADDED!");
		let testUser = new User({
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