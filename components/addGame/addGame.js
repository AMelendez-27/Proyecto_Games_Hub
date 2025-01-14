import "./addGame.css"

const gamesHubSection = document.getElementsByClassName("games-section")[0];

export const addGame = (gameName, gameDescription) => {
  //ALL GAME NAME CONVERTIONS
  //Change the gaps between words with "-"
  const originalName = gameName;
  const gameNameHyphen = originalName.split(" ").join("-");

  //Change the gaps between words with "_"
  const gameNameUnderscore = originalName.split(" ").join("_");

  //Change to caps the first letter of all the words
  const gameNameCaps = originalName
  .split(" ")
  .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
  .join(" ");

  // Game box
  const gameBox = document.createElement('article')
  gameBox.className = 'game game-box'
  gameBox.id = gameNameHyphen
  
  gamesHubSection.appendChild(gameBox)
  
  // Game box content
  const gameImg = document.createElement('img')
  gameImg.className = 'game game-img'
  gameImg.id = gameNameHyphen
  gameImg.src = `/icons/${gameNameUnderscore}.png`;
  gameImg.alt = `Imagen del proyecto ${gameNameCaps}`

  const gameTitle = document.createElement('h3')
  gameTitle.className = 'game game-title'
  gameTitle.textContent = gameNameCaps

  const gameDesc = document.createElement('p')
  gameDesc.className = 'game game-description'
  gameDesc.textContent = gameDescription

  const playButton = document.createElement('a')
  playButton.className = 'game play-button'
  playButton.href = `/src/${gameNameHyphen}/${gameNameHyphen}.html`
  playButton.textContent = 'TRY GAME'

  gameBox.appendChild(gameImg)
  gameBox.appendChild(gameTitle)
  gameBox.appendChild(gameDesc)
  gameBox.appendChild(playButton)
}