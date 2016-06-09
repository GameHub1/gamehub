const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '../dist/')));

app.listen(process.env.PORT || 3000);

console.log("Now listening on Port 3000");
