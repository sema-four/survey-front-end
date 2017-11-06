'use strict'
const store = require('./../store')

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

module.exports = {
  toggleSurveyList,
  toggleDashboard,
  toggleCreateSurvey
}
