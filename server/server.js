"use strict";

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const auth = require('./utils/auth_utils.js')
const messaging = require('./utils/message_utils.js');
const favmedia = require('./utils/favmedia_utils.js');
const games = require('./utils/game_utils.js');
const social = require('./utils/social_utils.js');
const user = require('./utils/user_utils.js');

const server = require('http').Server(app);
const io = require('socket.io')(server);
//server.listen(80);

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../dist/')));

app.post('/signup', auth.authFunc);

app.post('/get_user_info', user.userInfo);
app.post('/post_profile', user.editProfile);

app.post('/favmedia', favmedia.getFavmedia);

app.post('/games', games.newGame);
app.post('/fetch_games', games.fetchGames);

app.post('/get_users', social.fetchUsers);
app.post("/show_friends", social.showFriends);
app.post('/get_friend_info', social.friendInfo);
app.post('/add_friend', social.addFriend);

app.post('/send_message', messaging.sendMessage);
app.post('/fetch_messages', messaging.fetchMessages);
app.post('/create_namespace', messaging.createNamespace);

app.post('/signup', auth.authFunc);

app.post('/delete_game', function(req, res){
  let gameTitle = req.body[0].gameTitle;
  let email = req.body[1];
  let joinReq = {users_id_fk: 0, games_id_fk: 0};
  console.log(gameTitle, email);

  setTimeout(function(){
    new Game({name: gameTitle}).fetch().then(model => {
      joinReq.games_id_fk = model.get('id');
      console.log("gameID: ", joinReq.games_id_fk);
      console.log("setTimeout join req:", joinReq);
      deleteGameJoin(joinReq);
    })
    .catch(err => {
      console.error(err);
    });
  }, 500);

  new User({email: email}).fetch().then(model => {
    joinReq.users_id_fk  = model.get('id');
    console.log("User ID: ", joinReq.users_id_fk);
  })
  .catch(err => {
    console.error(err);
  });
});

app.post("/show_game_fans", function(req,res) {
  let game = req.body.game;
  bookshelf.knex.raw("SELECT * FROM users WHERE users.id IN (SELECT users_games.users_id_fk FROM games inner JOIN users_games ON users_games.games_id_fk = games.id WHERE games.name = '" + game + "');")
    .then(response => {
      let info = response.rows.reduce((acc, cur) => {
        acc.push({name: cur.fullname, email: cur.email, pic_path: cur.pic_path});
        return acc;
      }, []);
      console.log(info);
      res.send({data: info});
    })
    .catch(err => {
      console.error(err);
    });
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});

module.exports = app;
