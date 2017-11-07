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
  onGetSurveys()
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
  appApi.getSurveys()
    .then(appUi.onGetSurveysSuccess)
    .catch(appUi.onGetSurveysFailure)
}

const onCreateSurvey = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('data is', data)
  appApi.createSurvey(data)
    .then(appUi.onCreateSurveySuccess)
    .catch(appUi.onCreateSurveyFailure)
}

const addHandlers = function () {
  $('#create-survey').on('click', ontoggleCreateSurvey)
  $('#view-dashboard').on('click', ontoggleDashboard)
  $('#view-surveys').on('click', ontoggleSurveyList)
  $('#create-survey-form').on('submit', onCreateSurvey)
}

module.exports = {
  addHandlers,
  onGetSurveys,
  onCreateSurvey
}
