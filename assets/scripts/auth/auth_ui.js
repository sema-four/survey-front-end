'use strict'

const store = require('./../store')
const authHelper = require('./auth_helper')
const appEvents = require('./../application/app_events')

const signUpSuccess = function (data) {
  $('#result').show().html('You have signed up successfully.')
  authHelper.clearFormInputFields('sign-up')
  authHelper.clearFormInputFields('sign-in')
  authHelper.clearFormInputFields('change-password')
  $('#signUpModal').modal('hide')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#modal-message').show().html('Sign up has <span style="color:#f4c542">failed</span>. Please try again.')
}

const signInSuccess = function (data) {
  console.log('signInSuccess called:', data)
  $('#result').show().html('You have signed in successfully').fadeOut(8000)
  $('#lndingpg_create_survey').addClass('hidden')
  $('#lndingpg_view_dashboard').removeClass('hidden')
  $('#page-header').removeClass('hidden')
  $('#lndingpg_survey_list').addClass('hidden')
  $('#signUpModal').modal('hide')
  $('#sign-in-register, #infoMessage').addClass('hidden')
  $('#create-survey, #view-dashboard, #view-surveys').removeClass('hidden')
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
  $('#lndingpg_survey_list').addClass('hidden')
  $('#lndingpg_update_survey').addClass('hidden')
  $('#page-header').addClass('hidden')
  $('#sign-in-register, #infoMessage').removeClass('hidden')
  authHelper.setSignOutSuccessShowHide()
  $(':input', '#sign-in').val('')
  $('#result').show().html('You have signed out successfully').fadeOut(8000)
  $('#create-survey, #view-dashboard, #view-surveys').addClass('hidden')
  store.user = null
}

const signOutFailure = function (error) {
  console.error(error)
  $('#modal-message').show().html('Sign Out <span style="color:#f4c542">Failed</span>')
}

const changePWSuccess = function () {
  $('#result').show().html('You have successfully changed your password').fadeOut(8000)
  $(':input', '#change-password').val('')
  $('#signUpModal').modal('hide')
}

const changePWFailure = function (error) {
  console.error(error)
  $('#modal-message').show().html('Change of Password  <span style="color:#f4c542">Failed</span>. Check your your password input and please try again.').fadeOut(8000)
}

const notSamePw = function () {
  $('#modal-message').show().html('Your passwords do not match. Please ensure your password confirmation matches your new chosen password.').fadeOut(8000)
}

const notUniquePw = function () {
  $('#modal-message').show().html('Your new password is the same as the current password.  Please enter a different password.').fadeOut(8000)
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
