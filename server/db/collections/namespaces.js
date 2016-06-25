const bookshelf = require('../psqldb.js');
const Namespace = require('../models/namespace.js');

const Namespaces = new bookshelf.Collection();
Namespaces.model = Namespace;

module.exports = Namespaces;
