import "./slots.css"

export const slots = () => {
    // Slot Machine Game
    const emojis = ["🍀", "💰", "🎱", "🍒", "⭐", "💎"]
    let victories = 0 // Variable to store the number of wins

    // Load victories from localStorage
    function loadVictories() {
        const storedVictories = localStorage.getItem("slotMachineVictories")
        if (storedVictories) {
            victories = parseInt(storedVictories, 10)
        }
    }

    // Save victories to localStorage
    function saveVictories() {
        localStorage.setItem("slotMachineVictories", victories)
    }

    // Generate random combinations for slots
    function generateRandomCombinations() {
        const combinations = []
        for (let i = 0; i < 10; i++) {
            combinations.push(emojis[Math.floor(Math.random() * emojis.length)])
        }
        return combinations
    }

    // Function to spin the slots
    function spinSlots() {
        const slots = document.querySelectorAll(".slot")
        const resultElement = document.getElementById("result")
        const slotCombinations = [
            generateRandomCombinations(),
            generateRandomCombinations(),
            generateRandomCombinations()
        ]
        const finalEmojis = []

        resultElement.textContent = "" // Clear the result message

        slots.forEach((slot, index) => {
            let currentStep = 0
            setTimeout(() => {
                const interval = setInterval(() => {
                    slot.textContent = slotCombinations[index][currentStep]
                    currentStep++
                    if (currentStep === slotCombinations[index].length) {
                        clearInterval(interval)
                        finalEmojis[index] = slotCombinations[index][currentStep - 1]

                        // Check if all slots have stopped
                        if (finalEmojis.length === slots.length) {
                            checkResult(finalEmojis)
                        }
                    }
                }, 300)
            }, index * 200) // Delay for each slot
        })
    }

    // Function to check the result
    function checkResult(finalEmojis) {
        const resultElement = document.getElementById("result")
        if (finalEmojis.every((emoji) => emoji === finalEmojis[0])) {
            resultElement.textContent = "You win! 🎉"
            victories++
            saveVictories()
            updateVictoryCount()
        } else {
            resultElement.textContent = "You lose! 😞"
        }
    }

    // Function to update the victory count
    function updateVictoryCount() {
        const victoryElement = document.getElementById("victoryCount")
        victoryElement.textContent = `Total Wins: ${victories}`
    }

    // Initialize the game
    window.onload = () => {
        loadVictories() // Load victories from localStorage

        const container = document.getElementById("slots-container")
        container.innerHTML = `
            <div id="victoryCount" class="victory">Total Wins: ${victories}</div>
                        <div id="result" class="result"></div>
            <div class="slots">
                <div id="first" class="slot">🍀</div>
                <div id="second" class="slot">💰</div>
                <div id="third" class="slot">🎱</div>
            </div>
            <button id="spin-button">SPIN</button>
        `

        document.getElementById("spin-button").addEventListener("click", spinSlots)
    }
}