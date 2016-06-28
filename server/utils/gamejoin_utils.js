"use strict"; 

const GameJoin = require('../db/models/gamejoin.js');
const GameJoins = require('../db/collections/gamejoins.js');

exports.addGameJoin = function(joinReq){
  new GameJoin({
    users_id_fk: joinReq.users_id_fk, games_id_fk: joinReq.games_id_fk
  }).fetch().then(found => {
    if (found) {
      console.log("join already in database!");
    }
    else {
      console.log("JOIN NOT FOUND! ADDED!");
      let newGameJoin = new GameJoin({
        users_id_fk:joinReq.users_id_fk, games_id_fk: joinReq.games_id_fk
      });
      newGameJoin.save().then(newGameJoin2 => {
        GameJoins.add(newGameJoin2);
      });
    }
  });
};
