const Gen = require('../config/configGenerator')

var config = new Gen({
  NODE_ENV: 'development'
}).getConfig()

module.exports = config