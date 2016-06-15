"use strict";

const bookshelf = require('./pgsqldb.js');

const User = bookshelf.Model.extend({
  tableName: 'users2'
});
const Users = new bookshelf.Collection();
Users.model = User;

const Game = bookshelf.Model.extend({
  tableName: 'favgames'
});
const Games = new bookshelf.Collection();
Games.model = Game;
