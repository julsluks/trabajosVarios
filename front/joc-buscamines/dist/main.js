var _a;
import Joc from './joc.js';
(_a = document.getElementById("start-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    let rows;
    let columns;
    const rowsInput = document.getElementById("rows-input");
    const columnsInput = document.getElementById("columns-input");
    if (rowsInput && columnsInput) {
        rows = parseInt(rowsInput.value);
        columns = parseInt(columnsInput.value);
        startGame(rows, columns);
    }
    else {
        // Manejar el caso donde no se encontraron los elementos
        console.error("No se encontraron los elementos rows-input y columns-input.");
    }
});
function startGame(rows, columns) {
    let game = new Joc(rows, columns);
    // let caselles = game.tauler.inicialitzarCaselles();
    game.dibuixarTauler();
    // console.log(caselles);
}
