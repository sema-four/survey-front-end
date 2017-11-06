'use strict'
const getFormFields = require('../../../lib/get-form-fields')
// const store = require('../store')
const api = require('./auth_api')
const ui = require('./auth_ui')

// Start authentication event handlers
const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  //  console.log('sign-up', data)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

// for sign in
const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  //  console.log('sign-in', data)
  //  console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

// for signOut

const onSignOut = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
// console.log('onSignOut: ', data)
  //  console.log(data)
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// for change password
const onChangePassword = function (event) {
  event.preventDefault()
  // console.log('change password ran!')
  const data = getFormFields(this)
  // console.log(data)
  // console.log(data.passwords.old, data.passwords.new)
  if (data.passwords.old === data.passwords.new) {
    // below calls a specific error message telling user new and old passwords
    // are the same and that they need to be differenet
    ui.notUniquePw()
  } else {
    api.changePassWord(data)
      .then(ui.changePWSuccess)
      .catch(ui.changePWFailure)
  }
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('click', onSignOut)
  $('#change-password').on('submit', onChangePassword)
}

module.exports = {
  addHandlers
}
