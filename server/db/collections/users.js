const bookshelf = require('../psqldb.js');
const User = require('../models/user.js');

const Users = new bookshelf.Collection();
Users.model = User;

module.exports = Users;
