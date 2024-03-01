import Tauler from './tauler.js';

class Joc {

    public tauler: Tauler; //El tauler de joc.

    constructor(filas: number, columnes: number) {
        this.tauler = new Tauler(filas, columnes);
    }

    dibuixarTauler() {
        let caselles = this.tauler.inicialitzarCaselles();
        console.log(caselles);

        for (let index = 0; index < caselles.length; index++) {
            caselles[index].forEach(casella => {
                const casellaHTML = document.createElement('div');
                casellaHTML.classList.add('casella');
                if (casella.esMina == true) {
                    casellaHTML.classList.add('mina');
                }
                document.getElementById('game-board')?.appendChild(casellaHTML);
            });
            document.getElementById('game-board')?.appendChild(document.createElement('br')); // Salto de línea
        }
    }

    revelarCasella(fila: number, columna: number) {
        // Lógica para revelar una casilla
    }

    marcarCasella(fila: number, columna: number) {
        // Lógica para marcar una casilla
    }

}

export default Joc;