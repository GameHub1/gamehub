"use strict";

const db = require('knex')({
  client: 'pg',
  connection: 'postgres://iqspixikhtzidh:g39XiVqGNwtrIeqTNhBqpsPM4B@ec2-50-17-237-148.compute-1.amazonaws.com:5432/da3d1mfq2nkfbk?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory',
  pool: {min: 0, max: 15}, 
  useNulAsDefault: true
});

db.schema.hasTable('users').then(exists => {
  if (!exists){
    db.schema.createTable('users', user => {
      user.increments('id').primary();
      user.string('fullname', 32);
      user.string('email').unique();
      user.string('pic_path');
      user.string('profile_path');
      user.string('location');
      user.string('bio');
    }).then(function(table){
      console.log("Created users table");
    })
  }
});

db.schema.hasTable('games').then(exists => {
  if (!exists){
    db.schema.createTable('games', games => {
      games.increments('id').primary();
      games.string('name');
      games.string('game_path');
    }).then(function(table){
      console.log("Created games table");
    })
  }
});

db.schema.hasTable('favmedias').then(exists => {
  if (!exists){
    db.schema.createTable('favmedias', favmedia => {
      favmedia.increments('id').primary();
      favmedia.string('url');
      favmedia.integer('users_id_fk');
      favmedia.foreign('users_id_fk').references('users.id');
    }).then(function(table){
      console.log("Created favmedias table");
    })
  }
});


db.schema.hasTable('messages').then(exists => {
  if (!exists){
    db.schema.createTable('messages', message => {
      message.increments('id').primary();
      message.string('text');
      message.timestamp('sent_at').defaultTo(db.fn.now());
      message.integer('user_id');
      message.integer('namespace_id');
      message.foreign('user_id').references('users.id');
      message.foreign('namespace_id').references('namespaces.id');
    }).then(function(table){
      console.log("Created messages table");
    })
  }
});

db.schema.hasTable('namespaces').then(exists => {
  if (!exists) {
    db.schema.createTable('namespaces', namespace => {
      namespace.increments('id').primary();
      namespace.string('name').unique();
      namespace.integer('user1_fk');
      namespace.integer('user2_fk');
      namespace.foreign('user1_fk').references('users.id');
      namespace.foreign('user2_fk').references('users.id');
    }).then(function(table){
      console.log("Created namespaces table");
    })
  }
});

db.schema.hasTable('friends').then(exists => {
  if (!exists) {
    db.schema.createTable('friends', friendship => {
      friendship.increments('id').primary();
      friendship.integer('friend1_fk');
      friendship.integer('friend2_fk');
      friendship.foreign('friend1_fk').references('users.id');
      friendship.foreign('friend2_fk').references('users.id');
    }).then(function(table){
      console.log("Created friends join table");
    })
  }
});

db.schema.hasTable('users_games').then(exists => {
  if (!exists) {
    db.schema.createTable('users_games', friendship => {
      friendship.increments('id').primary();
      friendship.integer('users_id_fk');//id user2
      friendship.integer('games_id_fk'); //return array of these
      friendship.foreign('users_id_fk').references('users.id');
      friendship.foreign('games_id_fk').references('games.id');
    }).then(function(table){
      console.log("Created users_games join table");
    })
  }
});


const bookshelf = require('bookshelf')(db);
module.exports = bookshelf;
