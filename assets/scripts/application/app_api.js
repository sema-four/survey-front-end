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

const getSurvey = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + id,
    method: 'GET'
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
          'question': {
            'questionDescription': stuff.survey['questions.question1.questionDescription'],
            'active': stuff.survey['questions.question1.active'],
            'options': stuff.survey['questions.question1.options'],
            'responses': [{
              'response': {
                'answer': 'Agree',
                'responseId': '123',
                'anonymous': false
              }
            },
            {
              'response': {
                'answer': 'DisAgree',
                'responseId': '123',
                'anonymous': false
              }
            },
            {
              'response': {
                'answer': 'DisAgree',
                'responseId': '123',
                'anonymous': false
              }
            }]
          }
        },
        {
          'question': {
            'questionDescription': stuff.survey['questions.question2.questionDescription'],
            'active': stuff.survey['questions.question2.active'],
            'options': stuff.survey['questions.question2.options'],
            'responses': [{
              'response': {
                'answer': 'Neutral',
                'responseId': '123',
                'anonymous': true
              }
            },
            {
              'response': {
                'answer': 'DisAgree',
                'responseId': '123',
                'anonymous': true
              }
            }]
          }
        },
        {
          'question': {
            'questionDescription': stuff.survey['questions.question3.questionDescription'],
            'active': stuff.survey['questions.question3.active'],
            'options': stuff.survey['questions.question3.options'],
            'responses': [{
              'response': {
                'answer': 'Strongly Agree',
                'responseId': '123',
                'anonymous': true
              }
            }]
          }
        }]
      }
    }
  })
}

module.exports = {
  getSurveys,
  getSurvey,
  createSurvey,
  deleteSurvey
}
