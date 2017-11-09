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

const updateSurvey = function (data, id) {
  // console.log('update api data', data)
  // console.log('data stored is;', store.survey)
  // console.log('looking for the field: ', data.survey['questions.question.questionDescription'])
  const newQuestion = data.survey['questions.question.questionDescription']
  console.log('expected array is: ', store.survey.questions)
  const newQuestionJson = {
    'survey': {
      'title': store.survey.title,
      'questions': []
    }
  }
  for (let i = 0; i < store.survey.questions.length; i++) {
    console.log('Store.surveys.questions is', store.survey.questions)
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
  console.log('newQuestionJson is: ', newQuestionJson.survey.questions)
  console.log('our expected json', newQuestionJson)
  return $.ajax({
    url: config.apiOrigin + '/surveys/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: newQuestionJson
  })
}

const submitSurvey = function (data, id) {
  console.log('Are we calling submit????')
  // const quesJson = getQuestionJson(data)
  // return $.ajax({
  //   url: config.apiOrigin + '/surveys' + id,
  //   method: 'PATCH',
  //   headers: {
  //     Authorization: 'Token token=' + store.user.token
  //   },
  //   data: quesJson
  // })
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
  getSurvey,
  createSurvey,
  deleteSurvey,
  updateSurvey,
  submitSurvey
}
