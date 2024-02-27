import router from './router/index.js';
import { useAppStore } from "./stores/app.js";
import { socket } from "./sockets.js";

let peer = null;
let appStore;

setTimeout(() => {
    appStore = useAppStore();
}, 200);

export function startConnection() {
    peer = new SimplePeer({
        initiator: true,
        trickle: false
    });

    peer.on('signal', (data) => {
        console.log("MY ID TO MAKE A CALL:");
        console.log(data);
        console.log("SIGNALING TYPE : " + data.type);

        if (data.type == "offer") {
            socket.emit('makeConnection', JSON.stringify(data));
        } else {
            console.log('Signal: ', JSON.stringify(data));
        }
    });

    peer.on('data', (data) => {
        let str = JSON.parse(new TextDecoder('utf-8').decode(data));
        appStore.addNewMessage(str);
        console.log(str);
    });

    peer.on('connect', () => {
        console.log('CONNECT');
        //router.push('/chat');
    });

    peer.on('close', () => {
        console.log('CLOSE');
    });

    peer.on('error', (err) => {
        console.log('ERROR: ', err);
    });
}

export function addNewUser(initiator) {
    console.log("ADD NEW USER");
    peer = new SimplePeer({
        initiator: false,
        trickle: false
    });

    peer.on('signal', (data) => {
        console.log("MY ID TO MAKE A CALL:");
        console.log(data);
        console.log("SIGNALING TYPE : " + data.type);

        if (data.type == "answer") {
            socket.emit('answerConnection', JSON.stringify(data), initiator.idScocket);
        }
    });

    peer.on("data", (data) => {
        let str = JSON.parse(new TextDecoder("utf-8").decode(data))
        appStore.newMessage(str);
        console.log(str);
    });

    peer.signal(initiator.data);

    peer.on("connect", () => {
        console.log("Connection Established!!!");
        router.push("/chat");
    });

    peer.on("close", () => {
        console.log("Connection Closed");
    });

    peer.on("error", (err) => {
        console.error(err);
    });
}

export function signalPeer(data) {
    peer.signal(data);
}

export function dataPeer(data) {
    peer.send(JSON.stringify(data));
}