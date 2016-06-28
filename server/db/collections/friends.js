const bookshelf = require('../psqldb.js');
const Friend = require('../models/friend.js');

const Friends = new bookshelf.Collection();
Friends.model = Friend;

module.exports = Friends;
