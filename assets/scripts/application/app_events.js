'use strict'

const store = require('./../store')
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

const getQuestionsHTML = (num) => {
  let questionshtml = ''
  for (let i = 0; i < num; i++) {
    questionshtml += "<div id='question'" + (i + 1) + ">" +
    "<label for='question-title'>Question" + (i + 1) + ":</label>" +
    "<input type='text' id='question-title' name='survey[questions.question.questionDescription[][" + i + "]] size='50'" + "placeholder='Add question here' required><br>" +
    "<br>" +
  "</div>"
  }
  return questionshtml
}
// This is for showing or hiding # of questions {
$('select').change(function () {
  let val = 0
  let showQuestionsHtml = ''
  $('select option:selected').each(function () {
    if ($(this).val() === '1') {
      val = $(this).val()
      showQuestionsHtml = getQuestionsHTML(val)
    } else if ($(this).val() === '2') {
      val = $(this).val()
      showQuestionsHtml = getQuestionsHTML(val)
    } else if ($(this).val() === '3') {
      val = $(this).val()
      showQuestionsHtml = getQuestionsHTML(val)
    } else if ($(this).val() === '4') {
      val = $(this).val()
      showQuestionsHtml = getQuestionsHTML(val)
    } else if ($(this).val() === '5') {
      val = $(this).val()
      showQuestionsHtml = getQuestionsHTML(val)
    }
  })
  console.log('do i have questions???', showQuestionsHtml)
  $('#dynamicQuestions').html(showQuestionsHtml)
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
  console.log('Event data is', data)
  appApi.createSurvey(data)
    .then(appUi.onCreateSurveySuccess)
    .catch(appUi.onCreateSurveyFailure)
}

const onDeleteSurvey = function (event) {
  event.preventDefault()
  const id = $(event.target).data('id')
  appApi.deleteSurvey(id)
    .then(appUi.onDeleteSurveySuccess)
    .then(onGetUserSurveys)
    .catch(appUi.onDeleteSurveyFailure)
}

const onShowUpdate = function (event) {
  event.preventDefault()
  const id = $(event.target).data('id')
  console.log('event & id:')
  appApi.getSurvey(id)
    .then(appUi.showUpdateForm)
}

const onUpdateDone = function (event) {
  event.preventDefault()
  appUi.closeUpdate()
}

const onUpdateSurvey = function (event) {
  event.preventDefault()
  const id = store.survey.id
  console.log('The ID is', id)
  const data = getFormFields(this)
  appApi.updateSurvey(data, id)
    .then(appUi.onUpdateSurveySuccess)
    // .then(appUi.showUpdateForm)
    .catch(appUi.onUpdateSurveyFailure)
}

const onTakeSurvey = function (event) {
  event.preventDefault()
  const id = $(event.target).data('id')
  appApi.getSurvey(id)
    .then(appUi.onTakeSurveySuccess)
    // .then(onGetUserSurveys)
    .catch(appUi.onTakeSurveyFailure)
}
const onSubmitSurvey = function (event) {
  event.preventDefault()
  const id = $(event.target).data('id')
  appApi.submitSurvey(id)
    .then(appUi.onSubmitSurveySuccess)
    // .then(onGetUserSurveys)
    .catch(appUi.onSubmitSurveyFailure)
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
  $(document).on('click', '#update-survey', function (e) {
    onShowUpdate(e)
  })
  $('#update-survey-form').on('submit', onUpdateSurvey)
  $('#done-button').on('click', onUpdateDone)
  // $(document).on('submit', '#update-survey-form', function (e) {
  //   onUpdateSurvey(e)
  // })
  $(document).on('click', '#take-survey', function (e) {
    onSubmitSurvey(e)
  })
}

module.exports = {
  addHandlers,
  onGetSurveys,
  onCreateSurvey,
  onGetUserSurveys
}
