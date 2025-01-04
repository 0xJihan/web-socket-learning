const express = require('express');
const app = express();
const http = require('http')
const expressServer = http.createServer(app)

const {Server} = require('socket.io');
const io = new Server(expressServer);


app.get('/', (req, res) => {
    res.sendfile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    console.log('Client connected');


    socket.on('profile',function (data) {
        console.log(data);
        const name = data.name;
        const age = data.age;
        console.log("Name: " + name+", Age: " + age);
    })


    socket.on('disconnect', () => {
        console.log('Client disconnected\n\n');
    })
})






expressServer.listen(5000,function () {
    console.log("server started");
});