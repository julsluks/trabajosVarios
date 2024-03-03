import Joc from './joc.js';

var game: Joc;

document.getElementById("start-button")?.addEventListener("click", function() {
    let rows: number;
    let columns: number;

    const rowsInput = document.getElementById("rows-input") as HTMLInputElement | null;
    const columnsInput = document.getElementById("columns-input") as HTMLInputElement | null;

    if (rowsInput && columnsInput) {
        rows = parseInt(rowsInput.value);
        columns = parseInt(columnsInput.value);
        
        startGame(rows, columns);
        document.getElementById("game-board")?.classList.remove("oculta");
        document.getElementById("turn-back-button")?.classList.remove("oculta");
        document.getElementById("game-config")?.classList.add("oculta");
    } else {
        // Manejar el caso donde no se encontraron los elementos
        console.error("No se encontraron los elementos rows-input y columns-input.");
    }
});

document.getElementById("turn-back-button")?.addEventListener("click", function() {
    document.getElementById("game-board")?.classList.add("oculta");
    document.getElementById("turn-back-button")?.classList.add("oculta");
    document.getElementById("game-config")?.classList.remove("oculta");

    restartGame();
});

//lister a game-board click
document.getElementById("game-board")?.addEventListener("click", function(event) {
    let target = event.target as HTMLElement;
    if (target.classList.contains("casella")) {
        console.log("Casella clicada");
        game.revelarCasella(0, 0);
    }
});

function startGame(rows: number, columns: number) {
    game = new Joc(rows, columns);
    game.dibuixarTauler();
}

function restartGame() {
    let gameBoard = document.getElementById("game-board");
    if (gameBoard) {
        gameBoard.innerHTML = "";
    }
}