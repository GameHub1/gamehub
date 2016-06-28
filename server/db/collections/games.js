const bookshelf = require('../psqldb.js');
const Game = require('../models/game.js');

const Games = new bookshelf.Collection();
Games.model = Game;

module.exports = Games;
