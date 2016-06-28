const bookshelf = require('../psqldb.js');
const Message = require('../models/message.js');

const Messages = new bookshelf.Collection();
Messages.model = Message;

module.exports = Messages;
