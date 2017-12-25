var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream')

var app = express()
var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})

// setup the logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: accessLogStream}))

app.get('/', function (req, res) {
  res.send('hello, world!')
})
app.listen(3000);
console.log('Express app started on port 3000');