var _a, _b;
import Joc from './joc.js';
(_a = document.getElementById("start-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var _a, _b, _c;
    let rows;
    let columns;
    const rowsInput = document.getElementById("rows-input");
    const columnsInput = document.getElementById("columns-input");
    if (rowsInput && columnsInput) {
        rows = parseInt(rowsInput.value);
        columns = parseInt(columnsInput.value);
        startGame(rows, columns);
        (_a = document.getElementById("game-board")) === null || _a === void 0 ? void 0 : _a.classList.remove("oculta");
        (_b = document.getElementById("turn-back-button")) === null || _b === void 0 ? void 0 : _b.classList.remove("oculta");
        (_c = document.getElementById("game-config")) === null || _c === void 0 ? void 0 : _c.classList.add("oculta");
    }
    else {
        // Manejar el caso donde no se encontraron los elementos
        console.error("No se encontraron los elementos rows-input y columns-input.");
    }
});
(_b = document.getElementById("turn-back-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var _a, _b, _c;
    (_a = document.getElementById("game-board")) === null || _a === void 0 ? void 0 : _a.classList.add("oculta");
    (_b = document.getElementById("turn-back-button")) === null || _b === void 0 ? void 0 : _b.classList.add("oculta");
    (_c = document.getElementById("game-config")) === null || _c === void 0 ? void 0 : _c.classList.remove("oculta");
    restartGame();
});
//lister a game-board click
function startGame(rows, columns) {
    let game = new Joc(rows, columns);
    // let caselles = game.tauler.inicialitzarCaselles();
    game.dibuixarTauler();
    // console.log(caselles);
}
function restartGame() {
    let gameBoard = document.getElementById("game-board");
    if (gameBoard) {
        gameBoard.innerHTML = "";
    }
}
