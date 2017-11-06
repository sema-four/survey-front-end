'use strict'

const showSignUpToggle = function () {
  $('#sign-up-toggle, #sign-up-toggle-text').addClass('hidden')
}
const hideSignUpToggle = function () {
  $('#sign-up-toggle, #sign-up-toggle-text').removeClass('hidden')
}
const showSignInToggle = function () {
  $('#sign-in-toggle, #sign-in-toggle-text').addClass('hidden')
}
const hideSignInToggle = function () {
  $('#sign-in-toggle, #sign-in-toggle-text').removeClass('hidden')
}
const setSignUpToggleShowHide = function () {
  clearFormInputFields('sign-up')
  clearFormInputFields('sign-in')
  $('#content').text('Informational messages will be displayed here...')
  $('#sign-up').removeClass('hidden')
  hideSignInToggle()
  $('#sign-in').addClass('hidden')
  showSignUpToggle()
}
const setSignInToggleShowHide = function () {
  $('#sign-in').removeClass('hidden')
  $('#content').text('Informational messages will be displayed here...')
  showSignInToggle()
  $('#sign-up').addClass('hidden')
  hideSignUpToggle()
}
const setOnChangePwdShowHide = function () {
  clearFormInputFields('change-password')
  $('#content').text('Informational messages will be displayed here...')
  $('#sign-up, #sign-in').addClass('hidden')
  showSignInToggle()
  showSignUpToggle()
  $('#change-password').removeClass('hidden')
  $('#signUpModalLabel').text('Change Password')
}
const setSignInSuccessShowHide = function () {
  clearFormInputFields('sign-in')
  clearFormInputFields('sign-up')
  $('#sign-out, #change-pwd-btn').removeClass('hidden')
}
const setChangePasswordSuccessShowHide = function () {
  showSignInToggle()
  $('#sign-in').addClass('hidden')
  $('#sign-up').removeClass('hidden')
  hideSignUpToggle()
}
const setSignOutSuccessShowHide = function () {
  $('#sign-out, #change-pwd-btn').addClass('hidden')
}
const clearFormInputFields = function (formId) {
  if (formId !== 'change-password') {
    $('#' + formId + ' input:text').val('')
  }
  $('#' + formId + ' input:password').val('')
}
module.exports = {
  setSignUpToggleShowHide,
  setSignInToggleShowHide,
  setOnChangePwdShowHide,
  setSignInSuccessShowHide,
  setChangePasswordSuccessShowHide,
  setSignOutSuccessShowHide,
  clearFormInputFields
}
