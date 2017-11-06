'use strict'
// const getFormFields = require('../../../lib/get-form-fields')
const app_ui = require('./app_ui')

const ontoggleCreateSurvey = function (event) {
  app_ui.toggleCreateSurvey()
}
const ontoggleDashboard = function (event) {
  app_ui.toggleDashboard()
}
const ontoggleSurveyList = function (event) {
  app_ui.toggleSurveyList()
}

const addHandlers = function () {
  $('#create-survey').on('click', ontoggleCreateSurvey)
  $('#view-dashboard').on('click', ontoggleDashboard)
  $('#view-surveys').on('click', ontoggleSurveyList)
}

module.exports = {
  addHandlers
}
