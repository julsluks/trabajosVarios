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
                (_a = document.getElementById('game-board')) === null || _a === void 0 ? void 0 : _a.appendChild(casellaHTML);
            }
            (_b = document.getElementById('game-board')) === null || _b === void 0 ? void 0 : _b.appendChild(document.createElement('br'));
        }
    }
    revelarCasella(fila, columna) {
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
    marcarCasella(fila, columna) {
        // Lógica para marcar una casilla
    }
}
export default Joc;
