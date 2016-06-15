const db = require('./psqldb.js');
const bookshelf = require('bookshelf')(db);
module.exports = bookshelf;
