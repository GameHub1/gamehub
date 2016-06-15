const db = require('knex')({
  client: 'pg',
  connection: 'postgres://iqspixikhtzidh:g39XiVqGNwtrIeqTNhBqpsPM4B@ec2-50-17-237-148.compute-1.amazonaws.com:5432/da3d1mfq2nkfbk?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory',
  useNulAsDefault: true
});

db.schema.hasTable('users2').then(exists => {
  if (!exists){
    db.schema.createTable('users2', user => {
      user.increments('id').primary();
      user.string('fullname', 32);
      user.string('email').unique();
      user.string('pic_path');
      user.string('location');
      user.string('bio');
    }).then(function(table){
      console.log("Created users2 table");
    })
  }
});

db.schema.hasTable('friends').then(exists => {
  if (!exists) {
    db.schema.createTable('friends', friendship => {
      friendship.increments('id').primary();
      friendship.integer('friend1_fk');
      friendship.integer('friend2_fk');
      friendship.foreign('friend1_fk').references('users2.id');
      friendship.foreign('friend2_fk').references('users2.id');
    }).then(function(table){
      console.log("Created friends join table");
    })
  }
});

db.schema.hasTable('favMedia').then(exists => {
  if (!exists){
    db.schema.createTable('favMedia', favMedia => {
      favMedia.increments('id').primary();
      favMedia.string('url', 128);
      favMedia.string('email').unique();
    }).then(function(table){
      console.log("Created favMedia table");
    })
  }
});

const bookshelf = require('bookshelf')(db);
module.exports = bookshelf;
