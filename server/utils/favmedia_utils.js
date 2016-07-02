"use strict"; 

const User = require('../db/models/user.js');
const Users = require('../db/collections/users.js');
const bookshelf = require('../db/psqldb.js');
const FavMedia = require('../db/models/favmedia.js');
const FavMedias = require('../db/collections/favmedias.js');

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
      return new Promise((resolve, reject) => {
        if (found) {
          userID = found.attributes.id;
          if (favMediaURL !== null) {
            new FavMedia({url: favMediaURL, users_id_fk: userID}).fetch()
              .then(found => {
                  if (found) {
                    resolve(userID);
                  } else {
                    let newFavMedia = new FavMedia({
                      url: favMediaURL,
                      users_id_fk: userID
                    });

                    newFavMedia.save().then(newFavMedia2 => {
                      FavMedias.add(newFavMedia2);
                      resolve(userID)
                    });
                  }
              })
          } else {
            resolve(userID);
          }
        }
      });
    })
    .then(userID => {
      bookshelf.knex.raw(`SELECT * FROM favmedias WHERE users_id_fk = ${userID}`)
        .then(data => {
          res.send(data.rows);
        });
    })
    .catch(err => {
      console.error(err);
    });
};
