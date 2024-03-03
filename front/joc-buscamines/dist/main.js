var _a, _b, _c;
import Joc from './joc.js';
var game;
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
(_c = document.getElementById("game-board")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function (event) {
    let target = event.target;
    if (target.classList.contains("casella")) {
        console.log("Casella clicada");
        game.revelarCasella(0, 0);
    }
});
function startGame(rows, columns) {
    game = new Joc(rows, columns);
    game.dibuixarTauler();
}
function restartGame() {
    let gameBoard = document.getElementById("game-board");
    if (gameBoard) {
        gameBoard.innerHTML = "";
    }
}
