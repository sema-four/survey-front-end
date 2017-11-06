'use strict'
const getFormFields = require('../../../lib/get-form-fields')
// const store = require('../store')
const api = require('./auth_api')
const ui = require('./auth_ui')
const authHelper = require('./auth_helper')

// Start authentication event handlers
const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  if (data.credentials.password !== data.credentials.password_confirmation) {
  //  console.log('sign-up', data)
    ui.notSamePw()
  } else {
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.signUpFailure)
  }
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
    api.changePassword(data)
      .then(ui.changePWSuccess)
      .catch(ui.changePWFailure)
  }
}

// This function will trigger the sign up form when "Sign Up/Register" button is
// clicked. The form is hidden by default.
const onSignUpToggle = function (event) {
  event.preventDefault()
  authHelper.setSignUpToggleShowHide()
}

const onSignInToggle = function (event) {
  event.preventDefault()
  authHelper.setSignInToggleShowHide()
}

const onChangePwdButton = function (event) {
  $('#result').text('')
  event.preventDefault()
  authHelper.setOnChangePwdShowHide()
}

const onSignInRegister = function (event) {
  event.preventDefault()
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  $('#sign-up, #sign-in-toggle, #sign-in-toggle-text, #change-password').addClass('hidden')
  $('#sign-in, #sign-up-toggle, #sign-up-toggle-text').removeClass('hidden')
  $('#signUpModalLabel').text('Sign In / Register')
  $('#content').text('Informational messages will be displayed here...')
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-up-toggle').on('click', onSignUpToggle)
  $('#sign-in-toggle').on('click', onSignInToggle)
  $('#change-pwd-btn').on('click', onChangePwdButton)
  $('#sign-in-register').on('click', onSignInRegister)
}

module.exports = {
  addHandlers
}
