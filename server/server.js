const path = require('path');
const express = require('express');
//const psql_db = require('./psqldb.js');
const app = express();

app.use(express.static(path.join(__dirname, '../dist/')));

app.listen(process.env.PORT || 3000);

console.log("Listening on port 3000");

/*
var pg = require('pg');
var conString = 'postgres://iqspixikhtzidh:g39XiVqGNwtrIeqTNhBqpsPM4B@ec2-50-17-237-148.compute-1.amazonaws.com:5432/da3d1mfq2nkfbk';

var client = new pg.Client(conString);
client.connect();
console.log("connecting to postgres");

client.query("DROP table junk");
client.query("CREATE table junk(name varchar(40), a_number integer)");

//queries are queued and executed one after another once the connection becomes available
var x = 1000;

while(x>0)
{
client.query("INSERT INTO junk(name, a_number) values('Ted',12)");
client.query("INSERT INTO junk(name, a_number) values($1, $2)", ['John', x]);
x = x - 1;
}

var query = client.query("SELECT * FROM junk");
//fired after last row is emitted

query.on('row', function(row) {
  console.log(row);
});

query.on('end', function() {
  client.end();
  console.log("end of query1");
});

*/
