'use strict'

const store = require('./../store')

const signUpSuccess = function (data) {
  // console.log(data)
  $('#result').html('You have signed up successfully. Now login.')
  // $('#sign-up').fadeOut()
}

const signUpFailure = function (error) {
  console.error(error)
  $('#modal-message').html('Sign up has <span style="color:#f4c542">failed</span>. Please try again.')
}

const signInSuccess = function (data) {
  console.log(data)
  // $('.enter-data').show()
  // $('.welcome-box').hide()
  // $('.navigation-bar').show()
  $('#result').html('You have signed in successfully').fadeOut(8000)
  $('#lndingpg_create_survey_button').removeClass('hide')
  $('#lndingpg_view_dashboard_button').removeClass('hide')
  // we have to store the user data or header somwhere.  sto we will put it in ../store.js
  store.user = data.user
}

const signInFailure = function (error) {
  console.error(error)
  $('#modal-message').show().html('Sign In <span style="color:#f4c542">failed</span>. Please check your username/password and try again').fadeOut(8000)
}

const signOutSuccess = function () {
  // console.log(data)
  // $('.enter-data').hide()
  // $('.view-data').hide()
  // $('.navigation-bar').hide()
  // $('.welcome-box').show()
  $('#lndingpg_create_survey_button').addClass('hide')
  $('#lndingpg_view_dashboard_button').addClass('hide')
  $(':input', '#sign-in').val('')
  $('#result').html('You have signed out successfully').fadeOut(8000)
  // need to clear memory of the user information which includes token and auth header
  store.user = null
}

const signOutFailure = function (error) {
  console.error(error)
  $('#modal-message').html('Sign Out <span style="color:#f4c542">Failed</span>')
}

const changePWSuccess = function () {
  $('#result').show().html('You have successfully changed your password').fadeOut(8000)
  $(':input', '#change-password').val('')
  // $('#change-password').hide()
}

const changePWFailure = function (error) {
  console.error(error)
  $('#modal-message').html('Change of Password  <span style="color:#f4c542">Failed</span>. Check your your password input and please try again.').show().fadeOut(8000)
}

const notSamePw = function () {
  $('#modal-message').html('Your passwords do not match. Please ensure your password confirmation matches your new chosen password.').show().fadeOut(8000)
}

const notUniquePw = function () {
  $('#modal-message').html('Your new password is the same as the current password.  Please enter a different password.').show().fadeOut(8000)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePWSuccess,
  changePWFailure,
  notSamePw,
  notUniquePw
}
