import Joc from './joc.js';

document.getElementById("start-button")?.addEventListener("click", function() {
    let rows: number;
    let columns: number;

    const rowsInput = document.getElementById("rows-input") as HTMLInputElement | null;
    const columnsInput = document.getElementById("columns-input") as HTMLInputElement | null;

    if (rowsInput && columnsInput) {
        rows = parseInt(rowsInput.value);
        columns = parseInt(columnsInput.value);
        
        startGame(rows, columns);
    } else {
        // Manejar el caso donde no se encontraron los elementos
        console.error("No se encontraron los elementos rows-input y columns-input.");
    }
});

function startGame(rows: number, columns: number) {
    let game = new Joc(rows, columns);
    // let caselles = game.tauler.inicialitzarCaselles();
    game.dibuixarTauler();
    // console.log(caselles);
}