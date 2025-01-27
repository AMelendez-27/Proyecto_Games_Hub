import "./ticTacToe.css"

export const ticTacToe = () => {
    // Variables y funciones internas
    let victories = 0;
    const gameBoard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    function loadVictories() {
        const storedVictories = localStorage.getItem("ticTacToeVictories");
        if (storedVictories) {
            victories = parseInt(storedVictories, 10);
        }
    }

    function saveVictories() {
        localStorage.setItem("ticTacToeVictories", victories);
    }

    function renderBoard() {
        const boardDiv = document.getElementById("ticTacToe");
        boardDiv.innerHTML = ""; // Clear the board

        gameBoard.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.dataset.index = index;
            cellDiv.innerText = cell;
            cellDiv.addEventListener("click", handleCellClick);
            boardDiv.appendChild(cellDiv);
        });
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] !== "" || !gameActive) {
            return; // Cell already taken or game not active
        }

        gameBoard[index] = currentPlayer;
        renderBoard();
        checkWinCondition();

        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (currentPlayer === "O") {
                makeAIMove();
            }
        }
    }

    function makeAIMove() {
        const emptyCells = gameBoard.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);
        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            gameBoard[randomIndex] = "O";
            renderBoard();
            checkWinCondition();
            currentPlayer = "X";
        }
    }

    function checkWinCondition() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6],           // Diagonals
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;

            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                victories += 1;
                saveVictories(); // Save to localStorage
                updateVictoryCount();
                const messageElement = document.getElementById("message");
                messageElement.textContent = `${gameBoard[a]} wins!`;
                return;
            }
        }

        if (!gameBoard.includes("")) {
            gameActive = false;
            const messageElement = document.getElementById("message");
            messageElement.textContent = "It's a draw!";
        }
    }

    function updateVictoryCount() {
        const victoryElement = document.getElementById("victoryCount");
        victoryElement.textContent = `Total Wins: ${victories}`;
    }

    function resetGame() {
        gameBoard.fill("");
        gameActive = true;
        currentPlayer = "X";
        const messageElement = document.getElementById("message");
        messageElement.textContent = "";
        renderBoard();
    }

    function initializeGame() {
        loadVictories(); // Load from localStorage
        const container = document.getElementById("ttt-container");
        container.innerHTML = `
            <div id="victoryCount" class="victory">Total Wins: ${victories}</div>
            <div id="message" class="message"></div>
            <div id="ticTacToe" class="board"></div>
            <button id="resetButton">Reset Game</button>
        `;

        document.getElementById("resetButton").addEventListener("click", resetGame);
        renderBoard();
    }

    // Exporta solo la función de inicialización
    return { initializeGame };
};
