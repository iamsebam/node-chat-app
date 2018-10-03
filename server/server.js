const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.on('disconnect', () =>{
        console.log('Client disconnected.');
    });

    socket.emit('newMessage', {
        from: 'Bob',
        text: 'Hey can you meet me at 4.20?',
        createdAt: 1234
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage: ', newMessage);
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

