"use strict"; 

const User = require('../db/models/user.js');
const Users = require('../db/collections/users.js');
const bookshelf = require('../db/psqldb.js');

exports.getFavmedia = function(req, res) {
    if (req.body[0] === null) {
      var favMediaURL = null;
    } else {
      var favMediaURL = req.body[0].favMediaURL;
    }

    let userEmail = req.body[1];
    let userID;

    new User({email: userEmail}).fetch()
      .then(found => {
        if (found) {
          userID = found.attributes.id;
          if (favMediaURL !== null) {
            new FavMedia({url: favMediaURL, users_id_fk: userID}).fetch()
              .then(found => {
                if (found) {
                  console.log('URL already exists.');
                } else {
                  let newFavMedia = new FavMedia({
                    url: favMediaURL,
                    users_id_fk: userID
                  });

                  newFavMedia.save().then(newFavMedia2 => {
                    FavMedias.add(newFavMedia2);
                  });
                }
              });
          }

          setTimeout(function() {
            bookshelf.knex.raw(`SELECT * FROM favmedias WHERE users_id_fk = ${userID}`)
              .then(response => {
                res.send(response.rows);
            });
          }, 400);
        }
      });
  };
