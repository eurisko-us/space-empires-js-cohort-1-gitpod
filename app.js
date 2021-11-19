const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Display = require('./src/display');

// app.use(express.static('public'))

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

let clientSockets = {};

io.on('connection', (socket) => {
    let socketId = socket.id;
    clientSockets[socketId] = socket;
    console.log('Client socket connected:' + socket.id);
    const display = new Display(clientSockets);
    display.start();
    socket.on('disconnect', () => {
        console.log('Client socket disconnected: ' + socketId);

        delete clientSockets[socketId];
    });
});

http.listen(3000, () => {
    console.log('Listening on *:3000');
});

// if(Object.keys(clientSockets).length > 0){
//     console.log("Here2")
//     const display = new Display(clientSockets);
//     display.start();
// }
