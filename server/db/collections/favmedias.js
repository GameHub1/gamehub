const bookshelf = require('../psqldb.js');
const FaveMedia = require('../models/favmedia.js');

const FaveMedias = new bookshelf.Collection();
FaveMedias.model = FaveMedia;

module.exports = FaveMedias;
