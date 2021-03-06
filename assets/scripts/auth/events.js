'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onSignUp = (event) => {
  const data = getFormFields(event.target)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = (event) => {
  const data = getFormFields(event.target)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}
const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onNoAccount = (event) => {
  event.preventDefault()
  $('#form-signin').hide()
  $('#no-account').hide()
  $('#form-signup').show()
  $('#back-to-signin').show()
}

const onSignOut = (event) => {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onBackToSignIn = (event) => {
  event.preventDefault()
  $('#form-signup').hide()
  $('#back-to-signin').hide()
  $('#no-account').show()
  $('#form-signin').show()
}

const addHandlers = () => {
  $('#form-signup').on('submit', onSignUp)
  $('#form-signin').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#form-signout').on('submit', onSignOut)
  $('#no-account').on('submit', onNoAccount)
  $('#back-to-signin').on('submit', onBackToSignIn)
}

module.exports = {
  addHandlers
}
