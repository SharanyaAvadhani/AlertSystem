var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
let alert = require('alert'); 
let  toastify = require('toastify-js');
var SerialPort = require('serialport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var data_insert = require('./routes/data_insert');
var login = require('./routes/login');
var acknowledgement = require('./routes/acknowledgement');
var message_box = require('./routes/message_box');

var app = express();
app.use(session({
  secret: "amar",
  saveUninitialized: true,
  resave: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data_insert',data_insert);
app.use('/login',login);
app.use('/acknowledgement',acknowledgement);
app.use('/message_box',message_box);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
