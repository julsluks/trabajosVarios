import Casella from './casella.js';

class Tauler {

    public caselles: Casella[][] = []; //Una matriu de caselles que formen el tauler.
    public filas: number; //El nombre de files del tauler.
    public columnes: number; //El nombre de columnes del tauler.

    constructor(filas: number, columnes: number) {
        this.caselles = [];
        this.filas = filas;
        this.columnes = columnes;
    }

    inicialitzarCaselles() {
        // Crear las casillas y asignarles una mina aleatoriamente
        for (let i = 0; i < this.filas; i++) {
            this.caselles[i] = [];
            for (let j = 0; j < this.columnes; j++) {
                let mina = Math.random() < 0.3; // 30% de probabilidad de que haya mina
                this.caselles[i][j] = new Casella(mina);
            }
        }
        return this.caselles;
    }
}

export default Tauler;