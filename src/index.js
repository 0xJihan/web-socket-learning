const express = require('express');
const app = express();
const http = require('http')
const expressServer = http.createServer(app)

const {Server} = require('socket.io');
const io = new Server(expressServer);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    console.log('Client connected');


    socket.join('RoomA')
    const roomSize = io.sockets.adapter.rooms.get('RoomA').size;
    io.sockets.in('RoomA').emit('room_msg',`${roomSize} people are joined in RoomA`);







    socket.on('chat', (msg) => {
        console.log(msg)
        socket.emit('chat_received',msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
})




expressServer.listen(5000,function () {
    console.log("server started");
});