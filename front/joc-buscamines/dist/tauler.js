"use strict";
class Tauler {
    constructor(filas, columnes) {
        this.filas = filas;
        this.columnes = columnes;
    }
    inicialitzarCaselles() {
        // Lógica para inicializar las celdas del tablero, incluyendo la distribución aleatoria de minas.
        this.caselles = [];
        // Crear las casillas y asignarles una mina aleatoriamente
        for (let i = 0; i < this.filas; i++) {
            this.caselles[i] = [];
            for (let j = 0; j < this.columnes; j++) {
                let mina = Math.random() < 0.3; // 30% de probabilidad de que haya mina
                this.caselles[i][j] = new Casella(mina);
            }
        }
    }
}
