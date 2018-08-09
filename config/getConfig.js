var fileHelper = require('../utils/fileHelper')
var _ = require('lodash')
var {
  resolve
} = require('path')

module.exports = function () {
  var defConfig = fileHelper.readJSON(resolve(__dirname, './system', 'default.json'))
  var userConfig = fileHelper.readJSON(resolve(__dirname, './system', 'user.json'), {})
  var cfg = _.merge({}, defConfig, userConfig)

  return cfg
}
