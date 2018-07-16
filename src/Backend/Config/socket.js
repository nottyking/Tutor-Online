const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//   console.log("------------------------------------------------------------Socket Connection");
//   socket.emit('event', 1, 2)
// });

server.listen(4000, () => {
  console.log('Start socket.io at port 4000.');
})

module.exports = io
