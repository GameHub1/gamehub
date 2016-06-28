const bookshelf = require('../psqldb.js');

const Game = bookshelf.Model.extend({
  tableName: 'games'
});

module.exports = Game;
