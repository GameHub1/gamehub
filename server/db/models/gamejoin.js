const bookshelf = require('../psqldb.js');

const GameJoin = bookshelf.Model.extend({
  tableName: 'users_games'
});

module.exports = GameJoin;
