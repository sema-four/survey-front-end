'use strict'

const config = require('../config')
const store = require('../store')

console.log('The URL is ', config.apiOrigin)

const getSurveys = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    method: 'GET',
    data
  })
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
  const quesJson = getQuestionJson(data)
  return $.ajax({
    url: config.apiOrigin + '/surveys' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: quesJson
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
  console.log('Questions JSON is:', questionsJson)
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
  createSurvey,
  deleteSurvey,
  updateSurvey
}
