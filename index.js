const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket) {
  console.log('user connected');

  socket.on('user connected', function(username) {
    io.emit('chat message', username + ' connected!', 'Server');
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  
  socket.on('chat message', function(msg, username) {
    io.emit('chat message', msg, username);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
