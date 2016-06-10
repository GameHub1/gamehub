const path = require('path');
const express = require('express');
//const psql_db = require('./psqldb.js');
const db_test = require('../client/database_test.js');
const app = express();


app.use(express.static(path.join(__dirname, '../dist/')));

app.listen(process.env.PORT || 3000);

console.log("Listening on port 3000");
