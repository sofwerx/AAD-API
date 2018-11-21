const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const getAllUsersRouter = require('./routes/getAllUsers');
const getUserInfoRouter = require('./routes/getUserInfo');
const getAllToolsRouter = require('./routes/getAllTools');
const getAllReviewsRouter = require('./routes/getAllReviews');
const getAllPublicReviewsRouter = require('./routes/getAllPublicReviews');
const postReviewRouter = require('./routes/postReview');
const editSaveToggleRouter = require('./routes/editSaveToggle');
const updateReviewRouter = require('./routes/updateReview');
const deleteReviewRouter = require('./routes/deleteReview');
const inviteToSlackRouter = require('./routes/inviteToSlack');
const getFileRouter = require('./routes/getFile');
const removeFileRouter = require('./routes/removeFile');
const getPermissionsRouter = require('./routes/getPermissions');
const addToolRouter = require('./routes/addTool');
const updateUsernameRouter = require('./routes/updateUsername');
const validateCurrentPasswordInputRouter = require('./routes/validateCurrentPasswordInput');
const validateNewPasswordInputRouter = require('./routes/validateNewPasswordInput');
const updatePasswordRouter = require('./routes/updatePassword');




const app = express();

const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3001'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({limit: 10240 * 1024, type: 'application/octet-stream'})); // 10 MB of attachments
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

app.use('/', indexRouter)
app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.use('/getAllUsers', getAllUsersRouter)
app.use('/getUserInfo', getUserInfoRouter)
app.use('/getAllTools', getAllToolsRouter)
app.use('/getAllReviews', getAllReviewsRouter)
app.use('/getAllPublicReviews', getAllPublicReviewsRouter)
app.use('/postReview', postReviewRouter)
app.use('/editSaveToggle', editSaveToggleRouter)
app.use('/updateReview', updateReviewRouter)
app.use('/deleteReview', deleteReviewRouter)
app.use('/inviteToSlack', inviteToSlackRouter)
app.use('/getFile', getFileRouter)
app.use('/removeFile', removeFileRouter)
app.use('/getPermissions', getPermissionsRouter)
app.use('/addTool', addToolRouter)
app.use('/updateUsername', updateUsernameRouter)
app.use('/validateCurrentPasswordInput', validateCurrentPasswordInputRouter)
app.use('/validateNewPasswordInput', validateNewPasswordInputRouter)
app.use('/updatePassword', updatePasswordRouter)

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
