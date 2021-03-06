'use strict'
// for game logic
const ui = require('./ui.js')
const logic = require('./logic.js')
const { cells } = require('./constants')
// for game api
const api = require('./api.js')
const apiUi = require('./apiUi.js')

const getFormFields = require(`../../../lib/get-form-fields`)

// generates click event for each cell in gameboard
const addHandlers = () => {
  cells.forEach((cellId, ix) => {
    $(cellId).click(() => {
      ui.cellEvent(event.target)
      logic.pushMoveArr(ix)
      const over = logic.checkWinEvent(event.target.innerHTML)
      api.updateGame(event.target.innerHTML, ix, over)
        .then(apiUi.updateGameSuccess)
        .catch(apiUi.updateGameFailure)
    })
  })
}

// play again button event
$('#form-reset').on('reset', () => {
  ui.resetGame()
  onStartGame(event)
  cells.forEach(cellId => {
    $(cellId).text('')
    $(cellId).off('click')
  })
  addHandlers()
})

// api create game event
const onStartGame = (event) => {
  event.preventDefault()
  addHandlers()
  api.createGame()
    .then(apiUi.createGameSuccess)
    .catch(apiUi.createGameFailure)
  logic.resetGameLogic()
  $('#start-game').hide()
  $('.hide-board').show()
  $('#back-to-signin').hide()
  $('#display-stats').show()
  $('#get-games').show()
  $('#get-one-game').show()
}

const onGetGames = (event) => {
  event.preventDefault()
  api.getGames()
  .then(apiUi.getGamesSuccess)
  .catch(apiUi.getGamesFailure)
}
const onGetOneGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.getOneGame(data)
    .then(apiUi.oneGameSuccess)
    .catch(apiUi.oneGameFailure)
}

$('#start-game').on('submit', onStartGame)
$('#get-games').on('submit', onGetGames)
$('#get-one-game').on('submit', onGetOneGame)

module.exports = {
  addHandlers
}
