"use strict";

const bookshelf = require('../psqldb.js');
const FavMedia = require('../models/favmedia.js');

const FavMedias = new bookshelf.Collection();
FavMedias.model = FavMedia;

module.exports = FavMedias;
