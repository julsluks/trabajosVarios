import {io} from "socket.io-client";
import { useAppStore } from "./stores/app";
import router from "./router/index";
import { startConnection, addNewUser, signalPeer, dataPeer } from "./comunicationManager";

const URL = "http://localhost:3000";

let store;
setTimeout(() => {
    store = useAppStore();
}, 500);

export const socket = io(URL, {
    extraHeaders: {
        "Access-Control-Allow-Origin": "*",
    },
});

socket.on("connect", () => {
    console.log("connected");
});

socket.on('usersList', (usersList) => {
    store.usersList = usersList;    
});

socket.on('myUser', (myUser) => {
    store.myUser = myUser;
});

socket.on('userChat', (user, initiator) => {
    console.log("userChat: " + user.name + " " + user.id);
    if(store.myUser.id == user.id){
        console.log(store.myUser.id + " " + user.id);
        addNewUser(initiator);
        router.push('/chat');
    }
});

socket.on('startConnection', () => {
    console.log("startConnection");
    startConnection();
});

socket.on('signalPeer', (data) => {
    console.log("signalPeer");
    signalPeer(data);
});