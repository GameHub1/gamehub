"use strict"; 

const User = require('../db/models/user.js');
const Users = require('../db/collections/users.js');

exports.userInfo = function(req, res){
  let email = req.body.email;
  new User({ email: email }).fetch().then(found => {
    if (found) {
      res.send({found});
    }
    else {
      res.send({status: "Not Found"});
    }
  });
};

exports.editProfile = function(req, res) {
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
};
