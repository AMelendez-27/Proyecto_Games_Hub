import "./ticTacToe.css"

export const ticTacToe = () => {
    // Tic Tac Toe Game
    let victories = 0 // Variable to store the number of wins

    // Load victories from localStorage
    function loadVictories() {
        const storedVictories = localStorage.getItem("ticTacToeVictories")
        if (storedVictories) {
            victories = parseInt(storedVictories, 10)
        }
    }

    // Save victories to localStorage
    function saveVictories() {
        localStorage.setItem("ticTacToeVictories", victories)
    }

    // Create the game board
    const gameBoard = ["", "", "", "", "", "", "", "", ""]
    let currentPlayer = "X"
    let gameActive = true

    // Function to render the game board in the div
    function renderBoard() {
        const boardDiv = document.getElementById("ticTacToe")
        boardDiv.innerHTML = "" // Clear the board
        
        gameBoard.forEach((cell, index) => {
            const cellDiv = document.createElement("div")
            cellDiv.classList.add("cell")
            cellDiv.dataset.index = index
            cellDiv.innerText = cell
            cellDiv.addEventListener("click", handleCellClick)
            boardDiv.appendChild(cellDiv)
        })
    }

    // Function to handle cell clicks
    function handleCellClick(event) {
        const index = event.target.dataset.index

        if (gameBoard[index] !== "" || !gameActive) {
            return // Cell already taken or game not active
        }

        gameBoard[index] = currentPlayer
        renderBoard()
        checkWinCondition()

        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X"
            if (currentPlayer === "O") {
                makeAIMove()
            }
        }
    }

    // Function for AI to make a move
    function makeAIMove() {
        const emptyCells = gameBoard.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null)
        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            gameBoard[randomIndex] = "O"
            renderBoard()
            checkWinCondition()
            currentPlayer = "X"
        }
    }

    // Function to check for a win
    function checkWinCondition() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ]

        for (const condition of winConditions) {
            const [a, b, c] = condition

            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false
                victories += 1
                saveVictories() // Save to localStorage
                updateVictoryCount()
                const messageElement = document.getElementById("message")
                messageElement.textContent = `${gameBoard[a]} wins!`
                return
            }
        }

        if (!gameBoard.includes("")) {
            gameActive = false
            const messageElement = document.getElementById("message")
            messageElement.textContent = "It's a draw!"
        }
    }

    // Function to update the victory count
    function updateVictoryCount() {
        const victoryElement = document.getElementById("victoryCount")
        victoryElement.textContent = `Total Wins: ${victories}`
    }

    // Function to reset the game
    function resetGame() {
        gameBoard.fill("")
        gameActive = true
        currentPlayer = "X"
        const messageElement = document.getElementById("message")
        messageElement.textContent = ""
        renderBoard()
    }

    // Initialize the game
    window.onload = () => {
        loadVictories() // Load from localStorage
        const container = document.getElementById("ticTacToe-container")
        container.innerHTML = `
            <div id="victoryCount" class="victory">Total Wins: ${victories}</div>
            <div id="message" class="message"></div>
            <div id="ticTacToe" class="board"></div>
            <button id="resetButton">Reset Game</button>
        `

        document.getElementById("resetButton").addEventListener("click", resetGame)
        renderBoard()
    }
}
