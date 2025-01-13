import "./rockPaperScissors.css"

export const rockPaperScissors = () => {
    let victories = 0
    let intervalId = null // Store interval ID for stopping the emoji cycling

    function loadVictories() {
        const storedVictories = localStorage.getItem("rpsVictories")
        if (storedVictories) {
            victories = parseInt(storedVictories, 10)
        }
    }

    function saveVictories() {
        localStorage.setItem("rpsVictories", victories)
    }

    function startEmojiCycling() {
        const emojiChoices = ["✊", "✋", "✌️"]
        const emojiBox = document.getElementById("emoji-box")
        let index = 0

        intervalId = setInterval(() => {
            emojiBox.textContent = emojiChoices[index]
            index = (index + 1) % emojiChoices.length
        }, 50) // Change emoji every 100ms
    }

    function stopEmojiCycling() {
        clearInterval(intervalId)
    }

    function playRound(playerChoice) {
        stopEmojiCycling() // Stop the cycling emojis
        const emojiBox = document.getElementById("emoji-box")
        const computerChoice = emojiBox.textContent

        let result = ""
        if (playerChoice === computerChoice) {
            result = "It's a draw!"
        } else if (
            (playerChoice === "✊" && computerChoice === "✌️") ||
            (playerChoice === "✋" && computerChoice === "✊") ||
            (playerChoice === "✌️" && computerChoice === "✋")
        ) {
            result = "You win!"
            victories += 1
            saveVictories()
        } else {
            result = "You lose!"
        }

        updateUI(result)
        hideChoices()
    }

    function hideChoices() {
        const choicesElement = document.querySelector(".choices")
        if (choicesElement) {
            choicesElement.style.display = "none"
        }
    }

    function showChoices() {
        const choicesElement = document.querySelector(".choices")
        if (choicesElement) {
            choicesElement.style.display = "flex"
        }
    }

    function updateUI(result) {
        const resultElement = document.getElementById("result")
        const victoryElement = document.getElementById("victoryCount")

        resultElement.textContent = result
        victoryElement.textContent = `Total Wins: ${victories}`

        // Show reset button
        const resetButton = document.createElement("button")
        resetButton.id = "resetButton"
        resetButton.textContent = "Restart"
        resetButton.onclick = resetGame
        document.getElementById("rps-container").appendChild(resetButton)
    }

    function resetGame() {
        const resultElement = document.getElementById("result")
        const resetButton = document.getElementById("resetButton")

        // Clear result message and remove reset button
        resultElement.textContent = ""
        if (resetButton) resetButton.remove()

        // Show choices again
        showChoices()

        // Restart emoji cycling
        startEmojiCycling()
    }

    window.onload = () => {
        loadVictories()

        const container = document.getElementById("rps-container")
        container.innerHTML = `
            <div id="victoryCount" class="victory">Total Wins: ${victories}</div>
            <div id="emoji-box" class="emoji-box">✊</div>
            <div id="result" class="result"></div>
            <div class="choices">
                <button id="rock">
                    <span>✊</span>
                </button>
                <button id="paper">
                    <span>✋</span>
                </button>
                <button id="scissors">
                    <span>✌️</span>
                </button>
            </div>
        `

        document.getElementById("rock").addEventListener("click", () => playRound("✊"))
        document.getElementById("paper").addEventListener("click", () => playRound("✋"))
        document.getElementById("scissors").addEventListener("click", () => playRound("✌️"))

        startEmojiCycling()
    }
}
