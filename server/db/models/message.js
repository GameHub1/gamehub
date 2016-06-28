const bookshelf = require('../psqldb.js');
const User = require('./user.js');
const Namespace = require('./namespace.js'); 

const Message = bookshelf.Model.extend({
  tablename: 'messages',
  sender: function(){
    return this.belongsTo(User);
  },
  namespace: function(){
    return this.belongsTo(Namespace);
  }
});

module.exports = Message;
