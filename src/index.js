const express = require('express');
const app = express();
const http = require('http')
const expressServer = http.createServer(app)

const {Server} = require('socket.io');
const io = new Server(expressServer);


app.get('/', (req, res) => {
    res.sendfile(__dirname + '/index.html');
});




const sellNms = io.of('/sell');
sellNms.on('connection', (socket) => {
    console.log('seller connection');
    socket.send('Hi, from seller');

    socket.on('disconnect', () => {
        console.log('seller disconnect');
    })

});

const buyNms = io.of('/buy');
buyNms.on('connection', (socket) => {

    console.log('buyer connection');
    socket.send('Hi, from BUYER');

    socket.on('disconnect', () => {
        console.log('buyer disconnect');
    })

});







expressServer.listen(5000,function () {
    console.log("server started");
});