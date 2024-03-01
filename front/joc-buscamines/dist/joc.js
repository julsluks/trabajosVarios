import Tauler from './tauler.js';
class Joc {
    constructor(filas, columnes) {
        this.tauler = new Tauler(filas, columnes);
    }
    dibuixarTauler() {
        var _a;
        let caselles = this.tauler.inicialitzarCaselles();
        console.log(caselles);
        for (let index = 0; index < caselles.length; index++) {
            caselles[index].forEach(casella => {
                var _a;
                const casellaHTML = document.createElement('div');
                casellaHTML.classList.add('casella');
                if (casella.esMina == true) {
                    casellaHTML.classList.add('mina');
                }
                (_a = document.getElementById('game-board')) === null || _a === void 0 ? void 0 : _a.appendChild(casellaHTML);
            });
            (_a = document.getElementById('game-board')) === null || _a === void 0 ? void 0 : _a.appendChild(document.createElement('br')); // Salto de línea
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
