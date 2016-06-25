const bookshelf = require('../psqldb.js');

const FavMedia = bookshelf.Model.extend({
  tableName: 'favmedias'
});

module.exports = FavMedia;
