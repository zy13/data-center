const Gen = require('../config/configGenerator')

var config = new Gen({
  NODE_ENV: 'test'
}).getConfig()

module.exports = config