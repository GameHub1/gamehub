const bookshelf = require('../psqldb.js');

const Friend = bookshelf.Model.extend({
  tableName: 'friends'
});

module.exports = Friend; 
