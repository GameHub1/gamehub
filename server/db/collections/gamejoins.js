const bookshelf = require('../psqldb.js');
const GameJoin = require('../models/gamejoin.js');

const GameJoins = new bookshelf.Collection();
GameJoins.model = GameJoin;

module.exports = GameJoins;
