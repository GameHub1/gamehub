const bookshelf = require('../psqldb.js');
const Message = require('./message.js');

const User = bookshelf.Model.extend({
  tableName: 'users',
  messages: function(){
    return this.hasMany(Message);
  }
});

module.exports = User;
