'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const appUi = require('./app_ui')
const appApi = require('./app_api')

const ontoggleCreateSurvey = function (event) {
  appUi.toggleCreateSurvey()
}
const ontoggleDashboard = function (event) {
  appUi.toggleDashboard()
}
const ontoggleSurveyList = function (event) {
  appUi.toggleSurveyList()
}

// const displayQuestions = function () {
$('select').change(function () {
  $('select option:selected').each(function () {
    if ($(this).val() === '1') {
      $('#question1').removeClass('hidden')
      $('#question2, #question3').addClass('hidden')
    } else if ($(this).val() === '2') {
      $('#question1, #question2').removeClass('hidden')
      $('#question3').addClass('hidden')
    } else if ($(this).val() === '3') {
      $('#question1, #question2, #question3').removeClass('hidden')
    }
  })
})

const onGetSurveys = function (data) {
  // event.preventDefault()
  appApi.index()
    .then(appUi.onGetSurveysSuccess)
    .catch(appUi.onError)
}

const onCreateSurveys = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  appApi.create(data)
    .then(appUi.onGetSurveysSuccess)
    .catch(appUi.onError)
}

const addHandlers = function () {
  $('#create-survey').on('click', ontoggleCreateSurvey)
  $('#view-dashboard').on('click', ontoggleDashboard)
  $('#view-surveys').on('click', ontoggleSurveyList)
}

module.exports = {
  addHandlers,
  onGetSurveys,
  onCreateSurveys
}
