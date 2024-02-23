const { log } = require('console');
var express = require('express');
const app = express();
const port = 3000;

const http  = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server)

io.on('connection', (socket) =>{
    // console.log('Un usuari hi es conectat...')

    // socket.on('disconnect', () => {
    //     console.log(`Un usuari s'ha desconectat`);
    // })

    // socket.on('chat', (msg) => {
    //     console.log('Missatge: ' + msg);
    // })

    socket.on('chat', msg => {
        io.emit('chat', msg)
    })
});

app.get('/', (req, res) => {
    // res.send('hello world')
    // console.log(__dirname);
    res.sendFile(`${__dirname}/client/index.html`)
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

//https://www.youtube.com/watch?v=p-OevzBqHyQ&t=12s