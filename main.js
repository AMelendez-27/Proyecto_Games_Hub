import { addGame } from "./components/addGame/addGame"
import { ticTacToe } from "./components/ttt-game/ticTacToe"
import { rockPaperScissors } from "./components/rps-game/rockPaperScissors"
import { slots } from "./components/slots-game/slots"



//Games showcase menu
addGame("tic tac toe", "Nothing new just the classic tic tac toe in easy mode. Play against the machine.")
addGame("rock paper scissors", "Another classic game. How many times in a row can you win?")
addGame("slots", "Totaly fair slots machine, you are not playinh with money, so you can try your luck for free.")



//Hide games showcase menu
const playButtons = document.getElementsByClassName('play')

Array.from(playButtons).forEach((playButton) => {
    playButton.addEventListener('click', () => {
        const hide = document.getElementsByClassName('games-section')[0]
        hide.classList.add('hide') // Add "hide" class, hiddes the element
    })
})



//Show selected game
//Main menu
Array.from(playButtons).forEach((playButton) => {
    playButton.addEventListener('click', (event) => {
        const buttonId = event.currentTarget.id; // Asegúrate de capturar siempre el botón correcto
        executeFunctionById(buttonId); // Llama a la función correspondiente
    });
});

const tttGame = ticTacToe();
const rpsGame = rockPaperScissors();
const slotsGame = slots();

const gameSection = document.getElementsByClassName('games-section')[0]
const playSection = document.getElementsByClassName('play-section')[0]
const tttContainer = document.getElementById('ttt-container')
const rpsContainer = document.getElementById('rps-container')
const slotsContainer = document.getElementById('slots-container')

const subtitle = document.getElementsByClassName('home-desc')[0]
const homeButton = document.getElementsByClassName('home-button')[0]

function executeFunctionById(buttonId) {
    switch (buttonId) {
        case 'home-button':
            gameSection.classList.remove('hide')
            subtitle.classList.remove('hide')
            
            playSection.classList.add('hide')
            homeButton.classList.add('hide')
            tttContainer.classList.add('hide')
            rpsContainer.classList.add('hide')
            slotsContainer.classList.add('hide')
            subtitle.classList.remove('hide')
            break;
        case 'tic-tac-toe':
            playSection.classList.remove('hide')
            tttContainer.classList.remove('hide')
            homeButton.classList.remove('hide')

            rpsContainer.classList.add('hide')
            slotsContainer.classList.add('hide')
            subtitle.classList.add('hide')

            tttGame.initializeGame();
            break;
        case 'rock-paper-scissors':
            playSection.classList.remove('hide')
            rpsContainer.classList.remove('hide')
            homeButton.classList.remove('hide')

            tttContainer.classList.add('hide')
            slotsContainer.classList.add('hide')
            subtitle.classList.add('hide')

            rpsGame.initializeGame();
            break;
        case 'slots':
            playSection.classList.remove('hide')
            slotsContainer.classList.remove('hide')
            homeButton.classList.remove('hide')

            tttContainer.classList.add('hide')
            rpsContainer.classList.add('hide')
            subtitle.classList.add('hide')

            slotsGame.initializeGame();
            break;
        case 'header-ttt':
            playSection.classList.remove('hide')
            tttContainer.classList.remove('hide')
            homeButton.classList.remove('hide')

            rpsContainer.classList.add('hide')
            slotsContainer.classList.add('hide')
            subtitle.classList.add('hide')

            tttGame.initializeGame();
            break;
        case 'header-rps':
            playSection.classList.remove('hide')
            rpsContainer.classList.remove('hide')
            homeButton.classList.remove('hide')

            tttContainer.classList.add('hide')
            slotsContainer.classList.add('hide')
            subtitle.classList.add('hide')

            rpsGame.initializeGame();
            break;
        case 'header-slots':
            playSection.classList.remove('hide')
            slotsContainer.classList.remove('hide')
            homeButton.classList.remove('hide')

            tttContainer.classList.add('hide')
            rpsContainer.classList.add('hide')
            subtitle.classList.add('hide')

            slotsGame.initializeGame();
            break;
        default:
            console.log('Error game not recognized')
    }
}

/*
//Header menu
Array.from(headerPlayButtons).forEach((headerPlayButton) => {
    headerPlayButton.addEventListener('click', (event) => {
        const headerButtonId = event.currentTarget.id; // Asegúrate de capturar siempre el botón correcto
        executeFunctionById(headerButtonId); // Llama a la función correspondiente
    });
});

function executeFunctionById(headerButtonId) {
    switch (headerButtonId) {
        case 'tic-tac-toe':
            playSection.classList.remove('hide')
            tttContainer.classList.remove('hide')

            rpsContainer.classList.add('hide')
            slotsContainer.classList.add('hide')

            tttGame.initializeGame();
            break;
        case 'rock-paper-scissors':
            playSection.classList.remove('hide')
            rpsContainer.classList.remove('hide')

            tttContainer.classList.add('hide')
            slotsContainer.classList.add('hide')

            rpsGame.initializeGame();
            break;
        case 'slots':
            playSection.classList.remove('hide')
            slotsContainer.classList.remove('hide')

            tttContainer.classList.add('hide')
            rpsContainer.classList.add('hide')

            slotsGame.initializeGame();
            break;
        default:
            console.log('Error game not recognized')
    }
}*/