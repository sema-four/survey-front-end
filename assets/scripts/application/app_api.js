'use strict'

const config = require('../config')
const store = require('../store')

const getSurveys = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    method: 'GET',
    data
  })
}

const getSurvey = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + id,
    method: 'GET'
  })
}

const getSurveyResponses = function (id) {
  const promise = $.Deferred()
  $.ajax({
    url: config.apiOrigin + '/survey-responses/' + id,
    method: 'GET',
    success: function (data) {
      promise.resolve(data)
    },
    error: function (data) {
      promise.reject(data)
    }
  })
  return promise
}

const deleteSurvey = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateSurvey = function (data, id) {
  const newQuestion = data.survey['questions.question.questionDescription']
  const newQuestionJson = {
    'survey': {
      'title': store.survey.title,
      'questions': []
    }
  }
  for (let i = 0; i < store.survey.questions.length; i++) {
    newQuestionJson.survey.questions.push({
      'question': {
        'questionDescription': store.survey.questions[i].question.questionDescription,
        'options': store.survey.questions[i].question.options,
        'active': store.survey.questions[i].question.active
      }
    })
  }
  newQuestionJson.survey.questions.push({
    'question': {
      'questionDescription': newQuestion,
      'options': ["['Strongly Disagree','Disagree', 'Neutral', 'Agree', 'Strongly Agree' ]"],
      'active': true
    }
  }
  )
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: newQuestionJson
  })
}

const submitSurvey = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/surveyresponses',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const getQuestionJson = function (stuff) {
  const descriptionArray = stuff.survey['questions.question.questionDescription']
  const optionsArray = stuff.survey['questions.question.options']
  const activeArray = stuff.survey['questions.question.active']
  const questionsJson = {
    'survey': {
      'title': stuff.survey.title,
      'questions': []
    }
  }
  for (let i = 0; i < descriptionArray.length; i++) {
    questionsJson.survey.questions.push({
      'question': {
        'questionDescription': descriptionArray[i],
        'options': optionsArray[i],
        'active': activeArray[i]
      }
    })
  }
  return questionsJson
}

const createSurvey = function (stuff) {
  const quesJson = getQuestionJson(stuff)
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: quesJson
  })
}

module.exports = {
  getSurveys,
  getSurvey,
  getSurveyResponses,
  createSurvey,
  deleteSurvey,
  updateSurvey,
  submitSurvey
}
