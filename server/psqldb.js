var db = require('knex')({
  client: 'pg',
  connection: 'postgres://iqspixikhtzidh:g39XiVqGNwtrIeqTNhBqpsPM4B@ec2-50-17-237-148.compute-1.amazonaws.com:5432/da3d1mfq2nkfbk',
  /*
  connection: {
    charset: 'utf8',
    host : 'ec2-50-17-237-148.compute-1.amazonaws.com',
    port : 5432,
    user : 'iqspixikhtzidh',
    password : 'g39XiVqGNwtrIeqTNhBqpsPM4B',
    database : 'da3d1mfq2nkfbk',

  },
  */
  ssl: true
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