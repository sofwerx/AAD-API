const express = require('express');
require('dotenv').config();
const session = require('express-session');
// const knex = require('./db/knex.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const errorHandler = require('errorhandler');
const cors = require('cors');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3001';


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

// CORS Support
const corsOptions = {
  origin: PUBLIC_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));


app.use(session({
  secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false
}));

if (!isProduction) {
  app.use(errorHandler());
}

require('./server/config/passport');

/* eslint-disable global-require */
app.use('/',
  [
    require('./server/routes/user_routes'),
    require('./server/routes/tool_routes'),
    require('./server/routes/survey_response_routes'),
    require('./server/routes/survey_routes')
  ]);
/* eslint-enable global-require */

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

module.exports = app;
