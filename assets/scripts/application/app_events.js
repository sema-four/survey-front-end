'use strict'

// const store = require('./../store')
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

// This is for showing or hiding # of questions {
$('select').change(function () {
  $('select option:selected').each(function () {
    if ($(this).val() === '1') {
      $('#question2, #question3').addClass('hidden')
    } else if ($(this).val() === '2') {
      $('#question2').removeClass('hidden')
      $('#question3').addClass('hidden')
    } else if ($(this).val() === '3') {
      $('#question2, #question3').removeClass('hidden')
    }
  })
})

const onGetSurveys = function (data) {
  appApi.getSurveys()
    .then(appUi.onGetSurveysSuccess)
    .catch(appUi.onGetSurveysFailure)
}

const onGetUserSurveys = function (id) {
  appApi.getSurveys()
    .then(appUi.onGetUserSurveysSuccess)
    .catch(appUi.onGetUserSurveysFailure)
}

const onCreateSurvey = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('data is', data)
  appApi.createSurvey(data)
    .then(appUi.onCreateSurveySuccess)
    .catch(appUi.onCreateSurveyFailure)
}

const onDeleteSurvey = function (event) {
  event.preventDefault()
  const id = $(event.target).data('id')
  console.log('Guys the ID is', id)
  console.log(event)
  console.log(event.target)
  appApi.deleteSurvey(id)
    .then(appUi.onDeleteSurveySuccess)
    .then(onGetUserSurveys)
    .catch(appUi.onDeleteSurveyFailure)
}

const onTakeSurvey = function (event) {
  event.preventDefault()
  const id = $(event.target).data('id')
  appApi.getSurvey(id)
    .then(appUi.onTakeSurveySuccess)
    // .then(onGetUserSurveys)
    .catch(appUi.onTakeSurveyFailure)
}

const addHandlers = function () {
  $('#create-survey').on('click', ontoggleCreateSurvey)
  $('#view-dashboard').on('click', ontoggleDashboard)
  $('#view-surveys').on('click', ontoggleSurveyList)
  $('#create-survey-form').on('submit', onCreateSurvey)
  $('#view-dashboard').on('click', onGetUserSurveys)
  $(document).on('click', '#delete-survey', function (e) {
    onDeleteSurvey(e)
  })
  $(document).on('click', '.take', function (e) {
    onTakeSurvey(e)
  })
}

module.exports = {
  addHandlers,
  onGetSurveys,
  onCreateSurvey,
  onGetUserSurveys
}
