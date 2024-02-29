import { io } from "socket.io-client";
import { useAppStore } from '@/store/app';
import { comencarConnexio, conectarNouUsuari, signalPeer, dataPeer } from "./comunicationManager.js";

const URL = "http://localhost:3589";

export const socket = io(URL);

let store;
setTimeout(() => {
  store = useAppStore();
}, 500);

socket.on("nou usuari", (llistaUsers) => { store.setUsers(llistaUsers); console.log("arribat"); });

socket.on("comencar", () => {
  comencarConnexio();
});

socket.on("answer", (data) => {
  signalPeer(data);
});

socket.on("conectar", (iniciador) => {
  conectarNouUsuari(iniciador);
});



