class Joc {

    public tauler: Tauler; //El tauler de joc.

    constructor(filas: number, columnes: number) {
        this.tauler = new Tauler(filas, columnes);
    }

    dibuixarTauler() {
        // Lógica para dibujar el tablero en pantalla
    }

    revelarCasella(fila: number, columna: number) {
        // Lógica para revelar una casilla
    }

    marcarCasella(fila: number, columna: number) {
        // Lógica para marcar una casilla
    }

}