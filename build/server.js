var Koa = require('koa'),
  path = require('path'),
  http = require('http'),
  debug = require('debug')('demo:server'),
  // consoler = require('consoler'),
  convert = require('koa-convert'),
  webpack = require('webpack'),
  devMiddleware = require('koa-webpack-dev-middleware'),
  hotMiddleware = require('koa-webpack-hot-middleware'),
  conf = require('./develop.js'),
  getAppConfig = require('../config/getConfig'),
  proxy = require('koa-proxies'),
  historyFallBack = require('koa-connect-history-api-fallback')

const appConfig = getAppConfig()

var options = {
  origin: '*'
}

var app = new Koa();

app.use(historyFallBack())

var compiler = webpack(conf);

app.use(proxy('/dcapi', {
  target: appConfig.development.api.host + appConfig.development.api.path,
  changeOrigin: true,
  rewrite: path => path.replace(/\/dcapi/, '')
}))

app.use(convert(devMiddleware(compiler, {
  // all options optional

  noInfo: true,
  // display no info to console (only warnings and errors)

  quiet: false,
  // display nothing to the console

  /*lazy: true,*/
  // switch into lazy mode
  // that means no watching, but recompilation on every request

  /*watchOptions: {
   aggregateTimeout: 300,
   poll: true
   },*/
  // watch options (only lazy: false)

  publicPath: conf.output.publicPath,
  // public path to bind the middleware to
  // use the same as in webpack

  /*headers: { "X-Custom-Header": "yes" },*/
  // custom headers

  stats: {
    colors: true
  }
  // options for formating the statistics
})));

app.use(convert(hotMiddleware(compiler, {
  path: '/__webpack_hmr'
})));


// consoler.info('请等待webpack初次构建完成提示...');



/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(appConfig['development']['static']['staticPort']);
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  // consoler.info('The Static Dev Server is Listening On ' + port);
}
