const Gen = require('../config/configGenerator')

var config = new Gen({
  NODE_ENV: 'production'
}).getConfig()

module.exports = config