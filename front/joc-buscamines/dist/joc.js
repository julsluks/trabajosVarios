import Tauler from './tauler.js';
class Joc {
    constructor(filas, columnes) {
        this.tauler = new Tauler(filas, columnes);
    }
    dibuixarTauler() {
        var _a, _b;
        let caselles = this.tauler.inicialitzarCaselles();
        console.log(caselles);
        for (let f = 0; f < caselles.length; f++) {
            let filaCasella = caselles[f];
            (_a = document.getElementById('game-board')) === null || _a === void 0 ? void 0 : _a.appendChild(document.createElement('br'));
            for (let c = 0; c < filaCasella.length; c++) {
                let columnaCasella = filaCasella[c];
                const casellaHTML = document.createElement('div');
                casellaHTML.classList.add('casella');
                casellaHTML.textContent = columnaCasella.esMina ? 'X' : 'O';
                if (columnaCasella.esMina == true) {
                    casellaHTML.classList.add('mina');
                }
                (_b = document.getElementById('game-board')) === null || _b === void 0 ? void 0 : _b.appendChild(casellaHTML);
            }
        }
    }
    revelarCasella(fila, columna) {
        // Lógica para revelar una casilla
    }
    marcarCasella(fila, columna) {
        // Lógica para marcar una casilla
    }
}
export default Joc;
