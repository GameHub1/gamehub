"use strict";

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const authUtils = require('./utils/auth_utils.js')
const messagingUtils = require('./utils/message_utils.js');
const favmediaUtils = require('./utils/favmedia_utils.js');
const gamesUtils = require('./utils/game_utils.js');
const socialUtils = require('./utils/social_utils.js');
const userUtils = require('./utils/user_utils.js');
const socketUtils = require('./utils/socket_utils.js');

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../dist/')));

app.post('/signup', authUtils.authFunc);

app.post('/get_user_info', userUtils.userInfo);
app.post('/post_profile', userUtils.editProfile);

app.post('/favmedia', favmediaUtils.getFavmedia);

app.post('/games', gamesUtils.newGame);
app.post('/fetch_games', gamesUtils.fetchGames);
app.post('/delete_game', gamesUtils.deleteGame);
app.post('/show_game_fans', gamesUtils.showGameFans);
app.post('/get_games', gamesUtils.getGames);
app.post('/get_users', socialUtils.fetchUsers);
app.post("/show_friends", socialUtils.showFriends);
app.post('/get_friend_info', socialUtils.friendInfo);
app.post('/add_friend', socialUtils.addFriend);

app.post('/send_message', messagingUtils.sendMessage);
app.post('/fetch_messages', messagingUtils.fetchMessages);
app.post('/create_namespace', messagingUtils.createNamespace);

app.post('/get_messages', function(req, res) {
  let namespace = req.body.data
  console.log(namespace);
  let channel = io.of(`/${namespace}`);

   channel.on('connection', function (socket) {
      console.log('We are connected!');
       socket.on('message', function (msg) {
         //store msg to database
         //send messages
         console.log('inside message!');
         socket.emit('updateConversation', msg)
      });
   });
   let kylemike = io.of('/kyle');
    kylemike.on('connection', function (socket) {
      console.log("Houston, we have connected");
      socket.on('message', function (msg) {
      socket.emit('message', "Original msg:" + msg + "This is from the server");
    });
  });
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});

module.exports = app;
