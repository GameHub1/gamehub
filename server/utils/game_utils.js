"use strict";

const gamejoin = require('./gamejoin_utils.js');

const bookshelf = require('../db/psqldb.js');

const User = require('../db/models/user.js');
const Game = require('../db/models/game.js');
const Games = require('../db/collections/games.js');

exports.fetchGames = function(req, res){
  let reqEmail = req.body.email;
  bookshelf.knex.raw("SELECT name FROM games WHERE games.id IN (SELECT users_games.games_id_fk FROM users INNER JOIN users_games ON users.id = users_games.users_id_fk WHERE users.email='"+ reqEmail +"'); ")
    .then(response => {
      let gameInfo = response.rows.reduce((acc, cur) => {
        acc.push(cur.name);
        return acc;
      }, []);
      res.send({data: gameInfo});
    });
};

exports.newGame = function(req, res) {
  let gameTitle = req.body[0].gameTitle;
  let email = req.body[1];
  let joinReq = {users_id_fk: 0, games_id_fk: 0};
  console.log(gameTitle, email);

  new Game({name: gameTitle}).fetch().then(found => {
    if (found) {
      console.log(gameTitle + " already in database!");
    }
    else {
      console.log(gameTitle + " NOT FOUND! ADDED!");
      let newGame = new Game({
        name: gameTitle
      });
      newGame.save().then(newGame2 => {
        Games.add(newGame2);
      });
    }
  })
  .then(() => {
    console.log("Games promise!");
    setTimeout(function(){
      new Game({name: gameTitle}).fetch().then(model => {
        joinReq.games_id_fk = model.get('id');
        console.log("gameID: ", joinReq.games_id_fk);
        console.log("setTimeout join req:", joinReq);
        gamejoin.addGameJoin(joinReq);
      }) ;
    }, 500);
  })
    .then(() => {
      console.log("Users promise!");
      new User({email: email}).fetch().then(model => {
        joinReq.users_id_fk  = model.get('id');
        console.log("User ID: ", joinReq.users_id_fk);
      });
    });
  };

exports.deleteGame = function(req, res){
  let gameTitle = req.body[0].gameTitle;
  let email = req.body[1];
  let joinReq = {users_id_fk: 0, games_id_fk: 0};
  console.log(gameTitle, email);

  setTimeout(function(){
    new Game({name: gameTitle}).fetch().then(model => {
      joinReq.games_id_fk = model.get('id');
      console.log("gameID: ", joinReq.games_id_fk);
      console.log("setTimeout join req:", joinReq);
      deleteGameJoin(joinReq);
    })
    .catch(err => {
      console.error(err);
    });
  }, 500);

  new User({email: email}).fetch().then(model => {
    joinReq.users_id_fk  = model.get('id');
    console.log("User ID: ", joinReq.users_id_fk);
  })
  .catch(err => {
    console.error(err);
  });
};

exports.showGameFans = function(req,res) {
  let game = req.body.game;
  bookshelf.knex.raw("SELECT * FROM users WHERE users.id IN (SELECT users_games.users_id_fk FROM games inner JOIN users_games ON users_games.games_id_fk = games.id WHERE games.name = '" + game + "');")
    .then(response => {
      let info = response.rows.reduce((acc, cur) => {
        acc.push({name: cur.fullname, email: cur.email, pic_path: cur.pic_path, location: cur.location});
        return acc;
      }, []);
      console.log(info);
      res.send({data: info});
    })
    .catch(err => {
      console.error(err);
    });
};
