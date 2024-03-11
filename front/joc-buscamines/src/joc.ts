import Tauler from './tauler.js';

class Joc {

    public tauler: Tauler; //El tauler de joc.

    constructor(filas: number, columnes: number) {
        this.tauler = new Tauler(filas, columnes);
    }

    dibuixarTauler() {
        let caselles = this.tauler.inicialitzarCaselles();
        console.log(caselles);

        for (let f = 0; f < caselles.length; f++) {
            let filaCasella = caselles[f];
            for (let c = 0; c < filaCasella.length; c++) {
                // Crear un div por cada casilla
                const casellaHTML = document.createElement('div');
                // Casilla
                let casella = filaCasella[c];
                // Classes a casilla
                casellaHTML.classList.add('casella');
                if (casella.esMina == true) {
                    casellaHTML.classList.add('mina');
                }
                // ID a casilla
                casellaHTML.id = `${f}-${c}`;
                // Añadir casilla al tablero
                document.getElementById('game-board')?.appendChild(casellaHTML);                
            }
            document.getElementById('game-board')?.appendChild(document.createElement('br'));
        }
    }

    revelarCasella(fila: number, columna: number) {
        // Lógica para revelar una casilla
        if (fila < 0 || fila >= this.tauler.filas || columna < 0 || columna >= this.tauler.columnes) {
            console.error("Coordenadas fuera del tablero");
            return;
        }

        let casella = this.tauler.caselles[fila][columna];

        if (casella.revelada) {
            console.error("Casilla ya revelada");
            return;
        }

        casella.revelada = true;

        if (casella.esMina) {
            console.log("Has perdido");
            return String("Has perdido");
        }
    }

    marcarCasella(fila: number, columna: number) {
        // Lógica para marcar una casilla
    }

}

export default Joc;