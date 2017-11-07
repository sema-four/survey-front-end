'use strict'

const store = require('./../store')
const authHelper = require('./auth_helper')
const appEvents = require('./../application/app_events')

const signUpSuccess = function (data) {
  // console.log(data)
  $('#result').html('You have signed up successfully.')
  authHelper.clearFormInputFields('sign-up')
  authHelper.clearFormInputFields('sign-in')
  authHelper.clearFormInputFields('change-password')
  $('#signUpModal').modal('hide')
  // $('#sign-up').fadeOut()
}

const signUpFailure = function (error) {
  console.error(error)
  $('#modal-message').html('Sign up has <span style="color:#f4c542">failed</span>. Please try again.')
}

const signInSuccess = function (data) {
  console.log('signInSuccess called:', data)
  // $('.enter-data').show()
  // $('.welcome-box').hide()
  // $('.navigation-bar').show()
  $('#result').html('You have signed in successfully').fadeOut(8000)
  $('#lndingpg_create_survey').addClass('hidden')
  $('#lndingpg_view_dashboard').removeClass('hidden')
  $('#lndingpg_survey_list').addClass('hidden')

  // we have to store the user data or header somwhere.  sto we will put it in ../store.js

  // app.user = data.user
  //  $('#result').text('Signed in successfully!!')
  $('#signUpModal').modal('hide')
  //  // $('#infoMessage').html('&nbsp;')
  $('#sign-in-register, #infoMessage').addClass('hidden')
  $('#create-survey, #view-dashboard, #view-surveys').removeClass('hidden')
  // .displayUsersChildren()
  authHelper.setSignInSuccessShowHide()
  store.user = data.user
  appEvents.onGetUserSurveys()
}

const signInFailure = function (error) {
  console.error(error)
  $('#modal-message').show().html('Sign In <span style="color:#f4c542">failed</span>. Please check your username/password and try again').fadeOut(8000)
}

const signOutSuccess = function () {
  $('#lndingpg_create_survey').addClass('hidden')
  $('#lndingpg_view_dashboard').addClass('hidden')
  $('#lndingpg_survey_list').removeClass('hidden')
  $('#sign-in-register, #infoMessage').removeClass('hidden')
  // need to determine if we want to remove the kids button or repurpose it
  // for navigation to surveys, dashboard, or create survey
  $('#getKidsButton, #add-kid, #add-book').addClass('hide')
  authHelper.setSignOutSuccessShowHide()
  $(':input', '#sign-in').val('')
  $('#result').show().html('You have signed out successfully').fadeOut(8000)
  $('#create-survey, #view-dashboard, #view-surveys').addClass('hidden')
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
  $('#signUpModal').modal('hide')
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
