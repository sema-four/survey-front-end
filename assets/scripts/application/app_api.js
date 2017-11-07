'use strict'

const config = require('../config')
const store = require('../store')

console.log('The URL is ', config.apiOrigin)

const getSurveys = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    // url: 'http://localhost:4741/surveys',
    method: 'GET',
    data
  })
}

const createSurvey = function (stuff) {
  console.log('data is', stuff)
  console.log('questions is', stuff.survey['questions.question1.active'])
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'survey': {
        'title': stuff.survey.title,
        'questions': [{
          'question1': {
            'questionDescription': stuff.survey['questions.question1.questionDescription'],
            'active': stuff.survey['questions.question1.active'],
            'options': stuff.survey['questions.question1.options']
          },
          'question2': {
            'questionDescription': stuff.survey['questions.question2.questionDescription'],
            'active': stuff.survey['questions.question2.active'],
            'options': stuff.survey['questions.question2.options']
          },
          'question3': {
            'questionDescription': stuff.survey['questions.question3.questionDescription'],
            'active': stuff.survey['questions.question3.active'],
            'options': stuff.survey['questions.question3.options']
          }
        }]
      }
    }
  })
}

module.exports = {
  getSurveys,
  createSurvey
}
