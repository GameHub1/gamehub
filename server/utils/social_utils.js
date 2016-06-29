"use strict"; 

const bookshelf = require('../db/psqldb.js');

const User = require('../db/models/user.js');
const Users = require('../db/collections/users.js');
const Friend = require('../db/models/friend.js');
const Friends = require('../db/collections/friends.js');

exports.fetchUsers = function(req, res) {
  if (req.body.searchTerm === '') {
    res.send([]);
  } else {
    bookshelf.knex.raw("SELECT * FROM users WHERE LOWER(fullname) LIKE LOWER('%" + req.body.searchTerm + "%') OR LOWER(email) LIKE LOWER('%" + req.body.searchTerm + "%')")
    .then(response => {
      res.send(response.rows);
    });
  }
};

exports.showFriends = function(req,res) {
  let email = req.body.email;
  bookshelf.knex.raw("SELECT * FROM users WHERE users.id IN (SELECT friends.friend2_fk FROM users inner JOIN friends ON users.id = friends.friend1_fk WHERE users.email = '" + email + "');")
    .then(response => {
      let info = response.rows.reduce((acc, cur) => {
        acc.push({name: cur.fullname, email: cur.email, pic_path: cur.pic_path});
        return acc;
      }, []);
      res.send({data: info});
    });
};

exports.friendInfo = function(req, res){
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
};

exports.addFriend = function(req, res) {
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
};
