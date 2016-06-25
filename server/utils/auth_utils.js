const User = require('../db/models/user.js');
const Users = require('../db/collections/users.js');

exports.authFunc = function(req,res) {
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
      routeProp = 'not found'
		  let testUser = new User({
			  fullname: name,
			  email: email,
        pic_path: pic_path
		  });

			testUser.save().then(newUser => {
				Users.add(newUser);
			});

      res.send({name: name, email: email, routeProp: routeProp});
    }
	});
};
