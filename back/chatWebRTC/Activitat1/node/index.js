import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

//variable
let usersList = [];
let initiator = null;

//create server object
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Access-Control-Allow-Origin"],
    },
});

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("accesUsers", (name) => {
        console.log("user accesed with name: " + name);

        let myUser = {id: socket.id, name: name, status: "available"};
        usersList.push(myUser);

        console.log("usersList: " + usersList);

        io.emit("usersList", usersList);
        socket.emit("myUser", myUser);
    });

    socket.on('joinToChat', (myUser, user) => {
        console.log("user joined to chat: " + myUser.name + " with " + user.name);
        
        usersList.forEach(element => {
            if(element.id == user.id){
                element.status = "inChat";
            } else if (element.id == myUser.id) {
                element.status = "inChat";
                myUser.status = "inChat";
            }
        });

        io.emit("usersList", usersList);
        socket.emit("myUser", myUser);
        socket.emit('startConnection');
        io.emit("userChat", user, initiator);
    });

    socket.on('leaveChat', (user) => {
        console.log("user left chat: " + user.name);
        usersList.forEach(element => {
            if(element.id == user.id){
                element.status = "available";
            }
        });
        io.emit("usersList", usersList, user);
    });

    socket.on('disconnect', () => {
        console.log("user disconnected");
        usersList.forEach(element => {
            if(element.id == socket.id){
                usersList.splice(usersList.indexOf(element), 1);
            }
        });
        io.emit("usersList", usersList);
    });

    socket.on('signalPeer', (data, socketIniciador) => {
        io.to(socketIniciador).emit('signalPeer', data);
    });

    socket.on('creat inici', (data) => {
        console.log('creat inici', data);
        initiator = {data, idSocket: socket.id};
    });

});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})