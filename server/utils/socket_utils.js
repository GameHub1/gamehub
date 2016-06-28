"use strict"; 

exports.loadSocket = function(req, res) {
  let namespace = req.body.data
  console.log(namespace);
  let channel = io.of(`/${namespace}`);

   channel.on('connection', function (socket) {
      console.log('We are connected!');
       socket.on('message', function (msg) {
         //store msg to database
         socket.emit('updateState', 'update')
      });
   });
   let kylemike = io.of('/kyle');
    kylemike.on('connection', function (socket) {
      console.log("Houston, we have connected");
      socket.on('message', function (msg) {
      socket.emit('message', "Original msg:" + msg + "This is from the server");
    });
  });
};
