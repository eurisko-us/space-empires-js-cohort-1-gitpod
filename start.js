const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Game = require('./game');

app.use(express.static('public'))

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

let clientSockets = {};

io.on('connection', (socket) => {
    let socketId = socket.id;
    clientSockets[socketId] = socket;
});

http.listen(3000, () => {
    console.log('Listening on *:3000');
});

