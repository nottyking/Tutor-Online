const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server);

server.listen(4000, () => {
  console.log('Start socket.io at port 4000.');
})

module.exports = io
