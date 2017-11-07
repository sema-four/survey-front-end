'use strict'
// const store = require('./../store')
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
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('#lndingpg_survey_list').html(showSurveysHtml)
  $('#result').html('Choose your survey.')
}
const onGetSurveyFailure = function () {
  $('#result').html('Could <span style="color:#f4c542 ">Not</span>find surveys.').fadeOut(8000)
}

const onCreateSurveySuccess = function (data) {
  $('#result').show().html('Survey Created Successfully!').fadeOut(8000)
}

const onCreateSurveyFailure = function () {
  $('#result').show().html('Survey could <span style="color:#f4c542 ">not</span> be created. Some fields may be missing').fadeOut(8000)
}

module.exports = {
  toggleSurveyList,
  toggleDashboard,
  toggleCreateSurvey,
  onGetSurveysSuccess,
  onCreateSurveySuccess,
  onCreateSurveyFailure,
  onGetSurveyFailure
}
