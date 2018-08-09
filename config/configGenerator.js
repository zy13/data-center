const {
  resolve,
  join
} = require('path')
const webpack = require('webpack')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

const getAppConfig = require('./getConfig')

function Gen (options) {
  this.opts = options
  this.entry = {}
  this.output = {}
  this.resolve = {}
  this.module = {}
  this.plugins = []
  this.devtool = ''
  this.chunks = []

  if (options.root_path) {
    this.root_path = options.root_path
  } else {
    this.root_path = resolve(__dirname, '../')
  }

  const config = getAppConfig()[this.opts['NODE_ENV']]

  this._userConfig = config

  this.init()
}

var gp = Gen.prototype

gp.isDev = function () {
  return this.opts['NODE_ENV'] === 'development'
}

gp.isProd = function () {
  return this.opts['NODE_ENV'] === 'production'
}

gp.isTest = function () {
  return this.opts['NODE_ENV'] === 'test'
}

gp.getPort = function () {
  var conf = this._userConfig

  if (conf['static'] && conf['static']['staticPort']) {
    return conf['static']['staticPort']
  } else {
    return '8080'
  }
}

gp.init = function () {
  this.getEntry()
  this.getOutput()
  this.getResolve()
  this.getModule()
  this.getPlugins()
  this.getDevtool()
}

gp.getEntry = function () {
  var isDev = this.isDev()
  var entry = {}
  var chunks = []

  if (isDev) {
    let port = this.getPort()
    glob.sync('./src/pages/**/*.js').forEach(path => {
      const chunk = path.split('./src/pages/')[1].split('.js')[0]
      entry[chunk] = [`webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr&timeout=20000&reload=true`, path]
      chunks.push(chunk)
    })
  } else {
    glob.sync('./src/pages/**/*.js').forEach(path => {
      const chunk = 'src/' + path.split('./src/pages/')[1].split('.js')[0]
      entry[chunk] = path
      chunks.push(chunk)
    })
  }

  this.entry = entry
  this.chunks = chunks
}

gp.getOutput = function () {
  const publicPath = this._userConfig.static.srcHost

  const path = resolve(this.root_path, './dist')
  var res = {
    path,
    filename: '[name].js',
    publicPath
  }

  this.output = res
}

gp.getResolve = function () {
  var res = {
    extensions: ['.js', '.vue'],
    alias: {
      assets: resolve(this.root_path, 'src/assets'),
      components: resolve(this.root_path, 'src/components'),
      root: resolve(this.root_path, 'node_modules'),
      dao: resolve(this.root_path, 'src/dao'),
      utils: resolve(this.root_path, 'utils'),
      tools: resolve(this.root_path, 'src/tools')
    }
  }

  this.resolve = res
}

gp.getModule = function () {
  var res = {
    rules: [
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [["es2015", {"modules": false}]]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              query: {
                cacheDirectory: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  }

  this.module = res
}

gp.getPlugins = function () {
  var chunks = this.chunks
  var isDev = this.isDev()

  var res = [
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.js',
      chunks,
      minChunks: chunks.length
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].css',
      allChunks: false,
      disable: isDev
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'appConfig': JSON.stringify(getAppConfig()[this.opts['NODE_ENV']]),
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    })
  ]

  glob.sync('./src/pages/**/*.html').forEach(path => {
    const filename = path.split('./src/pages/')[1].split('/app.html')[0] + '.html'
    let chunk = path.split('./src/pages/')[1].split('.html')[0]
    chunk = this.isDev() ? chunk : ('src/' + chunk)
    const htmlConf = {
      filename: filename,
      template: path,
      inject: 'body',
      favicon: './src/assets/img/logo.png',
      hash: !isDev,
      chunks: ['vendors', chunk]
    }
    res.push(new HtmlWebpackPlugin(htmlConf))
  })

  if (!isDev) {
    res = res.concat([
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ])
  }

  this.plugins = res
}

gp.getDevtool = function () {
  var res = this.isDev() ? '#cheap-module-eval-source-map' : ''

  this.devtool = res
}

gp.getConfig = function () {
  var {entry, output, resolve, module, plugins, devtool} = this
  return {entry, output, resolve, module, plugins, devtool}
}

module.exports = Gen

