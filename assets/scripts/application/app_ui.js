'use strict'
const store = require('./../store')
const showSurveysTemplate = require('../templates/surveys.handlebars')
const showSurveyTemplate = require('../templates/takesurvey.handlebars')
const toggleCreateSurvey = function () {
  $('#lndingpg_view_dashboard').addClass('hidden')
  $('#lndingpg_survey_list').addClass('hidden')
  $('#lndingpg_create_survey').removeClass('hidden')
  $('#page-header').show().html('Create a survey of your own.')
}
const toggleDashboard = function () {
  $('#lndingpg_view_dashboard').removeClass('hidden')
  $('#lndingpg_survey_list').addClass('hidden')
  $('#lndingpg_create_survey').addClass('hidden')
}
const toggleSurveyList = function () {
  $('#lndingpg_view_dashboard').addClass('hidden')
  $('#lndingpg_survey_list').removeClass('hidden')
  $('#lndingpg_create_survey').addClass('hidden')
  $('#page-header').show().html('Choose a survey to take.')
}
const onGetSurveysSuccess = function (data) {
  store.surveys = data.surveys
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('#lndingpg_survey_list').html(showSurveysHtml)
  $('#page-header').show().html('Choose a survey to take.')
}
const onGetSurveyFailure = function () {
  $('#result').show().html('Could <span style="color:#f4c542 ">Not</span>find surveys.').fadeOut(8000)
}
const onCreateSurveySuccess = function (data) {
  $('#result').show().html('Survey Created Successfully!').fadeOut(8000)
  $(':input', '#create-survey-form').val('')
}
const onCreateSurveyFailure = function () {
  $('#result').show().html('Survey could <span style="color:#f4c542 ">not</span> be created. Some fields may be missing').fadeOut(8000)
}
const onGetUserSurveysSuccess = function (data) {
  const id = store.user.id
  console.log('User is is', id)
  console.log('Surveys:', data.surveys)
  let titles = ''
  for (let i = 0; i < data.surveys.length; i++) {
    if (id === data.surveys[i]._owner) {
      titles = titles + ' ' + data.surveys[i].title + '<br>' + "<button id='delete-survey' data-id=" + data.surveys[i].id + ' ' + "class='btn-danger'>Delete This Survey</button>" + '<br><br>' + "<button id='update-survey' data-id=" + data.surveys[i].id + ' ' + "class='btn-info'>Update This Survey</button>"
    }
  }
  $('#lndingpg_view_dashboard').html(titles)
  $('#page-header').show().html('Here are all of your sruveys and their responses.')
}
const onGetUserSurveyFailure = function () {
  $('#result').show().html('Could <span style="color:#f4c542 ">Not</span>find your surveys.').fadeOut(8000)
}
const onDeleteSurveySuccess = function () {
  $('#result').show().html('Your survey has been deleted.').fadeOut(8000)
}
const onDeleteSurveyFailure = function () {
  $('#result').show().html('Could <span style="color:#f4c542 ">not</span> delete survey.').fadeOut(8000)
}
const onUpdateSurveySuccess = function () {
  $('#result').show().html('Your survey has been updated.').fadeOut(8000)
}
const onUpdateSurveyFailure = function () {
  $('#result').show().html('Could <span style="color:#f4c542 ">not</span> update survey.').fadeOut(8000)
}

const onTakeSurveySuccess = function (data) {
  const showSurveyHtml = showSurveyTemplate({ surveys: data })
  $('#result').show().html('Got the survey.').fadeOut(8000)
  $('#display_survey').html(showSurveyHtml)
}

const onTakeSurveyFailure = function () {
  $('#result').show().html('Could <span style="color:#f4c542 ">not</span> get the survey.').fadeOut(8000)
}

module.exports = {
  toggleSurveyList,
  toggleDashboard,
  toggleCreateSurvey,
  onGetSurveysSuccess,
  onCreateSurveySuccess,
  onCreateSurveyFailure,
  onGetSurveyFailure,
  onGetUserSurveysSuccess,
  onGetUserSurveyFailure,
  onDeleteSurveySuccess,
  onDeleteSurveyFailure,
  onTakeSurveySuccess,
  onTakeSurveyFailure,
  onUpdateSurveySuccess,
  onUpdateSurveyFailure
}
