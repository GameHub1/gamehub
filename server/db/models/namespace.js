const bookshelf = require('../psqldb.js');
const Message = require('./message.js');

const Namespace = bookshelf.Model.extend({
  tablename: 'namespaces',
  messages: function(){
    return this.hasMany(Message);
  }
});

module.exports = Namespace;
