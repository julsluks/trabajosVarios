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
            document.getElementById('game-board')?.appendChild(document.createElement('br'));
            for (let c = 0; c < filaCasella.length; c++) {
                let columnaCasella = filaCasella[c];
                const casellaHTML = document.createElement('div');
                casellaHTML.classList.add('casella');
                casellaHTML.textContent = columnaCasella.esMina ? 'X' : 'O';
                if (columnaCasella.esMina == true) {
                    casellaHTML.classList.add('mina');
                }
                document.getElementById('game-board')?.appendChild(casellaHTML);                
            }
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