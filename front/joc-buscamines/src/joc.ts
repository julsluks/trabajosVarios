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
            document.getElementById(`${fila}-${columna}`)?.classList.add('mina-revelada');
            return;
        }

        // Lógica para revelar las casillas adyacentes
        const direcciones = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (let i = 0; i < direcciones.length; i++) {
            let dir = direcciones[i];
            let filaAdyacente = fila + dir[0];
            let columnaAdyacente = columna + dir[1];

            if (filaAdyacente >= 0 && filaAdyacente < this.tauler.filas && columnaAdyacente >= 0 && columnaAdyacente < this.tauler.columnes) {
                let casellaAdyacente = this.tauler.caselles[filaAdyacente][columnaAdyacente];
                if (!casellaAdyacente.esMina) {
                    this.revelarCasella(filaAdyacente, columnaAdyacente);
                }
            }
        }

        
    }

    marcarCasella(fila: number, columna: number) {
        // Lógica para marcar una casilla
    }

}

export default Joc;