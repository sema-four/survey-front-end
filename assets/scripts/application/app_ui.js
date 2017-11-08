'use strict'

const store = require('./../store')
const showSurveysTemplate = require('../templates/surveys.handlebars')

const toggleCreateSurvey = function () {
  $('#lndingpg_view_dashboard').addClass('hidden')
  $('#lndingpg_survey_list').addClass('hidden')
  $('#lndingpg_create_survey').removeClass('hidden')
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
}

const onGetSurveysSuccess = function (data) {
  store.surveys = data.surveys
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('#lndingpg_survey_list').html(showSurveysHtml)
  $('#result').show().html('Choose your survey.')
}

const onGetSurveyFailure = function () {
  $('#result').show().html('Could <span style="color:#f4c542 ">Not</span>find surveys.').fadeOut(8000)
}

const onCreateSurveySuccess = function (data) {
  $('#result').show().html('Survey Created Successfully!').fadeOut(8000)
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
      titles = titles + ' ' + data.surveys[i].title + '<br>' + "<button id='delete-survey' data-id=" + data.surveys[i].id + ' ' + "class='btn-danger'>Delete</button>" + '<br><br>'
    }
  }
  if (titles === '') {

  }
  $('#lndingpg_view_dashboard').html(titles)
}

const onGetUserSurveyFailure = function () {
  $('#result').show().html('Could <span style="color:#f4c542 ">Not</span>find your surveys.').fadeOut(8000)
}

const onDeleteSurveySuccess = function () {
  $('#result').show().html('Your survey has been deleted.').fadeOut(8000)
}

const onDeleteSurveyFailure = function () {
  $('#result').show().html('Could <span style="color:#f4c542 ">not</span> delete surveys.').fadeOut(8000)
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
  onDeleteSurveyFailure
}
