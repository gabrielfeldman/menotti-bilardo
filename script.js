const bilardo = 'bilardo';
const menotti = 'menotti' 
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let menottiTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  menottiTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(bilardo)
    cell.classList.remove(menotti)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = menottiTurn ? menotti : bilardo
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = '¡Empate!'
  } else {
    winningMessageTextElement.innerText = `¡Ganó ${menottiTurn ? "Menotti" : "Bilardo"}!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(bilardo) || cell.classList.contains(menotti)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  menottiTurn = !menottiTurn
}

function setBoardHoverClass() {
  board.classList.remove(bilardo)
  board.classList.remove(menotti)
  if (menottiTurn) {
    board.classList.add(menotti)
  } else {
    board.classList.add(bilardo)
  }
}

function checkWin(currentClass) {
  return winCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}