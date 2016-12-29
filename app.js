var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/users', users);
app.get('/render', function(req, res) {
  res.render('render')
})
app.get('/render-title', function(req, res) {
  res.render('index', {title: 'Express.js Guide'})
})
app.get('/locals', function(req, res) {
  res.locals = {title: 'Express.js Guide'}
  res.render('index')
})
app.get('/set-html', function(req, res) {
  res.set('Content-type', 'text/html')
  res.end('<html><body>' +
          '<h1>Express.js Guide</h1>' +
          '</body></html>')
})
app.get('/set-csv', function(req, res) {
  var body = 'title, tags\n' +
             'Express.js Guide, node.js express.js\n' +
    'Rapid Prototyping with JS, backbone.js, node.js, mongodb\n' +
    'Javascript: The GOOD Parts, javascript\n'
  res.set({'Content-type': 'text/plain',
    'Content-Length' : body.length,
    'Set-Cookie' : ['type=reader', 'language=javascript']})
  res.end(body)
})
app.get('/status', function(req, res) {
  res.status(200).send('alive')
})
app.get('/send-ok', function(req, res) {
  res.send(200, {message : 'Data was submitted successfully.'})
})
app.get('/send-err', function(req, res) {
  res.send(500, {message : 'Oops, the server is down.'})
})
app.get('/json', function(req, res) {
  res.json(200, [{title: 'Express.js Guide', tags: 'node.js express.js'}, 
    {title: 'Rapid Prototyping with JS', tags: 'backbone.js, node.js, mongodb'},
    {title: 'Javascript: The Good Parts', tags: 'javascript'}])
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000)
module.exports = app;
