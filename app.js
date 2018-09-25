var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var getCookieRouter = require('./routes/checkCookie');
var getAllUsersRouter = require('./routes/getAllUsers');
var getAllToolsRouter = require('./routes/getAllTools');
var getAllReviewsRouter = require('./routes/getAllReviews');
var postReviewRouter = require('./routes/postReview');
var editSaveToggleRouter = require('./routes/editSaveToggle');
var updateReviewRouter = require('./routes/updateReview');
var deleteReviewRouter = require('./routes/deleteReview');



var app = express();

const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3001'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');
app.use(cookieParser());


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', PUBLIC_URL)
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE, PUT')
  res.header('Referrer-Policy', 'no-referrer')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  else {
    next()
  }
})

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/checkCookie', getCookieRouter);
app.use('/getAllUsers', getAllUsersRouter);
app.use('/getAllTools', getAllToolsRouter);
app.use('/getAllReviews', getAllReviewsRouter);
app.use('/postReview', postReviewRouter);
app.use('/editSaveToggle', editSaveToggleRouter);
app.use('/updateReview', updateReviewRouter);
app.use('/deleteReview', deleteReviewRouter);

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
