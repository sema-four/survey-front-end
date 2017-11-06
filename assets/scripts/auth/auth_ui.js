'use strict'
const store = require('./../store')


const notUniquePw = function () {
  $('#change-pw-message').html('Your new password is the same as the current password.  Please enter a different password.').show().fadeOut(8000)
}

module.exports = {
  // signUpSuccess,
  // signUpFailure,
  // signInSuccess,
  // signInFailure,
  // signOutSuccess,
  // signOutFailure,
  // changePWSuccess,
  // changePWFailure,
  notUniquePw
}
