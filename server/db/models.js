const bookshelf = require('db/psqldb.js');

const User = bookshelf.Model.extend({
  tableName: 'users',
  messages: function(){
    return this.hasMany(Message);
  }
});
const Users = new bookshelf.Collection();
Users.model = User;

const Game = bookshelf.Model.extend({
  tableName: 'games'
});
const Games = new bookshelf.Collection();
Games.model = Game;

const FavMedia = bookshelf.Model.extend({
  tableName: 'favmedias'
});
const FavMedias = new bookshelf.Collection();
FavMedias.model = FavMedia;

const Message = bookshelf.Model.extend({
  tablename: 'messages',
  sender: function(){
    return this.belongsTo(User);
  },
  namespace: function(){
    return this.belongsTo(Namespace);
  }
});
const Messages = new bookshelf.Collection();
Messages.model = Message;

const Namespace = bookshelf.Model.extend({
  tablename: 'namespaces',
  messages: function(){
    return this.hasMany(Message);
  }
});
const Namespaces = new bookshelf.Collection();
Namespaces.model = Namespace;

const Friend = bookshelf.Model.extend({
  tableName: 'friends'
});
const Friends = new bookshelf.Collection();
Friends.model = Friend;

const GameJoin = bookshelf.Model.extend({
  tableName: 'users_games'
});

const GameJoins = new bookshelf.Collection();
GameJoins.model = GameJoin;
