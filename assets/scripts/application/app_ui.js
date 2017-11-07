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
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  console.log(data.surveys[0])
  console.log('The title is', data.surveys[0].title)
  $('#lndingpg_survey_list').html(showSurveysHtml)
  $('#result').html('Choose your survey.')
}

module.exports = {
  toggleSurveyList,
  toggleDashboard,
  toggleCreateSurvey,
  onGetSurveysSuccess
}
