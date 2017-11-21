'use strict'
const store = require('./../store')
const showSurveysTemplate = require('../templates/surveys.handlebars')
const showSurveyTemplate = require('../templates/takesurvey.handlebars')
const showSurveyUpdateTemplate = require('../templates/showsurvey.handlebars')
const appApi = require('./app_api')

const toggleCreateSurvey = function () {
  $('#lndingpg_view_dashboard, #display_survey').addClass('hidden')
  $('#lndingpg_survey_list').addClass('hidden')
  $('#lndingpg_create_survey').removeClass('hidden')
  $('#page-header').show().html('Create a survey of your own.')
  $('#lndingpg_update_survey').addClass('hidden')
}

const toggleDashboard = function () {
  $('#lndingpg_view_dashboard').removeClass('hidden')
  $('#page-header').show().html('Manage your survey.')
  $('#lndingpg_survey_list, #display_survey').addClass('hidden')
  $('#lndingpg_create_survey').addClass('hidden')
  $('#lndingpg_update_survey').addClass('hidden')
}

const toggleSurveyList = function () {
  $('#lndingpg_view_dashboard, #display_survey').addClass('hidden')
  $('#lndingpg_survey_list').removeClass('hidden')
  $('#lndingpg_create_survey').addClass('hidden')
  $('#page-header').show().html('Choose a survey to take.')
  $('#lndingpg_update_survey').addClass('hidden')
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
  $('#dynamicQuestions').empty('')
  $('#title').val('')
  $('#question-number').val('Select')
}

const onCreateSurveyFailure = function () {
  $('#result').show().html('Survey could <span style="color:#f4c542 ">not</span> be created. Some fields may be missing').fadeOut(8000)
}

const getRes = (id) => {
  return new Promise((resolve, reject) =>
    appApi.getSurveyResponses(id)
      .then((data) => {
        resolve(data.surveyresponses)
      })
      .catch((new Error('some problem'))
      ))
}

const getSurveyStatistics = (responses) => {
  const stats = {}
  // Check if responses are there for the survey
  if (responses.length > 0) {
    for (let i = 0; i < responses.length; i++) {
      $.each(responses[i].questions, function (key, val) {
        // Check if questionId array exists in stats object
        if (stats[val.questionId]) {
          // Check if answer array exists in questionId array
          if (stats[val.questionId][val.answer]) {
            stats[val.questionId][val.answer].push(val.answer)
          } else {
            stats[val.questionId][val.answer] = []
            stats[val.questionId][val.answer].push(val.answer)
          }
        } else {
          // create an array in stats with array name as questionId
          stats[val.questionId] = []
          // create answer array in questionId array, with array name as answer
          stats[val.questionId][val.answer] = []
          stats[val.questionId][val.answer].push(val.answer)
        }
      })
    }
    console.log('Stats is', stats)
  }
  return stats
}

const populateStats = function (survey, stats) {
  let details = ''
  for (let k = 0; k < survey.questions.length; k++) {
    details = details + '<br><h4>' + survey.questions[k].question.questionDescription + '</h4>'
    const keys = Object.keys(stats[survey.questions[k].id])
    keys.forEach(key => {
      details = details + '<h5>' + stats[survey.questions[k].id][key][0] + ': ' + stats[survey.questions[k].id][key].length + '</h5>'
    })
    $(document).on('click', '#trigger-modal', function () {
      const id = this.getAttribute('data-id')
      if (survey.id === id) {
        $('#detailed-responses').html(details)
      }
    })
  }
}

const onGetUserSurveysSuccess = function (data) {
  const id = store.user.id
  let titles = ''
  const promises = []
  const userSurveys = []
  for (let i = 0; i < data.surveys.length; i++) {
    if (id === data.surveys[i]._owner) {
      promises.push(getRes(data.surveys[i].id))
      userSurveys.push(data.surveys[i])
    }
  }
  Promise.all(promises)
    .then((results) => {
      for (let j = 0; j < results.length; j++) {
        if (results[j].length > 0) {
          const stats = getSurveyStatistics(results[j])
          populateStats(userSurveys[j], stats)
        }
        titles = titles + ' <strong>' + userSurveys[j].title + "</strong><br><a data-target='#responsesModal' id='trigger-modal' data-id=" + userSurveys[j].id + ' ' + "data-toggle='modal' href='#responsesModal'> Has (" + results[j].length + ') response(s)</a><br>' + "<button id='update-survey' data-id=" + userSurveys[j].id + ' ' + "class='btn-info'>Update This Survey</button>" + '<br><br>' + "<button id='delete-survey' data-id=" + userSurveys[j].id + ' ' + "class='btn-danger'>Delete This Survey</button>" + '<br><br>'
      }
      $('#lndingpg_view_dashboard').html(titles)
    })
    .catch((e) => {
      console.error(e)
    })
  $('#page-header').show().html('Here are all of your surveys and their responses.')
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

const showUpdateForm = function (data) {
  const showSurveyHtml = showSurveyUpdateTemplate({ surveys: data })
  store.survey = data.survey
  if (store.survey.questions.length > 4) {
    $('#submit-update, #update-question-title, #update-label').addClass('hidden')
    $('#feedback').html('Sorry, you have reached the max number of questions.')
  } else {
    $('#submit-update, #update-question-title, #update-label').removeClass('hidden')
    $('#feedback').html('')
  }
  $('#lndingpg_update_survey').removeClass('hidden')
  $('#show-survey-area').removeClass('hidden')
  $('#show-survey-area').html(showSurveyHtml)
  $('#lndingpg_view_dashboard').addClass('hidden')
}

const closeUpdate = function () {
  $('#show-survey-area').addClass('hidden')
  $('#lndingpg_update_survey').addClass('hidden')
  $('#question-title').val('')
  store.survey = null
  $('#lndingpg_view_dashboard').removeClass('hidden')
  $('#page-header').show().html('Manage your survey.')
}

const onUpdateSurveySuccess = function () {
  $('#result').show().html('Your survey has been updated.').fadeOut(8000)
  $(':input', '#update-survey-form').val('')
  $('#question-title').val('')
}

const onUpdateSurveyFailure = function () {
  $('#result').show().html('Could <span style="color:#f4c542 ">not</span> update survey.').fadeOut(8000)
}

const onTakeSurveySuccess = function (data) {
  const showSurveyHtml = showSurveyTemplate({ surveys: data })
  $('#display_survey').removeClass('hidden')
  $('#result').show().html('Got the survey.').fadeOut(8000)
  $('#lndingpg_survey_list, #page-header').addClass('hidden')
  $('#display_survey').html(showSurveyHtml)
}
const onTakeSurveyFailure = function () {
  $('#result').show().html('Could <span style="color:#f4c542 ">not</span> get the survey.').fadeOut(8000)
}

const onSubmitSurveySuccess = function (data) {
  $('#display_survey').addClass('hidden')
  $('#result').show().html('You have submitted survey successfully').fadeOut(8000)
}

const onSubmitSurveyFailure = function (error) {
  $('#result').show().html('Could <span style="color:#f4c542 ">not</span> submit the survey response.').fadeOut(8000)
  console.error(error)
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
  onUpdateSurveyFailure,
  onSubmitSurveySuccess,
  onSubmitSurveyFailure,
  showUpdateForm,
  closeUpdate
}
