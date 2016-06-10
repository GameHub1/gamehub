var db = require('knex')({
  client: 'pg',
  connection: {
    charset: 'utf8',
    host : 'localhost',
    port : 5432,
    user : 'postgres',
    password : 'mksg37',
    database : 'postgres',
  }
});

db.schema.hasTable('users').then(function(exists){
  if (!exists){
    db.schema.createTable('users', function(user){
      user.increments('id').primary(); 
      user.string('username', 32).unique(); 
      user.string('password'); 
      user.string('fullname', 32); 
      user.string('email').unique();
    }).then(function(table){
      console.log("Created users table"); 
    })
  }
});

var Bookshelf = require('bookshelf')(db);
module.exports = Bookshelf;