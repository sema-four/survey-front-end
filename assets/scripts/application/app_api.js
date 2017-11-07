'use strict'

const config = require('../config')
// const store = require('../store')

console.log('The URL is ', config.apiOrigin)

const index = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/surveys',
    // url: 'http://localhost:4741/surveys',
    method: 'GET',
    data
  })
}

module.exports = {
  index
}
